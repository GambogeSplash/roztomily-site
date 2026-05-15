import { Hero } from "@/components/blocks/Hero";
import { TrustedBy } from "@/components/blocks/TrustedBy";
import { ServicesGrid } from "@/components/blocks/ServicesGrid";
import { NewsRow } from "@/components/blocks/NewsRow";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ServicesGrid />
      <NewsRow />
    </>
  );
}
