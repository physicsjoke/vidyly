import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  // Videos
  const videos: any = [];
  for await (const videoId of [
    "2bf75b2f-b3cc-4432-bcb9-e4d4174e3b52", // daily
    "7bbdeb1f-b539-489e-9b05-06cf2946969b", // daily
    "3a3a354c-7cfe-4779-92d7-f7e9ca1876cc", // daily
    "0f6a6377-8609-4a61-a7e6-41a733bd27bb", // daily // [3]
    "0f6a6377-8609-4a61-a7e6-41a733bd27b1", // post // [4]
    "85b2d019-654c-44da-9dba-e8bd683efc31", // post 5
    "85b2d019-654c-44da-9dba-e8bd683efc32", // post 6
    "85b2d019-654c-44da-9dba-e8bd683efc33", // post7
    "441bd88b-86d4-4314-bf28-ee8e3fac739c", // post8
    "d24c4287-1e9e-4246-9938-f76d40bc3e2d", // common [9]
    "db44f48d-f6b5-40bd-b5ca-dc7c8f4dadb0", // common [10]
    "db44f48d-f6b5-40bd-b5ca-dc7c8f4dadb1", // common [11]
    "dc4826c6-34e4-45fc-ab8f-ef789da19f36", // common real sitting [12]
    "062a33ca-23ed-4d56-ad44-8aa0e98c488e", // common real standing [13]
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
      date: "2023/11/12",
      videoId: videos[2].uuid,
    },
    {
      title: "Fourth",
      timestamp: 1699891200,
      date: "2023/11/13",
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

  let tempChall;
  tempChall = await prisma.challenge.upsert({
    where: { videoId: videos[9].uuid },
    update: {},
    create: {
      title: "Starter",
      timestamp: 1699705050,
      date: "2023/11/11",
      videoId: videos[9].uuid,
    },
  });
  challenges.push(tempChall);
  tempChall = await prisma.challenge.upsert({
    where: { videoId: videos[10].uuid },
    update: {},
    create: {
      title: "Wiggly",
      timestamp: 1699708050,
      date: "2023/11/11",
      videoId: videos[10].uuid,
    },
  });
  challenges.push(tempChall);
  tempChall = await prisma.challenge.upsert({
    where: { videoId: videos[11].uuid },
    update: {},
    create: {
      title: "Energetic vibe",
      timestamp: 1699908050,
      date: "2023/11/12",
      videoId: videos[11].uuid,
    },
  });
  challenges.push(tempChall);
  tempChall = await prisma.challenge.upsert({
    where: { videoId: videos[12].uuid },
    update: {},
    create: {
      title: "Handyman",
      timestamp: 1699715334,
      date: "2023/11/11",
      videoId: videos[12].uuid,
    },
  });
  challenges.push(tempChall);
  tempChall = await prisma.challenge.upsert({
    where: { videoId: videos[13].uuid },
    update: {},
    create: {
      title: "Stick figure",
      timestamp: 1699727120,
      date: "2023/11/11",
      videoId: videos[13].uuid,
    },
  });
  challenges.push(tempChall);

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
  const user2 = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      email: "stick2@team",
      name: "Jemma",
    },
  });
  const user3 = await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      email: "stick3@team",
      name: "Stefanny",
    },
  });
  const user4 = await prisma.user.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      email: "stick24@team",
      name: "Katty",
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
      videoId: videos[4].uuid,
      reactions: 3,
    },
  });
  await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      timestamp: 1699653765,
      title: challenges[1].title,
      score: 78,
      authorId: user.id,
      challengeId: challenges[1].id,
      videoId: videos[5].uuid,
      reactions: 3,
    },
  });
  await prisma.post.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      timestamp: 1699656465,
      title: challenges[1].title,
      score: 96,
      authorId: user2.id,
      challengeId: challenges[1].id,
      videoId: videos[6].uuid,
      reactions: 78,
    },
  });
  await prisma.post.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      timestamp: 1699653495,
      title: challenges[1].title,
      score: 32,
      authorId: user3.id,
      challengeId: challenges[1].id,
      videoId: videos[7].uuid,
      reactions: 3,
    },
  });
  await prisma.post.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      timestamp: 1699673025,
      title: challenges[4].title,
      score: 88,
      authorId: user3.id,
      challengeId: challenges[4].id,
      videoId: videos[8].uuid,
      reactions: 5,
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
