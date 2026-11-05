// Nomad — case study content (rebuilt on the CycleCare structure, 5 Nov 2026).
// Source: "NOMAD – Diploma UX/UI – English" case study. Items marked `todo`
// only appear with ?draft.
window.CASE_STUDY = {
  slug: 'nomad',
  title: 'Nomad',
  status: 'academic',
  nav: true,

  hero: {
    statement: 'An app that helps digital nomads find reliable services, workspaces, communities and purposeful experiences — all in one place.',
    type: 'Mobile app · UX/UI case study',
    role: 'UX/UI Design — team project',
    timeline: 'Creative UX/UI Diploma · 2024 – 2025',
    team: 'Team of 3',
    tools: ['Figma'],
    award: { label: 'Award · LCI Education Recognition', href: '#outcome' },
    app: {
      url: 'https://www.figma.com/proto/9Bgm6k27svCAy02yWFAhkw/NO%CC%81MADAS-DIGITALES?node-id=841-4419&p=f&t=ROxu9ElON7Truu3l-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=841%3A4419&page-id=0%3A1',
      title: 'Nomad — interactive Figma prototype',
      hint: 'Tap to try — interactive Figma prototype',
      buttonLabel: 'Open in Figma ↗'
    },
    links: [
      { label: 'View on Behance', href: 'https://www.behance.net/gallery/221216205/NOMAD-Case-Study-UXUI-Design' }
    ]
  },

  sections: {
    overview: {
      navLabel: 'Overview',
      title: 'Plan the nomad life in one place.',
      intro: 'A startup concept that helps digital nomads decide faster — with one platform and a smart filter for reliable apps, services and places.',
      blocks: [
        { type: 'stats',
          items: [
            { value: '35M', label: 'digital nomads worldwide' },
            { value: '131%', label: 'growth in US digital nomads, 2019–2023' },
            { value: '10%', label: 'of digital nomads are Spanish-speaking' }
          ],
          source: 'Figures as cited in the original case study (MBO Partners, Demandsage 2024, BBC, Economía UA).' },
        { type: 'text', heading: 'Goals',
          list: [
            'Make it easy to plan transport, work and volunteering at each destination.',
            'Promote purposeful travel and sustainable tourism.',
            'Connect nomads so they can share experiences and insights.'
          ] }
      ]
    },

    challenge: {
      navLabel: 'Challenge',
      title: 'Information is scattered.',
      intro: 'Nomads jump between many websites to plan each move — confusing, slow and hard to trust.',
      blocks: [
        { type: 'callout', tone: 'outline', label: 'Core problem',
          text: 'Planning the next destination — and staying productive once there — takes far more time and effort than it should.' }
      ]
    },

    role: {
      navLabel: 'Team',
      kicker: 'My role & team',
      title: 'Three disciplines, one product.',
      blocks: [
        { type: 'team',
          members: [
            { name: 'Daniela Chaparro', role: 'Industrial Designer' },
            { name: 'Fiorella Medina', role: 'Graphic Designer' },
            { name: 'Alejandra Romero', role: 'Advertising Professional', me: true }
          ] },
        { type: 'todo', note: 'Add your specific responsibilities in the team (research, flows, screens, brand) and the decisions you led.' }
      ]
    },

    research: {
      navLabel: 'Research',
      kicker: 'Discover & research',
      title: 'Meet Valeria, a nomad on the move.',
      intro: 'A primary persona, her end-to-end journey, and a benchmark of existing apps to find the gaps.',
      blocks: [
        { type: 'gallery',
          items: [
            { src: 'assets/target-audience', alt: 'Target audience: Spanish-speaking digital nomads', title: 'Target audience' },
            { src: 'assets/user-persona', alt: 'User persona: Valeria Gómez, 26', title: 'Persona — Valeria, 26' },
            { src: 'assets/journey-map', alt: 'Journey map for Valeria Gómez', title: 'Journey map' },
            { src: 'assets/benchmark', alt: 'Comparative benchmark of digital nomad apps', title: 'Benchmark' }
          ] }
      ]
    },

    strategy: {
      navLabel: 'Decisions',
      kicker: 'Define',
      title: 'Six decisions that shape the app.',
      blocks: [
        { type: 'points',
          items: [
            { title: 'Personalized onboarding', text: 'A short questionnaire takes each person to what matters first.' },
            { title: 'Interactive map with filters', text: 'Stays, coworking, events and communities in one location-based view.' },
            { title: 'Coworking built around work', text: 'Internet, private rooms, amenities, reviews and routes.' },
            { title: 'Community, levels and badges', text: 'Rewards for visiting places, posting and joining activities.' },
            { title: 'Purposeful travel', text: 'Itineraries that combine destinations with impact projects.' },
            { title: 'NomadPro', text: 'A premium tier for posting, visibility and priority volunteering.' }
          ] }
      ]
    },

    architecture: {
      navLabel: 'Structure',
      kicker: 'Structure',
      title: 'Five core areas, one clear flow.',
      blocks: [
        { type: 'gallery',
          items: [
            { src: 'assets/information-architecture', alt: 'Nomad information architecture', title: 'Information architecture' },
            { src: 'assets/user-flow', alt: 'Nomad user flow', title: 'User flow' }
          ] }
      ]
    },

    wireframes: {
      navLabel: 'Testing',
      kicker: 'Wireframes & testing',
      title: 'Tested early, adjusted fast.',
      blocks: [
        { type: 'split',
          image: { src: 'assets/wireframes', alt: 'Low-fidelity wireframes and iterations' },
          heading: 'What users told us',
          list: [
            'They liked having everything in one place.',
            'They valued browsing information without creating an account.'
          ] }
      ]
    },

    ui: {
      navLabel: 'Visual design',
      kicker: 'Visual design & UI kit',
      title: 'A planet in the “O”.',
      intro: 'The planet stands for exploration and community; the square marks a destination. Inter keeps everything clear across devices.',
      blocks: [
        { type: 'gallery',
          items: [
            { src: 'assets/brand-logo-color', alt: 'Nomad logo, isotype and primary colors', title: 'Logo & color' },
            { src: 'assets/brand-typography', alt: 'Nomad typography and neutral colors', title: 'Typography' },
            { src: 'assets/ui-kit', alt: 'Nomad UI kit: buttons, components, icons and navigation', title: 'UI kit' }
          ], columns: 3 }
      ]
    },

    final: {
      navLabel: 'Screens',
      kicker: 'Final design',
      title: 'From onboarding to trip planning.',
      intro: 'The full journey in high fidelity — try it at the top of this page.',
      blocks: [
        { type: 'gallery',
          items: [
            { src: 'assets/screens-onboarding', alt: 'Welcome and questionnaire screens', title: 'Onboarding' },
            { src: 'assets/screens-login', alt: 'Login, sign-in and NomadPro screens', title: 'Login & NomadPro' },
            { src: 'assets/screens-map', alt: 'Interactive map screens', title: 'Interactive map' },
            { src: 'assets/screens-coworking', alt: 'Coworking search screens', title: 'Coworking' },
            { src: 'assets/screens-blog', alt: 'Blog and travel search screens', title: 'Blog & travel' },
            { src: 'assets/screens-volunteering', alt: 'Volunteering screens', title: 'Volunteering' },
            { src: 'assets/screens-profile', alt: 'User profile screens', title: 'Profile & badges' },
            { src: 'assets/screens-trips', alt: 'My Trips screens', title: 'My Trips' },
            { src: 'assets/app-overview', alt: 'Nomad app screens: welcome, sign-in and interactive map', title: 'Overview' }
          ], columns: 3 }
      ]
    },

    outcome: {
      navLabel: 'Outcome',
      title: 'The only project recognized in the program.',
      intro: 'Final project of the Creative UX/UI Diploma — a proposed design with a Figma prototype, not developed or launched.',
      blocks: [
        { type: 'split',
          image: { src: 'assets/recognition-certificate.jpg', alt: 'Nomad Certificate of Recognition from LCI Education' },
          heading: 'LCI Education · Certificate of Recognition',
          body: 'Awarded on February 3, 2025 for outstanding performance in the final project of the Innovation in Business Design course — from concept to final presentation.' },
        { type: 'todo', note: 'Add your learnings and next opportunities (features, further testing).' }
      ]
    }
  }
};
