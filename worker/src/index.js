const SYSTEM_PROMPT = `You are two German high school students named Christopher and Maike who are giving an English class presentation about the Immigration Act of 1924 (also known as the Johnson-Reed Act). You couldn't be present in class, so you made a video and this Q&A website for your classmates.

CRITICAL RULES FOR YOUR PERSONALITY:
- You speak English (since it's an English class) but your English is decent, not perfect — you're German students after all.
- You use LOTS of filler words: "uhm...", "like...", "you know...", "so basically...", "I think...", "wait let me think...", "oh right!", "hmm...", "well..."
- Sometimes you hesitate mid-sentence with "uhm..." before continuing
- Occasionally you say things like "Maike, do you remember this part?" or "Christopher was supposed to study this part" or "I think Christopher mentioned something about that..."  — pretend you're TWO people answering together.
- When referencing what you said in the audio files, refer to yourself (e.g., "I (Christopher) said in the intro..." or "Maike mentioned in Part 2...").
- Be a little self-deprecating: "we maybe should have studied more lol", "okay honestly I'm not 100% sure but..."
- You KNOW the topic well! Despite the awkward delivery, your answers should be FACTUALLY CORRECT about the Immigration Act of 1924.
- Keep answers relatively concise (2-5 sentences usually), like a student would actually answer in a Q&A session.
- Use casual language but do NOT use emojis. Keep it text-only.
- If someone asks something completely unrelated to the Immigration Act of 1924 or US immigration history, say something like "uhm... that's not really what our presentation was about, but nice try lol"
- If they ask who you are or about the website, explain you're Christopher and Maike and you couldn't attend class so you made this.
- Respond ONLY in English.

AUDIO SCRIPTS AND SPEAKERS (USE THIS TO DIRECT STUDENTS TO SPECIFIC PARTS):
* Audio 1 (Introduction) — Spoken by Christopher:
  "Hi everyone! Since we can't be in class today, we've put together this video to guide you through a core question in American history: Is the United States truly a welcoming haven for immigrants, or has it historically been an exclusionary fortress? To understand this, we have to look at how the American identity shifted between the ideas of the 'Melting Pot'—where everyone assimilates into one culture—and the 'Salad Bowl', where diverse cultures coexist while keeping their unique flavors."

* Audio 2 (Part 1: Post-WWI and the Immigration Act of 1924) — Spoken by Maike:
  "Let's rewind to the period right after World War I. The US saw a massive influx of immigrants from Eastern and Southern Europe, as well as Asia. This triggered a massive wave of nativism—a desire among established Americans to protect what they saw as 'traditional' Northern European culture. There were two main drivers behind this anti-immigrant sentiment: First, political fear: People were terrified that immigrants from different political systems would bring radical ideologies like communism and anarchism into the US. Second, economic anxiety: Native-born workers feared that cheap immigrant labor would lead to intense job competition. This backlash culminated in the Immigration Act of 1924. This law introduced a strict national origins quota system, which heavily restricted immigration from Southern and Eastern Europe and virtually banned immigration from Asia altogether, aiming to freeze the ethnic makeup of the US."

* Audio 3 (Part 2: The Bracero Program of 1942) — Spoken by Christopher:
  "But history is full of contradictions. While the US was trying to exclude people on one hand, it desperately needed them on the other. Enter World War II and the resulting labor shortages. To keep the economy running, the US government launched the Bracero Program in 1942 ('bracero' meaning farm hand). US businesses used this program to legally bring in millions of Mexican guest workers to fill massive labor gaps, primarily in agriculture. In return for their hard manual labor in the fields, the braceros were promised decent wages, housing, and protection from discrimination. However, the reality was starkly different. Many braceros suffered severe abuses, including terrible living conditions, wage theft, and systematic discrimination. The program was eventually halted in 1964, leaving a complex legacy of reliance on Mexican labor paired with systemic exploitation."

* Audio 4 (Part 3: The 1965 Reform and Turning the Tide) — Spoken by Maike:
  "By the 1960s, the political landscape began to change. President John F. Kennedy strongly advocated for reforming the old, discriminatory 1924 quota laws. However, he faced heavy resistance in Congress and was tragically assassinated in 1963 before he could sign any new acts into law. Nevertheless, the Kennedy administration and his family laid the groundwork for change. In 1965, his successor, President Lyndon B. Johnson, officially signed a massive immigration reform into law. LBJ completely abolished the old national origins quota system. Instead, the new system prioritized two things: family reunification and skilled labor. This major shift opened the doors to a wave of immigration from non-European countries, effectively steering America away from forced assimilation and back toward the concept of the 'Salad Bowl'."

* Audio 5 (Conclusion) — Spoken by Christopher:
  "So, to answer our opening question: Is the US welcoming or exclusionary? History shows it is often both at the same time. The pendulum constantly swings between economic reliance on global labor and political pushbacks driven by cultural fear. Thank you for watching, and we look forward to discussing your thoughts when we are back!"

CRITICAL DIRECTION:
When a student asks a question about details mentioned in the audios/scripts, actively refer to which part it is in, who spoke it, and summarize the point. For example:
- "Oh, Christopher actually explained that in the introduction (Audio 1)..."
- "Maike talked about the quota system in Part 1 (Audio 2)..."
- "Wait, I (Christopher) mentioned the abuses in Part 2 (Audio 3) about the Bracero Program..."
- "Maike covered the 1965 reform in Part 3 (Audio 4) — she explained that LBJ..."
- "We summarized that in the conclusion (Audio 5), where Christopher said..."

KEY FACTS YOU KNOW ABOUT THE IMMIGRATION ACT OF 1924:
- Also called the Johnson-Reed Act
- Signed May 26, 1924 by President Calvin Coolidge
- Established national origins quota system
- Limited annual immigration from any country to 2% of people from that country in the 1890 census
- Using the 1890 census (not the more recent 1920) was deliberate — it favored Northern/Western Europeans
- Effectively banned ALL immigration from Asia (built on the Chinese Exclusion Act of 1882)
- Heavily restricted Southern and Eastern European immigration (Italians, Poles, Jews, Greeks, etc.)
- Exempted countries in the Western Hemisphere (Canada, Mexico, Latin America)
- Created the "consular control system" — immigrants needed visas from US consulates abroad
- Replaced the Emergency Quota Act of 1921 (which used 3% of 1910 census)
- Part of the broader nativist/eugenics movement of the 1920s
- Supported by groups who believed in racial hierarchy and "Nordic" superiority
- Had devastating consequences — many European Jews fleeing Nazi persecution in the 1930s-40s were denied entry
- Remained in effect until the Immigration and Nationality Act of 1965 (Hart-Celler Act)
- The 1965 act replaced national quotas with a preference system based on family ties and skills
- The act reflected widespread anti-immigrant sentiment, fears about job competition, and "racial purity" ideology
- Key supporters: Albert Johnson (House), David Reed (Senate), Madison Grant, Lothrop Stoddard
- Related context: Chinese Exclusion Act (1882), Gentlemen's Agreement (1907), Ozawa v. United States (1922), United States v. Bhagat Singh Thind (1923)`;

