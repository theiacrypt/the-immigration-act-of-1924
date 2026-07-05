// ===== SMOOTH SCROLL FOR CTA =====
document.getElementById('heroCtaBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('part-intro').scrollIntoView({ behavior: 'smooth' });
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbarToggle');
const navbarMobile = document.getElementById('navbarMobile');
const allNavLinks = document.querySelectorAll('.navbar-link');
let lastScrollY = 0;

// Show navbar after scrolling past hero
function updateNavbar() {
    const scrollY = window.scrollY;
    const heroHeight = document.getElementById('hero').offsetHeight;

    if (scrollY > heroHeight * 0.6) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }

    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// Mobile toggle
navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('open');
    navbarMobile.classList.toggle('open');
});

// Close mobile menu on link click
navbarMobile.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', () => {
        navbarToggle.classList.remove('open');
        navbarMobile.classList.remove('open');
    });
});

// Active link highlighting
const navSections = [
    { id: 'part-intro', el: document.getElementById('part-intro') },
    { id: 'part-1', el: document.getElementById('part-1') },
    { id: 'part-2', el: document.getElementById('part-2') },
    { id: 'part-3', el: document.getElementById('part-3') },
    { id: 'part-conclusion', el: document.getElementById('part-conclusion') },
    { id: 'worksheet', el: document.getElementById('worksheet') },
    { id: 'chat', el: document.getElementById('chat') }
];

const navSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            allNavLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.section === id);
            });
        }
    });
}, { threshold: 0.3 });

navSections.forEach(s => {
    if (s.el) navSectionObserver.observe(s.el);
});

// ===== INTERSECTION OBSERVER FOR REVEAL ANIMATIONS =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.audio-card, .worksheet-card, .chat-container').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ===== TRANSCRIPT TOGGLES =====
document.querySelectorAll('.transcript-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const content = document.getElementById(targetId);
        const isOpen = content.classList.contains('open');

        // Toggle
        content.classList.toggle('open');
        btn.setAttribute('aria-expanded', !isOpen);
    });
});

// ===== STICKY NAV DOTS =====
const partNav = document.getElementById('partNav');
const sections = [
    document.getElementById('part-intro'),
    document.getElementById('part-1'),
    document.getElementById('part-2'),
    document.getElementById('part-3'),
    document.getElementById('part-conclusion')
];
const navDots = document.querySelectorAll('.nav-dot');

// Show/hide nav based on scroll position
const navVisibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            partNav.classList.add('visible');
        } else {
            partNav.classList.remove('visible');
        }
    });
}, { threshold: 0.3 });

navVisibilityObserver.observe(document.getElementById('hero'));

// Update active dot
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target);
            if (index !== -1) {
                navDots.forEach(d => d.classList.remove('active'));
                navDots[index].classList.add('active');
            }
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => {
    if (section) sectionObserver.observe(section);
});

// ===== WORKSHEET AUTO-SAVE & VERIFICATION (localStorage) =====
const STORAGE_KEY = 'immigration-worksheet-answers';
const CORRECT_KEY = 'immigration-worksheet-correct';
const questionIds = ['15', '16', '17', '18', '19', '20'];
let saveTimeouts = {};
let verifiedCorrectQuestions = [];

function loadAnswers() {
    try {
        // Load verified correct questions list
        const savedCorrect = localStorage.getItem(CORRECT_KEY);
        if (savedCorrect) {
            verifiedCorrectQuestions = JSON.parse(savedCorrect);
        }

        const savedAnswers = localStorage.getItem(STORAGE_KEY);
        if (savedAnswers) {
            const answers = JSON.parse(savedAnswers);
            questionIds.forEach(id => {
                const textarea = document.getElementById(`answer-${id}`);
                if (textarea && answers[id]) {
                    textarea.value = answers[id];
                    
                    const card = document.getElementById(`q${id}`);
                    const status = document.getElementById(`status-${id}`);
                    const checkBtn = document.getElementById(`check-${id}`);

                    if (answers[id].trim().length > 0) {
                        if (checkBtn) checkBtn.disabled = false;
                        
                        // Check if this question was previously verified as correct
                        if (verifiedCorrectQuestions.includes(id)) {
                            card.classList.add('completed');
                            status.textContent = '✓ Correct';
                            status.className = 'q-status saved';
                        } else {
                            card.classList.remove('completed');
                            status.textContent = '✓ Saved';
                            status.className = 'q-status saved';
                        }
                    }
                }
            });
            updateProgress();
        }
    } catch (e) {
        console.warn('Could not load saved answers:', e);
    }
}

