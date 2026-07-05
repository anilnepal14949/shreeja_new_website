import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import BootcampDetail from "@/components/BootcampDetail";

export const metadata: Metadata = {
  title: "IT Bootcamp | Shreeja Digital Agency",
  description: "Join our coding bootcamp to gain hands-on experience, build real-world products, and advance your engineering career.",
};

export default function BootcampPage() {
  return (
    <div className="w-full">
      <PageHeader
        subtitle="Learn & Grow"
        title="Shreeja IT"
        highlightedTitle="Bootcamp"
        description="Launch your career in software engineering. Learn directly from working developers, build a premium production portfolio, and prepare for placement opportunities in Australia and Nepal."
      />
      <div className="w-full bg-shreeja-navy-dark pt-20">
        <BootcampDetail />
      </div>
    </div>
  );
}
