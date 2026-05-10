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
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  type ICandidate,
  type IUpdateCandidatePayload,
  updateCandidateAction,
} from "@/src/services/candidate.service";

import { useServerDataTable } from "@/src/hooks/useServerDataTable";

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

const columns: ColumnDef<ICandidate>[] = [
  {
    accessorKey: "fullName",
    header: "Candidate",
    cell: ({ row }) => {
      const candidate = row.original;

      return (
        <div className="space-y-1">
          <p className="font-medium">
            {candidate.fullName || "Unnamed candidate"}
          </p>

          <p className="text-xs text-muted-foreground">
            ID: {candidate.userId ?? candidate.id}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) =>
      row.original.phone || (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
];

const filterConfigs: DataTableFilterConfig[] = [];

const buildEditFormState = (candidate?: ICandidate | null) => ({
  fullName: candidate?.fullName ?? "",
  email: candidate?.email ?? "",
  phone: candidate?.phone ?? "",
  address: candidate?.address ?? "",
});

export default function CandidateManageTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] =
    useState<DataTableFilterValues>({});

  const [editTarget, setEditTarget] = useState<ICandidate | null>(null);

  const [editForm, setEditForm] = useState(
    buildEditFormState()
  );

  const [candidateToDelete, setCandidateToDelete] =
    useState<ICandidate | null>(null);

  const {
    queryParams,
  } = useServerDataTable({
    defaultPageSize: 10,
  });

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["candidate-management-table", queryParams, searchTerm],
    queryFn: () =>
      getAllCandidates({
        page: queryParams.page,
        limit: queryParams.limit,
        sortBy: queryParams.sortBy,
        sortOrder: queryParams.sortOrder,
        searchTerm: searchTerm.trim() || undefined,
      }),

    staleTime: 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      candidateId,
      payload,
    }: {
      candidateId: string;
      payload: IUpdateCandidatePayload;
    }) => updateCandidateAction(candidateId, payload),

    onSuccess: async () => {
      toast.success("Candidate updated successfully.");
      await refetch();
    },

    onError: (mutationError) => {
      toast.error(
        getErrorMessage(
          mutationError,
          "Failed to update candidate."
        )
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (candidateId: string) =>
      deleteCandidateAction(candidateId),

    onSuccess: async () => {
      toast.success("Candidate deleted successfully.");
      await refetch();
    },

    onError: (mutationError) => {
      toast.error(
        getErrorMessage(
          mutationError,
          "Failed to delete candidate."
        )
      );
    },
  });

  const candidates = useMemo(
    () =>
      Array.isArray(data?.data)
        ? (data.data as ICandidate[])
        : [],
    [data]
  );

  const filteredCandidates = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return candidates.filter((candidate) => {
      const matchesSearch =
        !normalizedSearch ||
        [candidate.fullName, candidate.email]
          .filter(Boolean)
          .some((value) =>
            value!
              .toLowerCase()
              .includes(normalizedSearch)
          );

      return matchesSearch;
    });
  }, [candidates, searchTerm]);

  const isActionPending =
    updateMutation.isPending ||
    deleteMutation.isPending;

  const openEditDialog = (candidate: ICandidate) => {
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

        ...(editForm.phone?.trim()
          ? {
              phone: editForm.phone.trim(),
            }
          : {}),

        ...(editForm.address?.trim()
          ? {
              address: editForm.address.trim(),
            }
          : {}),
      },
    });

    closeEditDialog();
  };

  const submitDelete = async () => {
    if (!candidateToDelete) {
      return;
    }

    await deleteMutation.mutateAsync(
      candidateToDelete.id
    );

    setCandidateToDelete(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Candidate management</CardTitle>

          <CardDescription>
            Browse all candidate accounts with quick
            search, filters, sorting, and pagination.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {isError ? (
            <Alert variant="destructive">
              <AlertTitle>
                Could not load candidates
              </AlertTitle>

              <AlertDescription>
                {error instanceof Error
                  ? error.message
                  : "The candidate list is unavailable right now. Make sure the backend exposes GET /candidates."}
              </AlertDescription>
            </Alert>
          ) : null}

          <Table
            data={filteredCandidates}
            columns={columns}
            meta={data?.meta}
            isLoading={isLoading || isFetching}
            emptyMessage="No candidates match the current search or filters."
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
                  onClick: () =>
                    openEditDialog(candidate),
                  disabled: isActionPending,
                },
                {
                  label: "Delete",
                  onClick: () =>
                    setCandidateToDelete(candidate),
                  disabled: isActionPending,
                  destructive: true,
                },
              ],
            }}
            search={{
              initialValue: searchTerm,
              placeholder:
                "Search candidates by name or email...",
              onDebouncedChange: setSearchTerm,
            }}
            filters={{
              configs: filterConfigs,
              values: filterValues,

              onFilterChange: (
                filterId,
                value
              ) => {
                setFilterValues((current) => ({
                  ...current,
                  [filterId]: value,
                }));
              },

              onClearAll: () =>
                setFilterValues({}),
            }}
            toolbarAction={
              <Button
                type="button"
                variant="outline"
                onClick={() => void refetch()}
                disabled={
                  isLoading ||
                  isFetching ||
                  isActionPending
                }
              >
                <RefreshCw
                  className={`mr-2 size-4 ${
                    isFetching
                      ? "animate-spin"
                      : ""
                  }`}
                />

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
            <DialogTitle>
              Edit candidate
            </DialogTitle>

            <DialogDescription>
              {editTarget
                ? `Update profile information for ${
                    editTarget.fullName ||
                    editTarget.email
                  }.`
                : "Update candidate account details."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <div className="space-y-1.5">
              <p className="text-sm font-medium">
                Full name
              </p>

              <Input
                value={editForm.fullName}
                onChange={(event) =>
                  setEditForm((current) => ({
                    ...current,
                    fullName:
                      event.target.value,
                  }))
                }
                placeholder="Candidate full name"
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-sm font-medium">
                Email
              </p>

              <Input
                type="email"
                value={editForm.email}
                onChange={(event) =>
                  setEditForm((current) => ({
                    ...current,
                    email:
                      event.target.value,
                  }))
                }
                placeholder="candidate@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-sm font-medium">
                Phone
              </p>

              <Input
                value={editForm.phone}
                onChange={(event) =>
                  setEditForm((current) => ({
                    ...current,
                    phone:
                      event.target.value,
                  }))
                }
                placeholder="Optional phone number"
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-sm font-medium">
                Address
              </p>

              <Input
                value={editForm.address}
                onChange={(event) =>
                  setEditForm((current) => ({
                    ...current,
                    address:
                      event.target.value,
                  }))
                }
                placeholder="Optional address"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeEditDialog}
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={() =>
                void submitEdit()
              }
              disabled={
                updateMutation.isPending
              }
            >
              {updateMutation.isPending
                ? "Saving..."
                : "Save changes"}
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
            <AlertDialogTitle>
              Delete candidate account?
            </AlertDialogTitle>

            <AlertDialogDescription>
              {candidateToDelete
                ? `This will permanently remove ${
                    candidateToDelete.fullName ||
                    candidateToDelete.email
                  }.`
                : "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={
                deleteMutation.isPending
              }
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() =>
                void submitDelete()
              }
              disabled={
                deleteMutation.isPending
              }
            >
              {deleteMutation.isPending
                ? "Deleting..."
                : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}