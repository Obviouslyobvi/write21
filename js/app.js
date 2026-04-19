// Nonfiction Blueprint - Main App Logic

// ===================================
// DATA: Daily Affirmations
// ===================================
const dailyAffirmations = [
  "I clearly define my book's purpose and connect deeply with my ideal reader.",
  "I craft compelling reasons that make my book essential and valuable to readers.",
  "I write with confidence, allowing my knowledge to flow naturally onto the page.",
  "My ideas transform into powerful chapters that educate and inspire.",
  "I trust my outline and embrace the joy of filling in the details.",
  "Every paragraph I write brings me closer to my completed manuscript.",
  "I write authentically, using my unique voice to connect with readers.",
  "I am making significant progress, and my book is taking shape beautifully.",
  "My creativity flows freely as I express my expertise through words.",
  "I write with clarity and purpose, knowing my message matters.",
  "I am halfway to my goal, and I continue with renewed enthusiasm.",
  "Each chapter reflects my dedication and commitment to excellence.",
  "I complete my writing phase with pride in my accomplishments.",
  "I research with integrity, enriching my manuscript with valuable insights.",
  "I organize my work thoughtfully, creating a cohesive and compelling narrative.",
  "I read my work with fresh eyes, seeing both strengths and opportunities for growth.",
  "I refine my manuscript with care, honoring my purpose and my readers.",
  "I polish my work patiently, knowing that excellence requires attention to detail.",
  "I approach revision with confidence, trusting my instincts and expertise.",
  "I finalize my manuscript with satisfaction, knowing I've given my best effort.",
  "I celebrate completing my manuscript! I am a writer. I am an author. This is my achievement."
];

