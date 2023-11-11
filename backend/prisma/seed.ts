import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  // Videos
  const videos: any = [];
  for await (const videoId of [
    "2bf75b2f-b3cc-4432-bcb9-e4d4174e3b52", // daily
    "7bbdeb1f-b539-489e-9b05-06cf2946969b", // daily
    "3a3a354c-7cfe-4779-92d7-f7e9ca1876cc", // daily
    "0f6a6377-8609-4a61-a7e6-41a733bd27bb", // daily
    "0f6a6377-8609-4a61-a7e6-41a733bd27b1", // common
    "85b2d019-654c-44da-9dba-e8bd683efc33", // first post
    "441bd88b-86d4-4314-bf28-ee8e3fac739c", // common
    "d24c4287-1e9e-4246-9938-f76d40bc3e2d", // common
    "db44f48d-f6b5-40bd-b5ca-dc7c8f4dadb0", // common
  ]) {
    const video = await prisma.video.upsert({
      where: { uuid: videoId },
      update: {},
      create: {
        uuid: videoId,
        path: `/media/${videoId}.mp4`,
      },
    });
    videos.push(video);
  }
  // Challenges
  const challenges: any = [];
  for await (const challenge of [
    {
      title: "First",
      timestamp: 1699635600,
      date: "2023/11/10",
      videoId: videos[0].uuid,
    },
    {
      title: "Second",
      timestamp: 1699711200,
      date: "2023/11/11",
      videoId: videos[1].uuid,
    },
    {
      title: "Third",
      timestamp: 1699783200,
      date: "2023/11/10",
      videoId: videos[2].uuid,
    },
    {
      title: "Fourht",
      timestamp: 1699891200,
      date: "2023/11/10",
      videoId: videos[3].uuid,
    },
  ]) {
    const item = await prisma.challenge.upsert({
      where: { videoId: challenge.videoId },
      update: {},
      create: {
        ...challenge,
        type: "DAILY",
      },
    });
    challenges.push(item);
  }
  await prisma.challenge.upsert({
    where: { videoId: videos[4].uuid },
    update: {},
    create: {
      title: "Fourht",
      timestamp: 1699635600,
      date: "2023/11/10",
      videoId: videos[4].uuid,
    },
  });
  await prisma.challenge.upsert({
    where: { videoId: videos[6].uuid },
    update: {},
    create: {
      title: "Wiggly",
      timestamp: 1699705050,
      date: "2023/11/11",
      videoId: videos[6].uuid,
    },
  });
  await prisma.challenge.upsert({
    where: { videoId: videos[7].uuid },
    update: {},
    create: {
      title: "Energetic vibe",
      timestamp: 1699705080,
      date: "2023/11/11",
      videoId: videos[7].uuid,
    },
  });
  await prisma.challenge.upsert({
    where: { videoId: videos[8].uuid },
    update: {},
    create: {
      title: "Balance",
      timestamp: 1699705090,
      date: "2023/11/11",
      videoId: videos[8].uuid,
    },
  });
  // Users
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: "stick@team",
      name: "StickTeam",
    },
  });
  // Posts
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      timestamp: 1699653465,
      title: challenges[0].title,
      score: 99,
      authorId: user.id,
      challengeId: challenges[0].id,
      videoId: videos[5].uuid,
      reactions: 3,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
