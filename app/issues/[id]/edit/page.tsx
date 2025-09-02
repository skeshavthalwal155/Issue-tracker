import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    // ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)

interface Props {
  params: Promise<{ id: string }>
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params

  const issue = await prisma.issues.findUnique({
    where: { id: parseInt(id) }
  })

  if (!issue) notFound()

  return (
    <IssueForm issue={issue} />
  )
}

export default EditIssuePage