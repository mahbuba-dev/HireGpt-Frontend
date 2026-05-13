// Main landing page entry for the unique SaaS design

import Banner from "@/components/modules/HomePage/Banner";
import Footer from "@/components/modules/HomePage/Footer";
import HeroSection from "@/components/modules/HomePage/HeroSection";
import Navbar from "@/components/modules/HomePage/Navbar";
import PricingSection from "@/components/modules/HomePage/PricingSection";
import ProductShowcaseSection from "@/components/modules/HomePage/ProductShowcaseSection";
import SectionTransition from "@/components/modules/HomePage/SectionTransition";
import SocialProofSection from "@/components/modules/HomePage/SocialProofSection";
import TestimonialSection from "@/components/modules/HomePage/TestimonialSection";
import WhyUsSection from "@/components/modules/HomePage/WhyUsSection";



export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-linear-to-br from-[#0f1123] via-[#1a1c2c] to-[#181b2e] text-white overflow-x-hidden">
      {/* Ambient noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 mix-blend-soft-light opacity-60">
        <div className="w-full h-full bg-[url('/ambient/noise.png')] bg-repeat" />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar/>
        {/* <HeroSection /> */}
        <Banner/>
        <SocialProofSection />
        <SectionTransition/>
        <ProductShowcaseSection />
        <WhyUsSection />
        <TestimonialSection />
        <div className="[margin-bottom:0!important] [padding-bottom:0!important]">
          <PricingSection/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