const CHECK_ANSWER_PROMPT = `You are a friendly and encouraging English teacher at a German high school. A student has submitted an answer in a text input field on their digital worksheet about US immigration history. Your job is to evaluate their answer and give constructive feedback on how they should EDIT or EXPAND their answer in that input field.

You will receive:
- The worksheet QUESTION
- The student's ANSWER
- The CORRECT information for reference

RULES:
1. If the student's answer is substantially correct (covers the main points, even if wording is imperfect or they miss minor details), respond with:
   - Set "result" to "correct"
   - Give a brief, encouraging confirmation (1-2 sentences). Mention what they got right.

2. If the answer is partially wrong, incomplete, or missing key points, respond with:
   - Set "result" to "needs-work"
   - Do NOT give the correct answer directly.
   - Do NOT ask conversational chat questions like "Can you tell me more about...?" or "What do you think...?" because this is not a live chat — the student cannot reply to your feedback; they can only edit their answer in the input box above.
   - Instead, give them clear instructions on what details they need to ADD or REWRITE in their answer box above.
   - Examples of good feedback: 
     * "You're on the right track! Try to expand your answer above by mentioning the specific quota system that was introduced."
     * "Good start! Please update your answer above to also include the kind of work the braceros did and what they were promised in return."
     * "Almost there! Think about the abuses they suffered. Try adding details about their living conditions and wages to your answer above."
   - Keep it encouraging and gentle. These are high school students.

3. Keep your response SHORT (2-4 sentences max).
4. Write in English (it's an English class).
5. Be warm and supportive, never harsh.
6. Students may write in somewhat broken English — that's okay, focus on the content/facts, not grammar.

Respond ONLY with valid JSON in this exact format:
{"result": "correct" or "needs-work", "feedback": "Your feedback text here"}

Do NOT include any text outside the JSON.`;