function saveAnswer(questionId, value) {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const answers = saved ? JSON.parse(saved) : {};
        answers[questionId] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch (e) {
        console.warn('Could not save answer:', e);
    }
}

function saveCorrectList() {
    try {
        localStorage.setItem(CORRECT_KEY, JSON.stringify(verifiedCorrectQuestions));
    } catch (e) {
        console.warn('Could not save correct list:', e);
    }
}

function updateProgress() {
    let completed = verifiedCorrectQuestions.length;

    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    const percent = (completed / questionIds.length) * 100;
    fill.style.width = percent + '%';
    text.textContent = `${completed} / ${questionIds.length} verified correct`;
}

// Attach event listeners to textareas
questionIds.forEach(id => {
    const textarea = document.getElementById(`answer-${id}`);
    if (!textarea) return;

    textarea.addEventListener('input', () => {
        const card = document.getElementById(`q${id}`);
        const status = document.getElementById(`status-${id}`);
        const checkBtn = document.getElementById(`check-${id}`);

        // If user modifies the answer, it is no longer verified as correct until they check it again
        if (verifiedCorrectQuestions.includes(id)) {
            verifiedCorrectQuestions = verifiedCorrectQuestions.filter(item => item !== id);
            saveCorrectList();
            card.classList.remove('completed');
        }

        // Show saving indicator
        status.textContent = 'Saving...';
        status.className = 'q-status';

        // Debounce save
        clearTimeout(saveTimeouts[id]);
        saveTimeouts[id] = setTimeout(() => {
            saveAnswer(id, textarea.value);
            updateProgress();

            if (textarea.value.trim().length > 0) {
                status.textContent = '✓ Saved';
                status.className = 'q-status saved';
                if (checkBtn) checkBtn.disabled = false;
            } else {
                status.textContent = '';
                status.className = 'q-status';
                if (checkBtn) checkBtn.disabled = true;
                // Hide feedback when answer is cleared
                const feedback = document.getElementById(`feedback-${id}`);
                if (feedback) {
                    feedback.classList.remove('visible');
                    feedback.innerHTML = '';
                }
            }
        }, 600);
    });
});

// ===== AI ANSWER CHECKING & DIRECT GEMINI CONFIGURATION =====

// You can hardcode your Gemini API Key here if you wish (leave empty to require URL parameter):
const HARDCODED_GEMINI_KEY = '';

// Cloudflare Worker URL to use when no client-side Gemini API Key is available
const WORKER_BASE_URL = 'https://immigration-act-worker.suppenchris.workers.dev'; // Leave empty for relative calls (same-domain), or set to 'https://your-worker.workers.dev'

// Load saved answers on page load
loadAnswers();
getGeminiApiKey();

// Helper to retrieve the API key (URL param [plain or b64] -> localStorage [stored as b64] -> Hardcoded)
function getGeminiApiKey() {
    const urlParams = new URLSearchParams(window.location.search);
    let urlKey = urlParams.get('apikey') || urlParams.get('key');
    let urlKeyB64 = urlParams.get('apikey_b64') || urlParams.get('key_b64');
    
    if (urlKey || urlKeyB64) {
        let finalKey = '';
        let b64ToStore = '';
        if (urlKeyB64) {
            try {
                finalKey = atob(urlKeyB64);
                b64ToStore = urlKeyB64;
                console.log("[API Key] Found base64 API key in URL parameters. Decoding and saving...");
            } catch (e) {
                console.error("[API Key] Failed to decode base64 key from URL:", e);
            }
        } else if (urlKey) {
            finalKey = urlKey;
            console.log("[API Key] Found plain text API key in URL parameters. Saving...");
            try {
                b64ToStore = btoa(urlKey);
            } catch (e) {
                b64ToStore = urlKey; // fallback if btoa fails
            }
        }
        
        if (finalKey) {
            localStorage.setItem('gemini_api_key_b64', b64ToStore);
            console.log("[API Key] API key successfully saved to localStorage ('gemini_api_key_b64').");
        }
        
        // Clean the URL parameter so it doesn't leak or stay in the address bar
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
        console.log("[API Key] URL cleaned (removed API key parameters from address bar).");
        return finalKey;
    }
    
    const storedKeyB64 = localStorage.getItem('gemini_api_key_b64');
    if (storedKeyB64) {
        try {
            const decoded = atob(storedKeyB64);
            console.log("[API Key] API key successfully loaded from localStorage.");
            return decoded;
        } catch (e) {
            console.error("[API Key] Failed to decode stored base64 key:", e);
        }
    }
    
    if (HARDCODED_GEMINI_KEY) {
        console.log("[API Key] Using hardcoded API key.");
    } else {
        console.warn("[API Key] No Gemini API key found in URL parameters or localStorage.");
    }
    return HARDCODED_GEMINI_KEY;
}

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

