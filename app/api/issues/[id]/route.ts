import authOptins from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props{
     params: Promise<{ id: string }>
}

export async function PATCH(request: NextRequest, { params }: Props) {

   const body = await request.json();

    const validation = patchIssueSchema.safeParse(body)

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    const { assignedToUserId, title, description } = body

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: body.assignedToUserId }
        })
        if (!user)
            return NextResponse.json({ error: 'Invalid User.' }, { status: 400 })
    }

    const issue = await prisma.issues.findUnique({
        where: { id: parseInt((await params).id) }
    });

    if (!issue)
        return NextResponse.json({ error: "Invalid Issue" }, { status: 404 })

    const updatedIssue = await prisma.issues.update({
        where: { id: issue.id },
        data: {
            title,
            description,
            assignedToUserId
        }
    })
    return NextResponse.json(updatedIssue)
}

export async function DELETE(request: NextRequest,
    { params }: Props ) {

    const session = await getServerSession(authOptins)
    if (!session)
        return NextResponse.json({}, { status: 401 })

    const issue = await prisma.issues.findUnique({
        where: { id: parseInt((await params).id) }
    })

    if (!issue)
        return NextResponse.json({ error: "Invalid Issue" }, { status: 404 })

    await prisma.issues.delete({
        where: { id: issue.id }
    })

    return NextResponse.json({});

}
