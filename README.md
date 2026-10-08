# Manish Chowdary Portfolio (React + Vite)

A modern single-page portfolio built with React + Vite featuring:

- Sticky navbar with active section highlighting
- 7 sections: Hero, About, Skills, Projects, Experience, Education, Contact
- Framer Motion animations
- Recharts radar + bar visualizations
- Filterable projects by stack
- Mobile hamburger navigation
- Dark glassmorphism UI
- Cinematic 3D intro (three.js, `src/Intro3D.jsx`): a particle cloud morphs through six resume chapters (name, education, data engineering, ML, GenAI, call to action) while the camera flies through. Plays once per session, skippable, disabled for reduced-motion users, code-split and replayable from the hero
- Scroll progress bar and "New" badges on the latest projects (HumanProof, Cloud ETL Validation Framework, MediTrace)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

> Update content in `src/App.jsx` arrays (`skillBars`, `projects`, `experience`, `education`) to match your latest resume/chat specs.
