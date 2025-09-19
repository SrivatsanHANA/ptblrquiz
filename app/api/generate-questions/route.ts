import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json()

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return NextResponse.json({ error: "Topic is required and must be a non-empty string" }, { status: 400 })
    }

    const searchQuery = `${topic} product management interview questions answers site:medium.com OR site:productmanagementexercises.com OR site:glassdoor.com`

    // Simulate web search API call (in production, you'd use a real search API like Google Custom Search, Bing Search API, etc.)
    const searchResults = await simulateWebSearch(topic)

    // Generate questions based on search results and common PM frameworks
    const questions = await generateQuestionsFromSearch(topic, searchResults)

    return NextResponse.json({ questions })
  } catch (error) {
    console.error("Error generating questions:", error)
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 })
  }
}

async function simulateWebSearch(topic: string) {
  // In production, replace this with actual web search API calls
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const searchResults = [
    {
      title: `${topic} Product Management Best Practices`,
      content: `Key strategies for ${topic} include user-centered design, data-driven decisions, stakeholder alignment, and iterative development approaches.`,
      source: "medium.com",
    },
    {
      title: `How to Excel at ${topic} as a Product Manager`,
      content: `Success in ${topic} requires understanding user needs, market dynamics, technical constraints, and business objectives while maintaining clear communication.`,
      source: "productmanagementexercises.com",
    },
    {
      title: `${topic} Interview Questions for Product Managers`,
      content: `Common questions include prioritization frameworks, metrics definition, user research methods, and stakeholder management strategies.`,
      source: "glassdoor.com",
    },
  ]

  return searchResults
}

async function generateQuestionsFromSearch(topic: string, searchResults: any[]) {
  const frameworks = ["RICE", "MoSCoW", "Kano Model", "Jobs-to-be-Done", "OKRs", "North Star Framework"]
  const pmAreas = ["Strategy", "Discovery", "Delivery", "Analytics", "Stakeholder Management", "User Research"]

  const questionTemplates = [
    {
      question: `How would you apply the ${frameworks[Math.floor(Math.random() * frameworks.length)]} framework to prioritize ${topic} initiatives?`,
      answer: `When applying prioritization frameworks to ${topic}, start by defining clear criteria relevant to your business context. For RICE, evaluate Reach (how many users affected), Impact (business value), Confidence (certainty in estimates), and Effort (resources required). Score each ${topic} initiative and prioritize high-scoring items that align with strategic goals.`,
      difficulty: "Medium",
    },
    {
      question: `What key metrics would you track to measure success in ${topic}?`,
      answer: `For ${topic}, establish a hierarchy of metrics: North Star Metric (primary success indicator), Key Performance Indicators (business outcomes), and Leading Indicators (early signals). Include user engagement metrics, business impact measures, and operational efficiency indicators specific to ${topic} domain.`,
      difficulty: "Hard",
    },
    {
      question: `How would you conduct user research to validate ${topic} assumptions?`,
      answer: `Use a mixed-methods approach: qualitative research (user interviews, usability testing) to understand the 'why' behind user behavior, and quantitative research (surveys, analytics) to measure the 'what' and 'how much'. For ${topic}, focus on understanding user pain points, validating problem-solution fit, and testing key hypotheses.`,
      difficulty: "Easy",
    },
    {
      question: `Describe your approach to stakeholder alignment for a ${topic} product initiative.`,
      answer: `Establish clear communication frameworks with regular touchpoints, shared documentation, and transparent decision-making processes. For ${topic} initiatives, create alignment through shared vision, defined success metrics, clear roles and responsibilities, and regular progress updates to all stakeholders.`,
      difficulty: "Medium",
    },
    {
      question: `How would you handle competing priorities in ${topic} product development?`,
      answer: `Use a structured approach: 1) Clarify business objectives and user needs, 2) Apply prioritization frameworks considering impact and effort, 3) Communicate trade-offs transparently, 4) Involve stakeholders in decision-making, 5) Document decisions and rationale for future reference.`,
      difficulty: "Hard",
    },
  ]

  // Select 4-5 random questions and customize them with search context
  const selectedQuestions = questionTemplates
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 2) + 4) // 4-5 questions
    .map((template, index) => ({
      id: `generated-${Date.now()}-${index}`,
      question: template.question,
      answer: template.answer,
      topic: topic,
      difficultyLevel: template.difficulty as "Easy" | "Medium" | "Hard",
    }))

  return selectedQuestions
}
