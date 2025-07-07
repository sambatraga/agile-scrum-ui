import { PlaceholderPage } from "@/components/PlaceholderPage";
import { BookOpen } from "lucide-react";

export default function ProductBacklog() {
  return (
    <PlaceholderPage
      title="Product Backlog"
      description="Manage user stories with kanban-style boards, priorities, and story points."
      icon={BookOpen}
    />
  );
}
