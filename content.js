/* ==========================================================================
   PORTFOLIO CONTENT — single source of truth
   Jeeva, edit this file directly OR use admin.html to edit visually
   (admin.html saves changes into the browser's localStorage; this file
   stays as the permanent / default fallback content).
   ========================================================================== */

const DEFAULT_CONTENT = {
  meta: {
    siteTitle: "N. Jeeva — Full-Stack Developer",
    favicon: "images/studio-formal.png"
  },

  hero: {
    greeting: "Hello, I'm",
    name: "N. Jeeva",
    roles: ["Full-Stack Developer", "Python & Django Engineer", "React.js Developer", "Freelance Web Developer"],
    tagline: "Frontend-focused Full-Stack Developer with 7+ months of production experience building responsive React.js interfaces — plus hands-on Python & Django backend exposure, growing every day into a complete full-stack engineer.",
    heroImage: "images/office-laptop.png",
    resumeFile: "files/N-Jeeva-Resume-2026.pdf",
    ctaPrimary: { label: "View My Work", href: "#projects" },
    ctaSecondary: { label: "Contact Me", href: "#contact" },
    ctaResume: { label: "Download Resume", href: "files/N-Jeeva-Resume-2026.pdf" }
  },

  quote: {
    text: "I lean heavily on AI-assisted development tools like GitHub Copilot, ChatGPT and Claude AI to write cleaner code, faster — without cutting corners on how it's built.",
    image: "images/outdoor-casual.png"
  },

  services: {
    heading: "What I Do",
    subheading: "Full-stack capability across the whole product — frontend to database.",
    items: [
      {
        icon: "https://cdn.simpleicons.org/react/7c5cff",
        title: "Frontend Development",
        description: "Responsive, fast, accessible interfaces built with React.js, HTML5, CSS3 and modern JavaScript (ES6+)."
      },
      {
        icon: "https://cdn.simpleicons.org/django/22d3ee",
        title: "Backend & API Development",
        description: "REST API design and development with Python and Django — clean endpoints, secure auth, and solid data flow."
      },
      {
        icon: "https://cdn.simpleicons.org/mysql/d4af37",
        title: "Database Design",
        description: "Relational schema design, CRUD workflows and data integrity using SQL — built for real production use."
      },
      {
        icon: "text:WEB:ec4899:ffffff",
        title: "Freelance Web Solutions",
        description: "End-to-end client websites — from planning and design to a live, deployed product, delivered independently."
      }
    ]
  },

  about: {
    heading: "About Me",
    image: "images/outdoor-leaning.png",
    paragraphs: [
      "I'm N. Jeeva, a frontend-focused Full-Stack Developer from India with 7+ months of production experience building responsive React.js interfaces at Swivel Technologies, alongside hands-on Python and Django backend exposure.",
      "I'm self-driven to grow into a complete full-stack engineer — I learned backend development independently and through a mentor-led Python Full Stack Development course, then applied it by building and deploying REST API-backed projects (CRM platforms, booking apps, AI chatbots) as a freelancer.",
      "Alongside my full-time work, I freelance — building complete websites and business tools for clients from scratch. I lean heavily on AI-assisted development tools like GitHub Copilot, ChatGPT and Claude AI to accelerate learning and development.",
      "I hold a B.Sc. in Physics and transitioned into software development through an intensive Python Full Stack program — bringing a strong analytical foundation to every product I build."
    ],
    stats: [
      { value: "7+", label: "Months Production Experience" },
      { value: "10+", label: "REST API Endpoints Built" },
      { value: "6+", label: "Projects Delivered" },
      { value: "2", label: "Companies Worked With" }
    ]
  },

  skills: {
    heading: "Skills & Tools",
    subheading: "Technologies I work with, every single day",
    categories: [
      {
        name: "Frontend Development",
        color: "#22d3ee",
        emoji: "🎨",
        description: "Building responsive, fast interfaces with React.js, HTML5 and modern JavaScript.",
        items: [
          { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26", level: 90 },
          { name: "CSS3", icon: "https://cdn.simpleicons.org/css/1572B6", level: 88 },
          { name: "JavaScript (ES6+)", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", level: 85 },
          { name: "React.js", icon: "https://cdn.simpleicons.org/react/61DAFB", level: 80 },
          { name: "Responsive Design", icon: "text:RWD:22d3ee:0a0a12", level: 85 }
        ]
      },
      {
        name: "Backend Development",
        color: "#7c5cff",
        emoji: "⚙️",
        description: "Designing REST APIs and server-side logic with Python and Django.",
        items: [
          { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", level: 88 },
          { name: "Django", icon: "https://cdn.simpleicons.org/django/092E20", level: 85 },
          { name: "REST API Development", icon: "https://cdn.simpleicons.org/fastapi/009688", level: 82 }
        ]
      },
      {
        name: "Database",
        color: "#d4af37",
        emoji: "🗄️",
        description: "Schema design, CRUD workflows and data integrity with SQL.",
        items: [
          { name: "SQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", level: 78 },
          { name: "Schema Design & CRUD", icon: "https://cdn.simpleicons.org/sqlite/003B57", level: 78 }
        ]
      },
      {
        name: "AI-Augmented Dev",
        color: "#ec4899",
        emoji: "🤖",
        description: "Using GitHub Copilot, ChatGPT and Claude to ship cleaner code, faster.",
        items: [
          { name: "GitHub Copilot", icon: "https://cdn.simpleicons.org/githubcopilot/000000", level: 90 },
          { name: "ChatGPT", icon: "text:GPT:10A37F:ffffff", level: 90 },
          { name: "Claude AI", icon: "https://cdn.simpleicons.org/claude/D97757", level: 85 }
        ]
      },
      {
        name: "Developer Tools",
        color: "#f59e0b",
        emoji: "🛠️",
        description: "Git version control and VS Code for a smooth day-to-day workflow.",
        items: [
          { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", level: 85 },
          { name: "VS Code", icon: "text:VS:007ACC:ffffff", level: 92 }
        ]
      },
      {
        name: "Productivity",
        color: "#34d399",
        emoji: "📊",
        description: "Excel and Canva for reporting, planning and client-ready visuals.",
        items: [
          { name: "Excel", icon: "text:XLS:217346:ffffff", level: 75 },
          { name: "Canva", icon: "text:Cva:00C4CC:0a0a12", level: 80 }
        ]
      }
    ]
  },

  experience: {
    heading: "Experience",
    items: [
      {
        role: "Web Development Intern",
        company: "Vetri Technology Solutions",
        period: "Mar 2026 – Apr 2026",
        points: [
          "Contributed to live web modules under senior developer mentorship in an agile environment, applying industry-standard version control and code review practices."
        ]
      },
      {
        role: "Web Developer",
        company: "Swivel Technologies",
        period: "Sep 2025 – Mar 2026",
        points: [
          "Engineered responsive web apps using React.js, HTML5, CSS3, and JavaScript (ES6+), improving page-load performance and UI responsiveness across production modules.",
          "Architected and integrated 10+ RESTful API endpoints into the React.js frontend, streamlining data exchange and reducing manual data-handling steps.",
          "Assisted with basic backend tasks in Python and Django, supporting REST API functionality alongside primary frontend development responsibilities.",
          "Leveraged GitHub Copilot and ChatGPT daily, cutting average debugging time by an estimated 20-25%."
        ]
      }
    ]
  },

  projects: {
    heading: "Projects",
    subheading: "Things I've built — freelance client work and personal builds",
    featured: {
      title: "GlowSlot — Salon & Beauty Booking Platform",
      tag: "Featured Case Study",
      stack: "Django REST API · React · React Native",
      challenge: "Salon and beauty businesses often rely on phone calls and paper diaries for appointments — leading to double-bookings, no-shows, and a clunky booking experience for customers on the go.",
      approach: "I built a full booking platform end-to-end: a Django REST API backend, a React web app for customers plus an admin panel for salon staff, and a React Native mobile app — all sharing the same API, with secure login and role-based access control.",
      result: "A live, deployed multi-platform product — proof that I can design and ship a real API-first architecture that powers web, admin and mobile clients from one backend.",
      link: "https://glowslot-web.onrender.com",
      linkLabel: "View Live Demo"
    },
    items: [
      {
        title: "RMA Residency Website",
        tag: "Freelance Client Work",
        stack: "HTML, CSS, JavaScript",
        description: "Designed and built a responsive showcase website for RMA Residency, presenting facilities and information through a clean, mobile-friendly layout.",
        link: "https://jeeva081202.github.io/RMA",
        linkLabel: "View Site"
      },
      {
        title: "Krishnu Cotton Sarees — Billing Software",
        tag: "Freelance Client Work",
        stack: "Python, Django, SQL",
        description: "Built a custom billing system for a retail client, automating invoice generation and reducing manual sales-record processing time.",
        link: "https://jeeva081202.github.io/bill",
        linkLabel: "View Site"
      },
      {
        title: "Student Management System",
        tag: "Full-Stack Project",
        stack: "Python, Django, SQL",
        description: "Developed a full-stack student portal with clean CRUD workflows, deployed to production.",
        link: "https://student-management-system-p6q9.onrender.com",
        linkLabel: "View Live Demo"
      },
      {
        title: "AI-Thunai — AI Chatbot",
        tag: "Personal Project",
        stack: "Python, React.js, AI/LLM API",
        description: "Built and deployed an AI-powered conversational chatbot integrated with an LLM API.",
        link: "https://ai-thunai-frontend.onrender.com",
        linkLabel: "View Live Demo"
      },
      {
        title: "ChithraCRM — WhatsApp-Style CRM for Local Shops",
        tag: "Full-Stack Project",
        stack: "Python, Django",
        description: "Built a CRM web app to help shop owners manage customers and orders, deployed live using GitHub and Render.",
        link: "https://chithra-crm.onrender.com",
        linkLabel: "View Live Demo"
      }
    ]
  },

  education: {
    heading: "Education & Certifications",
    items: [
      {
        title: "B.Sc. Physics",
        place: "NMS S. Vellaichamy Nadar College",
        period: "2020 – 2023",
        detail: "CGPA: 7.1"
      },
      {
        title: "Python Full Stack Development",
        place: "Vetri Technology Solutions",
        period: "Feb – Apr 2026",
        detail: "Certification"
      }
    ],
    strengths: ["Problem Solving", "AI-Augmented Development", "Team Collaboration", "Quick Learning", "Adaptability", "Communication"]
  },

  contact: {
    heading: "Let's Connect",
    subheading: "Have a project in mind or an opportunity to share? My inbox is open.",
    image: "images/bw-portrait.png",
    email: "njeeva854@gmail.com",
    phone: "+91 82708 07049",
    whatsapp: "918270807049",
    linkedin: "https://linkedin.com/in/jeeva14",
    github: "https://github.com/jeeva081202",
    githubUsername: "jeeva081202",
    location: "India",
    formEndpoint: "https://formsubmit.co/ajax/njeeva854@gmail.com"
  },

  theme: {
    accentFrom: "#7c5cff",
    accentTo: "#22d3ee",
    gold: "#d4af37",
    mode: "dark"
  }
};

/* Load: prefer admin-saved override in localStorage, fall back to default */
function getPortfolioContent() {
  try {
    const saved = localStorage.getItem("jeeva_portfolio_content");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Could not read saved content, using default.", e);
  }
  return DEFAULT_CONTENT;
}
