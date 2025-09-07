'use client'

import { Status } from '@/app/generated/prisma'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

const statuses: { id: number, label: string, value?: Status }[] = [
    { id: 1, label: "All" },
    { id: 2, label: "Open", value: 'OPEN' },
    { id: 3, label: "In Progress", value: 'IN_PROGRESS' },
    { id: 4, label: "Closed", value: "CLOSED" }
]

const IssueStateFilter = () => {
    const router= useRouter()

    return (
        <Select.Root onValueChange={(status)=>{
            const query = status!=='all' ? `?status=${status}` : ''
            router.push('/issues/list' + query)
        } }>
            <Select.Trigger placeholder='Filter By Status...' />
            <Select.Content>
                {statuses.map(status => (
                    <Select.Item key={status.id} value={status.value || 'all'}>
                        {status.label}
                    </Select.Item>
                ))}

            </Select.Content>
        </Select.Root>
    )
}

export default IssueStateFilter