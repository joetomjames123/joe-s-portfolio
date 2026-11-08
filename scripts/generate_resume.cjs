const fs = require('fs');

function createPdf(pages) {
  const objects = [];
  function addObj(content) {
    objects.push(content);
    return objects.length;
  }

  // Obj 1, 2, 3: Fonts
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>');

  const pageObjIds = [];
  const contentObjIds = [];

  pages.forEach(p => {
    let stream = '';
    if (p.lines) {
      p.lines.forEach(l => {
        const c = l.color || [0, 0, 0];
        stream += `${c[0]} ${c[1]} ${c[2]} RG\n`;
        stream += `${l.width || 1} w\n`;
        stream += `${l.x1} ${l.y1} m ${l.x2} ${l.y2} l S\n`;
      });
    }

    if (p.textBlocks) {
      p.textBlocks.forEach(tb => {
        const fontName = tb.font === 'bold' ? '/F2' : (tb.font === 'italic' ? '/F3' : '/F1');
        const c = tb.color || [0, 0, 0];
        const safeText = tb.text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        stream += `BT\n`;
        stream += `${fontName} ${tb.size} Tf\n`;
        stream += `${c[0]} ${c[1]} ${c[2]} rg\n`;
        stream += `1 0 0 1 ${tb.x} ${tb.y} Tm\n`;
        stream += `(${safeText}) Tj\n`;
        stream += `ET\n`;
      });
    }

    const cId = addObj(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
    contentObjIds.push(cId);
  });

  const pagesObjIndex = objects.length + 1;
  pages.forEach((p, idx) => {
    const pId = addObj(`<< /Type /Page /Parent ${pagesObjIndex + pages.length} 0 R /MediaBox [0 0 595.28 841.89] /Contents ${contentObjIds[idx]} 0 R /Resources << /Font << /F1 1 0 R /F2 2 0 R /F3 3 0 R >> >> >>`);
    pageObjIds.push(pId);
  });

  const pagesParentObj = addObj(`<< /Type /Pages /Kids [${pageObjIds.map(id => id + ' 0 R').join(' ')}] /Count ${pages.length} >>`);
  const catalogObj = addObj(`<< /Type /Catalog /Pages ${pagesParentObj} 0 R >>`);

  let pdf = '%PDF-1.4\n';
  const xref = [0];
  for (let i = 0; i < objects.length; i++) {
    xref.push(Buffer.byteLength(pdf));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xrefStart = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    const offset = String(xref[i]).padStart(10, '0');
    pdf += `${offset} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogObj} 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;
  return Buffer.from(pdf);
}

const p1Text = [];
const p1Lines = [];

// Header
p1Text.push({ x: 45, y: 800, size: 22, font: 'bold', color: [0, 0.45, 0.3], text: 'JOE TOM JAMES' });
p1Text.push({ x: 45, y: 784, size: 9.5, font: 'regular', color: [0.2, 0.25, 0.25], text: 'Kannur, Kerala, India   |   +91 9497549620   |   joetomjames123@gmail.com' });
p1Text.push({ x: 45, y: 771, size: 9.5, font: 'regular', color: [0.2, 0.25, 0.25], text: 'linkedin.com/in/joe-tom-0a9875369   |   github.com/joetomjames123' });

p1Lines.push({ x1: 45, y1: 760, x2: 550, y2: 760, color: [0, 0.5, 0.33], width: 1.5 });

// Summary
let currY = 742;
p1Text.push({ x: 45, y: currY, size: 11, font: 'bold', color: [0, 0.45, 0.3], text: 'PROFESSIONAL SUMMARY' });
currY -= 5;
p1Lines.push({ x1: 45, y1: currY, x2: 550, y2: currY, color: [0.75, 0.8, 0.78], width: 0.5 });
currY -= 15;
const summary = [
  'Computer Science and Engineering student pursuing an Integrated M.Tech at VIT-AP University with a CGPA of 7.94/10.',
  'Dedicated to frontend engineering, interactive web applications, software systems, and thoughtful digital experiences.',
  'Skilled in Java, Python, C/C++, JavaScript, React, Tailwind CSS, and databases. Completed a Frontend Engineering internship',
  'at FlyRank AI and engineered scalable web applications including ClinicFlow, an end-to-end clinic management platform.'
];
summary.forEach(l => {
  p1Text.push({ x: 45, y: currY, size: 9, font: 'regular', color: [0.15, 0.15, 0.15], text: l });
  currY -= 13;
});

// Education
currY -= 6;
p1Text.push({ x: 45, y: currY, size: 11, font: 'bold', color: [0, 0.45, 0.3], text: 'EDUCATION' });
currY -= 5;
p1Lines.push({ x1: 45, y1: currY, x2: 550, y2: currY, color: [0.75, 0.8, 0.78], width: 0.5 });
currY -= 15;
p1Text.push({ x: 45, y: currY, size: 9.5, font: 'bold', color: [0.1, 0.1, 0.1], text: 'VIT-AP University' });
p1Text.push({ x: 420, y: currY, size: 9, font: 'italic', color: [0.3, 0.3, 0.3], text: 'September 2024 - Present' });
currY -= 13;
p1Text.push({ x: 45, y: currY, size: 9, font: 'regular', color: [0.15, 0.15, 0.15], text: 'Integrated M.Tech in Computer Science and Engineering  |  CGPA: 7.94 / 10.0' });

currY -= 15;
p1Text.push({ x: 45, y: currY, size: 9.5, font: 'bold', color: [0.1, 0.1, 0.1], text: "St. Joseph's Higher Secondary School" });
p1Text.push({ x: 420, y: currY, size: 9, font: 'italic', color: [0.3, 0.3, 0.3], text: 'August 2022 - March 2024' });
currY -= 13;
p1Text.push({ x: 45, y: currY, size: 9, font: 'regular', color: [0.15, 0.15, 0.15], text: 'Higher Secondary Education (Bio-Maths / Science)' });

// Internship
currY -= 15;
p1Text.push({ x: 45, y: currY, size: 11, font: 'bold', color: [0, 0.45, 0.3], text: 'INTERNSHIP EXPERIENCE' });
currY -= 5;
p1Lines.push({ x1: 45, y1: currY, x2: 550, y2: currY, color: [0.75, 0.8, 0.78], width: 0.5 });
currY -= 15;
p1Text.push({ x: 45, y: currY, size: 9.5, font: 'bold', color: [0.1, 0.1, 0.1], text: 'FlyRank AI  -  Frontend Engineering Intern' });
p1Text.push({ x: 420, y: currY, size: 9, font: 'italic', color: [0.3, 0.3, 0.3], text: 'July 2026 - September 2026' });
currY -= 13;
const expBullets = [
  '- Gained practical exposure to modern frontend engineering workflows and production web interface architectures.',
  '- Translated functional and design specifications into modular, responsive interface components, optimizing UI usability.',
  '- Collaborated across development cycles, participating in code reviews, testing, and continuous frontend enhancements.'
];
expBullets.forEach(b => {
  p1Text.push({ x: 50, y: currY, size: 9, font: 'regular', color: [0.15, 0.15, 0.15], text: b });
  currY -= 13;
});

// Projects
currY -= 6;
p1Text.push({ x: 45, y: currY, size: 11, font: 'bold', color: [0, 0.45, 0.3], text: 'KEY PROJECTS' });
currY -= 5;
p1Lines.push({ x1: 45, y1: currY, x2: 550, y2: currY, color: [0.75, 0.8, 0.78], width: 0.5 });
currY -= 15;

p1Text.push({ x: 45, y: currY, size: 9.5, font: 'bold', color: [0.1, 0.1, 0.1], text: 'ClinicFlow - Comprehensive Clinic Management Platform' });
p1Text.push({ x: 400, y: currY, size: 8.5, font: 'italic', color: [0, 0.4, 0.28], text: 'clinicflow-platform.vercel.app' });
currY -= 13;
const p1Bullets = [
  '- Architected an end-to-end SaaS healthcare management platform unifying electronic records, appointments, and billing.',
  '- Designed role-based permissions separating Super Admin, Clinic Admin, Doctor, and Receptionist workflows.',
  '- Tech Stack: React, TypeScript, Tailwind CSS, REST APIs, PostgreSQL.'
];
p1Bullets.forEach(b => {
  p1Text.push({ x: 50, y: currY, size: 9, font: 'regular', color: [0.15, 0.15, 0.15], text: b });
  currY -= 12;
});

currY -= 3;
p1Text.push({ x: 45, y: currY, size: 9.5, font: 'bold', color: [0.1, 0.1, 0.1], text: 'University Event Management System' });
p1Text.push({ x: 420, y: currY, size: 8.5, font: 'italic', color: [0.3, 0.3, 0.3], text: 'github.com/joetomjames123' });
currY -= 13;
const p2Bullets = [
  '- Built a web-based portal facilitating institutional event registrations, attendee management, and schedule publishing.',
  '- Automated participant tracking and ticket issuance, minimizing organizational overhead for university clubs.',
  '- Tech Stack: JavaScript, HTML5/CSS3, Relational Database Management System.'
];
p2Bullets.forEach(b => {
  p1Text.push({ x: 50, y: currY, size: 9, font: 'regular', color: [0.15, 0.15, 0.15], text: b });
  currY -= 12;
});

currY -= 3;
p1Text.push({ x: 45, y: currY, size: 9.5, font: 'bold', color: [0.1, 0.1, 0.1], text: 'Hardware and Engineering Prototypes' });
currY -= 13;
const p3Bullets = [
  '- Waste-Collecting Boat: Prototyped a dual-hull aquatic mechanism for surface pollutant collection in water bodies.',
  '- Line-Following Autonomous Robot: Built an IR sensor-driven microcontrolled rover programmed for high-precision path tracing.'
];
p3Bullets.forEach(b => {
  p1Text.push({ x: 50, y: currY, size: 9, font: 'regular', color: [0.15, 0.15, 0.15], text: b });
  currY -= 12;
});

// Skills
currY -= 6;
p1Text.push({ x: 45, y: currY, size: 11, font: 'bold', color: [0, 0.45, 0.3], text: 'TECHNICAL SKILLS' });
currY -= 5;
p1Lines.push({ x1: 45, y1: currY, x2: 550, y2: currY, color: [0.75, 0.8, 0.78], width: 0.5 });
currY -= 14;
const skillLines = [
  { label: 'Programming Languages:', val: 'Java, Python, C, C++, JavaScript, TypeScript' },
  { label: 'Frontend and Web UI:', val: 'React, HTML5, CSS3, Tailwind CSS, Responsive Design' },
  { label: 'Databases and Backend:', val: 'MySQL, PostgreSQL, NoSQL databases, RESTful APIs' },
  { label: 'Developer Tools and OS:', val: 'Git, GitHub, Visual Studio Code, Linux, Windows' },
  { label: 'Core Computer Science:', val: 'OOP, Data Structures and Algorithms, DBMS, Operating Systems, Software Engineering' }
];
skillLines.forEach(s => {
  p1Text.push({ x: 45, y: currY, size: 9, font: 'bold', color: [0.1, 0.1, 0.1], text: s.label });
  p1Text.push({ x: 195, y: currY, size: 9, font: 'regular', color: [0.2, 0.2, 0.2], text: s.val });
  currY -= 12;
});

// Certifications
currY -= 4;
p1Text.push({ x: 45, y: currY, size: 11, font: 'bold', color: [0, 0.45, 0.3], text: 'VERIFIED CERTIFICATIONS' });
currY -= 5;
p1Lines.push({ x1: 45, y1: currY, x2: 550, y2: currY, color: [0.75, 0.8, 0.78], width: 0.5 });
currY -= 14;
const certLines = [
  '- Front-end AI Engineering and AI Fluency - FlyRank AI',
  '- Hedera Certified Developer Associate (HCDA) and Hedera Certified Foundation (HCF) - IDS / BBN',
  '- Introduction to Generative AI (Google Cloud) and Prompt Engineering with GitHub Copilot (Microsoft) - Simplilearn',
  '- DBMS Course: Master Fundamentals and Advanced Concepts - Scaler Topics',
  '- MATLAB Onramp - MathWorks | Make to Monetize - VIT-AP University'
];
certLines.forEach(c => {
  p1Text.push({ x: 45, y: currY, size: 8.5, font: 'regular', color: [0.2, 0.2, 0.2], text: c });
  currY -= 11.5;
});

const pdfBuf = createPdf([{ textBlocks: p1Text, lines: p1Lines }]);
const dest = 'C:/Users/JOETOM/.gemini/antigravity/scratch/joe-tom-james-portfolio/public/resume/joe_tom_james_resume.pdf';
fs.writeFileSync(dest, pdfBuf);
console.log('Premium PDF generated successfully! Bytes:', pdfBuf.length);

