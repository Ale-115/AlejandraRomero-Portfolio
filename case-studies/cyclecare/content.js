// CycleCare — case study content (simplified, 5 Nov 2026).
// Images: the 21 slides of the Figma "06 Case study deck" in assets/ (name-800/1600.jpg).
// The working app built with Claude Design lives in app/index.html.
// Items marked `todo` only appear with ?draft.
window.CASE_STUDY = {
  slug: 'cyclecare',
  title: 'CycleCare',
  status: 'academic',
  statusLabel: 'Concept · Academic project, expanded',
  nav: true,

  hero: {
    statement: 'A women’s wellness app and website I took from a blank page to a working product — research, brand, illustration, UX/UI, design system and a build in Claude Design.',
    type: 'Digital product · Brand · Design system',
    role: 'Product & brand designer — end to end',
    timeline: 'Academic project (WDDM-129), expanded in 2026',
    team: 'Solo project',
    tools: ['Illustrator', 'Gemini', 'Claude', 'Figma', 'Claude Design'],
    app: { url: 'app/index.html', fit: { width: 640, height: 1040 }, title: 'CycleCare app — interactive', hint: 'Tap to try — it’s interactive' },
    links: [
      { label: 'Website prototype', href: 'https://www.figma.com/proto/88aE1bJLsnIjpargInFjGU/WDDM-129-PROJECT-2?node-id=2789-715&p=f&t=RfsS33G8yhle41ev-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2789%3A715&page-id=2789%3A714&show-proto-sidebar=1' },
      { label: 'View on Behance', href: 'https://www.behance.net/gallery/247490491/Cycle-Care-System-Design' }
    ]
  },

  sections: {
    overview: {
      navLabel: 'Overview',
      title: 'From blank page to working app.',
      intro: 'An app to log and understand your cycle, and a website to learn and find support — designed and built end to end, as a solo project.',
      blocks: [
        { type: 'stats',
          items: [
            { value: '1 tap', label: 'to log a period' },
            { value: '4 phases', label: 'each with its own moon' },
            { value: '2 surfaces', label: 'app and web, one design system' }
          ] },
        { type: 'image', src: 'assets/process-map', title: 'Process — with AI along the way',
          alt: 'Process map in nine steps. Discover: personal need, surveys and interviews. Research: synthesis and desk research with Claude. Define: persona, problem and MVP scope with Claude. Structure: user flows, IA and sitemap with Figma and Claude. Visual direction: brand and illustration with Gemini and Illustrator. UI and design system: Figma and Claude. Prototype: Figma. Build: Claude Design. Test and iterate: usability testing, next step.' }
      ]
    },

    challenge: {
      navLabel: 'Challenge',
      title: 'Tracking alone isn’t understanding.',
      intro: 'Most cycle apps log dates but don’t explain what’s happening in your body — or where to turn when something feels off.',
      blocks: [
        { type: 'callout', tone: 'outline', label: 'Opportunity',
          text: 'The simplest possible logging, plus instant guidance for each phase: how you may feel, energy, appetite and chance of pregnancy.' }
      ]
    },

    research: {
      navLabel: 'Research',
      kicker: 'Discover & research',
      title: 'What women need from a cycle app.',
      intro: 'Surveys and interviews, then synthesis and desk research with Claude — peer-reviewed studies, national surveys and clinical guidance.',
      blocks: [
        { type: 'image', src: 'assets/research', alt: 'Five key research findings with evidence and UX implications' },
        { type: 'sources', heading: 'Sources',
          items: [
            { label: 'KFF — Health Apps and Information Survey', href: 'https://files.kff.org/attachment/Topline-Health-Apps-and-Information-Survey-September-2019', note: 'Sep 2019' },
            { label: 'Broad et al. — Women’s experiences of period tracker apps', href: 'https://doi.org/10.1177/17455057221095246', note: 'Women’s Health, Apr 2022' },
            { label: 'Epstein et al. — Examining menstrual tracking', href: 'https://doi.org/10.1145/3025453.3025635', note: 'CHI, May 2017' },
            { label: 'Worsfold et al. — What information do period tracker apps give?', href: 'https://doi.org/10.1177/17455065211049905', note: 'Women’s Health, Oct 2021' },
            { label: 'Wainwright et al. — Fertility awareness in 97,414 women', href: 'https://doi.org/10.1186/s12978-025-02079-x', note: 'Reproductive Health, Aug 2025' },
            { label: 'Armour et al. — Menstrual health literacy in young women', href: 'https://doi.org/10.1016/j.jpag.2020.11.007', note: 'J Pediatr Adolesc Gynecol, Apr 2021' },
            { label: 'ACOG Committee Opinion 651 — The menstrual cycle as a vital sign', href: 'https://pubmed.ncbi.nlm.nih.gov/26595586/', note: 'Dec 2015' }
          ] },
        { type: 'todo', note: 'Surveys and interviews were done: add 1–2 real findings or quotes, and update slides 06–07 (they say “secondary research” and that the persona is not validated with primary research).' }
      ]
    },

    strategy: {
      navLabel: 'Define',
      kicker: 'Define',
      title: 'One persona, one focused MVP.',
      intro: 'Who we design for, and the smallest product that covers her needs.',
      blocks: [
        { type: 'gallery',
          items: [
            { src: 'assets/persona', alt: 'User persona: Sofia, 28 — the curious tracker', title: 'Persona — Sofia, 28' },
            { src: 'assets/solution', alt: 'MVP: phase tracking, education and professionals in one platform', title: 'MVP scope' }
          ] },
        { type: 'todo', note: 'The app still greets “Maya” — unify with Sofia.' }
      ]
    },

    architecture: {
      navLabel: 'Structure',
      kicker: 'Structure',
      title: 'One tap required. Everything else optional.',
      blocks: [
        { type: 'gallery',
          items: [
            { src: 'assets/user-flow', alt: 'App user flow', title: 'User flow' },
            { src: 'assets/ia-sitemap', alt: 'App information architecture and website sitemap', title: 'App IA & website sitemap' }
          ] },
        { type: 'todo', note: 'Add wireframes when available.' }
      ]
    },

    ui: {
      navLabel: 'Visual design',
      kicker: 'Visual direction, UI & design system',
      title: 'Every phase has its moon.',
      intro: 'One idea behind the brand, the illustration and the interface — turned into a system for the app and the website.',
      blocks: [
        { type: 'image', src: 'assets/concept', alt: 'Creative concept: four phases, four moons, four bodies' },
        { type: 'gallery',
          items: [
            { src: 'assets/brand-logo', alt: 'Logo: a drop that becomes a heart', title: 'Logo' },
            { src: 'assets/brand-territory', alt: 'Brand territory: the moon, the body, movement', title: 'Territory & illustration' },
            { src: 'assets/brand-identity', alt: 'Color, type and voice', title: 'Color, type & voice' },
            { src: 'assets/foundations', alt: 'Design system foundations', title: 'Foundations' },
            { src: 'assets/components-app', alt: 'App components', title: 'App components' },
            { src: 'assets/components-web', alt: 'Web components', title: 'Web components' }
          ], columns: 3 }
      ]
    },

    final: {
      navLabel: 'Prototype & build',
      kicker: 'Prototype & build',
      title: 'From Figma to a working app.',
      intro: 'Built with Claude Design from the Figma screens and system — try it at the top of this page.',
      blocks: [
        { type: 'points', heading: 'What the build added',
          items: [
            { title: 'Accessibility', text: 'Text uses a darker “ink” tone per phase (5.6–7.6:1, WCAG AA); brighter accents stay on shapes. Every control is at least 44 × 44 px.' },
            { title: 'Motion', text: 'The phase ring draws itself, cards and bars rise in sequence, and the illustration floats and cross-fades between phases.' },
            { title: 'A system that holds', text: 'The same tokens and components drive Figma and the built app.' }
          ] },
        { type: 'prototype', url: 'https://www.figma.com/proto/88aE1bJLsnIjpargInFjGU/WDDM-129-PROJECT-2?node-id=2758-716&p=f&t=IFRWnjC1sy09bHaM-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2758%3A716&page-id=2758%3A714',
          title: 'Explore the app in Figma',
          caption: 'The original clickable prototype — onboarding, Today, phase detail, calendar and check-in.',
          buttonLabel: 'Open in Figma ↗', bare: true, height: 'min(68vh, 620px)' },
        { type: 'prototype', url: 'https://www.figma.com/proto/88aE1bJLsnIjpargInFjGU/WDDM-129-PROJECT-2?node-id=2789-715&p=f&t=RfsS33G8yhle41ev-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2789%3A715&page-id=2789%3A714&show-proto-sidebar=1',
          title: 'Explore the website',
          caption: 'Clickable Figma prototype — home, phase page, My cycle, professionals and profile.',
          buttonLabel: 'Open in Figma ↗', bare: true, height: 'min(68vh, 620px)' },
        { type: 'gallery',
          items: [
            { src: 'assets/app-flow', alt: 'App core flow', title: 'App — core flow' },
            { src: 'assets/phase-series', alt: 'The four phase screens', title: 'App — phase series' },
            { src: 'assets/web-home', alt: 'Website home', title: 'Website — home' },
            { src: 'assets/web-pages', alt: 'Website pages', title: 'Website — pages' }
          ] },
        { type: 'todo', note: 'Next accessibility pass: prefers-reduced-motion, screen-reader labels on icon-only controls, darker primary blue CTA (white on #5B80C2 is 3.95:1 → #3F5AA8 = 6.5:1). Add a short screen recording of the animations.' }
      ]
    },

    outcome: {
      navLabel: 'Reflection',
      kicker: 'Outcome & reflection',
      title: 'From research to a working app — faster than I thought possible.',
      blocks: [
        { type: 'text', heading: 'What AI changed',
          body: 'AI made it possible to take this product from zero to a working prototype at a pace that would have been unthinkable a few years ago — without skipping the design thinking in between.',
          list: [
            'Planning: scoping the product, the MVP and the steps to get there.',
            'Research: drafting the surveys, synthesising the answers and turning them into clear findings.',
            'Structure: moving from findings to flows and wireframes in days, not weeks.',
            'Illustration: building and scaling the moon-phase illustration system across app, web and brand. The branding itself took its usual time; making the whole illustrated ecosystem work was far easier.',
            'Build: all the design was done in Figma; the working app prototype was then built with Claude Design.'
          ] },
        { type: 'callout', tone: 'outline', label: 'The biggest surprise',
          text: 'How close the app built with Claude Design stayed to the Figma design — the fidelity of the final prototype went well beyond what I expected.' },
        { type: 'text', heading: 'What’s next',
          body: 'I want to keep iterating on CycleCare and go deeper into women’s health, so the app can become a trusted guide through key stages and conditions:',
          list: [
            'Conditions such as endometriosis.',
            'Life stages such as pregnancy and menopause.',
            'Sexual health, including sexually transmitted infections.'
          ] }
      ]
    }
  }
};
