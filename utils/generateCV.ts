import { jsPDF } from 'jspdf';
import { PERSONAL_INFO, SKILLS, PROJECTS, TIMELINE } from '../data/portfolioData';

// jsPDF's built-in fonts only support basic Latin characters.
const clean = (s: string): string =>
  s
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/[^\x20-\x7E]/g, '');

const COLORS = {
  dark: [7, 17, 13] as [number, number, number],
  gold: [197, 163, 106] as [number, number, number],
  goldDark: [138, 109, 59] as [number, number, number],
  text: [40, 44, 42] as [number, number, number],
  muted: [105, 110, 107] as [number, number, number],
  line: [220, 214, 200] as [number, number, number],
};

const SUMMARY =
  'Third-year Software Engineering undergraduate at NSBM Green University with hands-on experience designing and delivering full-stack web applications. Proficient in Java Spring Boot, ASP.NET Core 8, and React with TypeScript. Adept at building clean microservices, relational database schemas, and intuitive user interfaces. Seeking a Software Engineering / Full-Stack Development internship to contribute to production codebases.';

export const generateCV = (): jsPDF => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = 210;
  const pageH = 297;
  const margin = 15;
  const contentW = pageW - margin * 2;
  const bottom = pageH - 15;
  let y = 0;

  const ensure = (h: number) => {
    if (y + h > bottom) {
      doc.addPage();
      y = 18;
    }
  };

  const paragraph = (
    text: string,
    opts: { size?: number; color?: [number, number, number]; bold?: boolean; indent?: number; gap?: number } = {}
  ) => {
    const { size = 9.5, color = COLORS.text, bold = false, indent = 0, gap = 0 } = opts;
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lineH = size * 0.45;
    const lines = doc.splitTextToSize(clean(text), contentW - indent) as string[];
    lines.forEach((line) => {
      ensure(lineH);
      doc.text(line, margin + indent, y);
      y += lineH;
    });
    y += gap;
  };

  const heading = (title: string) => {
    ensure(14);
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...COLORS.goldDark);
    doc.text(title.toUpperCase(), margin, y);
    y += 2;
    doc.setDrawColor(...COLORS.gold);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + contentW, y);
    y += 5.5;
  };

  const bullet = (text: string) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const lines = doc.splitTextToSize(clean(text), contentW - 6) as string[];
    lines.forEach((line, i) => {
      ensure(4.3);
      doc.setTextColor(...COLORS.text);
      if (i === 0) {
        doc.setTextColor(...COLORS.goldDark);
        doc.text('-', margin + 1.5, y);
        doc.setTextColor(...COLORS.text);
      }
      doc.text(line, margin + 6, y);
      y += 4.3;
    });
  };

  // ---------- Header band ----------
  doc.setFillColor(...COLORS.dark);
  doc.rect(0, 0, pageW, 40, 'F');
  doc.setFillColor(...COLORS.gold);
  doc.rect(0, 40, pageW, 1.2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text(PERSONAL_INFO.name.toUpperCase(), margin, 18);

  doc.setFontSize(10.5);
  doc.setTextColor(...COLORS.gold);
  doc.text(
    clean(`${PERSONAL_INFO.role.toUpperCase()}  |  ${PERSONAL_INFO.yearStatus}`),
    margin,
    26
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(229, 210, 168);
  doc.text(clean(`${PERSONAL_INFO.university}, Sri Lanka`), margin, 32);

  // Clickable contact line
  let cx = margin;
  const contactY = 37;
  const addLink = (label: string, url: string) => {
    doc.setTextColor(212, 208, 197);
    doc.textWithLink(label, cx, contactY, { url });
    cx += doc.getTextWidth(label);
  };
  const sep = () => {
    doc.setTextColor(...COLORS.gold);
    doc.text('  |  ', cx, contactY);
    cx += doc.getTextWidth('  |  ');
  };
  addLink(PERSONAL_INFO.email, `mailto:${PERSONAL_INFO.email}`);
  sep();
  addLink('github.com/Dhilshan02', PERSONAL_INFO.github);
  sep();
  addLink('LinkedIn: dhilshan-mohamed', PERSONAL_INFO.linkedin);

  y = 52;

  // ---------- Summary ----------
  heading('Professional Summary');
  paragraph(SUMMARY, { gap: 2 });

  // ---------- Education ----------
  heading('Education');
  TIMELINE.filter((t) => t.id !== 'freelance-dev').forEach((item) => {
    ensure(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...COLORS.dark);
    doc.text(clean(item.role), margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.goldDark);
    doc.text(clean(item.period), margin + contentW, y, { align: 'right' });
    y += 4.5;
    paragraph(`${item.institution}  -  ${item.location}`, { size: 9, color: COLORS.muted, gap: 1 });
    paragraph(item.description, { gap: 1 });
    item.achievements.forEach(bullet);
    y += 3;
  });

  // ---------- Technical skills ----------
  heading('Technical Skills');
  const categories = Array.from(new Set(SKILLS.map((s) => s.category)));
  categories.forEach((cat) => {
    const names = SKILLS.filter((s) => s.category === cat).map((s) => s.name).join(', ');
    ensure(6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...COLORS.dark);
    const label = `${clean(cat)}: `;
    doc.text(label, margin, y);
    const labelW = doc.getTextWidth(label);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.text);
    const lines = doc.splitTextToSize(clean(names), contentW - labelW) as string[];
    lines.forEach((line, i) => {
      if (i > 0) ensure(4.5);
      doc.text(line, margin + labelW, y);
      y += 4.5;
    });
    y += 1;
  });

  // ---------- Projects ----------
  heading('Key Projects');
  PROJECTS.forEach((p) => {
    ensure(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...COLORS.dark);
    doc.text(clean(p.title), margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.goldDark);
    doc.text(clean(p.category), margin + contentW, y, { align: 'right' });
    y += 4.5;
    paragraph(p.description, { gap: 0.5 });
    paragraph(`Tech: ${p.techStack.join(', ')}`, { size: 8.5, color: COLORS.muted, gap: 3 });
  });

  // ---------- Footer on every page ----------
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.muted);
    doc.text(`${clean(PERSONAL_INFO.name)} - Curriculum Vitae`, margin, pageH - 8);
    doc.text(`Page ${i} of ${pages}`, margin + contentW, pageH - 8, { align: 'right' });
  }

  return doc;
};

export const downloadCV = (): void => {
  generateCV().save(PERSONAL_INFO.cvFilename);
};
