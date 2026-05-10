// Main HomePage component export for Next.js App Router

import Banner from "@/components/modules/HomePage/Banner";
import ContentSuggestions from "@/components/modules/HomePage/ContentSuggestions";
import HomeCTASection from "@/components/modules/HomePage/HomeCTASection";
import HomeSection2 from "@/components/modules/HomePage/HomeSection2";
import HomeSection3 from "@/components/modules/HomePage/HomeSection3";
import IndustryTicker from "@/components/modules/HomePage/IndustryTicker";
import PremiumGlassBackground from "@/components/modules/HomePage/PremiumGlassBackground";
import ReviewModal from "@/components/modules/HomePage/ReviewModal";
import SmartNewsletter from "@/components/modules/HomePage/SmartNewsletter";

import type { PremiumGlassIntensity } from "@/components/modules/HomePage/PremiumGlassBackground";
import type { ITestimonial } from "@/src/types/testimonial.types";

import { getJobCategories } from "@/src/services/industry.services";
import { getTestimonials } from "@/src/services/job.services";

type HomeLayoutVariant = "compact" | "editorial" | "immersive";

const HOME_LAYOUT_VARIANT: HomeLayoutVariant = "editorial";

const HOME_LAYOUT_PRESETS: Record<
  HomeLayoutVariant,
  {
    backgroundIntensity: PremiumGlassIntensity;
    stackClass: string;
    surfaceClass: string;
  }
> = {
  compact: {
    backgroundIntensity: "calm",
    stackClass:
      "mt-7 scroll-mt-24 space-y-5 md:mt-10 md:space-y-7 lg:mt-12 lg:space-y-8",
    surfaceClass:
      "[--ce-shell-radius:0rem] [--ce-shell-radius-md:0rem] [--ce-shell-radius-dark:0rem] [--ce-shell-shadow-soft:0_12px_28px_-24px_rgba(15,23,42,0.2)] [--ce-shell-shadow-strong:0_18px_40px_-30px_rgba(15,23,42,0.24)]",
  },

  editorial: {
    backgroundIntensity: "balanced",
    stackClass:
      "mt-7 scroll-mt-24 space-y-5 md:mt-10 md:space-y-7 lg:mt-12 lg:space-y-8",
    surfaceClass:
      "[--ce-shell-radius:0rem] [--ce-shell-radius-md:0rem] [--ce-shell-radius-dark:0rem] [--ce-shell-shadow-soft:0_20px_44px_-32px_rgba(15,23,42,0.24)] [--ce-shell-shadow-strong:0_28px_62px_-38px_rgba(15,23,42,0.3)]",
  },

  immersive: {
    backgroundIntensity: "rich",
    stackClass:
      "mt-12 scroll-mt-24 space-y-10 md:mt-16 md:space-y-12 lg:mt-20 lg:space-y-15",
    surfaceClass:
      "[--ce-shell-radius:0rem] [--ce-shell-radius-md:0rem] [--ce-shell-radius-dark:0rem] [--ce-shell-shadow-soft:0_30px_68px_-38px_rgba(15,23,42,0.31)] [--ce-shell-shadow-strong:0_42px_96px_-48px_rgba(15,23,42,0.4)]",
  },
};

export default async function HomePage() {
  // Fetch industries and testimonials for homepage modules
  const [industries, testimonialsRaw] = await Promise.all([
    getJobCategories(),
    getTestimonials(),
  ]);


  // Debug: log the raw testimonials
  console.log("testimonialsRaw", testimonialsRaw);

  // Map Testimonial (API) to ITestimonial (UI) with robust comment/content handling
  function toITestimonial(t: any): ITestimonial {
    return {
      id: t.id,
      rating: t.rating,
      comment: t.comment ?? t.content ?? null,

      candidateId: t.userRole === "CANDIDATE" ? t.userId : "",
      recruiterId: t.userRole === "RECRUITER" ? t.userId : "",

      reviewerName: t.user?.name ?? null,
      reviewerImage: t.user?.profilePhoto ?? null,

      interviewId: "",

      createdAt: t.createdAt,
      updatedAt: t.updatedAt,

      isHidden: false,
      status: "APPROVED",

      recruiterReply: null,
      repliedAt: undefined,
      moderationStatus: undefined,

      candidate: undefined,
      recruiter: undefined,
      interview: undefined,
    };
  }

  const testimonials: ITestimonial[] = testimonialsRaw.map(toITestimonial);

  const preset = HOME_LAYOUT_PRESETS[HOME_LAYOUT_VARIANT];

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <ReviewModal />

      <PremiumGlassBackground
        intensity={preset.backgroundIntensity}
      />

      <div className={preset.stackClass}>
        <Banner />

        <HomeCTASection />

        <IndustryTicker industries={industries} />

        <HomeSection2 testimonials={testimonials} />

        <HomeSection3 />

        <ContentSuggestions industries={industries} />

        <SmartNewsletter industries={industries} />
      </div>
    </main>
  );
}