import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import VideoHero from "@/components/VideoHero";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

// Lazy load below-the-fold components for better initial load performance
const Tour = dynamic(() => import("@/components/Tour"), {
  loading: () => <SectionSkeleton />,
});

const Music = dynamic(() => import("@/components/Music"), {
  loading: () => <SectionSkeleton />,
});

const Store = dynamic(() => import("@/components/Store"), {
  loading: () => <SectionSkeleton />,
});

const Photos = dynamic(() => import("@/components/Photos"), {
  loading: () => <SectionSkeleton />,
});

const About = dynamic(() => import("@/components/About"), {
  loading: () => <SectionSkeleton />,
});

const Connect = dynamic(() => import("@/components/Connect"), {
  loading: () => <SectionSkeleton />,
});

// Lightweight loading skeleton
function SectionSkeleton() {
  return (
    <div className="py-24 lg:py-32 px-6 lg:px-16">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-dark rounded w-48 mb-8" />
        <div className="h-64 bg-gray-dark rounded" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero - Can pass videoSrc and posterSrc for video background */}
      {/* Example: videoSrc="/videos/hero-bg.mp4" posterSrc="/images/hero-poster.jpg" */}
      <VideoHero />

      <Marquee />

      <Tour />
      <Music />
      <Store />
      <Photos />
      <About />
      <Connect />

      <Footer />
    </main>
  );
}
