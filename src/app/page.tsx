import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import VideoHero from "@/components/VideoHero";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

// Lazy load below-the-fold components for better initial load performance
const Tour = dynamic(() => import("@/components/Tour"), {
  loading: () => <SectionSkeleton />,
});

const Stats = dynamic(() => import("@/components/Stats"), {
  loading: () => <SectionSkeleton height="small" />,
});

const Music = dynamic(() => import("@/components/Music"), {
  loading: () => <SectionSkeleton />,
});

const Documentary = dynamic(() => import("@/components/Documentary"), {
  loading: () => <SectionSkeleton />,
});

const Videos = dynamic(() => import("@/components/Videos"), {
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
function SectionSkeleton({ height = "normal" }: { height?: "small" | "normal" }) {
  return (
    <div className={`${height === "small" ? "py-12" : "py-24 lg:py-32"} px-6 lg:px-16`}>
      <div className="animate-pulse">
        <div className="h-8 bg-gray-dark rounded w-48 mb-8 mx-auto" />
        <div className={`${height === "small" ? "h-24" : "h-64"} bg-gray-dark rounded`} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero - Can pass videoSrc and posterSrc for video background */}
      <VideoHero />

      <Marquee />

      <Tour />
      <Stats />
      <Music />
      <Documentary />
      <Videos />
      <Store />
      <Photos />
      <About />
      <Connect />

      <Footer />
    </main>
  );
}
