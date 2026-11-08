export interface SkillItem {
  name: string;
  sublabel: string;
  category: 'programming' | 'frontend' | 'databases' | 'tools' | 'core_cs' | 'creative';
  description?: string;
  iconType: string;
}

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'programming', label: 'Programming' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'databases', label: 'Databases' },
  { id: 'tools', label: 'Tools & DevOps' },
  { id: 'core_cs', label: 'Computer Science' },
  { id: 'creative', label: 'Creative Tech' }
];

export const SKILLS_PILLS: SkillItem[] = [
  // Row 1 from screenshot
  { name: 'Java', sublabel: 'OOP / CORE BACKEND', category: 'programming', iconType: 'java' },
  { name: 'Python', sublabel: 'PROGRAMMING / AUTOMATION', category: 'programming', iconType: 'python' },
  { name: 'C', sublabel: 'SYSTEMS FUNDAMENTALS', category: 'programming', iconType: 'c' },
  { name: 'C++', sublabel: 'DSA / PROBLEM SOLVING', category: 'programming', iconType: 'cpp' },

  // Row 2 from screenshot
  { name: 'JavaScript', sublabel: 'WEB LOGIC', category: 'frontend', iconType: 'javascript' },
  { name: 'HTML', sublabel: 'SEMANTIC MARKUP', category: 'frontend', iconType: 'html' },
  { name: 'CSS', sublabel: 'LAYOUT / MOTION', category: 'frontend', iconType: 'css' },
  { name: 'React', sublabel: 'FRONTEND DEVELOPMENT', category: 'frontend', iconType: 'react' },

  // Row 3 from screenshot
  { name: 'Tailwind CSS', sublabel: 'DESIGN SYSTEMS', category: 'frontend', iconType: 'tailwind' },
  { name: 'Git', sublabel: 'VERSION CONTROL', category: 'tools', iconType: 'git' },
  { name: 'GitHub', sublabel: 'COLLABORATION', category: 'tools', iconType: 'github' },
  { name: 'MySQL', sublabel: 'RELATIONAL DATABASES', category: 'databases', iconType: 'mysql' },

  // Additional genuine verified skills from Joe's academic profile
  { name: 'PostgreSQL', sublabel: 'ADVANCED SQL / SCHEMAS', category: 'databases', iconType: 'postgresql' },
  { name: 'NoSQL', sublabel: 'DOCUMENT STORAGE', category: 'databases', iconType: 'database' },
  { name: 'VS Code', sublabel: 'DEVELOPMENT WORKFLOWS', category: 'tools', iconType: 'vscode' },
  { name: 'Data Structures & Algorithms', sublabel: 'EFFICIENCY / COMPLEXITY', category: 'core_cs', iconType: 'dsa' },
  { name: 'Operating Systems', sublabel: 'PROCESSES & CONCURRENCY', category: 'core_cs', iconType: 'os' },
  { name: 'DBMS', sublabel: 'TRANSACTIONS & ACID', category: 'core_cs', iconType: 'dbms' },
  { name: 'Software Engineering', sublabel: 'SDLC / MODULAR SYSTEMS', category: 'core_cs', iconType: 'se' },
  { name: 'UI / UX Design', sublabel: 'INTERACTION & WIREFRAMING', category: 'creative', iconType: 'design' },
  { name: 'Photography', sublabel: 'FRAMING & MANUAL EXPOSURE', category: 'creative', iconType: 'camera' },
  { name: 'Videography', sublabel: 'MOTION PACING & TIMING', category: 'creative', iconType: 'video' }
];

export const SKILLS_DATA = SKILLS_PILLS;
