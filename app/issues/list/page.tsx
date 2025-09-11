import Pagination from "@/app/components/Pagination"
import { Issues, Status } from '@/app/generated/prisma'
import prisma from '@/prisma/client'
import IssueActions from './IssueActions'
import IssueTable, { columnNames } from "./IssueTable"
import { Flex } from "@radix-ui/themes"
import { Metadata } from "next"

interface Props {
  searchParams: Promise<{ status: Status, orderBy: keyof Issues, page: string }>
}

const IssuePage = async ({ searchParams }: Props) => {
  const newParams = await searchParams


  const statuses = Object.values(Status)
  const status = statuses.includes(newParams.status)
    ? newParams.status
    : undefined

  const where = { status }

  const orderBy = columnNames
    .includes(newParams.orderBy)
    ? { [newParams.orderBy]: 'asc' }
    : undefined

  const page = parseInt((await searchParams).page) || 1;
  const pageSize = 10


  const issues = await prisma.issues.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  const issueCount = await prisma.issues.count({ where })

  return (
    <Flex direction={'column'} gap={'3'}>
      <IssueActions />
      <IssueTable searchParams={newParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  )
}

export const dynamic = 'force-dynamic'

export const metadata:Metadata={
  title:'Issue Tracker - Issue List',
  description: 'View all Project Issues'
}

export default IssuePage