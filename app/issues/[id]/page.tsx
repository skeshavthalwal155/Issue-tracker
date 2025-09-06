import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptins from '@/app/auth/authOptions'

interface Props {
    params: Promise<{ id: string }>
}

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptins)
    

    const { id } = await params

    const issue = await prisma.issues.findUnique({
        where: { id: parseInt(id) }
    })

    if (!issue)
        notFound();

    return (
        <Grid columns={{ initial: '1', sm: "5" }} gap={"5"}>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {session && <Box>
                <Flex direction={'column'} gap={'4'}>
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>}
        </Grid>
    )
}

export default IssueDetailPage