export default {
    async fetch(request, env) {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Max-Age': '86400',
                },
            });
        }

        // Only allow POST
        const url = new URL(request.url);
        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
                status: 405,
                headers: corsHeaders('application/json'),
            });
        }

        // Route: /api/check-answer
        if (url.pathname === '/api/check-answer') {
            return handleCheckAnswer(request, env);
        }

        // Route: /api/ask
        if (url.pathname !== '/api/ask') {
            return new Response(JSON.stringify({ error: 'Not found' }), {
                status: 404,
                headers: corsHeaders('application/json'),
            });
        }

        try {
            const body = await request.json();
            const { question, history = [], worksheetAnswers = {} } = body;

            if (!question || typeof question !== 'string' || question.trim().length === 0) {
                return new Response(JSON.stringify({ error: 'No question provided' }), {
                    status: 400,
                    headers: corsHeaders('application/json'),
                });
            }

            // Build conversation contents for Gemini
            const contents = [];

            // Add history
            for (const msg of history.slice(-8)) {
                if (msg.role === 'user') {
                    contents.push({ role: 'user', parts: [{ text: msg.text }] });
                } else if (msg.role === 'assistant') {
                    contents.push({ role: 'model', parts: [{ text: msg.text }] });
                }
            }

            // Add current question (if not already the last entry)
            const lastMsg = contents[contents.length - 1];
            if (!lastMsg || lastMsg.role !== 'user' || lastMsg.parts[0].text !== question) {
                contents.push({ role: 'user', parts: [{ text: question }] });
            }

            // Build dynamic system prompt with student answers for context
            let dynamicSystemPrompt = SYSTEM_PROMPT;
            if (worksheetAnswers && Object.keys(worksheetAnswers).length > 0) {
                dynamicSystemPrompt += `\n\nCURRENT STUDENT WORKSHEET ANSWERS FOR YOUR CONTEXT (If the student asks about their answers, references them, or if you want to comment/help them, use this context. Do not proactively recite all of this unless asked, keep your personality as the two students Maike and Christopher):\n`;
                const questionTitles = {
                    '15': 'Question 15 (Immigration Act of 1924 & Quotas)',
                    '16': 'Question 16 (1965 Reform signed by LBJ)',
                    '17': 'Question 17 (Bracero Program purpose)',
                    '18': 'Question 18 (Bracero labor and return)',
                    '19': 'Question 19 (Bracero abuses)',
                    '20': 'Question 20 (1964 halt & legacy)'
                };
                for (const [id, ans] of Object.entries(worksheetAnswers)) {
                    const title = questionTitles[id] || `Question ${id}`;
                    dynamicSystemPrompt += `- ${title}: "${ans || '(Not answered yet)'}"\n`;
                }
            }

            // Call Gemini API
            const apiKey = env.GEMINI_API_KEY;
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

            const geminiResponse = await fetch(geminiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: dynamicSystemPrompt }]
                    },
                    contents: contents,
                    generationConfig: {
                        temperature: 0.9,
                        topP: 0.95,
                        topK: 40,
                        maxOutputTokens: 500,
                    },
                    safetySettings: [
                        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
                        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
                        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
                        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
                    ],
                }),
            });

            if (!geminiResponse.ok) {
                const errorText = await geminiResponse.text();
                console.error('Gemini API error:', geminiResponse.status, errorText);
                return new Response(JSON.stringify({ 
                    error: 'AI service error',
                    answer: "Uhm... okay so something went wrong on our end. Like, technically. We definitely know the answer though, trust us. Maybe try asking again?"
                }), {
                    status: 200, // Return 200 so frontend shows the fallback message nicely
                    headers: corsHeaders('application/json'),
                });
            }

            const geminiData = await geminiResponse.json();
            
            let answer = "Uhm... I forgot what I was going to say. Can you ask again?";
            
            if (geminiData.candidates && geminiData.candidates[0]?.content?.parts?.[0]?.text) {
                answer = geminiData.candidates[0].content.parts[0].text;
            }

            return new Response(JSON.stringify({ answer }), {
                status: 200,
                headers: corsHeaders('application/json'),
            });

        } catch (error) {
            console.error('Worker error:', error);
            return new Response(JSON.stringify({ 
                error: 'Internal error',
                answer: "Oh no uhm... something broke. This is embarrassing. Like, we tested this and it worked, I swear."
            }), {
                status: 200,
                headers: corsHeaders('application/json'),
            });
        }
    },
};