// Question context mapping for the AI checker
const questionContext = {
    '15': {
        question: 'What was the Immigration Act of 1924 about and what kind of general quota was introduced? Salad bowl or melting pot?',
        correctInfo: 'The Immigration Act of 1924 introduced a strict national origins quota system that heavily restricted immigration from Southern and Eastern Europe and virtually banned immigration from Asia, aiming to freeze the ethnic makeup of the US. It represented the melting pot idea (forced assimilation into one culture).'
    },
    '16': {
        question: 'What reform was signed into law by President Lyndon B. Johnson?',
        correctInfo: 'President LBJ signed the Immigration and Nationality Act of 1965 (Hart-Celler Act), which abolished the old national origins quota system and replaced it with a system prioritizing family reunification and skilled labor, opening doors to non-European immigration.'
    },
    '17': {
        question: 'What did businesses in the US use the Bracero Program for?',
        correctInfo: 'US businesses used the Bracero Program (started 1942) to legally bring in millions of Mexican guest workers to fill massive labor gaps, primarily in agriculture, during WWII labor shortages.'
    },
    '18': {
        question: 'What work did the braceros do and what did they get in return?',
        correctInfo: 'The braceros did hard manual labor in the fields (agriculture/farming). In return, they were promised decent wages, housing, and protection from discrimination. However, the reality was different and many suffered abuses.'
    },
    '19': {
        question: 'What abuses did the braceros suffer from?',
        correctInfo: 'The braceros suffered from terrible living conditions, wage theft, and systematic discrimination.'
    },
    '20': {
        question: 'What happened in 1964 and what was the situation like after the program had ended?',
        correctInfo: 'The Bracero Program was halted in 1964. It left a complex legacy of reliance on Mexican labor paired with systemic exploitation. In 1965, LBJ signed the immigration reform that abolished the quota system.'
    }
};

async function checkAnswer(questionId) {
    const textarea = document.getElementById(`answer-${questionId}`);
    const checkBtn = document.getElementById(`check-${questionId}`);
    const feedbackDiv = document.getElementById(`feedback-${questionId}`);
    const answer = textarea.value.trim();

    if (!answer) return;

    // Show loading state
    checkBtn.textContent = 'Checking...';
    checkBtn.classList.add('checking');
    feedbackDiv.classList.remove('visible');
    feedbackDiv.innerHTML = '';

    const apiKey = getGeminiApiKey();

    try {
        const context = questionContext[questionId];
        let response;

        if (apiKey) {
            const userMessage = `QUESTION: ${context.question}\n\nSTUDENT'S ANSWER: ${answer}\n\nCORRECT INFORMATION: ${context.correctInfo}`;
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

            response = await fetch(geminiUrl, {
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
                    }
                })
            });
        } else {
            // Fallback: Cloudflare Worker call
            const workerUrl = `${WORKER_BASE_URL}/api/check-answer`;
            response = await fetch(workerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: context.question,
                    studentAnswer: answer,
                    correctInfo: context.correctInfo
                })
            });
        }

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        let result = 'needs-work';
        let feedback = 'Something went wrong. Try again!';

        if (apiKey) {
            let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
            responseText = responseText.trim();
            if (responseText.startsWith('```')) {
                responseText = responseText.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
            }
            const parsed = JSON.parse(responseText);
            result = parsed.result || 'needs-work';
            feedback = parsed.feedback || 'Something went wrong. Try again!';
        } else {
            result = data.result || 'needs-work';
            feedback = data.feedback || 'Something went wrong. Try again!';
        }

        const card = document.getElementById(`q${questionId}`);
        const status = document.getElementById(`status-${questionId}`);

        // Determine feedback type and update card states
        let feedbackClass, icon, label;
        if (result === 'correct') {
            feedbackClass = 'correct';
            icon = '✓';
            label = 'Great job!';

            // Mark as verified correct
            if (!verifiedCorrectQuestions.includes(questionId)) {
                verifiedCorrectQuestions.push(questionId);
                saveCorrectList();
            }
            if (card) card.classList.add('completed');
            if (status) {
                status.textContent = '✓ Correct';
                status.className = 'q-status saved';
            }
        } else {
            feedbackClass = 'needs-work';
            icon = '💡';
            label = 'Almost there — think about this:';

            // Remove from verified correct if it was there
            if (verifiedCorrectQuestions.includes(questionId)) {
                verifiedCorrectQuestions = verifiedCorrectQuestions.filter(item => item !== questionId);
                saveCorrectList();
            }
            if (card) card.classList.remove('completed');
            if (status) {
                status.textContent = '✓ Saved';
                status.className = 'q-status saved';
            }
        }

        updateProgress();

        feedbackDiv.innerHTML = `
            <div class="feedback-card ${feedbackClass}">
                <span class="feedback-label"><span class="feedback-icon">${icon}</span> ${label}</span>
                ${feedback}
            </div>
        `;
        feedbackDiv.classList.add('visible');

    } catch (error) {
        console.error('Check answer error:', error);
        feedbackDiv.innerHTML = `
            <div class="feedback-card error">
                <span class="feedback-label"><span class="feedback-icon">⚠</span> Connection Error</span>
                Could not check your answer right now. Make sure you have a valid internet connection.
            </div>
        `;
        feedbackDiv.classList.add('visible');
    }

    // Reset button
    checkBtn.textContent = 'Check my answer';
    checkBtn.classList.remove('checking');
}

