export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  featured: boolean;
  logoSrc?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    myContribution: string;
    techStack: string[];
    keyFeatures: string[];
  };
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'clinicflow',
    number: '01',
    title: 'CLINICFLOW',
    category: 'Healthcare SaaS Platform',
    tagline: 'Modern Clinic Management & Patient Workflow System',
    description: 'A comprehensive healthcare operations platform engineered to streamline clinical administration, appointment scheduling, billing invoices, prescription tracking, and multi-role staff workflows.',
    featured: true,
    logoSrc: '/projects/clinicflow-logo.png',
    liveUrl: 'https://clinicflow-platform.vercel.app',
    githubUrl: 'https://github.com/Rajat77a/clinicflow-platform.git',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Role-Based Access'],
    caseStudy: {
      overview: 'ClinicFlow is a production-focused SaaS platform designed to modernize clinic workflows. It replaces cumbersome physical paperwork with an integrated digital control center that links doctors, staff, and patients in real time.',
      problem: 'Small to mid-sized medical clinics frequently struggle with disjointed software: one system for appointments, another for billing, and manual paper records for prescriptions. This creates bottlenecks, appointment clashes, and high administrative overhead.',
      solution: 'Engineered an end-to-end web platform featuring multi-role staff dashboards, visual appointment booking matrices, automated billing calculation, digital prescription history, and role-based access control.',
      myContribution: 'Co-developed key frontend modules, engineered responsive dashboard interfaces, translated role-based permission requirements into intuitive interface states, and refined appointment flows.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'PostgreSQL'],
      keyFeatures: [
        'Multi-Tier Role Access (Super Admin, Clinic Admin, Doctor, Receptionist)',
        'Live Appointment Calendar & Real-Time Booking State',
        'Integrated Invoice & Billing System with Printable Summaries',
        'Digital Prescription Management & Medication Instructions'
      ]
    }
  },
  {
    id: 'ayur-mannoor',
    number: '02',
    title: 'AYUR MANNOOR',
    category: 'Healthcare Digital Web Presence',
    tagline: 'Traditional Healing & Holistic Healthcare Showcase',
    description: 'An elegant digital presence developed for an Ayurvedic wellness center, presenting treatments, doctor consultations, therapeutic offerings, and patient inquiry channels.',
    featured: false,
    logoSrc: '/projects/ayurmannoor-logo.jpg',
    liveUrl: 'https://ayurmannoor.vercel.app',
    tags: ['React', 'Tailwind CSS', 'Responsive UI', 'Healthcare'],
    caseStudy: {
      overview: 'Ayur Mannoor is a digital presence crafted to connect seekers of traditional holistic healing with genuine Ayurvedic practitioners, establishing trust and clarity through a serene visual layout.',
      problem: 'Traditional healthcare institutions often have antiquated or non-responsive websites that fail to communicate the quality of their practice to digital-first patients looking for verified treatments.',
      solution: 'Created a serene, typography-driven web experience highlighting medical specialties, natural treatment procedures, facility photographs, and direct consultation booking mechanisms.',
      myContribution: 'Designed responsive layout components, implemented high-legibility typographic hierarchies, and ensured fast load times across mobile devices.',
      techStack: ['React', 'HTML5', 'Tailwind CSS', 'Modern JavaScript'],
      keyFeatures: [
        'Holistic Treatment & Therapy Catalog',
        'Practitioner Profiles & Medical Backgrounds',
        'Direct Consultation Inquiries & Contact Integration',
        'Clean, Calming Aesthetics with Fluid Responsiveness'
      ]
    }
  },
  {
    id: 'samatraya',
    number: '03',
    title: 'SAMATRAYA',
    category: 'Clinical Digital Interface',
    tagline: 'Modern Clinic Interface & Patient Interaction Web Portal',
    description: 'A focused healthcare interface designed to communicate specialized medical services, clinic timing, and streamlined patient inquiries with interactive smooth scrolling navigation.',
    featured: false,
    logoSrc: '/projects/samatraya-logo.jpg',
    liveUrl: 'https://samatraya-clinic.vercel.app/',
    githubUrl: 'https://github.com/joetomjames123/samatraya-clinic.git',
    tags: ['React', 'JavaScript', 'CSS3', 'Healthcare UI'],
    caseStudy: {
      overview: 'Samatraya is a specialized medical web interface offering an effortless digital entry point for patients to discover clinical care services and reach healthcare staff directly.',
      problem: 'Patients needing specific medical consultations often face friction when attempting to find operating hours, physician specialties, or simple booking channels.',
      solution: 'Built an uncluttered, responsive clinic website prioritizing essential details: services offered, clear doctor information, and immediate contact capabilities.',
      myContribution: 'Full lifecycle development from UI structuring in React to responsive styling, component creation, and deployment on Vercel.',
      techStack: ['React', 'JavaScript', 'CSS3', 'Vercel Deployment'],
      keyFeatures: [
        'Accessible Service Breakdown with Transparent Information',
        'Interactive Smooth Scrolling & Fluid UI Animations',
        'Fast-Loading Single Page Architecture',
        'Integrated Contact Channels for Patient Ease'
      ]
    }
  },
  {
    id: 'university-event-management',
    number: '04',
    title: 'EVENT MANAGEMENT SYSTEM',
    category: 'Institutional Web Application',
    tagline: 'Campus Event Scheduling & Attendee Lifecycle Portal',
    description: 'A centralized university software system built to handle institutional event registrations, attendee participant management, venue scheduling, and club notifications.',
    featured: false,
    githubUrl: 'https://github.com/joetomjames123/university-event-management-system1.git',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Relational DB', 'Campus Tech'],
    caseStudy: {
      overview: 'An institutional web application built to streamline how universities, student chapters, and academic clubs organize, publish, and track on-campus events.',
      problem: 'University campus events traditionally suffer from fragmented registration forms, duplicate entries, disorganized attendance tracking, and poor schedule visibility.',
      solution: 'Engineered an event portal that allows organizers to post schedules, manage registrations with validation, and export clean participant records for coordination.',
      myContribution: 'Structured front-end interaction workflows, registration form validation, event listings, and database relational mappings for participants and sessions.',
      techStack: ['JavaScript', 'HTML5', 'CSS3', 'Relational DBMS', 'Git'],
      keyFeatures: [
        'Centralized Campus Event Calendar & Showcase',
        'Automated Participant Registration with Input Validation',
        'Event Categorization by Department & Club',
        'Attendee List Management & Data Export'
      ]
    }
  },
  {
    id: 'waste-boat',
    number: '05',
    title: 'WASTE-COLLECTING BOAT',
    category: 'Environmental Robotics & Hardware Concept',
    tagline: 'Autonomous Aquatic Debris Harvester for Inland Waterways',
    description: 'A functional prototype concept exploring surface pollutant and plastic collection from water bodies to support cleaner aquatic ecosystems and environmental preservation.',
    featured: false,
    tags: ['Hardware Prototyping', 'Environmental Tech', 'Motor Control', 'Sustainability'],
    caseStudy: {
      overview: 'A physical prototype and engineering concept designed to address solid floating waste accumulation in ponds, rivers, and lakes without endangering local marine life.',
      problem: 'Floating plastic and solid debris in municipal water reservoirs are labor-intensive to extract manually, presenting safety hazards and continuous ecological damage.',
      solution: 'Conceptualized and built a scaled catamaran prototype with a forward collection conveyor that skims debris from water surfaces into an internal containment bin.',
      myContribution: 'Worked on mechanical concept modeling, buoyancy balance calculations, propulsion motor wiring, and structural prototype assembly.',
      techStack: ['DC Motors', 'Chassis Prototyping', 'Motor Drivers', 'Power Distribution'],
      keyFeatures: [
        'Dual-Hull Catamaran Design for Hydrodynamic Stability',
        'Forward Mesh Skimming Mechanism for Debris Entrapment',
        'Remote / Guided Propulsion for Restricted Shorelines',
        'Eco-Conscious Prototype for Inland Water Remediation'
      ]
    }
  },
  {
    id: 'line-robot',
    number: '06',
    title: 'LINE-FOLLOWING ROBOT',
    category: 'Autonomous Embedded Systems',
    tagline: 'Sensor-Guided Autonomous Path Tracing Mobile Robot',
    description: 'A sensor-based autonomous robotics build utilizing infrared sensor arrays, microcontrollers, and closed-loop motor control logic to trace predefined high-contrast navigational paths.',
    featured: false,
    tags: ['Embedded Systems', 'IR Sensors', 'Microcontroller', 'Motor Control'],
    caseStudy: {
      overview: 'An autonomous ground vehicle engineered to navigate factory floor paths, logistics tracks, or structured laboratory courses without manual human intervention.',
      problem: 'Industrial logistics need reliable, low-cost autonomous materials transit mechanisms that navigate predictable routes without costly optical LIDAR setups.',
      solution: 'Built an embedded robotic system with twin differential drive motors governed by an IR reflectance sensor array executing real-time threshold feedback adjustments.',
      myContribution: 'Soldered and assembled circuit architecture, programmed feedback control algorithms, calibrated optical sensor thresholds, and tuned motor speeds for smooth cornering.',
      techStack: ['Microcontroller C/C++', 'IR Sensor Array', 'L298N Motor Driver', 'DC Gear Motors'],
      keyFeatures: [
        'Real-Time Infrared Path Detection & Threshold Calibration',
        'Differential PWM Motor Drive for Precise Cornering',
        'Low-Latency Feedback Loop Preventing Trajectory Overshoot',
        'Self-Contained On-Board Battery Power Management'
      ]
    }
  }
];
