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
    tagline: "Full-Stack Developer with 7+ months of production experience building REST APIs and client-facing features with Python, Django and React.js.",
    heroImage: "images/office-laptop.png",
    resumeFile: "files/N-Jeeva-Resume.pdf",
    ctaPrimary: { label: "View My Work", href: "#projects" },
    ctaSecondary: { label: "Contact Me", href: "#contact" },
    ctaResume: { label: "Download Resume", href: "files/N-Jeeva-Resume.pdf" }
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
      "I'm N. Jeeva, a Full-Stack Developer from India with hands-on production experience in Python, Django and React.js. Over the last 7+ months I've designed and shipped 10+ REST API endpoints and delivered client-facing features on live projects.",
      "Alongside my full-time work, I freelance — building complete websites for clients from scratch. I lean heavily on AI-assisted development tools like GitHub Copilot, ChatGPT and Claude AI to write cleaner code, faster.",
      "I hold a B.Sc. in Physics and transitioned into software development through an intensive Python Full Stack program — bringing a strong analytical foundation to every product I build."
    ],
    stats: [
      { value: "7+", label: "Months Production Experience" },
      { value: "10+", label: "REST API Endpoints Built" },
      { value: "5+", label: "Projects Delivered" },
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
        role: "Web Developer",
        company: "Swivel Technologies",
        period: "Sep 2025 – Mar 2026",
        points: [
          "Led frontend development of responsive web apps using React.js, HTML5, CSS3 and JavaScript (ES6+) in production.",
          "Integrated 10+ RESTful API endpoints into the React.js frontend for seamless data exchange across modules.",
          "Contributed to backend development (Python, Django) — data pipelines and REST API support.",
          "Leveraged GitHub Copilot and ChatGPT daily, reducing debugging time and accelerating delivery."
        ]
      },
      {
        role: "Web Development Intern",
        company: "Vetri Technology Solutions",
        period: "Mar 2026 – Apr 2026",
        points: [
          "Contributed to live web modules under senior developer mentorship in an agile environment.",
          "Applied industry coding standards for version control and collaborative development."
        ]
      }
    ]
  },

  projects: {
    heading: "Projects",
    subheading: "Things I've built — freelance client work and personal builds",
    featured: {
      title: "Student Management System",
      tag: "Featured Case Study",
      stack: "Python · Django · SQL",
      challenge: "Schools and small institutions often manage student records through scattered spreadsheets — slow, error-prone, and hard to search or update as records grow.",
      approach: "I designed a full-stack student portal from the ground up: a normalized SQL schema, clean CRUD workflows for admins, and a Django backend wired to handle real data reliably instead of just as a demo.",
      result: "A live, deployed production build that manages student records end-to-end — proof that the whole pipeline, from database design to deployment, actually works in practice.",
      link: "https://student-management-system-p6q9.onrender.com",
      linkLabel: "View Live Demo"
    },
    items: [
      {
        title: "RMA Residency Website",
        tag: "Freelance Client Work",
        stack: "HTML, CSS, JavaScript",
        description: "Designed and built a responsive showcase website for RMA Residency, presenting facilities and information through a clean, mobile-friendly layout.",
        link: "https://github.com/jeeva081202",
        linkLabel: "GitHub"
      },
      {
        title: "Banking Transaction Management System",
        tag: "Full-Stack Project",
        stack: "Python, Django, SQL",
        description: "Simulated an online banking app with secure login, role-based access, and real-time balance tracking.",
        link: "",
        linkLabel: ""
      },
      {
        title: "CRM System",
        tag: "Full-Stack Project",
        stack: "Python, Django, REST API, SQL",
        description: "Built a lead / contact / sales pipeline CRM with dashboard analytics and RESTful APIs.",
        link: "",
        linkLabel: ""
      },
      {
        title: "Mini E-Commerce App",
        tag: "Personal Project",
        stack: "Python, Django, SQL",
        description: "Full-stack e-commerce app covering product listings and cart management.",
        link: "",
        linkLabel: ""
      },
      {
        title: "Payslip Generator",
        tag: "Personal Project",
        stack: "Python, Django",
        description: "A dynamic payslip generator app built as a full-stack solution.",
        link: "",
        linkLabel: ""
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
      },
      {
        title: "2-Month Internship Certificate",
        place: "Vetri Technology Solutions",
        period: "Mar – Apr 2026",
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