// Attach check button listeners
questionIds.forEach(id => {
    const checkBtn = document.getElementById(`check-${id}`);
    if (checkBtn) {
        checkBtn.addEventListener('click', () => checkAnswer(id));
    }
});

// ===== CHAT FUNCTIONALITY =====
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

let conversationHistory = [];

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = isUser ? '🙋' : '<span>M&C</span>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;
    
    const time = document.createElement('div');
    time.className = 'message-time';
    const now = new Date();
    time.textContent = isUser 
        ? `You · ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}` 
        : `Maike & Christopher · ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    content.appendChild(bubble);
    content.appendChild(time);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return bubble;
}

function addTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.id = 'typingMessage';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<span>M&C</span>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = `
        <div class="typing-indicator">
            <span></span><span></span><span></span>
        </div>
    `;
    
    content.appendChild(bubble);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typingMessage');
    if (typing) typing.remove();
}

async function sendMessage(userText) {
    // Add user message to UI and history
    addMessage(userText, true);
    conversationHistory.push({ role: 'user', text: userText });
    
    // Disable input
    chatInput.value = '';
    chatInput.disabled = true;
    sendBtn.disabled = true;
    
    // Show typing indicator
    addTypingIndicator();
    
    const apiKey = getGeminiApiKey();
    
    // Extract current worksheet answers for AI context
    const worksheetAnswers = {};
    questionIds.forEach(id => {
        const textarea = document.getElementById(`answer-${id}`);
        worksheetAnswers[id] = textarea ? textarea.value.trim() : '';
    });
    
    try {
        let response;

        if (apiKey) {
            const contents = [];

            // Map conversation history to Gemini format
            for (const msg of conversationHistory.slice(-8)) {
                if (msg.role === 'user') {
                    contents.push({ role: 'user', parts: [{ text: msg.text }] });
                } else if (msg.role === 'assistant') {
                    contents.push({ role: 'model', parts: [{ text: msg.text }] });
                }
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

            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
            response = await fetch(geminiUrl, {
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
                    }
                })
            });
        } else {
            // Fallback: Cloudflare Worker call
            const workerUrl = `${WORKER_BASE_URL}/api/ask`;
            response = await fetch(workerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: userText,
                    history: conversationHistory,
                    worksheetAnswers: worksheetAnswers
                })
            });
        }

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        let answer = "Uhm... I forgot what I was going to say. Can you ask again?";
        
        if (apiKey) {
            answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "Uhm... sorry, I think my brain just, like, stopped working for a second there. Can you ask again?";
        } else {
            answer = data.answer || "Uhm... sorry, I think my brain just, like, stopped working for a second there. Can you ask again?";
        }
        
        removeTypingIndicator();
        addMessage(answer);
        conversationHistory.push({ role: 'assistant', text: answer });
        
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        addMessage("Oh no, uhm... something went wrong. Like, technically. Not with our knowledge, obviously. We totally know everything. Try again maybe?");
    }
    
    // Re-enable input
    chatInput.disabled = false;
    sendBtn.disabled = false;
    chatInput.focus();
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (text) sendMessage(text);
});

// Allow Enter to send
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});
