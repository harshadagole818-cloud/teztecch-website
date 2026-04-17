/* ============================================================
   TEZTECCH — Blinkit-style Website
   script.js
   ============================================================ */
console.log("JS is running");
// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));


// ── PORTFOLIO FILTER ──
function filterPortfolio(btn, cat) {
  document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.portfolio-item').forEach((item) => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}


// ── CONTACT FORM ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-green');
  const original = btn.textContent;
  btn.textContent = '✓ Message Sent! We\'ll contact you soon.';
  btn.style.background = '#059669';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
  }, 4000);
}


// ── SEARCH FUNCTIONALITY ──
document.querySelector('.search-bar input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = e.target.value.toLowerCase().trim();
    if (!query) return;

    const sectionMap = {
      website: 'services',
      app: 'services',
      mobile: 'services',
      marketing: 'services',
      seo: 'services',
      graphic: 'services',
      branding: 'services',
      video: 'services',
      ecommerce: 'services',
      software: 'services',
      contact: 'contact',
      portfolio: 'portfolio',
      work: 'portfolio',
      product: 'products',
      event: 'programs',
      program: 'programs',
      community: 'programs',
      client: 'clients',
    };

    for (const [keyword, sectionId] of Object.entries(sectionMap)) {
      if (query.includes(keyword)) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Default fallback
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }
});


// ── CATEGORY CARD CLICK — scroll to services ──
document.querySelectorAll('.cat-card').forEach((card) => {
  card.addEventListener('click', () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  });
});


// ── NAVBAR: scroll-based shadow ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)';
  } else {
    nav.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
  }
});
document.addEventListener("DOMContentLoaded", () => {
  console.log("JS LOADED");

  fetchfetch("/data")
    .then(res => res.json())
    .then(data => {
      console.log("DATA:", data);

      const msgDiv = document.getElementById("backend-msg");

      if (msgDiv) {
        msgDiv.innerHTML = `<h2 style="color:green; text-align:center; margin:20px;">
          ${data.message}
        </h2>`;
      }
    })
    .catch(err => console.log("ERROR:", err));
});
async function addUser(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  try {
    const res = await fetch("/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });

    const msg = await res.text();
    alert(msg);
  } catch (err) {
    console.log(err);
  }
}