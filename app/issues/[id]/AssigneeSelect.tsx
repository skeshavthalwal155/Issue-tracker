'use client'

import { Issues, User } from '@/app/generated/prisma'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Skeleton } from '@/app/components'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issues }) => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000, //60s
        retry: 3
    });

    if (isLoading) return <Skeleton />

    if (error) return null


    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || 'null'}
                onValueChange={(userId) => {
                    axios
                        .patch('/api/issues/' + issue.id, {
                            assignedToUserId: userId === 'null' ? null : userId
                        })
                        .catch(() => {
                            toast.error("Changes Could not be saved.")
                        })
                }}>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value={"null"}>Unassigned</Select.Item>
                        {users?.map(user => (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

export default AssigneeSelect