// ===================================
// DATA: Timeline (Brain Dump First order)
// ===================================
const timelineData = {
  phases: [
    {
      name: "Foundation",
      description: "Get your book out of your head and into a complete outline",
      days: [
        {
          day: 1,
          title: "Foundation",
          focus: "Brain Dump, Organize, Title, Purpose, Audience, Chapter Outlines",
          tasks: [
            {
              title: "Say your daily affirmation",
              description: "Set timer for 1 minute. Say aloud: 'I am now a writer. I am an author. I am focused on the tasks I have to do today, and I eliminate all excuses and distractions.'",
              duration: "1 minute"
            },
            {
              title: "Brain Dump Everything (DO THIS FIRST)",
              description: "Get paper and pen. As quickly as possible, list everything a person needs to know about your subject. Single words or phrases ONLY. Do NOT write sentences. Do NOT worry about order. Just write.",
              duration: "10 minutes"
            },
            {
              title: "Organize your list into chapters",
              description: "Number your items in a logical order. You have just created your table of contents. Each topic is a chapter title. Many items may become sub-chapters nested inside other chapters."
            },
            {
              title: "Write your working title",
              description: "Don't get hung up on this or use it as an excuse to procrastinate. This is just a working title. You can change it later."
            },
            {
              title: "Write your book's purpose in one sentence",
              description: "This will guide all your writing decisions."
            },
            {
              title: "Describe your target audience",
              description: "Write 1-2 paragraphs describing who needs this book. Be specific: age, location, education, interests, what problems keep them up at night that your book solves."
            },
            {
              title: "Build chapter outlines",
              description: "Get one blank sheet per chapter. For each, list everything a person needs to know about that topic (single words/phrases). Number items in order. Repeat until your entire book is outlined.",
              duration: "10 minutes per chapter"
            }
          ],
          insight: "The whole outlining process often takes about 30 minutes. Even if it takes an hour, you've outlined your entire book in one day!"
        },
        {
          day: 2,
          title: "Elaborate on Topics",
          focus: "Benefits, Introduction, First Chapter Writing",
          tasks: [
            {
              title: "Transcribe notes",
              description: "Transfer notes from your spiral notebook/recorder into your writing space."
            },
            {
              title: "Say your daily affirmation",
              description: "Set timer for 1 minute and say your focus statements aloud.",
              duration: "1 minute"
            },
            {
              title: "List 8-12 reasons why your audience needs your book",
              description: "What benefits can they gain? What can they learn? Why should they learn it?"
            },
            {
              title: "Write a book summary/introduction",
              description: "Using the reasons above as a guide, write a summary of what your book is about and why. This becomes your introduction."
            },
            {
              title: "Choose the chapter that interests you most",
              description: "Select any chapter you're most excited about right now and write an introductory paragraph."
            },
            {
              title: "Fill in each subtopic with paragraphs",
              description: "Explain each subject heading with complete sentences organized in paragraphs. 1-10 paragraphs per subtopic."
            }
          ],
          insight: "After Day 1, writing becomes 'fill in the blanks' because you have a complete outline!"
        }
      ]
    },
    {
      name: "Writing Phase",
      description: "Write all your chapters — it's a game of fill in the blanks",
      days: generateWritingDays(3, 13)
    },
    {
      name: "Research & First Draft",
      description: "Fact-check, organize, and create your first complete draft",
      days: [
        {
          day: 14,
          title: "Research and Fact-Checking",
          focus: "Research all marked subtopics",
          tasks: [
            {
              title: "Say your daily affirmation",
              description: "Set timer for 1 minute and say your focus statements aloud.",
              duration: "1 minute"
            },
            {
              title: "List all marked subtopics",
              description: "Gather every subtopic you marked with a star (*) or question mark (?)"
            },
            {
              title: "Research thoroughly",
              description: "This is your only day for research — use time wisely! Research all marked information."
            },
            {
              title: "Incorporate findings",
              description: "Add researched information into your subtopics if useful. Delete subtopics that no longer seem necessary."
            },
            {
              title: "Credit sources properly",
              description: "Do NOT violate copyrights. Understand information and explain it in YOUR OWN WORDS. Credit proper sources."
            }
          ],
          insight: "This helps readers respect you as a diligent researcher and helps publishers identify if permissions are needed."
        },
        {
          day: 15,
          title: "The First Draft",
          focus: "Organization and first complete version",
          tasks: [
            {
              title: "Continue corrections from research",
              description: "Implement all research findings into your manuscript."
            },
            {
              title: "Organize chapters",
              description: "Review your chapter order. Does it need to change? Move topics accordingly."
            },
            {
              title: "Write updated Table of Contents",
              description: "Place after the introduction."
            },
            {
              title: "Write your conclusion",
              description: "Summarize what you've told the reader and why. Point out how the information benefits them."
            },
            {
              title: "Print on light pink paper",
              description: "Print today's version of your manuscript on light pink paper so you'll recognize it later. Separate chapters with paper clips."
            }
          ]
        },
        {
          day: 16,
          title: "The Read-Through",
          focus: "Read your manuscript with fresh eyes",
          tasks: [
            {
              title: "Read pink manuscript straight through",
              description: "Don't stop to make major corrections. Note corrections as you go and write them directly on the pink pages."
            },
            {
              title: "Make notes in the margins",
              description: "Record new ideas or changes you'd like to make."
            },
            {
              title: "Chapter reflection",
              description: "At the end of each chapter, stop and ask: Have I explained this thoroughly? Clearly? Simply? What was the purpose? Have I fulfilled it?"
            },
            {
              title: "Selective re-reading",
              description: "Reread parts that interest you, parts that bother you (and work on them), and parts you feel especially proud of."
            }
          ]
        }
      ]
    },
    {
      name: "Clean Up & Finalize",
      description: "Polish your manuscript and prepare the final version",
      days: [
        ...generateCleanUpDays(17, 20),
        {
          day: 21,
          title: "The Last Day — Finalization",
          focus: "Create your final manuscript version",
          tasks: [
            {
              title: "Input all changes and corrections",
              description: "Transfer all changes from the pink copy into your computer."
            },
            {
              title: "Print on yellow paper",
              description: "Print your finalized manuscript on yellow paper."
            },
            {
              title: "Read the yellow version",
              description: "Is it clear? Make corrections on the paper as you go."
            },
            {
              title: "Input all changes from yellow version",
              description: "Make final revisions and corrections in your digital manuscript."
            },
            {
              title: "Run spell-check again",
              description: "Final spelling and grammar check."
            },
            {
              title: "Celebrate!",
              description: "You've completed your manuscript in 21 days! Now take a minimum 3-day break to let it steep on the backburner of your creative mind."
            }
          ],
          insight: "After Day 21, take a minimum 3-day break. Don't look at your manuscript. Do restful, fun activities. Then come back with fresh eyes for final revisions."
        }
      ]
    }
  ]
};