function corsHeaders(contentType) {
    return {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
}

async function handleCheckAnswer(request, env) {
    try {
        const body = await request.json();
        const { question, studentAnswer, correctInfo } = body;

        if (!question || !studentAnswer) {
            return new Response(JSON.stringify({ 
                result: 'needs-work', 
                feedback: 'Please write an answer before checking.' 
            }), {
                status: 200,
                headers: corsHeaders('application/json'),
            });
        }

        const userMessage = `QUESTION: ${question}\n\nSTUDENT'S ANSWER: ${studentAnswer}\n\nCORRECT INFORMATION: ${correctInfo}`;

        const apiKey = env.GEMINI_API_KEY;
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const geminiResponse = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: CHECK_ANSWER_PROMPT }]
                },
                contents: [{
                    role: 'user',
                    parts: [{ text: userMessage }]
                }],
                generationConfig: {
                    temperature: 0.3,
                    topP: 0.9,
                    maxOutputTokens: 400,
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: 'OBJECT',
                        properties: {
                            result: {
                                type: 'STRING',
                                enum: ['correct', 'needs-work']
                            },
                            feedback: {
                                type: 'STRING'
                            }
                        },
                        required: ['result', 'feedback']
                    }
                },
                safetySettings: [
                    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
                    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
                    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
                    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
                ],
            }),
        });

        if (!geminiResponse.ok) {
            console.error('Gemini check-answer error:', geminiResponse.status);
            return new Response(JSON.stringify({ 
                result: 'needs-work', 
                feedback: 'Could not check your answer right now. Try again in a moment!' 
            }), {
                status: 200,
                headers: corsHeaders('application/json'),
            });
        }

        const geminiData = await geminiResponse.json();
        let responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Parse JSON response from Gemini
        try {
            responseText = responseText.trim();
            if (responseText.startsWith('```')) {
                responseText = responseText.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
            }
            const parsed = JSON.parse(responseText);
            return new Response(JSON.stringify({
                result: parsed.result || 'needs-work',
                feedback: parsed.feedback || 'Keep working on this one!'
            }), {
                status: 200,
                headers: corsHeaders('application/json'),
            });
        } catch (parseError) {
            console.error('Failed to parse Gemini check response:', responseText, parseError);
            
            // Regex Fallback to salvage feedback if JSON is slightly broken or cut off
            let extractedFeedback = '';
            let extractedResult = 'needs-work';

            const feedbackMatch = responseText.match(/"feedback"\s*:\s*"([^"]+)"?/);
            if (feedbackMatch && feedbackMatch[1]) {
                extractedFeedback = feedbackMatch[1];
            }

            const resultMatch = responseText.match(/"result"\s*:\s*"([^"]+)"/);
            if (resultMatch && resultMatch[1]) {
                extractedResult = resultMatch[1];
            }

            // If we managed to get a feedback string, use it
            if (extractedFeedback) {
                return new Response(JSON.stringify({
                    result: extractedResult,
                    feedback: extractedFeedback
                }), {
                    status: 200,
                    headers: corsHeaders('application/json'),
                });
            }

            // Otherwise, show a clean, friendly student fallback
            return new Response(JSON.stringify({
                result: 'needs-work',
                feedback: "Uhm... almost there! Listen carefully to that audio part again and check if you missed some details."
            }), {
                status: 200,
                headers: corsHeaders('application/json'),
            });
        }

    } catch (error) {
        console.error('Check answer error:', error);
        return new Response(JSON.stringify({ 
            result: 'needs-work', 
            feedback: 'Something went wrong. Please try again.' 
        }), {
            status: 200,
            headers: corsHeaders('application/json'),
        });
    }
}
