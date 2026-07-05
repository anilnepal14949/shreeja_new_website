import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import BlogsList from "@/components/BlogsList";

export const metadata: Metadata = {
  title: "Blogs & Insights | Shreeja Digital Agency",
  description: "Read the latest tips, guides, and trends on web development, mobile apps, and marketing.",
};

export default function BlogsPage() {
  return (
    <div className="w-full">
      <PageHeader
        subtitle="Insights & Guides"
        title="Our"
        highlightedTitle="Blog"
        description="Stay ahead with custom tutorials, industry insights, and agency strategies from our developers and designers."
      />
      <div className="w-full bg-shreeja-navy-dark pt-20">
        <BlogsList />
      </div>
    </div>
  );
}
