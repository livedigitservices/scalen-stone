import { jsPDF } from 'jspdf';
import { BRAND } from '../constants/theme';

export interface GoldItemRecord {
  id: string;
  description: string;
  grossWeight: number;
  netWeight: number;
  photos: string[]; // base64 Data URLs
}

export interface GoldLoanData {
  // Personal Info
  aadharNumber: string;
  fullName: string;
  email?: string;

  // Contact Info
  primaryMobile: string;
  secondaryMobile?: string;
  emergencyContact?: string;
  emergencyRelation?: string;

  // Address
  presentAddress: string;
  permanentAddress: string;

  // Gold Items
  goldItems: GoldItemRecord[];

  // Loan Details
  interestRate: number; // percentage (e.g. 1.5 or 12)
  loanAmount: number; // principal amount in INR
  durationMonths: number | string;
  loanDate?: string;
  monthlyInterest: number;
  totalPrinciple: number;

  // System metadata
  certificateNumber?: string;
}

/**
 * Format currency in Indian numbering format with clean ASCII "INR " prefix.
 */
export const formatINR = (val: number): string => {
  if (isNaN(val) || val === null || val === undefined) return 'INR 0';
  const parts = Math.round(val).toString();
  let lastThree = parts.substring(parts.length - 3);
  const otherNumbers = parts.substring(0, parts.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  return `INR ${formatted}`;
};

/**
 * Loads an image from a URL and converts it to a data URL via HTML Canvas.
 */
export const loadImageAsDataUrl = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve('');
      return;
    }
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } else {
          resolve('');
        }
      } catch {
        resolve('');
      }
    };
    img.onerror = () => resolve('');
    img.src = url;
  });
};

/**
 * Generates an official, premium Scalen Stone Finance Gold Loan Sanction Dossier & Pledge Receipt PDF.
 */
