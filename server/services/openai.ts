import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface ResumeContent {
  position?: string;
  company?: string;
  description?: string;
  skill?: string;
  summary?: string;
}

export async function improveCvContent(content: ResumeContent): Promise<string> {
  try {
    const { position, company, description, skill, summary } = content;
    
    let prompt = '';
    
    if (position && company && description) {
      // Work experience improvement
      prompt = `Improve this work experience description for a resume. Make it more professional, 
      impactful, and focused on achievements. Use bullet points and action verbs. 
      Keep it concise (max 3-4 bullet points):
      
      Position: ${position}
      Company: ${company}
      Current description: ${description}`;
    } else if (skill) {
      // Skill suggestion
      prompt = `Suggest 5 related professional skills that complement this skill: "${skill}". 
      Return just a comma-separated list of single or double word skills with no numbers or bullets.`;
    } else if (summary) {
      // Resume summary improvement
      prompt = `Improve this resume summary to be more professional, concise, and impactful. 
      Highlight key strengths and career goals. Keep it under 100 words:
      
      Current summary: ${summary}`;
    } else {
      throw new Error("Invalid content type provided");
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content || "Unable to generate improvement";
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to generate CV content improvement");
  }
}

export async function suggestSkills(jobTitle: string): Promise<string[]> {
  try {
    const prompt = `Suggest 10 key professional skills (hard and soft skills) for someone in this role: "${jobTitle}". 
    Return only a JSON array of single or double word skills with no descriptions, numbers or explanations.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 300,
    });

    const content = response.choices[0].message.content || '{"skills":[]}';
    const parsedContent = JSON.parse(content);
    
    return Array.isArray(parsedContent.skills) 
      ? parsedContent.skills.slice(0, 10) 
      : [];
  } catch (error) {
    console.error("Error suggesting skills:", error);
    return [];
  }
}