function generateWritingDays(start, end) {
  const days = [];
  for (let i = start; i <= end; i++) {
    days.push({
      day: i,
      title: `Write Chapter ${i - 2}`,
      focus: "Write chapters using the fill-in-the-blanks method",
      tasks: [
        {
          title: "Transcribe notes",
          description: "Transfer notes from your spiral notebook into appropriate chapters."
        },
        {
          title: "Say your daily affirmation",
          description: "Set timer for 1 minute and say your focus statements aloud.",
          duration: "1 minute"
        },
        {
          title: "Format today's work",
          description: "Book title at top in ALL CAPS BOLD. Chapter title in Title Case Bold. List all subtopics in order. Double space."
        },
        {
          title: "Write the chapter",
          description: "Start with whatever topic interests you most. Write sentences and paragraphs explaining each subtopic. Write the way you talk. Don't polish as you go. Mark unclear subtopics with (?) and research-needed ones with (*)."
        }
      ],
      insight: "It's a game of fill in the blanks! Write intro paragraph, go to first subtopic, explain in paragraphs, repeat. When finished with all subtopics, you've written a chapter."
    });
  }
  return days;
}

function generateCleanUpDays(start, end) {
  const days = [];
  for (let i = start; i <= end; i++) {
    days.push({
      day: i,
      title: `Clean Up Day ${i - 16}`,
      focus: "Revise and polish your manuscript",
      tasks: [
        {
          title: "Transcribe notes",
          description: "Transfer any new notes from your notebook."
        },
        {
          title: "Say your daily affirmation",
          description: "Set timer for 1 minute and say your focus statements aloud.",
          duration: "1 minute"
        },
        {
          title: "Make revisions on pink copy",
          description: "Is there anything you can say more clearly?"
        },
        {
          title: "Review Purpose Statement",
          description: "Does your work fulfill the purpose?"
        },
        {
          title: "Review your 8-12 reasons",
          description: "Does your manuscript answer why readers should read your book?"
        },
        {
          title: "Check introduction and conclusion",
          description: "Insert/update the introduction after Table of Contents and conclusion after the last chapter. Rewrite if necessary."
        },
        {
          title: "Run spell-check",
          description: "Check for spelling and grammar errors."
        }
      ]
    });
  }
  return days;
}

// Flatten all days
const allDays = timelineData.phases.reduce((acc, phase) => acc.concat(phase.days), []);

// ===================================
// STATE
// ===================================
let isPaid = false;
let progress = { completedDays: [], taskCompletion: {}, notes: {} };
let writingContent = {};
let currentView = 'today';
let currentModalDay = null;
let autoSaveTimeout = null;

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', async () => {
  initSupabase();

  // Check auth
  const session = await requireAuth();
  if (!session) return;

  // Check payment status
  isPaid = await checkPaidStatus();

  if (!isPaid) {
    document.getElementById('upgradeBanner').style.display = 'block';
    const payUrl = await getPaymentUrl();
    if (payUrl) {
      document.getElementById('upgradeLink').href = payUrl;
    }
  }

  // Load progress from Supabase
  await loadProgress();
  await loadWritingContent();

  // Render
  updateAffirmation();
  renderTimeline();
  updateStats();
  loadTodayView();
});

