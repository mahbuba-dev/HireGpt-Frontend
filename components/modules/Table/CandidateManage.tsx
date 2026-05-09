"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

import Table, {
  type DataTableFilterConfig,
  type DataTableFilterValues,
} from "./Table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  deleteCandidateAction,
  getAllCandidates,
  type IUpdateCandidatePayload,
  updateCandidateAction,
} from "@/src/services/client.service";
import { type UserManagementItem, UserStatus } from "@/src/types/user.types";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null) {
    const maybeError = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };

    return maybeError.response?.data?.message ?? maybeError.message ?? fallback;
  }

  return fallback;
};

const formatDate = (value?: string) => {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString();
};

const getStatusBadge = (status?: string) => {
  switch (status) {
    case UserStatus.ACTIVE:
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:bg-emerald-500/15">Active</Badge>
      );
    case UserStatus.BLOCKED:
      return <Badge variant="destructive">Blocked</Badge>;
    case UserStatus.DELETED:
      return <Badge variant="secondary">Deleted</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const columns: ColumnDef<UserManagementItem>[] = [
  {
    accessorKey: "name",
    header: "Candidate",
    cell: ({ row }) => {
      const candidate = row.original;
      return (
        <div className="space-y-1">
          <p className="font-medium">{candidate.name || "Unnamed candidate"}</p>
          <p className="text-xs text-muted-foreground">ID: {candidate.userId ?? candidate.id}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.original.status),
  },
  {
    accessorKey: "emailVerified",
    header: "Email verified",
    cell: ({ row }) =>
      row.original.emailVerified ? (
        <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 dark:bg-sky-500/15 dark:text-sky-200 dark:hover:bg-sky-500/15">Verified</Badge>
      ) : (
        <Badge variant="secondary">Pending</Badge>
      ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
];

const filterConfigs: DataTableFilterConfig[] = [
  {
    id: "status",
    label: "Status",
    type: "single-select",
    options: [
      { label: "Active", value: UserStatus.ACTIVE },
      { label: "Blocked", value: UserStatus.BLOCKED },
      { label: "Deleted", value: UserStatus.DELETED },
    ],
  },
  {
    id: "emailVerified",
    label: "Email verification",
    type: "single-select",
    options: [
      { label: "Verified", value: "verified" },
      { label: "Pending", value: "pending" },
    ],
  },
];

const buildEditFormState = (candidate?: UserManagementItem | null) => ({
  fullName: candidate?.fullName ?? candidate?.name ?? "",
  email: candidate?.email ?? "",
  phone: candidate?.phone ?? "",
  address: candidate?.address ?? "",
});

import { useServerDataTable } from "@/src/hooks/useServerDataTable";

export default function CandidateManageTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] = useState<DataTableFilterValues>({});
  const [editTarget, setEditTarget] = useState<UserManagementItem | null>(null);
  const [editForm, setEditForm] = useState(buildEditFormState());
  const [candidateToDelete, setCandidateToDelete] = useState<UserManagementItem | null>(null);

  const {
    paginationState,
    onPaginationChange,
    sortingState,
    onSortingChange,
    queryParams,
  } = useServerDataTable({ defaultPageSize: 10 });

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["candidate-management-table", queryParams],
    queryFn: () =>
      getAllCandidates({
        page: queryParams.page,
        limit: queryParams.limit,
        sortBy: queryParams.sortBy,
        sortOrder: queryParams.sortOrder,
        searchTerm: searchTerm.trim() || undefined,
      }),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      candidateId,
      payload,
    }: {
      candidateId: string;
      payload: IUpdateCandidatePayload;
    }) => updateCandidateAction(candidateId, payload),
    onSuccess: () => {
      toast.success("Candidate updated successfully.");
      void refetch();
    },
    onError: (mutationError) => {
      toast.error(getErrorMessage(mutationError, "Failed to update candidate."));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (candidateId: string) => deleteCandidateAction(candidateId),
    onSuccess: () => {
      toast.success("Candidate deleted successfully.");
      void refetch();
    },
    onError: (mutationError) => {
      toast.error(getErrorMessage(mutationError, "Failed to delete candidate."));
    },
  });

  const candidates = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data]);

  const filteredCandidates = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const statusFilter = typeof filterValues.status === "string" ? filterValues.status : undefined;
    const emailVerifiedFilter =
      typeof filterValues.emailVerified === "string" ? filterValues.emailVerified : undefined;

    return candidates.filter((candidate) => {
      const matchesSearch =
        !normalizedSearch ||
        [candidate.name, candidate.email]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedSearch));

      const matchesStatus = !statusFilter || candidate.status === statusFilter;
      const matchesEmailVerified =
        !emailVerifiedFilter ||
        (emailVerifiedFilter === "verified"
          ? Boolean(candidate.emailVerified)
          : !candidate.emailVerified);

      return matchesSearch && matchesStatus && matchesEmailVerified;
    });
  }, [candidates, filterValues, searchTerm]);

  const isActionPending = updateMutation.isPending || deleteMutation.isPending;

  const openEditDialog = (candidate: UserManagementItem) => {
    setEditTarget(candidate);
    setEditForm(buildEditFormState(candidate));
  };

  const closeEditDialog = () => {
    setEditTarget(null);
    setEditForm(buildEditFormState());
  };

  const submitEdit = async () => {
    if (!editTarget) {
      return;
    }

    await updateMutation.mutateAsync({
      candidateId: editTarget.id,
      payload: {
        fullName: editForm.fullName.trim(),
        email: editForm.email.trim(),
        ...(editForm.phone.trim() ? { phone: editForm.phone.trim() } : {}),
        ...(editForm.address.trim() ? { address: editForm.address.trim() } : {}),
      },
    });

    closeEditDialog();
  };

  const submitDelete = async () => {
    if (!candidateToDelete) {
      return;
    }

    await deleteMutation.mutateAsync(candidateToDelete.id);
    setCandidateToDelete(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Candidate management</CardTitle>
          <CardDescription>
            Browse all candidate accounts with quick search, filters, sorting, and pagination.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {isError ? (
            <Alert variant="destructive">
              <AlertTitle>Could not load candidates</AlertTitle>
              <AlertDescription>
                {error instanceof Error
                  ? error.message
                  : "The candidate list is unavailable right now. Make sure the backend exposes `GET /candidates`."}
              </AlertDescription>
            </Alert>
          ) : null}

          <Table
            data={filteredCandidates}
            columns={columns}
            meta={data?.meta}
            isLoading={isLoading || isFetching}
            emptyMessage="No candidates match the current search or filters."
            pagination={{
              state: paginationState,
              onPaginationChange,
            }}
            sorting={{
              state: sortingState,
              onSortingChange,
            }}
            actions={{
              items: (candidate) => [
                {
                  label: "Email candidate",
                  onClick: () => {
                    window.location.href = `mailto:${candidate.email}`;
                  },
                },
                {
                  label: "Edit candidate",
                  onClick: () => openEditDialog(candidate),
                  disabled: isActionPending,
                },
                {
                  label: "Delete",
                  onClick: () => setCandidateToDelete(candidate),
                  disabled: isActionPending,
                  destructive: true,
                },
              ],
            }}
            search={{
              initialValue: searchTerm,
              placeholder: "Search candidates by name or email...",
              onDebouncedChange: setSearchTerm,
            }}
            filters={{
              configs: filterConfigs,
              values: filterValues,
              onFilterChange: (filterId, value) => {
                setFilterValues((current) => ({
                  ...current,
                  [filterId]: value,
                }));
              },
              onClearAll: () => setFilterValues({}),
            }}
            toolbarAction={
              <Button
                type="button"
                variant="outline"
                onClick={() => void refetch()}
                disabled={isLoading || isFetching || isActionPending}
              >
                <RefreshCw className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            }
          />
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(editTarget)}
        onOpenChange={(open) => {
          if (!open) {
            closeEditDialog();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit candidate</DialogTitle>
            <DialogDescription>
              {editTarget
                ? `Update profile information for ${editTarget.fullName || editTarget.name || editTarget.email}.`
                : "Update candidate account details."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-foreground">Full name</p>
              <Input
                value={editForm.fullName}
                onChange={(event) =>
                  setEditForm((current) => ({ ...current, fullName: event.target.value }))
                }
                placeholder="Candidate full name"
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-sm font-medium text-foreground">Email</p>
              <Input
                type="email"
                value={editForm.email}
                onChange={(event) =>
                  setEditForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="candidate@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-sm font-medium text-foreground">Phone</p>
              <Input
                value={editForm.phone}
                onChange={(event) =>
                  setEditForm((current) => ({ ...current, phone: event.target.value }))
                }
                placeholder="Optional phone number"
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-sm font-medium text-foreground">Address</p>
              <Input
                value={editForm.address}
                onChange={(event) =>
                  setEditForm((current) => ({ ...current, address: event.target.value }))
                }
                placeholder="Optional address"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeEditDialog}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => void submitEdit()}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(candidateToDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setCandidateToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete candidate account?</AlertDialogTitle>
            <AlertDialogDescription>
              {candidateToDelete
                ? `This will permanently remove ${candidateToDelete.name || candidateToDelete.email}.`
                : "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => void submitDelete()}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
