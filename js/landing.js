// Nonfiction Blueprint - Landing Page Interactions

// Headlines and subheadlines - matched to methodology
const headlines = [
  "Stop Analyzing. Start Writing. Finish Your Book in 21 Days.",
  "The Paralysis Is Caused by Analysis. Here's the Cure.",
  "Stop Learning Software. Start Writing Your Book.",
  "Your First Draft Doesn't Have to Be Perfect. It Just Has to Exist.",
  "You Have the Ideas. You Have the Expertise. Now Get Them Into a Book.",
  "Write Your Nonfiction Book in 21 Days. Not 21 Months.",
  "Scattered Ideas. No Structure. Can't Get Started. Sound Familiar?",
  "Brain Dump First. Organize Second. Write Your Book in 21 Days."
];

const subheads = [
  "The Nonfiction Blueprint's brain-dump-first system gets your ideas out of your head and into a complete book outline before you can overthink it. Then 21 days of guided writing turns that outline into a finished manuscript.",
  "It's not lack of ideas. It's not lack of time. It's analysis paralysis. You keep reorganizing instead of writing. The 21-day system fixes this by making you write first and organize second.",
  "You've spent more time learning Scrivener than writing your book. The tool is not the problem. The Nonfiction Blueprint works with whatever you already have — pen, laptop, phone, anything.",
  "47% of published nonfiction authors say organizing content was the single hardest part. Our brain-dump-first method solves it in one sitting.",
  "Most aspiring authors spend years planning. Our 21-day system takes you from scattered ideas to finished manuscript in three weeks. Day 1: brain dump everything. Day 21: done.",
  "Set a 10-minute timer. Write down everything you know about your topic. Don't organize. Don't think. Just write. Congratulations — you just started your book.",
  "Not written by AI. Not with templates. With YOUR ideas, YOUR voice, YOUR expertise. The system just tells you what to do each day."
];

const headlineContainer = document.getElementById('headlineContainer');
const headlineText = document.getElementById('headlineText');
const subheadText = document.getElementById('subheadText');

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function updateHeadline() {
  headlineText.innerHTML = headlines[getRandomIndex(headlines.length)];
  subheadText.textContent = subheads[getRandomIndex(subheads.length)];
}

function rotateHeadline() {
  headlineContainer.classList.add('fade-out');
  setTimeout(() => {
    updateHeadline();
    headlineContainer.classList.remove('fade-out');
  }, 300);
}

// Initialize with random headline
updateHeadline();

// Rotate every 6 seconds
setInterval(rotateHeadline, 6000);

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Email form handling
document.getElementById('emailForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('emailInput').value;

  if (email.includes('@')) {
    // TODO: Replace with Brevo API integration
    // Store email temporarily so thank-you page can reference it
    try { localStorage.setItem('nb_lead_email', email); } catch(e) {}

    // Show success message briefly, then redirect to thank-you
    document.getElementById('emailForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';

    setTimeout(function() {
      window.location.href = '/thank-you.html';
    }, 1500);
  }
});