// ===================================
// DATA LOADING (Supabase)
// ===================================
async function loadProgress() {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*');

    if (error) throw error;

    progress = { completedDays: [], taskCompletion: {}, notes: {} };

    if (data) {
      data.forEach(row => {
        if (row.task_index !== null && row.task_index !== undefined) {
          if (!progress.taskCompletion[row.day_number]) {
            progress.taskCompletion[row.day_number] = {};
          }
          progress.taskCompletion[row.day_number][row.task_index] = row.completed;
        }
        if (row.notes && row.task_index === null) {
          progress.notes[row.day_number] = row.notes;
        }
      });

      // Calculate completed days
      allDays.forEach(day => {
        if (progress.taskCompletion[day.day]) {
          const allComplete = day.tasks.every((_, idx) =>
            progress.taskCompletion[day.day][idx]
          );
          if (allComplete) {
            progress.completedDays.push(day.day);
          }
        }
      });
    }
  } catch (err) {
    console.error('Failed to load progress:', err);
    // Fallback to localStorage
    const saved = localStorage.getItem('nfb_progress');
    if (saved) progress = JSON.parse(saved);
  }
}

async function saveTaskProgress(dayNumber, taskIndex, completed) {
  try {
    const session = await getSession();
    if (!session) return;

    await supabase
      .from('user_progress')
      .upsert({
        user_id: session.user.id,
        day_number: dayNumber,
        task_index: taskIndex,
        completed: completed
      }, { onConflict: 'user_id,day_number,task_index' });
  } catch (err) {
    console.error('Failed to save task progress:', err);
  }

  // Also save to localStorage as backup
  localStorage.setItem('nfb_progress', JSON.stringify(progress));
}

async function loadWritingContent() {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('day_number, writing_content')
      .not('writing_content', 'is', null);

    if (error) throw error;

    if (data) {
      data.forEach(row => {
        if (row.writing_content) {
          writingContent[row.day_number] = row.writing_content;
        }
      });
    }
  } catch (err) {
    console.error('Failed to load writing content:', err);
    const saved = localStorage.getItem('nfb_writing');
    if (saved) writingContent = JSON.parse(saved);
  }
}

