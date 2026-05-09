"use client";

import Link from "next/link";
import { MessageCircleMore } from "lucide-react";

import { Button } from "@/components/ui/button";


interface MessageCandidateButtonProps {
  candidateId: string;
  isLoggedIn?: boolean;
  userRole?: string | null;
}


export default function MessageCandidateButton({
  candidateId,
  isLoggedIn = false,
  userRole,
}: MessageCandidateButtonProps) {
  const normalizedRole = userRole?.toUpperCase();

  const href = !isLoggedIn
    ? `/login?redirect=${encodeURIComponent(`/dashboard/chat?candidateId=${candidateId}`)}`
    : normalizedRole === "ADMIN"
      ? `/admin/dashboard/messages?candidateId=${candidateId}`
      : normalizedRole === "RECRUITER"
        ? "/recruiter/dashboard/messages"
        : `/dashboard/chat?candidateId=${candidateId}`;

  const label =
    normalizedRole === "RECRUITER"
      ? "Open Messages"
      : normalizedRole === "ADMIN"
        ? "Open Message Desk"
        : "Message Candidate";

  return (
    <Button
      asChild
      variant="outline"
      className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white md:w-auto"
    >
      <Link href={href}>
        <MessageCircleMore className="mr-2 size-4" />
        {label}
      </Link>
    </Button>
  );
}
