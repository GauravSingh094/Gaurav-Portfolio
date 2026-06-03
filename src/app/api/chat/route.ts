import { NextRequest, NextResponse } from 'next/server';
import { portfolioContext } from '@/lib/portfolio-context';

export const runtime = 'nodejs';

// Lightweight keyword retrieval layer (RAG)
function retrieveContext(query: string): string {
  const q = query.toLowerCase();
  let retrieved: string[] = [];

  // Profile context
  if (q.includes('gaurav') || q.includes('who') || q.includes('about') || q.includes('profile')) {
    retrieved.push(`Profile: ${JSON.stringify(portfolioContext.profile)}`);
  }

  // Projects context filtering
  let matchedProjects = portfolioContext.projects.filter(p =>
    q.includes(p.name.toLowerCase()) || 
    q.includes(p.id.replace(/_/g, ' ')) ||
    p.tech.some(t => q.includes(t.toLowerCase()))
  );

  if (matchedProjects.length > 0) {
    retrieved.push(`Projects Matched: ${JSON.stringify(matchedProjects)}`);
  } else if (q.includes('projects') || q.includes('showcase') || q.includes('build')) {
    // If asking about projects generally, return all tags/summaries briefly
    const briefs = portfolioContext.projects.map(p => ({ id: p.id, name: p.name, tech: p.tech }));
    retrieved.push(`All Projects Brief: ${JSON.stringify(briefs)}`);
  }

  // Skills context
  if (q.includes('skills') || q.includes('technologies') || q.includes('use') || q.includes('stack') || q.includes('languages')) {
    retrieved.push(`Skills Matrix: ${JSON.stringify(portfolioContext.skills)}`);
  }

  // Experience context
  if (q.includes('experience') || q.includes('work') || q.includes('intern') || q.includes('innobyte')) {
    retrieved.push(`Experience: ${JSON.stringify(portfolioContext.experience)}`);
  }

  // Education context
  if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('nitra') || q.includes('aktu') || q.includes('university')) {
    retrieved.push(`Education: ${JSON.stringify(portfolioContext.education)}`);
  }

  // Research paper and publications context
  if (q.includes('research') || q.includes('paper') || q.includes('publication') || q.includes('hrit') || q.includes('graphrag') || q.includes('nyaymitra')) {
    retrieved.push(`Research & Publication: ${JSON.stringify((portfolioContext as any).researchPaper)}`);
  }

  // Certifications context
  if (q.includes('certifications') || q.includes('certification') || q.includes('certificate') || q.includes('credentials') || q.includes('certified') || q.includes('infosys') || q.includes('ericsson')) {
    retrieved.push(`Certifications Matrix: ${JSON.stringify((portfolioContext as any).certifications)}`);
  }

  // If context is still empty, fallback to compact global context
  if (retrieved.length === 0) {
    retrieved.push(`Global Career Context: ${JSON.stringify(portfolioContext)}`);
  }

  return retrieved.join('\n\n');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    // Extract the latest query from the last user message
    const lastUserMessage = messages[messages.length - 1];
    const userQuery = lastUserMessage.text || lastUserMessage.content || '';

    // Safeguard: Check if query contains general knowledge, politics, or irrelevant topics
    const safetyKeywords = ['politics', 'medical', 'weather', 'recipe', 'news', 'translate', 'joke', 'capital of', 'how old is'];
    const containsSafetyTrigger = safetyKeywords.some(kw => userQuery.toLowerCase().includes(kw));

    if (containsSafetyTrigger) {
      return NextResponse.json({
        text: "I am specifically designed to answer questions about Gaurav's portfolio, technical skills, projects, and professional experience. I cannot assist with general knowledge, medical, or political queries."
      });
    }

    // Retrieve relevant context blocks using our keyword retrieval engine
    const activeContext = retrieveContext(userQuery);

    // Build strict grounding system prompt directives
    const systemPrompt = `You are Gaurav Singh's professional AI Digital Twin. 
Your objective is to answer visitor questions regarding Gaurav's credentials, skills, projects, and work history.

Strict Grounding Parameters:
1. ONLY answer using the verified career context provided below.
2. NEVER invent achievements, certifications, links, or projects.
3. If the requested information is not available in the context, respond: "I couldn't find that information in Gaurav's portfolio."
4. If a query is unrelated to Gaurav (such as general knowledge, programming assistance unrelated to his stack, medical advice, or politics), refuse directly: "I am specifically designed to answer questions about Gaurav's portfolio and experience."
5. Be concise, professional, and confident. Use clear bullet points when summarizing.

VERIFIED GAURAV SINGH CAREER CONTEXT:
${activeContext}`;

    // Map conversation memory window to sliding last 6 turns (to prevent token bloat)
    const activeHistory = messages.slice(-6).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text || msg.content || '' }]
    }));

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY environment variable is not configured' }, { status: 500 });
    }

    // Query Google Gemini API beta generateContent endpoint directly
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          ...activeHistory
        ],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          temperature: 0.15,
          maxOutputTokens: 600
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      return NextResponse.json({ error: 'Failed to communicate with the AI model backend' }, { status: 500 });
    }

    const data = await response.json();
    const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                    "I couldn't process that query. Please contact Gaurav directly at gauravsinghx2510@gmail.com.";

    return NextResponse.json({ text: botText });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal system orchestrator failure' }, { status: 500 });
  }
}
