import Hero from '@/components/home/Hero';
import StatsSection from '@/components/home/StatsSection';
import AnnouncementsPreview from '@/components/home/AnnouncementsPreview';
import HowItWorks from '@/components/home/HowItWorks';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <AnnouncementsPreview />
      <HowItWorks />
    </>
  );
}
