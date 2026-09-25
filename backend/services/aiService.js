const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.6-flash",
});

async function generateWithRetry(prompt, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await model.generateContent(prompt);
    } catch (error) {
      console.log(
        `Gemini request failed (attempt ${attempt}/${maxRetries}):`,
        error.status,
      );

      if (error.status !== 503 || attempt === maxRetries) {
        throw error;
      }

      const delay = attempt * 3000;

      console.log(`Retrying Gemini request in ${delay / 1000} seconds...`);

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

async function reviewCode(code) {
  const prompt = `
You are an expert software engineer and code reviewer.

Analyze the following code carefully.

Your task is to:

1. Identify bugs and logical errors.
2. Evaluate code quality and best practices.
3. Identify security vulnerabilities.
4. Identify performance issues.
5. Suggest practical improvements.
6. Identify the programming language.
7. Give practical best-practice recommendations for the code.
8. Give a Code Quality Score from 0 to 100.

SCORING:
90-100 = Excellent
75-89 = Good
60-74 = Average
40-59 = Needs Improvement
0-39 = Poor

IMPORTANT:
- Base your analysis only on the provided code.
- Do not make assumptions about missing code.
- Do not report unsupported or false-positive issues.
- Do not repeat the same issue.
- Best-practice recommendations must be practical and relevant to the provided code.
- beginnerExplanation must be simple and easy for a beginner to understand.
- beginnerExplanation must explain what the issue is and why it happens.
- Avoid unnecessary technical jargon.
- Do not suggest best practices that are unrelated to the code.
- Explain issues clearly.
- Give a practical solution for every bug.
- The score MUST be a number between 0 and 100.
- The score MUST always be included.
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT use code fences.
- Do NOT add any text before or after the JSON.

RETURN EXACTLY THIS JSON STRUCTURE:

{
  "score": 0,
  "reason": "Short explanation of the score",
  "language": "Programming language",
  "bugs": [
    {
      "severity": "Critical/High/Medium/Low",
      "issue": "Description of the issue",
      "whyItMatters": "Why this issue matters",
      "beginnerExplanation": "Simple beginner-friendly explanation of the issue",
      "solution": "How to fix it"
    }
  ],
  "codeQuality": "Analysis of readability, structure, naming, maintainability and best practices",
  "security": "Security analysis",
  "performance": "Performance analysis",
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2"
  ],
  "bestPractices": [
    "Best practice 1",
    "Best practice 2"
  ], 
  "whatWasDoneWell": [
    "Good practice 1",
    "Good practice 2"
  ],
  "overallAssessment": "Short overall assessment"
}

CODE TO REVIEW:

${code}
`;

  const result = await generateWithRetry(prompt);
  const response = result.response.text();

  // Remove accidental markdown code fences if Gemini adds them
  const cleanedResponse = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // Convert Gemini's JSON text into a JavaScript object

  try {
    const review = JSON.parse(cleanedResponse);
    return review;
  } catch (error) {
    console.log("Invalid AI response:", cleanedResponse);
    throw new Error("AI returned an invalid response. Please try again.");
  }
}

async function generateInterviewQuestions(code) {
  const prompt = `
You are an experienced technical interviewer.

Analyze the following code and generate interview questions based only on the provided code.

Generate:
1. 3 basic questions
2. 3 intermediate questions
3. 2 advanced questions

For each question, provide:
- The question
- A short answer
- Difficulty level

IMPORTANT:
- Questions must be relevant to the provided code.
- Do not make assumptions about missing code.
- Do not generate unrelated questions.
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT use code fences.

RETURN EXACTLY THIS JSON STRUCTURE:

{
  "questions": [
    {
      "question": "Question text",
      "answer": "Short answer",
      "difficulty": "Basic"
    }
  ]
}

CODE:

${code}
`;

  const result = await generateWithRetry(prompt);
  const response = result.response.text();

  const cleanedResponse = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const questions = JSON.parse(cleanedResponse);

  return questions;
}

module.exports = { reviewCode, generateInterviewQuestions };
