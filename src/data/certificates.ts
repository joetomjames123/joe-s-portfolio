export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  imageSrc: string;
  description: string;
  category: 'ai' | 'blockchain' | 'database' | 'engineering' | 'entrepreneurship';
}

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'flyrank-frontend-ai',
    title: 'Front-end AI Engineering',
    issuer: 'FlyRank AI Corp.',
    issueDate: '23 September 2026',
    credentialId: 'FR-D11-FA720-E6D08',
    imageSrc: '/certificates/flyrank-frontend-ai.jpg',
    description: 'Internship Program certification demonstrating excellence in technical competency, frontend web architecture, and collaborative contribution to the FlyRank engineering team.',
    category: 'ai'
  },
  {
    id: 'flyrank-ai-fluency',
    title: 'AI Fluency',
    issuer: 'FlyRank AI Corp.',
    issueDate: '23 September 2026',
    credentialId: 'FR-D11-09F44-9DA04',
    imageSrc: '/certificates/flyrank-ai-fluency.jpg',
    description: 'Internship Program certification validating strong understanding of AI principles, professional conduct, and modern artificial intelligence toolchain adoption.',
    category: 'ai'
  },
  {
    id: 'hedera-hcda',
    title: 'Hedera Certified Developer Associate (HCDA)',
    issuer: 'IDS & Bharat Blockchain Network (Hyperledger Training Partner)',
    imageSrc: '/certificates/hedera-certified-developer-associate.jpg',
    description: 'Certification validating a strong understanding of blockchain technologies, decentralized applications (dApps), Hedera services, and enterprise-grade distributed ledger solutions.',
    category: 'blockchain'
  },
  {
    id: 'hedera-hcf',
    title: 'Hedera Certified Foundation (HCF)',
    issuer: 'IDS & Bharat Blockchain Network (Hyperledger Training Partner)',
    imageSrc: '/certificates/hedera-certified-foundation.jpg',
    description: 'Foundational certification demonstrating mastery in Web3 architecture, distributed consensus, smart contracts, and decentralized network infrastructure.',
    category: 'blockchain'
  },
  {
    id: 'google-genai',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud & Simplilearn SkillUp',
    issueDate: '09 September 2025',
    credentialId: '8942337',
    imageSrc: '/certificates/google-cloud-generative-ai.jpg',
    description: 'Declaration of completion for Google Cloud curriculum covering generative AI concepts, large language models, prompt workflows, and practical applications.',
    category: 'ai'
  },
  {
    id: 'microsoft-copilot',
    title: 'Prompt Engineering with GitHub Copilot',
    issuer: 'Microsoft & Simplilearn SkillUp',
    issueDate: '09 September 2025',
    credentialId: '8942472',
    imageSrc: '/certificates/microsoft-prompt-engineering.jpg',
    description: 'Declaration of completion validating effective prompt design, AI-assisted code generation, and developer productivity workflows using GitHub Copilot.',
    category: 'ai'
  },
  {
    id: 'scaler-dbms',
    title: 'DBMS Course: Master the Fundamentals & Advanced Concepts',
    issuer: 'Scaler Topics',
    issueDate: '22 April 2026',
    imageSrc: '/certificates/scaler-dbms.jpg',
    description: 'Certificate of Excellence covering 74 Video Tutorials, 16 Modules, and 16 Challenges spanning SQL, relational schemas, indexing, transactions, and normalization.',
    category: 'database'
  },
  {
    id: 'mathworks-matlab',
    title: 'MATLAB Onramp',
    issuer: 'MathWorks Training Services',
    issueDate: '14 October 2024',
    imageSrc: '/certificates/mathworks-matlab-onramp.jpg',
    description: 'Course completion certificate validating 100% completion of self-paced technical computing, matrix operations, plotting, and numerical data analysis in MATLAB.',
    category: 'engineering'
  },
  {
    id: 'vit-make-to-monetize',
    title: 'Make to Monetize',
    issuer: 'VIT-AP University (Entrepreneurship Club)',
    issueDate: '29 September 2025',
    imageSrc: '/certificates/vit-make-to-monetize.jpg',
    description: 'Certificate of Participation recognizing active engagement, innovation, and entrepreneurial execution during the Make to Monetize summit.',
    category: 'entrepreneurship'
  }
];