async function saveWritingContent(dayNumber, content) {
  writingContent[dayNumber] = content;

  try {
    const session = await getSession();
    if (!session) return;

    await supabase
      .from('user_progress')
      .upsert({
        user_id: session.user.id,
        day_number: dayNumber,
        task_index: null,
        writing_content: content,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,day_number,task_index' });
  } catch (err) {
    console.error('Failed to save writing content:', err);
  }

  localStorage.setItem('nfb_writing', JSON.stringify(writingContent));
}

// ===================================
// AFFIRMATION
// ===================================
function updateAffirmation() {
  let targetDay = 1;
  if (progress.completedDays.length > 0) {
    const maxCompleted = Math.max(...progress.completedDays);
    targetDay = Math.min(maxCompleted + 1, 21);
  }
  const text = dailyAffirmations[targetDay - 1];
  document.getElementById('affirmationText').textContent = `"${text}"`;
}

let affirmationTimerInterval = null;
let affirmationSeconds = 0;

function startAffirmationTimer() {
  const btn = document.getElementById('affirmationTimerBtn');
  const display = document.getElementById('affirmationTimerDisplay');

  affirmationSeconds = 60;
  btn.disabled = true;
  btn.style.opacity = '0.5';
  display.classList.add('active');
  updateAffirmationDisplay();

  affirmationTimerInterval = setInterval(() => {
    affirmationSeconds--;
    updateAffirmationDisplay();
    if (affirmationSeconds <= 0) {
      clearInterval(affirmationTimerInterval);
      display.textContent = 'Complete!';
      setTimeout(() => {
        display.classList.remove('active');
        btn.disabled = false;
        btn.style.opacity = '1';
      }, 3000);
    }
  }, 1000);
}

function updateAffirmationDisplay() {
  const display = document.getElementById('affirmationTimerDisplay');
  const m = Math.floor(affirmationSeconds / 60);
  const s = affirmationSeconds % 60;
  display.textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

// ===================================
// STATS
// ===================================
function updateStats() {
  const completed = progress.completedDays.length;
  const percent = Math.round((completed / 21) * 100);
  document.getElementById('statCompleted').textContent = completed;
  document.getElementById('statProgress').textContent = `${percent}%`;
}

// ===================================
// TIMELINE RENDERING
// ===================================
function renderTimeline() {
  const container = document.getElementById('timelineContainer');
  container.innerHTML = '';

  timelineData.phases.forEach(phase => {
    const section = document.createElement('div');
    section.className = 'phase-section';

    let daysHTML = '';
    phase.days.forEach(day => {
      const isCompleted = progress.completedDays.includes(day.day);
      const taskCount = day.tasks.length;
      const completedCount = getCompletedTaskCount(day.day);
      const isLocked = !isPaid && day.day > 1;

      daysHTML += `
        <div class="day-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}"
             onclick="${isLocked ? 'showPaywall()' : `openDayModal(${day.day})`}">
          <div class="day-card-number">Day ${day.day}</div>
          <div class="day-card-title">${escapeHtml(day.title)}</div>
          <div class="day-card-progress">${completedCount}/${taskCount} tasks</div>
          ${isCompleted ? '<div class="day-card-badge">&#10003; Complete</div>' : ''}
          ${isLocked ? '<div class="day-card-lock">&#128274; Unlock with full access</div>' : ''}
        </div>
      `;
    });

    section.innerHTML = `
      <div class="phase-header">
        <h3 class="phase-name">${escapeHtml(phase.name)}</h3>
        <p class="phase-desc">${escapeHtml(phase.description)}</p>
      </div>
      <div class="days-grid">${daysHTML}</div>
    `;

    container.appendChild(section);
  });
}

function getCompletedTaskCount(dayNumber) {
  if (!progress.taskCompletion[dayNumber]) return 0;
  return Object.values(progress.taskCompletion[dayNumber]).filter(Boolean).length;
}

// ===================================
// DAY MODAL
// ===================================
function openDayModal(dayNumber) {
  const day = allDays.find(d => d.day === dayNumber);
  if (!day) return;

  currentModalDay = day;

  document.getElementById('modalDayLabel').textContent = `Day ${day.day}`;
  document.getElementById('modalTitle').textContent = day.title;
  document.getElementById('modalFocus').textContent = day.focus;

  renderModalTasks(day);

  document.getElementById('dayModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('dayModal').classList.remove('active');
  document.body.style.overflow = '';
  currentModalDay = null;
}

function renderModalTasks(day) {
  const body = document.getElementById('modalBody');
  let html = '<ul class="task-list">';

  day.tasks.forEach((task, index) => {
    const isChecked = isTaskCompleted(day.day, index);
    html += `
      <li class="task-item">
        <div class="task-checkbox ${isChecked ? 'checked' : ''}"
             onclick="toggleTask(${day.day}, ${index})"></div>
        <div class="task-info">
          <div class="task-title">${escapeHtml(task.title)}</div>
          <div class="task-desc">${escapeHtml(task.description)}</div>
          ${task.duration ? `<div class="task-duration">&#9201; ${escapeHtml(task.duration)}</div>` : ''}
          ${task.duration ? `<button class="task-timer-btn" onclick="startTaskTimer('${escapeHtml(task.duration)}')">Start Timer</button>` : ''}
        </div>
      </li>
    `;
  });

  html += '</ul>';

  if (day.insight) {
    html += `
      <div class="insight-card">
        <div class="insight-card-label">Key Insight</div>
        <div class="insight-card-text">${escapeHtml(day.insight)}</div>
      </div>
    `;
  }

  body.innerHTML = html;
}

// ===================================
// TASK COMPLETION
// ===================================
function isTaskCompleted(dayNumber, taskIndex) {
  return progress.taskCompletion[dayNumber]?.[taskIndex] || false;
}

function toggleTask(dayNumber, taskIndex) {
  if (!progress.taskCompletion[dayNumber]) {
    progress.taskCompletion[dayNumber] = {};
  }

  const newState = !progress.taskCompletion[dayNumber][taskIndex];
  progress.taskCompletion[dayNumber][taskIndex] = newState;

  // Check if all tasks are complete
  const day = allDays.find(d => d.day === dayNumber);
  if (day) {
    const allComplete = day.tasks.every((_, idx) => progress.taskCompletion[dayNumber][idx]);
    if (allComplete && !progress.completedDays.includes(dayNumber)) {
      progress.completedDays.push(dayNumber);
    } else if (!allComplete) {
      progress.completedDays = progress.completedDays.filter(d => d !== dayNumber);
    }
  }

  saveTaskProgress(dayNumber, taskIndex, newState);
  renderModalTasks(day);
  renderTimeline();
  updateStats();
  updateAffirmation();
}

// ===================================
// TASK TIMER
// ===================================
let taskTimerInterval = null;
let taskTimerSeconds = 0;

function startTaskTimer(duration) {
  clearInterval(taskTimerInterval);
  const minutes = parseInt(duration) || 10;
  taskTimerSeconds = minutes * 60;

  // Use the affirmation timer display for now
  const display = document.getElementById('affirmationTimerDisplay');
  display.classList.add('active');

  taskTimerInterval = setInterval(() => {
    taskTimerSeconds--;
    const m = Math.floor(taskTimerSeconds / 60);
    const s = taskTimerSeconds % 60;
    display.textContent = `${m}:${s.toString().padStart(2, '0')}`;

    if (taskTimerSeconds <= 0) {
      clearInterval(taskTimerInterval);
      display.textContent = 'Time\'s up!';
      playTimerSound();
      setTimeout(() => display.classList.remove('active'), 5000);
    }
  }, 1000);
}

function playTimerSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const t = ctx.currentTime + i * 0.15;
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
      osc.start(t);
      osc.stop(t + 0.5);
    });
  } catch (e) {
    // Audio not supported
  }
}

// ===================================
// WRITING WORKSPACE
// ===================================
function switchView(view) {
  currentView = view;

  document.querySelectorAll('.view-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });

  document.getElementById('todayView').style.display = view === 'today' ? '' : 'none';
  document.getElementById('fullView').style.display = view === 'full' ? '' : 'none';
  document.getElementById('outlineView').style.display = view === 'outline' ? '' : 'none';

  if (view === 'today') loadTodayView();
  else if (view === 'full') loadFullManuscriptView();
  else if (view === 'outline') loadOutlineView();
}

function loadTodayView() {
  let targetDay = 1;
  if (progress.completedDays.length > 0) {
    const maxCompleted = Math.max(...progress.completedDays);
    targetDay = Math.min(maxCompleted + 1, 21);
  }

  const day = allDays.find(d => d.day === targetDay);
  if (!day) return;

  document.getElementById('todayTitle').textContent = `Day ${day.day}: ${day.title}`;
  document.getElementById('todayFocus').textContent = day.focus;

  const promptsEl = document.getElementById('todayPrompts');
  let promptsHTML = '<h4>Today\'s Tasks:</h4><ul>';
  day.tasks.forEach(task => {
    promptsHTML += `<li>${escapeHtml(task.title)}</li>`;
  });
  promptsHTML += '</ul>';
  promptsEl.innerHTML = promptsHTML;

  const editor = document.getElementById('todayEditor');
  editor.value = writingContent[targetDay] || '';
  updateTodayWordCount();

  editor.oninput = () => {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      saveWritingContent(targetDay, editor.value);
    }, 1000);
    updateTodayWordCount();
  };
}

function updateTodayWordCount() {
  const editor = document.getElementById('todayEditor');
  const count = countWords(editor.value);
  document.getElementById('todayWordCount').textContent = `${count} ${count === 1 ? 'word' : 'words'}`;
}

function loadFullManuscriptView() {
  const container = document.getElementById('fullManuscript');
  const hasContent = Object.values(writingContent).some(c => c && c.trim());

  if (!hasContent) {
    container.innerHTML = `
      <div class="manuscript-empty">
        <div class="manuscript-empty-icon">&#128221;</div>
        <p>Your manuscript will appear here as you write each day.</p>
        <p style="margin-top: 8px; font-size: 13px; color: var(--color-text-muted);">Switch to "Today" to start writing!</p>
      </div>
    `;
    document.getElementById('fullWordCount').textContent = '0 words';
    return;
  }

  let html = '';
  let totalWords = 0;

  for (let dayNum = 1; dayNum <= 21; dayNum++) {
    if (writingContent[dayNum] && writingContent[dayNum].trim()) {
      const day = allDays.find(d => d.day === dayNum);
      const wc = countWords(writingContent[dayNum]);
      totalWords += wc;

      html += `
        <div class="manuscript-day">
          <div class="manuscript-day-header">
            <h3 class="manuscript-day-title">Day ${dayNum}: ${day ? escapeHtml(day.title) : 'Unknown'}</h3>
            <span class="manuscript-day-wc">${wc} words</span>
          </div>
          <div class="manuscript-day-text">${escapeHtml(writingContent[dayNum])}</div>
        </div>
      `;
    }
  }

  container.innerHTML = html;
  document.getElementById('fullWordCount').textContent = `${totalWords} words`;
}

function loadOutlineView() {
  const container = document.getElementById('outlineContent');
  let html = '';

  allDays.forEach(day => {
    const hasContent = writingContent[day.day] && writingContent[day.day].trim();
    const wc = hasContent ? countWords(writingContent[day.day]) : 0;
    const isCompleted = progress.completedDays.includes(day.day);

    html += `
      <div class="outline-item ${isCompleted ? 'completed' : ''}">
        <div style="display: flex; align-items: center;">
          <span class="outline-item-day">Day ${day.day}</span>
          <span class="outline-item-title">${escapeHtml(day.title)}</span>
        </div>
        <div class="outline-item-stats">
          ${wc} words
          ${isCompleted ? '<br><span style="color: var(--color-success);">&#10003; Complete</span>' : ''}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ===================================
// EXPORT
// ===================================
function exportManuscript() {
  let manuscript = 'NONFICTION BLUEPRINT\nCOMPLETE MANUSCRIPT\n================================\n\n';
  let totalWords = 0;

  for (let dayNum = 1; dayNum <= 21; dayNum++) {
    if (writingContent[dayNum] && writingContent[dayNum].trim()) {
      const day = allDays.find(d => d.day === dayNum);
      totalWords += countWords(writingContent[dayNum]);
      manuscript += `\n\n--- DAY ${dayNum}: ${day ? day.title.toUpperCase() : 'UNKNOWN'} ---\n\n`;
      manuscript += writingContent[dayNum] + '\n';
    }
  }

  manuscript += `\n\n================================\nTOTAL WORD COUNT: ${totalWords}\nGENERATED: ${new Date().toLocaleString()}\n`;

  const blob = new Blob([manuscript], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `my-book-manuscript-${new Date().toISOString().split('T')[0]}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

// ===================================
// PAYWALL
// ===================================
function showPaywall() {
  // Open a simple paywall modal
  const modal = document.getElementById('dayModal');
  const body = document.getElementById('modalBody');

  document.getElementById('modalDayLabel').textContent = 'Full Access Required';
  document.getElementById('modalTitle').textContent = 'Unlock All 21 Days';
  document.getElementById('modalFocus').textContent = '';

  body.innerHTML = `
    <div class="paywall">
      <div class="paywall-title">You've completed Day 1!</div>
      <p class="paywall-text">Days 2-21 of the complete Nonfiction Blueprint methodology are available with full access. Continue your journey from outline to finished manuscript.</p>
      <div class="paywall-pricing"><span class="paywall-price-old">$59</span> <span class="paywall-price-now">$29.50</span></div>
      <a href="#" class="paywall-btn" id="paywallBuyBtn">Unlock Full Access &rarr;</a>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Set payment URL
  getPaymentUrl().then(url => {
    if (url) document.getElementById('paywallBuyBtn').href = url;
  });
}

// ===================================
// UTILITIES
// ===================================
function countWords(text) {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function handleSignOut() {
  await signOut();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && currentModalDay) closeModal();
});

// Close modal on overlay click
document.getElementById('dayModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('dayModal')) closeModal();
});
