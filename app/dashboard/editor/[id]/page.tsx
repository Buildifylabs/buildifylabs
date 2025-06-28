import { PageEditor } from "@/components/page-editor"

interface EditorPageProps {
  params: {
    id: string
  }
}

export default function EditorPage({ params }: EditorPageProps) {
  return <PageEditor pageId={params.id} />
}
