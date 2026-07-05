import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio | Shreeja Digital Agency",
  description: "Browse our case studies of web applications, mobile app development, and branding work.",
};

export default function PortfolioPage() {
  return (
    <div className="w-full">
      <PageHeader
        subtitle="Our Work"
        title="Selected"
        highlightedTitle="Projects"
        description="Discover how we help brands transform their digital vision into high-performance web products, mobile apps, and cohesive visual identities."
      />
      <div className="w-full bg-shreeja-navy-dark pt-20">
        <PortfolioGrid />
      </div>
    </div>
  );
}
