
import PageCreatorDashboard from "./page.client";

// Add this line to disable static rendering
export const dynamic = "force-dynamic";

export default function CreatePage() {
  return <PageCreatorDashboard />;
}