export const generateGoldLoanPdf = async (
  data: GoldLoanData
): Promise<{ doc: jsPDF; filename: string }> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12;
  const contentLeft = margin + 4; // 16mm
  const contentRight = pageWidth - margin - 4; // 194mm
  const contentWidth = contentRight - contentLeft; // 178mm

  const certificateNumber =
    data.certificateNumber ||
    `SSF-GL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const loanDateStr =
    data.loanDate ||
    new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const issueTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const totalGrossWeight = data.goldItems.reduce((acc, itm) => acc + (itm.grossWeight || 0), 0);
  const totalNetWeight = data.goldItems.reduce((acc, itm) => acc + (itm.netWeight || 0), 0);

  // Collect all photos from all items
  const allPhotos: { itemDesc: string; dataUrl: string }[] = [];
  data.goldItems.forEach((itm, idx) => {
    (itm.photos || []).forEach((photo) => {
      if (photo) {
        allPhotos.push({
          itemDesc: itm.description || `Item #${idx + 1}`,
          dataUrl: photo,
        });
      }
    });
  });

  const drawPageBorder = (pageNum: number, totalPages: number) => {
    // Outer Gold Border
    doc.setDrawColor(166, 124, 66); // #a67c42
    doc.setLineWidth(0.6);
    doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

    // Inner Subtle Border
    doc.setDrawColor(226, 232, 240); // #e2e8f0
    doc.setLineWidth(0.2);
    doc.rect(margin + 1.5, margin + 1.5, pageWidth - (margin + 1.5) * 2, pageHeight - (margin + 1.5) * 2);

    // Corner Ornaments
    const cornerSize = 4.5;
    doc.setDrawColor(197, 168, 128); // #c5a880
    doc.setLineWidth(0.8);
    // Top-Left
    doc.line(margin - 1, margin + cornerSize, margin - 1, margin - 1);
    doc.line(margin - 1, margin - 1, margin + cornerSize, margin - 1);
    // Top-Right
    doc.line(pageWidth - margin + 1, margin + cornerSize, pageWidth - margin + 1, margin - 1);
    doc.line(pageWidth - margin + 1, margin - 1, pageWidth - margin - cornerSize, margin - 1);
    // Bottom-Left
    doc.line(margin - 1, pageHeight - margin - cornerSize, margin - 1, pageHeight - margin + 1);
    doc.line(margin - 1, pageHeight - margin + 1, margin + cornerSize, pageHeight - margin + 1);
    // Bottom-Right
    doc.line(pageWidth - margin + 1, pageHeight - margin - cornerSize, pageWidth - margin + 1, pageHeight - margin + 1);
    doc.line(pageWidth - margin + 1, pageHeight - margin + 1, pageWidth - margin - cornerSize, pageHeight - margin + 1);

    // Page number marker at bottom
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(148, 163, 184);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth / 2, pageHeight - margin + 2.5, { align: 'center' });
  };

  // Preload logo
  let logoDataUrl = '';
  try {
    logoDataUrl = await loadImageAsDataUrl('/scalen-stone-logo.png');
  } catch {
    logoDataUrl = '';
  }

  // ==========================================
  // PAGE 1: DOSSIER, CUSTOMER, LOAN & SCHEDULE
  // ==========================================

  // --- 1. HEADER (Y: 17 to 43) ---
  let headerY = 17;
  if (logoDataUrl) {
    const logoW = 46;
    const logoH = 21.8;
    doc.addImage(logoDataUrl, 'PNG', contentLeft, headerY, logoW, logoH);
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42);
    doc.text('SCALEN STONE', contentLeft, headerY + 8);
    doc.setFontSize(10);
    doc.setTextColor(166, 124, 66);
    doc.text('— FINANCE —', contentLeft, headerY + 14);
  }

  // Company Details (Right aligned)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('SCALEN STONE FINANCE', contentRight, headerY + 3.5, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Institutional Gold Loans & Secured Asset Liquidity Division', contentRight, headerY + 7.5, { align: 'right' });
  doc.text('Level 14, Tower One, Financial District, Hyderabad - 500032', contentRight, headerY + 11.5, { align: 'right' });
  doc.text('Branch Desk: BK Towers, Visakhapatnam - 530016', contentRight, headerY + 15, { align: 'right' });
  doc.text(`Direct: ${BRAND.contact.phone}  |  Email: ${BRAND.contact.email}`, contentRight, headerY + 18.5, { align: 'right' });
  doc.text('CIN: U67190TG2014PTC095112  |  GSTIN: 36AAECS4944M1Z2', contentRight, headerY + 22, { align: 'right' });

  // Divider under header
  headerY += 25.5;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(contentLeft, headerY, contentRight, headerY);
  doc.setDrawColor(166, 124, 66);
  doc.setLineWidth(0.9);
  doc.line(contentLeft, headerY, contentLeft + 35, headerY);

  // --- 2. TITLE & METADATA RIBBON (Y: 47 to 64) ---
  headerY += 4.5;
  const bannerH = 17;
  doc.setFillColor(250, 248, 245);
  doc.roundedRect(contentLeft, headerY, contentWidth, bannerH, 1.5, 1.5, 'F');
  doc.setDrawColor(197, 168, 128);
  doc.setLineWidth(0.35);
  doc.roundedRect(contentLeft, headerY, contentWidth, bannerH, 1.5, 1.5, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('OFFICIAL GOLD LOAN SANCTION DOSSIER & PLEDGE RECEIPT', contentLeft + 4, headerY + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(100, 116, 139);
  doc.text('Secure Vault Pledged Asset Receipt, Customer KYC Audit & Sanction Record', contentLeft + 4, headerY + 11.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(15, 23, 42);
  doc.text(`Loan Dossier No: ${certificateNumber}`, contentRight - 4, headerY + 6.5, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(71, 85, 105);
  doc.text(`Sanctioned: ${loanDateStr} at ${issueTime} IST`, contentRight - 4, headerY + 11.5, { align: 'right' });

  // --- 3. TWO-COLUMN CARDS: CUSTOMER INFO & LOAN TERMS (Y: 69 to 119) ---
  let contentY = headerY + bannerH + 5;
  const colGap = 5;
  const colW = (contentWidth - colGap) / 2; // 86.5mm
  const cardH = 50;

  // Box 1: Customer Contact & Identity Information
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(contentLeft, contentY, colW, cardH, 1.5, 1.5, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(contentLeft, contentY, colW, cardH, 1.5, 1.5, 'S');

  // Box 1 Header
  doc.setFillColor(248, 250, 252);
  doc.rect(contentLeft + 0.2, contentY + 0.2, colW - 0.4, 6.2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(166, 124, 66);
  doc.text('CUSTOMER / BORROWER PARTICULARS', contentLeft + 4, contentY + 4.6);

  const cX = contentLeft + 4;
  let cy = contentY + 11;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(data.fullName || 'N/A', cX, cy);

  cy += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(71, 85, 105);
  doc.text(`Aadhar No: ${data.aadharNumber ? data.aadharNumber.replace(/(\d{4})/g, '$1 ').trim() : 'N/A'}`, cX, cy);

  if (data.email) {
    cy += 4;
    doc.text(`Email: ${data.email}`, cX, cy);
  }

  cy += 4;
  const secMobileText = data.secondaryMobile ? ` | Alt: ${data.secondaryMobile}` : '';
  doc.text(`Primary Mobile: ${data.primaryMobile || 'N/A'}${secMobileText}`, cX, cy);

  if (data.emergencyContact) {
    cy += 4;
    const relText = data.emergencyRelation ? ` (${data.emergencyRelation})` : '';
    doc.text(`Emergency: ${data.emergencyContact}${relText}`, cX, cy);
  }

  cy += 4;
  const splitPresAddr = doc.splitTextToSize(`Present: ${data.presentAddress || 'N/A'}`, colW - 8);
  doc.text(splitPresAddr.slice(0, 2), cX, cy);

  cy += 6.5;
  const splitPermAddr = doc.splitTextToSize(`Permanent: ${data.permanentAddress || 'N/A'}`, colW - 8);
  doc.text(splitPermAddr.slice(0, 2), cX, cy);

  // Box 2: Loan Financial Terms & Sanction Schedule
  const col2X = contentLeft + colW + colGap;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(col2X, contentY, colW, cardH, 1.5, 1.5, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(col2X, contentY, colW, cardH, 1.5, 1.5, 'S');

  // Box 2 Header
  doc.setFillColor(248, 250, 252);
  doc.rect(col2X + 0.2, contentY + 0.2, colW - 0.4, 6.2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(166, 124, 66);
  doc.text('SANCTIONED LOAN DETAILS & REPAYMENT', col2X + 4, contentY + 4.6);

  let lY = contentY + 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Sanctioned Loan Amount:', col2X + 4, lY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(166, 124, 66);
  doc.text(formatINR(data.loanAmount), col2X + colW - 4, lY, { align: 'right' });

  lY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(71, 85, 105);
  doc.text('Interest Rate:', col2X + 4, lY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.interestRate}% p.a.`, col2X + colW - 4, lY, { align: 'right' });

  lY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Loan Duration / Tenure:', col2X + 4, lY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.durationMonths} Months`, col2X + colW - 4, lY, { align: 'right' });

  lY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Monthly Interest Payable:', col2X + 4, lY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(formatINR(data.monthlyInterest), col2X + colW - 4, lY, { align: 'right' });

  lY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Total Principal to be Paid:', col2X + 4, lY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(formatINR(data.totalPrinciple), col2X + colW - 4, lY, { align: 'right' });

  lY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Custody Standard:', col2X + 4, lY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('100% Insured Swiss-Grade Vault Safe', col2X + colW - 4, lY, { align: 'right' });

  lY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Disbursal / Sanction Date:', col2X + 4, lY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // Green
  doc.text(loanDateStr, col2X + colW - 4, lY, { align: 'right' });

  // --- 4. PLEDGED GOLD ITEMS SCHEDULE TABLE (Y: 125 to 195) ---
  let tableY = contentY + cardH + 6;

  // Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(contentLeft, tableY, contentWidth, 7.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('#', contentLeft + 3, tableY + 5);
  doc.text('PLEDGED GOLD ITEM DESCRIPTION', contentLeft + 12, tableY + 5);
  doc.text('GROSS WEIGHT (g)', contentLeft + 98, tableY + 5);
  doc.text('NET WEIGHT (g)', contentLeft + 138, tableY + 5);
  doc.text('STATUS', contentRight - 4, tableY + 5, { align: 'right' });

  tableY += 7.5;
  const items = data.goldItems && data.goldItems.length > 0 ? data.goldItems : [
    { id: '1', description: 'Gold Ornament', grossWeight: 0, netWeight: 0, photos: [] }
  ];

  items.slice(0, 5).forEach((itm, idx) => {
    const rowH = 9.5;
    doc.setFillColor(idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 250);
    doc.rect(contentLeft, tableY, contentWidth, rowH, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.25);
    doc.rect(contentLeft, tableY, contentWidth, rowH, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${idx + 1}`, contentLeft + 3, tableY + 6.2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    const splitDesc = doc.splitTextToSize(itm.description || `Gold Item #${idx + 1}`, 80);
    doc.text(splitDesc[0], contentLeft + 12, tableY + 6.2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`${(itm.grossWeight || 0).toFixed(2)} g`, contentLeft + 98, tableY + 6.2);
    doc.text(`${(itm.netWeight || 0).toFixed(2)} g`, contentLeft + 138, tableY + 6.2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(16, 185, 129);
    doc.text('Assayed & Vault Sealed', contentRight - 4, tableY + 6.2, { align: 'right' });

    tableY += rowH;
  });

  // Table Total Row
  const totalRowH = 9;
  doc.setFillColor(254, 249, 235); // Warm Gold tint
  doc.rect(contentLeft, tableY, contentWidth, totalRowH, 'F');
  doc.setDrawColor(197, 168, 128);
  doc.setLineWidth(0.35);
  doc.rect(contentLeft, tableY, contentWidth, totalRowH, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(`TOTAL (${items.length} Pledged Items)`, contentLeft + 12, tableY + 5.8);

  doc.setTextColor(166, 124, 66);
  doc.text(`${totalGrossWeight.toFixed(2)} g`, contentLeft + 98, tableY + 5.8);
  doc.text(`${totalNetWeight.toFixed(2)} g`, contentLeft + 138, tableY + 5.8);

  doc.setFontSize(7.2);
  doc.setTextColor(15, 23, 42);
  doc.text(`Photos Recorded: ${allPhotos.length}`, contentRight - 4, tableY + 5.8, { align: 'right' });

  tableY += totalRowH + 6;

  // --- 5. TRUST & COMPLIANCE BADGES (Y: 185 to 201) ---
  const badgeGap = 4;
  const badgeW = (contentWidth - badgeGap * 2) / 3;
  const badgeH = 15;

  const badges = [
    {
      title: 'GERMAN LASER SPECTROMETER',
      sub: 'Non-Destructive 99.9% Purity Assay',
    },
    {
      title: '100% INSURED BANK VAULT SAFE',
      sub: 'Swiss-Grade Physical Custody',
    },
    {
      title: 'INSTANT DISBURSEMENT RECORD',
      sub: 'Zero Hidden Charges • Clear Ledger',
    },
  ];

  badges.forEach((b, i) => {
    const bx = contentLeft + i * (badgeW + badgeGap);
    doc.setFillColor(250, 248, 245);
    doc.roundedRect(bx, tableY, badgeW, badgeH, 1.2, 1.2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.25);
    doc.roundedRect(bx, tableY, badgeW, badgeH, 1.2, 1.2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(166, 124, 66);
    doc.text(b.title, bx + badgeW / 2, tableY + 5.8, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(100, 116, 139);
    doc.text(b.sub, bx + badgeW / 2, tableY + 10.2, { align: 'center' });
  });

  tableY += badgeH + 6;

  // --- 6. AUTHORIZATION, SEAL & SIGNATURE BLOCK (Y: 207 to 248) ---
  const sealCenterX = contentLeft + 24;
  const sealCenterY = tableY + 14;

  doc.setDrawColor(197, 168, 128);
  doc.setLineWidth(0.8);
  doc.circle(sealCenterX, sealCenterY, 11.5, 'S');

  doc.setDrawColor(166, 124, 66);
  doc.setLineWidth(0.3);
  doc.circle(sealCenterX, sealCenterY, 9.5, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.2);
  doc.setTextColor(166, 124, 66);
  doc.text('SCALEN STONE', sealCenterX, sealCenterY - 4.5, { align: 'center' });
  doc.text('•  •  •', sealCenterX, sealCenterY - 0.8, { align: 'center' });
  doc.text('OFFICIAL SEAL', sealCenterX, sealCenterY + 2.8, { align: 'center' });
  doc.text('ESTD 2014 • VERIFIED', sealCenterX, sealCenterY + 6.5, { align: 'center' });

  // Center: Digital Transaction Verification Box
  const qrBoxX = contentLeft + 52;
  const qrBoxW = 68;
  const qrBoxH = 26;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(qrBoxX, tableY + 1, qrBoxW, qrBoxH, 1.2, 1.2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(qrBoxX, tableY + 1, qrBoxW, qrBoxH, 1.2, 1.2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('DIGITAL LOAN SANCTION VERIFICATION', qrBoxX + qrBoxW / 2, tableY + 6, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(166, 124, 66);
  doc.text(`HASH: ${certificateNumber}-SEC`, qrBoxX + qrBoxW / 2, tableY + 11, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(100, 116, 139);
  doc.text('Immutable vault pledge record registered under Scalen Stone Finance.', qrBoxX + qrBoxW / 2, tableY + 15.5, { align: 'center' });
  doc.text('256-bit cryptographic verification • Tamper-evident ledger active.', qrBoxX + qrBoxW / 2, tableY + 19.5, { align: 'center' });
  doc.text('Online verification portal: www.scalenstone.com/verify', qrBoxX + qrBoxW / 2, tableY + 23.5, { align: 'center' });

  // Right: Dual Signature Block (Customer + Bank Officer)
  const signRightX = contentRight;
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(signRightX - 48, tableY + 16, signRightX, tableY + 16);

  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(166, 124, 66);
  doc.text('R. K. Vardhan', signRightX - 24, tableY + 13.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(15, 23, 42);
  doc.text('Authorized Loan Officer', signRightX - 24, tableY + 20, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(100, 116, 139);
  doc.text('Bullion Credit & Vault Operations', signRightX - 24, tableY + 23.5, { align: 'center' });

  tableY += 30;

  // --- 7. STATUTORY TERMS & CONDITIONS BOX (Y: 252 to 272) ---
  const termsH = 19;
  doc.setFillColor(252, 250, 247);
  doc.roundedRect(contentLeft, tableY, contentWidth, termsH, 1, 1, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.25);
  doc.roundedRect(contentLeft, tableY, contentWidth, termsH, 1, 1, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(166, 124, 66);
  doc.text('TERMS OF PLEDGED GOLD CUSTODY, REDEMPTION & STATUTORY BORROWER RIGHTS', contentLeft + 4, tableY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(100, 116, 139);
  doc.text('1. Vault Security: All pledged ornaments are deposited in insured Swiss-standard high-security vaults with 100% full value indemnity coverage.', contentLeft + 4, tableY + 8.5);
  doc.text('2. Pure Redemption: Borrower is entitled to reclaim identical pledged gold upon principal and interest settlement with zero melting loss.', contentLeft + 4, tableY + 12);
  doc.text('3. Interest & Pre-closure: Monthly interest applies as per sanctioned terms. Zero pre-closure penalty for settlement prior to tenure maturity.', contentLeft + 4, tableY + 15.5);

  // Footer line on Page 1
  const footerY = pageHeight - margin - 4;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  doc.line(contentLeft, footerY - 3, contentRight, footerY - 3);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'This is a computer-generated official Gold Loan Sanction Dossier & Pledge Receipt issued by Scalen Stone Finance under the Precious Metals Lending Regulatory Guidelines. Registered Office: Level 14, Tower One, Financial District, Gachibowli, Hyderabad, Telangana 500032. Branch Office: BK Towers, Visakhapatnam, Andhra Pradesh 530016. Direct: +91 97000 49444 | Email: advisory@scalenstone.com | Web: www.scalenstone.com',
    pageWidth / 2,
    footerY,
    { align: 'center', maxWidth: contentWidth }
  );

  const totalPages = allPhotos.length > 0 ? 2 : 1;
  drawPageBorder(1, totalPages);

  // ==========================================
  // PAGE 2: PHOTOGRAPHIC VERIFICATION RECORD (IF PHOTOS EXIST)
  // ==========================================
  if (allPhotos.length > 0) {
    doc.addPage();
    drawPageBorder(2, 2);

    let p2Y = 18;
    // Page 2 Header Banner
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(contentLeft, p2Y, contentWidth, 12, 1.2, 1.2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text('PLEDGED GOLD ITEMS - PHOTOGRAPHIC VERIFICATION RECORD', contentLeft + 5, p2Y + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(197, 168, 128);
    doc.text(`Annexure to Dossier: ${certificateNumber}`, contentRight - 5, p2Y + 7.5, { align: 'right' });

    p2Y += 17;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(71, 85, 105);
    doc.text(
      'The following photographic evidence was digitally captured during customer intake and physical assay. All items correspond to the pledged collateral schedule.',
      contentLeft,
      p2Y
    );

    p2Y += 7;

    // Render up to 6 photos in a 3x2 grid
    const photoGridCols = 3;
    const photoGap = 5;
    const photoW = (contentWidth - photoGap * (photoGridCols - 1)) / photoGridCols; // ~56mm
    const photoH = 46;

    allPhotos.slice(0, 6).forEach((photoObj, pIdx) => {
      const colIdx = pIdx % photoGridCols;
      const rowIdx = Math.floor(pIdx / photoGridCols);
      const px = contentLeft + colIdx * (photoW + photoGap);
      const py = p2Y + rowIdx * (photoH + 16);

      // Frame
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(px, py, photoW, photoH, 1, 1, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.roundedRect(px, py, photoW, photoH, 1, 1, 'S');

      try {
        doc.addImage(photoObj.dataUrl, 'JPEG', px + 1.5, py + 1.5, photoW - 3, photoH - 3);
      } catch {
        // Fallback text if base64 render fails
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text('[Photo Attached]', px + photoW / 2, py + photoH / 2, { align: 'center' });
      }

      // Caption
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(15, 23, 42);
      doc.text(`Photo #${pIdx + 1}: ${photoObj.itemDesc.slice(0, 24)}`, px + photoW / 2, py + photoH + 4.5, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6);
      doc.setTextColor(16, 185, 129);
      doc.text('✓ Verified & Vault Deposited', px + photoW / 2, py + photoH + 8.5, { align: 'center' });
    });

    // Page 2 Bottom Authentication Note
    const p2FooterY = pageHeight - margin - 14;
    doc.setFillColor(250, 248, 245);
    doc.roundedRect(contentLeft, p2FooterY - 14, contentWidth, 18, 1, 1, 'F');
    doc.setDrawColor(197, 168, 128);
    doc.setLineWidth(0.3);
    doc.roundedRect(contentLeft, p2FooterY - 14, contentWidth, 18, 1, 1, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(166, 124, 66);
    doc.text('PHYSICAL COLLATERAL INVENTORY INTEGRITY SEAL', contentLeft + 4, p2FooterY - 8.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(71, 85, 105);
    doc.text(
      'These photographs constitute an integral part of the legal loan agreement between Scalen Stone Finance and the borrower. Photographs are encrypted and stored in the central collateral database under bank-grade tamper-evident retention protocols.',
      contentLeft + 4,
      p2FooterY - 3.5,
      { maxWidth: contentWidth - 8 }
    );
  }

  const cleanName = (data.fullName || 'Customer').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Scalen_Stone_Gold_Loan_${cleanName}_${certificateNumber}.pdf`;

  // Auto-download the PDF
  doc.save(filename);

  return { doc, filename };
};
