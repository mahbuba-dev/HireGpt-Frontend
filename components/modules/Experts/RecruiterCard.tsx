import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { IRecruiter } from "@/src/types/recruiter.types";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function RecruiterCard({ recruiter }: { recruiter: IRecruiter }) {
  return (
    <Card className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow transition duration-300 hover:-translate-y-1 hover:border-blue-400 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/20 dark:hover:border-blue-400/40">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-center gap-3">
          <Avatar size="default" className="size-12 border-2 border-blue-100 ring-2 ring-blue-50 dark:border-white/15 dark:ring-white/10">
            <AvatarImage src={recruiter.profilePhoto || undefined} alt={recruiter.fullName} />
            <AvatarFallback>{getInitials(recruiter.fullName)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 space-y-0.5">
            <h3 className="line-clamp-1 flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground">
              {recruiter.fullName}
            </h3>
            <p className="line-clamp-1 text-sm text-muted-foreground">{recruiter.title}</p>
            {recruiter.jobCategory?.name ? (
              <p className="line-clamp-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                {recruiter.jobCategory.name}
              </p>
            ) : null}
          </div>
        </div>
        <p className="line-clamp-3 min-h-[3.5rem] text-sm leading-6 text-slate-600 dark:text-slate-300">{recruiter.bio}</p>
        <div className="mt-auto flex gap-2">
          <Button asChild size="sm" className="h-9 w-full bg-blue-600 text-xs text-white hover:bg-blue-700">
            <Link href={`/recruiters/${recruiter.id}`}>View profile</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
