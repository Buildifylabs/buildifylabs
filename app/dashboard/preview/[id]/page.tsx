import { PagePreview } from "@/components/page-preview"

interface PreviewPageProps {
  params: {
    id: string
  }
}

export default function PreviewPage({ params }: PreviewPageProps) {
  return <PagePreview pageId={params.id} />
}
