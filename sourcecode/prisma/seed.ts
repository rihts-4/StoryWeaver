import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.vote.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.storyFollow.deleteMany()
  await prisma.decisionOption.deleteMany()
  await prisma.decisionPoint.deleteMany()
  await prisma.chapter.deleteMany()
  await prisma.story.deleteMany()
  await prisma.user.deleteMany()

  // Create Users
  const alex = await prisma.user.create({
    data: {
      email: 'alex@email.com',
      username: 'alex_writer',
      displayName: 'Alex Morgan',
      bio: 'Sci-fi enthusiast and aspiring novelist',
      isAuthor: true,
    },
  })

  const sarah = await prisma.user.create({
    data: {
      email: 'sarah@email.com',
      username: 'sarahreads',
      displayName: 'Sarah Chen',
      bio: 'Book lover and fantasy fan',
      isAuthor: false,
    },
  })

  const mike = await prisma.user.create({
    data: {
      email: 'mike@email.com',
      username: 'mikethereader',
      displayName: 'Mike Johnson',
      bio: 'Mystery and thriller enthusiast',
      isAuthor: false,
    },
  })

  const emma = await prisma.user.create({
    data: {
      email: 'emma@email.com',
      username: 'emmawrites',
      displayName: 'Emma Rodriguez',
      bio: 'Romance writer with a twist',
      isAuthor: true,
    },
  })

  // Create Stories
  const colonyStory = await prisma.story.create({
    data: {
      authorId: alex.id,
      title: 'The Last Colony Ship',
      description: 'Humanity\'s final hope drifts through space. Every decision could mean survival or extinction.',
      genre: 'Science Fiction',
      status: 'ACTIVE',
      totalChapters: 3,
    },
  })

  const romanceStory = await prisma.story.create({
    data: {
      authorId: emma.id,
      title: 'Hearts in the Highlands',
      description: 'A romance that spans centuries in the Scottish Highlands. Readers choose the fate of star-crossed lovers.',
      genre: 'Romance',
      status: 'ACTIVE',
      totalChapters: 2,
    },
  })

  // Create Chapters
  const chapter1 = await prisma.chapter.create({
    data: {
      storyId: colonyStory.id,
      chapterNumber: 1,
      title: 'Awakening',
      content: 'Captain Maya Chen awakens from cryo-sleep to red warning lights flooding the bridge. The ship\'s AI, ARIA, greets her with disturbing news: "Captain, we have a problem. Our fuel reserves are critically low, and I\'ve detected three potentially habitable planets within range. However, each choice comes with significant risks..." Maya stares at the star map, knowing that her next decision will determine the fate of the 50,000 sleeping colonists aboard the Esperanza.',
      viewCount: 1250,
    },
  })

  const chapter2 = await prisma.chapter.create({
    data: {
      storyId: colonyStory.id,
      chapterNumber: 2,
      title: 'The Choice',
      content: 'After intense deliberation, Maya chooses Planet Kepler-442c. The landing is rough but successful. As the colonists begin to wake and explore their new world, they discover they\'re not alone. Strange structures dot the landscape, and energy readings suggest an advanced civilization once thrived here. Now Maya faces another crucial decision that could determine humanity\'s future on this alien world.',
      viewCount: 980,
    },
  })

  const chapter3 = await prisma.chapter.create({
    data: {
      storyId: romanceStory.id,
      chapterNumber: 1,
      title: 'The Prophecy',
      content: 'In 1745, Isla MacLeod receives a mysterious pendant from her dying grandmother. "This will show you your true love across time," the elder whispers. When Isla touches the pendant, she\'s suddenly transported to 2024, where she meets Dr. James Mitchell, a historian researching her very clan. The pendant glows, but James is engaged to another. Isla must decide whether to reveal her true identity or return to her own time.',
      viewCount: 756,
    },
  })

  // Create Decision Points
  const decision1 = await prisma.decisionPoint.create({
    data: {
      chapterId: chapter2.id,
      question: 'Maya discovers the alien structures contain advanced technology. What should she do?',
      closesAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      isActive: true,
    },
  })

  const decision2 = await prisma.decisionPoint.create({
    data: {
      chapterId: chapter3.id,
      question: 'Isla has revealed her time-traveling secret to James. How should he react?',
      closesAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      isActive: true,
    },
  })

  // Create Decision Options
  const option1 = await prisma.decisionOption.create({
    data: {
      decisionPointId: decision1.id,
      optionText: 'Study the technology carefully before making contact',
      voteCount: 45,
    },
  })

  const option2 = await prisma.decisionOption.create({
    data: {
      decisionPointId: decision1.id,
      optionText: 'Immediately attempt to activate the alien technology',
      voteCount: 23,
    },
  })

  const option3 = await prisma.decisionOption.create({
    data: {
      decisionPointId: decision1.id,
      optionText: 'Avoid the structures and establish the colony elsewhere',
      voteCount: 67,
    },
  })

  const option4 = await prisma.decisionOption.create({
    data: {
      decisionPointId: decision2.id,
      optionText: 'James believes her immediately and breaks his engagement',
      voteCount: 34,
    },
  })

  const option5 = await prisma.decisionOption.create({
    data: {
      decisionPointId: decision2.id,
      optionText: 'James thinks she\'s delusional and calls for help',
      voteCount: 12,
    },
  })

  const option6 = await prisma.decisionOption.create({
    data: {
      decisionPointId: decision2.id,
      optionText: 'James is skeptical but agrees to help her prove her story',
      voteCount: 89,
    },
  })

  // Create Sample Votes
  await prisma.vote.create({
    data: {
      userId: sarah.id,
      decisionPointId: decision1.id,
      optionId: option3.id,
    },
  })

  await prisma.vote.create({
    data: {
      userId: mike.id,
      decisionPointId: decision2.id,
      optionId: option6.id,
    },
  })

  // Create Story Follows
  await prisma.storyFollow.create({
    data: {
      userId: sarah.id,
      storyId: colonyStory.id,
    },
  })

  await prisma.storyFollow.create({
    data: {
      userId: mike.id,
      storyId: romanceStory.id,
    },
  })

  // Create Comments
  await prisma.comment.create({
    data: {
      userId: sarah.id,
      chapterId: chapter1.id,
      content: 'This is such a compelling start! I love how you\'ve set up the impossible choice.',
    },
  })

  await prisma.comment.create({
    data: {
      userId: mike.id,
      chapterId: chapter3.id,
      content: 'The time travel element is brilliant! Can\'t wait to see how this unfolds.',
    },
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })