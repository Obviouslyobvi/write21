// Book Writing 21-Day Method - Application Logic

// ===================================
// STATE MANAGEMENT
// ===================================

let currentDay = null;
let timerInterval = null;
let timerSeconds = 0;

// ===================================
// THEME MANAGEMENT
// ===================================

// Load saved theme preferences
function loadThemePreferences() {
    const saved = localStorage.getItem('themePreferences');
    if (saved) {
        return JSON.parse(saved);
    }
    return {
        mode: 'dark',
        colorTheme: 'mocha-mousse'
    };
}

// Save theme preferences
function saveThemePreferences(preferences) {
    localStorage.setItem('themePreferences', JSON.stringify(preferences));
}

let themePreferences = loadThemePreferences();

// Apply theme on page load
function applyTheme() {
    // Apply mode
    if (themePreferences.mode === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }

    // Apply color theme
    document.body.setAttribute('data-color-theme', themePreferences.colorTheme);

    // Update active states in UI
    updateThemeUI();
}

// Update theme UI buttons
function updateThemeUI() {
    // Update mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        const mode = btn.getAttribute('data-mode');
        if (mode === themePreferences.mode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update color theme buttons
    document.querySelectorAll('.color-theme-btn').forEach(btn => {
        const theme = btn.getAttribute('data-theme');
        if (theme === themePreferences.colorTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Toggle theme panel
function toggleThemePanel() {
    const panel = document.getElementById('themePanel');
    panel.classList.toggle('active');
}

// Set mode (dark/light)
function setMode(mode) {
    themePreferences.mode = mode;
    saveThemePreferences(themePreferences);
    applyTheme();
}

// Set color theme
function setColorTheme(theme) {
    themePreferences.colorTheme = theme;
    saveThemePreferences(themePreferences);
    applyTheme();
}

// Close theme panel when clicking outside
document.addEventListener('click', (e) => {
    const themeControls = document.querySelector('.theme-controls');
    const panel = document.getElementById('themePanel');

    if (themeControls && !themeControls.contains(e.target) && panel.classList.contains('active')) {
        panel.classList.remove('active');
    }
});


// Load saved progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('bookWritingProgress');
    if (saved) {
        return JSON.parse(saved);
    }
    return {
        completedDays: [],
        taskCompletion: {}, // { dayNumber: { taskIndex: boolean } }
        notes: {} // { dayNumber: "note text" }
    };
}

// Save progress to localStorage
function saveProgress(progress) {
    localStorage.setItem('bookWritingProgress', JSON.stringify(progress));
}

let progress = loadProgress();

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    renderTimeline();
    updateStats();
    updateDailyAffirmation();
    initializeWorkspace();
});

// ===================================
// DAILY AFFIRMATION UPDATE
// ===================================

function updateDailyAffirmation() {
    const affirmationText = document.getElementById('affirmationText');
    if (!affirmationText) return;

    // Determine which day's affirmation to show
    // Show the affirmation for the next uncompleted day, or Day 1 if none completed
    let targetDay = 1;

    if (progress.completedDays.length > 0) {
        // Find the next day after the last completed day
        const maxCompleted = Math.max(...progress.completedDays);
        targetDay = maxCompleted < 21 ? maxCompleted + 1 : 21;
    }

    // Update the affirmation text (array is 0-indexed, so subtract 1)
    const affirmation = dailyAffirmations[targetDay - 1];
    affirmationText.textContent = `"${affirmation}"`;

    // Add a subtle animation
    affirmationText.style.animation = 'none';
    setTimeout(() => {
        affirmationText.style.animation = 'fadeInUp 0.6s ease-out';
    }, 10);
}

// ===================================
// TIMELINE RENDERING
// ===================================

function renderTimeline() {
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = '';

    timelineData.phases.forEach(phase => {
        const phaseElement = document.createElement('div');
        phaseElement.className = 'timeline-phase';

        phaseElement.innerHTML = `
            <div class="phase-header">
                <h3 class="phase-title">${phase.name}</h3>
                <p class="phase-description">${phase.description}</p>
            </div>
            <div class="timeline-days" id="phase-${sanitize(phase.name)}"></div>
        `;

        timelineContainer.appendChild(phaseElement);

        const daysContainer = document.getElementById(`phase-${sanitize(phase.name)}`);

        phase.days.forEach(day => {
            const dayElement = createDayElement(day);
            daysContainer.appendChild(dayElement);
        });
    });
}

function createDayElement(day) {
    const isCompleted = progress.completedDays.includes(day.day);
    const taskCount = day.tasks.length;
    const completedTaskCount = getCompletedTaskCount(day.day);

    const dayElement = document.createElement('div');
    dayElement.className = `timeline-day ${isCompleted ? 'completed' : ''}`;
    dayElement.onclick = () => openDayModal(day);

    dayElement.innerHTML = `
        <div class="day-header">
            <div class="day-number">Day ${day.day}</div>
            <div class="day-title">${day.title}</div>
            ${isCompleted ? '<div class="completion-badge">✓ Completed</div>' : ''}
        </div>
        <div class="day-focus">${day.focus}</div>
        <div class="day-tasks-preview">${completedTaskCount}/${taskCount} tasks completed</div>
    `;

    return dayElement;
}

function sanitize(str) {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// ===================================
// MODAL MANAGEMENT
// ===================================

function openDayModal(day) {
    currentDay = day;
    const modal = document.getElementById('dayModal');

    // Update modal header
    document.getElementById('modalDayNumber').textContent = `Day ${day.day}`;
    document.getElementById('modalTitle').textContent = day.title;
    document.getElementById('modalFocus').textContent = day.focus;

    // Render tasks
    renderTasks(day);

    // Load notes
    const notesTextarea = document.getElementById('dayNotes');
    notesTextarea.value = progress.notes[day.day] || '';

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('dayModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentDay = null;
}

function renderTasks(day) {
    const modalBody = document.getElementById('modalBody');

    let tasksHTML = '<ul class="task-list">';

    day.tasks.forEach((task, index) => {
        const isChecked = isTaskCompleted(day.day, index);
        const taskTitleSafe = task.title.replace(/'/g, "\\'");
        // Escape quotes properly for HTML attribute context
        const safeTitle = task.title.replace(/'/g, "&apos;").replace(/"/g, "&quot;");

        tasksHTML += `
            <li class="task-item" onclick="openTaskFocus(currentDay, ${index})">
                <div class="task-header" style="display: flex; gap: 1rem; align-items: flex-start;">
                    <div class="task-checkbox ${isChecked ? 'checked' : ''}" 
                         onclick="event.stopPropagation(); toggleTask(${day.day}, ${index})"></div>
                    <div class="task-content">
                        <h4>${task.title}</h4>
                        <p>${task.description}</p>
                        ${task.duration ? `<p><em style="font-size: 0.8em; color: var(--color-primary-light);">⏱️ Duration: ${task.duration}</em></p>` : ''}
                        
                        <div class="task-actions">
                            ${task.duration ? `
                                <button class="task-action-btn btn-timer" onclick="event.stopPropagation(); startTaskTimer('${taskTitleSafe}', '${task.duration}')">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                        <path d="M12 6v6l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                    Start Timer
                                </button>
                            ` : ''}
                            <button class="task-action-btn btn-work" onclick="event.stopPropagation(); openTaskFocus(currentDay, ${index})">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                Work on This
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        `;
    });

    tasksHTML += '</ul>';

    if (day.insight) {
        tasksHTML += `
            <div style="margin-top: 2rem; padding: 1.5rem; background: var(--color-bg-tertiary); border-left: 4px solid var(--color-primary); border-radius: var(--radius-md);">
                <strong style="color: var(--color-primary-light);">💡 Key Insight:</strong>
                <p style="margin-top: 0.5rem; color: var(--color-text-secondary);">${day.insight}</p>
            </div>
        `;
    }

    modalBody.innerHTML = tasksHTML;
}

// ===================================
// TASK FOCUS SYSTEM
// ===================================

let focusedTaskIndex = -1;

function openTaskFocus(day, taskIndex) {
    if (!day) return;
    focusedTaskIndex = taskIndex;
    const task = day.tasks[taskIndex];

    // Populate overlay
    document.getElementById('focusTaskBadge').textContent = `DAY ${day.day} TASK`;
    document.getElementById('focusTaskTitle').textContent = task.title;
    document.getElementById('focusTaskDescription').textContent = task.description;

    // Add timer button if duration exists
    const timerArea = document.getElementById('focusTimerArea');
    if (task.duration) {
        const taskTitleSafe = task.title.replace(/'/g, "\\'");
        timerArea.innerHTML = `
            <button class="task-action-btn btn-timer" style="padding: 0.5rem 1rem; font-size: 0.9rem;" 
                    onclick="startTaskTimer('${taskTitleSafe}', '${task.duration}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 6v6l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Start ${task.duration} Timer
            </button>
        `;
    } else {
        timerArea.innerHTML = '';
    }

    // Load content for this specific task
    const editor = document.getElementById('focusTaskEditor');
    // Load existing content for the day (allows context)
    editor.value = writingContent[day.day] || '';

    document.getElementById('taskFocusOverlay').classList.add('active');

    // Focus listener to sync back to main writing content
    editor.oninput = (e) => {
        writingContent[day.day] = e.target.value;
        // Also update the main workspace editors if they are open
        const todayEditor = document.getElementById('todayEditor');
        if (todayEditor) todayEditor.value = e.target.value;

        // Debounce save
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(saveWritingContent, 1000);
        updateTodayWordCount();
    };
}

function closeTaskFocus() {
    document.getElementById('taskFocusOverlay').classList.remove('active');
    focusedTaskIndex = -1;
}

function completeFocusedTask() {
    if (currentDay && focusedTaskIndex !== -1) {
        // Mark as complete if not already
        if (!isTaskCompleted(currentDay.day, focusedTaskIndex)) {
            toggleTask(currentDay.day, focusedTaskIndex);
        }
    }
    closeTaskFocus();
}

// ===================================
// TASK TIMER SYSTEM
// ===================================

let taskTimerInterval = null;
let taskTimerSeconds = 0;
let taskTimerPaused = false;
let currentTaskName = '';

// Start task timer
function startTaskTimer(taskTitle, duration) {
    // Stop any existing timer
    stopTimer();

    // Parse duration (e.g., "10 minutes" -> 600 seconds)
    const minutes = parseInt(duration) || 10;
    taskTimerSeconds = minutes * 60;
    taskTimerPaused = false;
    currentTaskName = taskTitle;

    // Show inline timer in Task Focus Overlay
    const inlineTimer = document.getElementById('inlineTimer');
    if (inlineTimer) {
        inlineTimer.classList.add('active');
    }

    // Update display
    updateTaskTimerDisplay();

    // Start countdown
    taskTimerInterval = setInterval(() => {
        if (!taskTimerPaused) {
            taskTimerSeconds--;
            updateTaskTimerDisplay();

            // Check if timer finished
            if (taskTimerSeconds <= 0) {
                timerComplete();
            } else if (taskTimerSeconds <= 10) {
                // Add pulse animation in last 10 seconds
                if (inlineTimer) {
                    inlineTimer.classList.add('pulse');
                }
            }
        }
    }, 1000);
}

// Update task timer display
function updateTaskTimerDisplay() {
    const minutes = Math.floor(taskTimerSeconds / 60);
    const seconds = taskTimerSeconds % 60;
    const display = document.getElementById('inlineTimerDisplay');
    if (display) {
        display.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Timer complete
function timerComplete() {
    clearInterval(taskTimerInterval);

    const inlineTimer = document.getElementById('inlineTimer');
    if (inlineTimer) {
        inlineTimer.classList.remove('pulse');
        inlineTimer.classList.add('complete');
    }

    // Update display
    const display = document.getElementById('inlineTimerDisplay');
    if (display) {
        display.textContent = '0:00 - Done!';
    }

    // Play sound if enabled
    const audioToggle = document.getElementById('audioToggleTimer');
    if (audioToggle && audioToggle.checked) {
        playTimerSound();
    }

    // Auto-hide timer after 5 seconds
    setTimeout(() => {
        stopTimer();
    }, 5000);
}

// Play timer completion sound
function playTimerSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create three tones for a pleasant chime
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

        frequencies.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = freq;
            oscillator.type = 'sine';

            const startTime = audioContext.currentTime + (index * 0.15);
            gainNode.gain.setValueAtTime(0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.5);
        });
    } catch (e) {
        console.log('Audio not supported', e);
    }
}

// Toggle pause/resume timer
function togglePauseTimer() {
    taskTimerPaused = !taskTimerPaused;
    const btn = document.getElementById('pauseTimerBtn');

    if (taskTimerPaused) {
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 3l14 9-14 9V3z" fill="currentColor"/>
            </svg>
            Resume
        `;
    } else {
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 4h4v16H6V4zM14 4h4v16h-4V4z" fill="currentColor"/>
            </svg>
            Pause
        `;
    }
}

// Stop timer
function stopTimer() {
    clearInterval(taskTimerInterval);
    taskTimerInterval = null;
    taskTimerSeconds = 0;
    taskTimerPaused = false;

    const inlineTimer = document.getElementById('inlineTimer');
    if (inlineTimer) {
        inlineTimer.classList.remove('active', 'pulse', 'complete');
    }

    // Reset display
    const display = document.getElementById('inlineTimerDisplay');
    if (display) {
        display.textContent = '10:00';
    }

    // Reset pause button
    const btn = document.getElementById('pauseTimerBtn');
    if (btn) {
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 4h4v16H6V4zM14 4h4v16h-4V4z" fill="currentColor"/>
            </svg>
            Pause
        `;
    }
}

// Alias for backward compatibility
function stopFloatingTimer() {
    stopTimer();
}

// ===================================
// TASK COMPLETION
// ===================================

function toggleTask(dayNumber, taskIndex) {
    if (!progress.taskCompletion[dayNumber]) {
        progress.taskCompletion[dayNumber] = {};
    }

    const isCurrentlyChecked = progress.taskCompletion[dayNumber][taskIndex];
    progress.taskCompletion[dayNumber][taskIndex] = !isCurrentlyChecked;

    // Check if all tasks are complete for this day
    const day = allDays.find(d => d.day === dayNumber);
    if (day) {
        const allTasksComplete = day.tasks.every((_, index) =>
            progress.taskCompletion[dayNumber][index]
        );

        if (allTasksComplete && !progress.completedDays.includes(dayNumber)) {
            progress.completedDays.push(dayNumber);
            showCelebration(dayNumber);
        } else if (!allTasksComplete && progress.completedDays.includes(dayNumber)) {
            progress.completedDays = progress.completedDays.filter(d => d !== dayNumber);
        }
    }

    saveProgress(progress);
    renderTasks(day);
    renderTimeline();
    updateStats();
    updateDailyAffirmation(); // Update affirmation based on new progress

    // Update workspace if we're on today's view
    if (currentView === 'today') {
        loadTodayView();
    }
}

function isTaskCompleted(dayNumber, taskIndex) {
    return progress.taskCompletion[dayNumber]?.[taskIndex] || false;
}

function getCompletedTaskCount(dayNumber) {
    if (!progress.taskCompletion[dayNumber]) return 0;
    return Object.values(progress.taskCompletion[dayNumber]).filter(Boolean).length;
}

function showCelebration(dayNumber) {
    // Create celebration overlay
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        color: white;
        padding: 2rem 3rem;
        border-radius: 1rem;
        font-size: 1.5rem;
        font-weight: 700;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        animation: scaleIn 0.5s ease-out;
        text-align: center;
    `;
    celebration.innerHTML = `
        🎉 Day ${dayNumber} Complete! 🎉<br>
        <span style="font-size: 1rem; font-weight: 400; margin-top: 0.5rem; display: block;">
            Keep up the amazing work!
        </span>
    `;

    document.body.appendChild(celebration);

    setTimeout(() => {
        celebration.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => celebration.remove(), 500);
    }, 2000);
}

// ===================================
// NOTES MANAGEMENT
// ===================================

function saveNotes() {
    if (!currentDay) return;

    const notesTextarea = document.getElementById('dayNotes');
    progress.notes[currentDay.day] = notesTextarea.value;
    saveProgress(progress);

    // Show feedback
    const btn = document.querySelector('.save-notes-btn');
    const originalText = btn.textContent;
    btn.textContent = '✓ Saved!';
    btn.style.background = 'var(--color-success)';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

// ===================================
// STATS UPDATE
// ===================================

function updateStats() {
    const totalDays = 21;
    const completedDays = progress.completedDays.length;
    const progressPercent = Math.round((completedDays / totalDays) * 100);

    document.getElementById('totalDays').textContent = totalDays;
    document.getElementById('completedDays').textContent = completedDays;
    document.getElementById('progressPercent').textContent = `${progressPercent}%`;
}

// ===================================
// AFFIRMATION TIMER
// ===================================

function startAffirmationTimer() {
    const timerButton = document.getElementById('timerButton');
    const timerDisplay = document.getElementById('timerDisplay');

    timerSeconds = 60;
    timerButton.disabled = true;
    timerButton.style.opacity = '0.5';
    timerButton.style.cursor = 'not-allowed';

    timerDisplay.classList.add('active');

    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();

        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = '✨ Complete! ✨';
            timerDisplay.classList.remove('active');

            setTimeout(() => {
                timerDisplay.textContent = '';
                timerButton.disabled = false;
                timerButton.style.opacity = '1';
                timerButton.style.cursor = 'pointer';
            }, 3000);
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timerDisplay');
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// ===================================
// NAVIGATION
// ===================================

function scrollToTimeline() {
    const timeline = document.getElementById('timeline');
    timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===================================
// KEYBOARD SHORTCUTS
// ===================================

document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape' && currentDay) {
        closeModal();
    }

    // Ctrl/Cmd + S to save notes
    if ((e.ctrlKey || e.metaKey) && e.key === 's' && currentDay) {
        e.preventDefault();
        saveNotes();
    }
});

// ===================================
// PROGRESS EXPORT/IMPORT
// ===================================

function exportProgress() {
    const dataStr = JSON.stringify(progress, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `book-writing-progress-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

function importProgress(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            progress = imported;
            saveProgress(progress);
            renderTimeline();
            updateStats();
            alert('Progress imported successfully!');
        } catch (error) {
            alert('Failed to import progress. Please check the file format.');
        }
    };
    reader.readAsText(file);
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        progress = {
            completedDays: [],
            taskCompletion: {},
            notes: {}
        };
        saveProgress(progress);
        renderTimeline();
        updateStats();
        if (currentDay) {
            closeModal();
        }
    }
}

// ===================================
// WRITING WORKSPACE
// ===================================

let currentView = 'today';
let writingContent = loadWritingContent();
let autoSaveTimeout = null;

// Load writing content from localStorage
function loadWritingContent() {
    const saved = localStorage.getItem('writingContent');
    if (saved) {
        return JSON.parse(saved);
    }
    return {}; // { dayNumber: "content text" }
}

// Save writing content to localStorage
function saveWritingContent() {
    localStorage.setItem('writingContent', JSON.stringify(writingContent));
}

// Switch between workspace views
function switchView(view) {
    currentView = view;

    // Update button states
    document.querySelectorAll('.view-btn').forEach(btn => {
        if (btn.getAttribute('data-view') === view) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update view visibility
    document.querySelectorAll('.workspace-view').forEach(viewEl => {
        viewEl.classList.remove('active');
    });

    const activeView = document.getElementById(`${view}View`);
    if (activeView) {
        activeView.classList.add('active');
    }

    // Load appropriate content
    if (view === 'today') {
        loadTodayView();
    } else if (view === 'full') {
        loadFullManuscriptView();
    } else if (view === 'outline') {
        loadOutlineView();
    }
}

// Load today's work view
function loadTodayView() {
    // Determine current day based on progress
    let targetDay = 1;
    if (progress.completedDays.length > 0) {
        const maxCompleted = Math.max(...progress.completedDays);
        targetDay = maxCompleted < 21 ? maxCompleted + 1 : 21;
    }

    const day = allDays.find(d => d.day === targetDay);
    if (!day) return;

    // Update header
    document.getElementById('todayTitle').textContent = `Day ${day.day}: ${day.title}`;
    document.getElementById('todayFocus').textContent = day.focus;

    // Generate prompts
    const promptsContainer = document.getElementById('todayPrompts');
    let promptsHTML = '<h4>Today\'s Writing Prompts:</h4><ul>';

    day.tasks.forEach(task => {
        promptsHTML += `<li>${task.title}</li>`;
    });

    promptsHTML += '</ul>';
    promptsContainer.innerHTML = promptsHTML;

    // Load saved content for this day
    const editor = document.getElementById('todayEditor');
    editor.value = writingContent[targetDay] || '';

    // Update word count
    updateTodayWordCount();

    // Add auto-save listener
    editor.removeEventListener('input', handleEditorInput);
    editor.addEventListener('input', handleEditorInput);
}

// Handle editor input with auto-save
function handleEditorInput(e) {
    // Determine current day
    let targetDay = 1;
    if (progress.completedDays.length > 0) {
        const maxCompleted = Math.max(...progress.completedDays);
        targetDay = maxCompleted < 21 ? maxCompleted + 1 : 21;
    }

    // Update content
    writingContent[targetDay] = e.target.value;

    // Debounced auto-save
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        saveWritingContent();
    }, 1000);

    // Update word count
    updateTodayWordCount();
}

// Update today's word count
function updateTodayWordCount() {
    const editor = document.getElementById('todayEditor');
    const wordCount = countWords(editor.value);
    document.getElementById('todayWordCount').textContent = `${wordCount} ${wordCount === 1 ? 'word' : 'words'}`;
}

// Count words in text
function countWords(text) {
    if (!text || text.trim() === '') return 0;
    return text.trim().split(/\s+/).length;
}

// Load full manuscript view
function loadFullManuscriptView() {
    const container = document.getElementById('fullManuscript');

    // Check if any content exists
    const hasContent = Object.keys(writingContent).length > 0;

    if (!hasContent) {
        container.innerHTML = `
            <div class="manuscript-empty">
                <div class="manuscript-empty-icon">📝</div>
                <p>Your manuscript will appear here as you write each day.</p>
                <p style="margin-top: 1rem; font-size: 0.875rem;">Switch to "Today's Work" to start writing!</p>
            </div>
        `;
        document.getElementById('fullWordCount').textContent = '0 words';
        return;
    }

    let manuscriptHTML = '';
    let totalWords = 0;

    // Generate manuscript from all days
    for (let dayNum = 1; dayNum <= 21; dayNum++) {
        if (writingContent[dayNum] && writingContent[dayNum].trim() !== '') {
            const day = allDays.find(d => d.day === dayNum);
            const dayWords = countWords(writingContent[dayNum]);
            totalWords += dayWords;

            manuscriptHTML += `
                <div class="manuscript-day">
                    <div class="manuscript-day-header">
                        <h3 class="manuscript-day-title">Day ${dayNum}: ${day ? day.title : 'Unknown'}</h3>
                        <span class="manuscript-day-wordcount">${dayWords} words</span>
                    </div>
                    <div class="manuscript-day-content">${escapeHtml(writingContent[dayNum])}</div>
                </div>
            `;
        }
    }

    container.innerHTML = manuscriptHTML;
    document.getElementById('fullWordCount').textContent = `${totalWords} ${totalWords === 1 ? 'word' : 'words'}`;
}

// Load outline view
function loadOutlineView() {
    const container = document.getElementById('outlineContent');
    let outlineHTML = '';

    allDays.forEach(day => {
        const hasContent = writingContent[day.day] && writingContent[day.day].trim() !== '';
        const wordCount = hasContent ? countWords(writingContent[day.day]) : 0;
        const isCompleted = progress.completedDays.includes(day.day);

        outlineHTML += `
            <div class="outline-item ${isCompleted ? 'completed' : ''}">
                <div class="outline-item-info">
                    <div class="outline-item-day">Day ${day.day}</div>
                    <div class="outline-item-title">${day.title}</div>
                </div>
                <div class="outline-item-stats">
                    ${wordCount} words
                    ${isCompleted ? '<br><span style="color: var(--color-success);">✓ Complete</span>' : ''}
                </div>
            </div>
        `;
    });

    container.innerHTML = outlineHTML;
}

// Export manuscript
function exportManuscript() {
    let manuscript = '';
    let totalWords = 0;

    // Title and metadata
    manuscript += '21-DAY NON-FICTION BOOK WRITING METHOD\n';
    manuscript += 'COMPLETE MANUSCRIPT\n';
    manuscript += '================================\n\n';

    // Compile all content
    for (let dayNum = 1; dayNum <= 21; dayNum++) {
        if (writingContent[dayNum] && writingContent[dayNum].trim() !== '') {
            const day = allDays.find(d => d.day === dayNum);
            totalWords += countWords(writingContent[dayNum]);

            manuscript += `\n\n--- DAY ${dayNum}: ${day ? day.title.toUpperCase() : 'UNKNOWN'} ---\n\n`;
            manuscript += writingContent[dayNum];
            manuscript += '\n';
        }
    }

    manuscript += `\n\n================================\n`;
    manuscript += `TOTAL WORD COUNT: ${totalWords}\n`;
    manuscript += `GENERATED: ${new Date().toLocaleString()}\n`;

    // Create and download file
    const blob = new Blob([manuscript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `my-book-manuscript-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    // Show feedback
    const btn = document.querySelector('.export-btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Exported!';
    btn.style.background = 'var(--color-success)';
    btn.style.borderColor = 'var(--color-success)';

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.borderColor = '';
    }, 2000);
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize workspace on page load
function initializeWorkspace() {
    loadTodayView();
}

// ===================================
// ADD CSS FOR FADEOUT ANIMATION
// ===================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);
