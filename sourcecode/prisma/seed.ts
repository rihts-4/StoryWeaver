// Enhanced StoryWeaver Seed Data with 50+ datapoints each

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

  // Create 50+ Users
  const users = []
  
  // Main authors
  const authorData = [
    { email: 'alex@email.com', username: 'alex_writer', displayName: 'Alex Morgan', bio: 'Sci-fi enthusiast and aspiring novelist', isAuthor: true },
    { email: 'emma@email.com', username: 'emmawrites', displayName: 'Emma Rodriguez', bio: 'Romance writer with a twist', isAuthor: true },
    { email: 'jason@email.com', username: 'jason_mystery', displayName: 'Jason Blake', bio: 'Master of suspense and mystery', isAuthor: true },
    { email: 'luna@email.com', username: 'luna_fantasy', displayName: 'Luna Silverwood', bio: 'Fantasy world builder extraordinaire', isAuthor: true },
    { email: 'marcus@email.com', username: 'marcus_thriller', displayName: 'Marcus Stone', bio: 'Psychological thriller specialist', isAuthor: true },
    { email: 'zoe@email.com', username: 'zoe_adventure', displayName: 'Zoe Chen', bio: 'Adventure and exploration stories', isAuthor: true },
    { email: 'david@email.com', username: 'david_horror', displayName: 'David Blackwood', bio: 'Horror that keeps you awake', isAuthor: true },
    { email: 'sophia@email.com', username: 'sophia_drama', displayName: 'Sophia Martinez', bio: 'Human drama and relationships', isAuthor: true },
  ]

  for (const author of authorData) {
    const user = await prisma.user.create({ data: author })
    users.push(user)
  }

  // Regular readers
  const readerData = [
    { email: 'sarah@email.com', username: 'sarahreads', displayName: 'Sarah Chen', bio: 'Book lover and fantasy fan', isAuthor: false },
    { email: 'mike@email.com', username: 'mikethereader', displayName: 'Mike Johnson', bio: 'Mystery and thriller enthusiast', isAuthor: false },
    { email: 'nina@email.com', username: 'ninareads', displayName: 'Nina Patel', bio: 'Romance novels are my guilty pleasure', isAuthor: false },
    { email: 'carlos@email.com', username: 'carlos_bookworm', displayName: 'Carlos Mendez', bio: 'Sci-fi and fantasy devotee', isAuthor: false },
    { email: 'lily@email.com', username: 'lily_pages', displayName: 'Lily Thompson', bio: 'Always looking for the next great story', isAuthor: false },
    { email: 'ravi@email.com', username: 'ravi_reader', displayName: 'Ravi Kumar', bio: 'Adventure stories and mysteries', isAuthor: false },
    { email: 'grace@email.com', username: 'grace_books', displayName: 'Grace Wilson', bio: 'Horror and thriller fanatic', isAuthor: false },
    { email: 'tom@email.com', username: 'tom_stories', displayName: 'Tom Anderson', bio: 'Interactive fiction enthusiast', isAuthor: false },
    { email: 'marie@email.com', username: 'marie_fiction', displayName: 'Marie Dubois', bio: 'Character-driven stories are my favorite', isAuthor: false },
    { email: 'kevin@email.com', username: 'kevin_novels', displayName: 'Kevin O\'Brien', bio: 'Enjoying stories that make me think', isAuthor: false },
  ]

  // Add 40+ more diverse readers
  const additionalReaders = Array.from({ length: 42 }, (_, i) => ({
    email: `reader${i + 1}@email.com`,
    username: `reader_${i + 1}`,
    displayName: `Reader ${i + 1}`,
    bio: `Story enthusiast #${i + 1}`,
    isAuthor: false
  }))

  for (const reader of [...readerData, ...additionalReaders]) {
    const user = await prisma.user.create({ data: reader })
    users.push(user)
  }

  console.log(`Created ${users.length} users`)

  // Create 15+ Stories with diverse genres
  const stories = []
  const storyData = [
    {
      title: 'The Last Colony Ship',
      description: 'Humanity\'s final hope drifts through space. Every decision could mean survival or extinction.',
      genre: 'Science Fiction',
      authorIndex: 0, // Alex
      chapterCount: 8
    },
    {
      title: 'Hearts in the Highlands',
      description: 'A romance that spans centuries in the Scottish Highlands. Readers choose the fate of star-crossed lovers.',
      genre: 'Romance',
      authorIndex: 1, // Emma
      chapterCount: 6
    },
    {
      title: 'The Midnight Detective',
      description: 'Detective Sarah Cross investigates murders that happen only at midnight. Each clue leads to impossible choices.',
      genre: 'Mystery',
      authorIndex: 2, // Jason
      chapterCount: 10
    },
    {
      title: 'The Dragon\'s Crown',
      description: 'In a realm where dragons rule, a young mage must choose between power and compassion.',
      genre: 'Fantasy',
      authorIndex: 3, // Luna
      chapterCount: 12
    },
    {
      title: 'The Memory Thief',
      description: 'Dr. Elena Vasquez can steal memories, but each theft costs her own sanity.',
      genre: 'Psychological Thriller',
      authorIndex: 4, // Marcus
      chapterCount: 7
    },
    {
      title: 'Lost in the Amazon',
      description: 'Explorer team discovers an ancient civilization. Their choices determine if they survive to tell the tale.',
      genre: 'Adventure',
      authorIndex: 5, // Zoe
      chapterCount: 9
    },
    {
      title: 'The House on Elm Street',
      description: 'Every family that moves in disappears. You\'re the newest residents, and choices matter.',
      genre: 'Horror',
      authorIndex: 6, // David
      chapterCount: 5
    },
    {
      title: 'Second Chances',
      description: 'After a car accident, Jennifer gets a second chance at life. But every choice creates ripples.',
      genre: 'Drama',
      authorIndex: 7, // Sophia
      chapterCount: 8
    },
    {
      title: 'Cyber Rebellion',
      description: 'In 2087, AI has taken over. A group of hackers plan the ultimate rebellion.',
      genre: 'Cyberpunk',
      authorIndex: 0, // Alex
      chapterCount: 6
    },
    {
      title: 'The Pirate\'s Daughter',
      description: 'Captain Isabella must choose between love and the freedom of the seas.',
      genre: 'Historical Romance',
      authorIndex: 1, // Emma
      chapterCount: 7
    },
    {
      title: 'The Quantum Paradox',
      description: 'Physicist Dr. Chen discovers parallel universes. Each decision splits reality.',
      genre: 'Science Fiction',
      authorIndex: 0, // Alex
      chapterCount: 8
    },
    {
      title: 'Shadows of the Past',
      description: 'A serial killer returns after 20 years. Detective Morgan must solve the cold case.',
      genre: 'Crime Thriller',
      authorIndex: 2, // Jason
      chapterCount: 9
    },
    {
      title: 'The Enchanted Forest',
      description: 'Young Aria discovers she\'s the last forest guardian. Her choices shape the magical world.',
      genre: 'Fantasy',
      authorIndex: 3, // Luna
      chapterCount: 10
    },
    {
      title: 'The Astronaut\'s Dilemma',
      description: 'Stranded on Mars, Commander Park must choose between saving her crew or the mission.',
      genre: 'Space Opera',
      authorIndex: 5, // Zoe
      chapterCount: 6
    },
    {
      title: 'The Mirror\'s Edge',
      description: 'Therapist Dr. Blake treats patients who claim to see alternate versions of themselves.',
      genre: 'Psychological Horror',
      authorIndex: 4, // Marcus
      chapterCount: 8
    }
  ]

  for (const storyInfo of storyData) {
    const story = await prisma.story.create({
      data: {
        authorId: users[storyInfo.authorIndex].id,
        title: storyInfo.title,
        description: storyInfo.description,
        genre: storyInfo.genre,
        status: 'ACTIVE',
        totalChapters: storyInfo.chapterCount,
        totalReaders: Math.floor(Math.random() * 500) + 100
      }
    })
    stories.push({ ...story, chapterCount: storyInfo.chapterCount })
  }

  console.log(`Created ${stories.length} stories`)

  // Create 100+ Chapters (distributed across stories)
  const chapters = []
  const chapterTitles = [
    'The Beginning', 'Awakening', 'First Contact', 'The Discovery', 'Crossroads',
    'Into the Unknown', 'The Revelation', 'Dark Secrets', 'The Choice', 'New Allies',
    'Betrayal', 'The Hunt', 'Confrontation', 'Last Stand', 'Resolution',
    'New Dawn', 'Shadows Fall', 'The Test', 'Breaking Point', 'Redemption',
    'The Truth', 'Final Hour', 'Escape', 'Reunion', 'The Price',
    'Sacrifice', 'Victory', 'Aftermath', 'New Beginnings', 'The End'
  ]

  for (const story of stories) {
    for (let i = 1; i <= story.chapterCount; i++) {
      const chapter = await prisma.chapter.create({
        data: {
          storyId: story.id,
          chapterNumber: i,
          title: chapterTitles[(i - 1) % chapterTitles.length],
          content: `Chapter ${i} of "${story.title}". This is where the story unfolds with rich narrative and character development. The plot thickens as our protagonists face new challenges and must make crucial decisions that will shape their destiny. With each choice, the story branches into new possibilities, creating a unique reading experience for every audience.`,
          viewCount: Math.floor(Math.random() * 2000) + 100
        }
      })
      chapters.push(chapter)
    }
  }

  console.log(`Created ${chapters.length} chapters`)

  // Create Decision Points (one per chapter as per constraint)
  const decisionPoints = []
  const decisionQuestions = [
    'What should the protagonist do next?',
    'How should they handle this revelation?',
    'Which path offers the best chance of success?',
    'Who can be trusted in this situation?',
    'What sacrifice is worth making?',
    'How should they respond to this threat?',
    'Which ally should they choose?',
    'What is the right moral choice?',
    'How can they overcome this obstacle?',
    'What strategy should they employ?',
    'Which secret should be revealed?',
    'How should they protect their loved ones?',
    'What price are they willing to pay?',
    'Which enemy deserves redemption?',
    'How should the story conclude?'
  ]

  for (const chapter of chapters) {
    const decisionPoint = await prisma.decisionPoint.create({
      data: {
        chapterId: chapter.id,
        question: decisionQuestions[Math.floor(Math.random() * decisionQuestions.length)],
        closesAt: new Date(Date.now() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000), // Random 1-7 days
        isActive: Math.random() > 0.3, // 70% active
        totalVotes: 0 // Will be calculated from actual votes
      }
    })
    decisionPoints.push(decisionPoint)
  }

  console.log(`Created ${decisionPoints.length} decision points`)

  // Create Decision Options (2-4 per decision point)
  const decisionOptions = []
  const optionTemplates = [
    'Take the aggressive approach',
    'Try diplomacy and negotiation',
    'Seek help from allies',
    'Go it alone and trust no one',
    'Make the safe choice',
    'Take the risky but rewarding path',
    'Protect others at personal cost',
    'Prioritize the mission above all',
    'Follow their heart',
    'Listen to logic and reason',
    'Trust their instincts',
    'Gather more information first',
    'Act immediately',
    'Wait and observe',
    'Confront the problem head-on',
    'Find a creative solution',
    'Make a noble sacrifice',
    'Choose self-preservation'
  ]

  for (const decisionPoint of decisionPoints) {
    const optionCount = Math.floor(Math.random() * 3) + 2 // 2-4 options
    const usedOptions = new Set()
    
    for (let i = 0; i < optionCount; i++) {
      let optionText
      do {
        optionText = optionTemplates[Math.floor(Math.random() * optionTemplates.length)]
      } while (usedOptions.has(optionText))
      usedOptions.add(optionText)

      const option = await prisma.decisionOption.create({
        data: {
          decisionPointId: decisionPoint.id,
          optionText: optionText,
          voteCount: 0, // Will be calculated from actual votes
          isWinner: false // Will be determined later
        }
      })
      decisionOptions.push(option)
    }
  }

  console.log(`Created ${decisionOptions.length} decision options`)

  // Create 500+ Votes (distributed across active decision points)
  const votes: { id: string; userId: string; decisionPointId: string; optionId: string; createdAt: Date }[] = []
  const activeDecisionPoints = decisionPoints.filter(dp => dp.isActive)
  
  for (let i = 0; i < 500; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)]
    const randomDecisionPoint = activeDecisionPoints[Math.floor(Math.random() * activeDecisionPoints.length)]
    const optionsForDecision = decisionOptions.filter(opt => opt.decisionPointId === randomDecisionPoint.id)
    const randomOption = optionsForDecision[Math.floor(Math.random() * optionsForDecision.length)]
    
    try {
      const vote = await prisma.vote.create({
        data: {
          userId: randomUser.id,
          decisionPointId: randomDecisionPoint.id,
          optionId: randomOption.id
        }
      })
      votes.push(vote)
    } catch (error) {
      // Skip duplicate votes (user already voted on this decision point)
      continue
    }
  }

  console.log(`Created ${votes.length} votes`)

  // Update vote counts for decision points and options
  for (const decisionPoint of decisionPoints) {
    const votesForDecision = votes.filter(v => v.decisionPointId === decisionPoint.id)
    await prisma.decisionPoint.update({
      where: { id: decisionPoint.id },
      data: { totalVotes: votesForDecision.length }
    })

    // Update option vote counts
    for (const option of decisionOptions.filter(opt => opt.decisionPointId === decisionPoint.id)) {
      const votesForOption = votesForDecision.filter(v => v.optionId === option.id)
      await prisma.decisionOption.update({
        where: { id: option.id },
        data: { voteCount: votesForOption.length }
      })
    }

    // Mark winner (highest vote count)
    const optionsForDecision = decisionOptions.filter(opt => opt.decisionPointId === decisionPoint.id)
    if (optionsForDecision.length > 0) {
      const winner = optionsForDecision.reduce((prev, current) => 
        votes.filter(v => v.optionId === current.id).length > votes.filter(v => v.optionId === prev.id).length ? current : prev
      )
      await prisma.decisionOption.update({
        where: { id: winner.id },
        data: { isWinner: true }
      })
    }
  }

  // Create 200+ Story Follows
  const storyFollows = []
  for (let i = 0; i < 200; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)]
    const randomStory = stories[Math.floor(Math.random() * stories.length)]
    
    try {
      const follow = await prisma.storyFollow.create({
        data: {
          userId: randomUser.id,
          storyId: randomStory.id
        }
      })
      storyFollows.push(follow)
    } catch (error) {
      // Skip duplicate follows
      continue
    }
  }

  console.log(`Created ${storyFollows.length} story follows`)

  // Create 300+ Comments
  const comments = []
  const commentTemplates = [
    'This is absolutely incredible! I love where this story is going.',
    'Such a difficult choice! I can\'t wait to see what happens next.',
    'The character development in this chapter is amazing.',
    'I didn\'t see that twist coming! Brilliant writing.',
    'This story keeps me on the edge of my seat.',
    'The world-building is so detailed and immersive.',
    'I\'m totally invested in these characters now.',
    'What a cliffhanger! I need the next chapter immediately.',
    'The dialogue in this chapter feels so natural and realistic.',
    'I love how the readers\' choices are really shaping the story.',
    'This is why I love interactive fiction!',
    'The author has created such a compelling narrative.',
    'I\'m curious to see how this decision will impact the story.',
    'The pacing in this chapter is perfect.',
    'Such vivid descriptions! I can picture everything clearly.',
    'This story has me completely hooked.',
    'The moral dilemmas in this story are so thought-provoking.',
    'I appreciate how complex the characters are.',
    'This chapter gave me chills! Excellent work.',
    'I can\'t decide which choice is better - they\'re all so compelling!'
  ]

  for (let i = 0; i < 300; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)]
    const randomChapter = chapters[Math.floor(Math.random() * chapters.length)]
    const randomComment = commentTemplates[Math.floor(Math.random() * commentTemplates.length)]
    
    const comment = await prisma.comment.create({
      data: {
        userId: randomUser.id,
        chapterId: randomChapter.id,
        content: randomComment
      }
    })
    comments.push(comment)
  }

  console.log(`Created ${comments.length} comments`)

  // Update story reader counts based on follows
  for (const story of stories) {
    const followersCount = storyFollows.filter(sf => sf.storyId === story.id).length
    await prisma.story.update({
      where: { id: story.id },
      data: { totalReaders: followersCount + Math.floor(Math.random() * 100) }
    })
  }

  console.log('✅ Enhanced seed data created successfully!')
  console.log(`📊 Final counts:`)
  console.log(`   Users: ${users.length}`)
  console.log(`   Stories: ${stories.length}`)
  console.log(`   Chapters: ${chapters.length}`)
  console.log(`   Decision Points: ${decisionPoints.length}`)
  console.log(`   Decision Options: ${decisionOptions.length}`)
  console.log(`   Votes: ${votes.length}`)
  console.log(`   Story Follows: ${storyFollows.length}`)
  console.log(`   Comments: ${comments.length}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })