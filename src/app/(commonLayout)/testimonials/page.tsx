import TestimonialsDirectory from "@/components/modules/HomePage/TestimonialsDirectory";
import { getTestimonials } from "@/src/services/job.services";
import type { ITestimonial } from "@/src/types/testimonial.types";

export const metadata = {
  title: "Testimonials | ConsultEdge",
  description:
    "Read verified client experiences from professionals and businesses who booked expert consultations on ConsultEdge.",
};

const fallbackTestimonials: ITestimonial[] = [
  {
    id: "fallback-1",
    rating: 5,
    comment: "ConsultEdge helped us de-risk a key hiring decision in one session.",
    candidateId: "",
    recruiterId: "",
    interviewId: "",
    createdAt: new Date().toISOString(),
    candidate: { fullName: "Operations Lead" },
    recruiter: { fullName: "Hiring Strategy Expert" },
  },
  {
    id: "fallback-2",
    rating: 5,
    comment: "Premium experience from discovery to booking. The advice was immediately actionable.",
    candidateId: "",
    recruiterId: "",
    interviewId: "",
    createdAt: new Date().toISOString(),
    candidate: { fullName: "Startup Founder" },
    recruiter: { fullName: "Growth Consultant" },
  },
  {
    id: "fallback-3",
    rating: 4,
    comment: "Clean dashboard, fast scheduling, and high-quality experts. Highly recommended.",
    candidateId: "",
    recruiterId: "",
    interviewId: "",
    createdAt: new Date().toISOString(),
    candidate: { fullName: "Team Manager" },
    recruiter: { fullName: "Business Advisor" },
  },
  {
    id: "fallback-4",
    rating: 5,
    comment: "I got clear direction in one call and avoided weeks of trial-and-error.",
    candidateId: "",
    recruiterId: "",
    interviewId: "",
    createdAt: new Date().toISOString(),
    candidate: { fullName: "Operations Manager" },
    recruiter: { fullName: "Execution Strategy Expert" },
  },
];

function mapTestimonialToITestimonial(t: any): ITestimonial {
  return {
    id: t.id,
    rating: t.rating,
    comment: t.content || t.comment || "",
    candidateId: t.userRole === "CANDIDATE" ? t.userId : "",
    recruiterId: t.userRole === "RECRUITER" ? t.userId : "",
    interviewId: t.interviewId || "",
    createdAt: t.createdAt,
    updatedAt: t.updatedAt || "",
    candidate: t.userRole === "CANDIDATE" ? { fullName: t.user?.name } : undefined,
    recruiter: t.userRole === "RECRUITER" ? { fullName: t.user?.name } : undefined,
  };
}

export default async function TestimonialsPage() {
  const data = await getTestimonials().catch(() => []);
  const testimonials: ITestimonial[] = Array.isArray(data) && data.length > 0
    ? data.map(mapTestimonialToITestimonial)
    : fallbackTestimonials;

  return (
    <main className="relative overflow-hidden pb-16 pt-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-160 bg-[radial-gradient(circle_at_12%_16%,rgba(37,99,235,0.18),transparent_40%),radial-gradient(circle_at_86%_18%,rgba(34,211,238,0.18),transparent_36%)]"
      />

      <TestimonialsDirectory testimonials={testimonials} />
    </main>
  );
}
