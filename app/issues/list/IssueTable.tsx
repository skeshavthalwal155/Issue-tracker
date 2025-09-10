import { IssueStatusBadge } from "@/app/components"
import { Issues, Status } from "@/app/generated/prisma"
import { ArrowUpIcon } from "@radix-ui/react-icons"
import { Table } from "@radix-ui/themes"
import { default as Link, default as NextLink } from "next/link"

interface IssueQuery {
    status: Status,
    orderBy: keyof Issues,
    page: string
}

interface Props {
    searchParams: IssueQuery,
    issues: Issues[]
}

const IssueTable = async ({ searchParams, issues }: Props) => {
    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    {columns.map(column => <Table.ColumnHeaderCell key={column.value} className={column.className}>
                        <NextLink href={{
                            query: { ...searchParams, orderBy: column.value }
                        }}>
                            {column.label}
                        </NextLink>
                        {column.value === searchParams.orderBy && <ArrowUpIcon className="inline" />}
                    </Table.ColumnHeaderCell>)}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {issues.map(issue => (
                    <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Link href={`/issues/${issue.id}`}>
                                {issue.title}
                            </Link>
                            <div className='block md:hidden'>
                                <IssueStatusBadge status={issue.status} />
                            </div>
                        </Table.Cell>
                        <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
                        <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}

export default IssueTable

const columns: {
    label: string;
    value: keyof Issues;
    className?: string
}[] = [
        {
            label: 'Issue',
            value: 'title'
        },
        {
            label: 'Status',
            value: 'status',
            className: "hidden md:table-cell"
        },
        {
            label: 'Created',
            value: "createdAt",
            className: 'hidden md:table-cell'
        }
    ]

export const columnNames = columns.map(column => column.value)