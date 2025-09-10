import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const open = await prisma.issues.count({where:{status:'OPEN'}})
  const inProgress = await prisma.issues.count({where:{status:'IN_PROGRESS'}})
  const closed = await prisma.issues.count({where:{status:'CLOSED'}})
  return (
     <IssueSummary open={open} inProgress={inProgress} closed={closed}/>
  )
}
