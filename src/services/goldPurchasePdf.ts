import { jsPDF } from 'jspdf';
import { BRAND } from '../constants/theme';

export interface GoldPurchaseData {
  clientName: string;
  mobileNumber: string;
  location: string;
  address: string;
  goldType: string;
  goldPercentage: '18%' | '24%' | '30%' | '36%' | string;
  weightGrams?: number;
  paymentMode: string;
  customNotes?: string;
  certificateNumber?: string;
  transactionDate?: string;
}

/**
 * Format currency in Indian numbering format with clean ASCII "INR " prefix.
 * Avoids unicode ₹ character which breaks in standard PDF Helvetica fonts.
 */
export const formatINR = (val: number): string => {
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
 * Generates an official, premium Scalen Stone Finance Gold Purchase Certificate & Invoice PDF.
 * Symmetrically distributed across the full A4 height (297mm) with zero text overlap.
 */
export const generateGoldPurchasePdf = async (
  data: GoldPurchaseData
): Promise<{ doc: jsPDF; filename: string }> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12; // 12mm outer margin

  const certificateNumber =
    data.certificateNumber ||
    `SSF-GP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const issueDate =
    data.transactionDate ||
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

  const weight = data.weightGrams && data.weightGrams > 0 ? data.weightGrams : 50;

  // Derive valuation based on benchmark rate
  const ratePerGramNumeric = 7850; // MCX 24K benchmark
  const valuation = weight * ratePerGramNumeric;
  const formattedValuation = formatINR(valuation);
  const formattedRate = formatINR(ratePerGramNumeric);

  // --- 1. LUXURY DUAL-LINE BORDER & CORNER ACCENTS ---
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

  // Printable bounds
  const contentLeft = margin + 4; // 16mm
  const contentRight = pageWidth - margin - 4; // 194mm
  const contentWidth = contentRight - contentLeft; // 178mm

  // --- 2. HEADER: LOGO & COMPANY INFORMATION (Y: 17 to 44) ---
  let headerY = 17;

  try {
    const logoData = await loadImageAsDataUrl('/scalen-stone-logo.png');
    if (logoData) {
      // 969x459 ratio is approx 2.11:1
      const logoW = 46;
      const logoH = 21.8;
      doc.addImage(logoData, 'PNG', contentLeft, headerY, logoW, logoH);
    } else {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text('SCALEN STONE', contentLeft, headerY + 8);
      doc.setFontSize(10);
      doc.setTextColor(166, 124, 66);
      doc.text('— FINANCE —', contentLeft, headerY + 14);
    }
  } catch {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42);
    doc.text('SCALEN STONE', contentLeft, headerY + 8);
  }

  // Company Details (Right aligned at contentRight)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('SCALEN STONE FINANCE', contentRight, headerY + 3.5, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Strategic Wealth & Institutional Bullion Services', contentRight, headerY + 7.5, { align: 'right' });
  doc.text('Level 14, Tower One, Financial District, Hyderabad - 500032', contentRight, headerY + 11.5, { align: 'right' });
  doc.text('Branch Desk: BK Towers, Visakhapatnam - 530016', contentRight, headerY + 15, { align: 'right' });
  doc.text(`Direct: ${BRAND.contact.phone}  |  Email: ${BRAND.contact.email}`, contentRight, headerY + 18.5, { align: 'right' });
  doc.text('CIN: U67190TG2014PTC095112  |  GSTIN: 36AAECS4944M1Z2', contentRight, headerY + 22, { align: 'right' });

  // Divider line under header
  headerY += 26;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(contentLeft, headerY, contentRight, headerY);
  doc.setDrawColor(166, 124, 66);
  doc.setLineWidth(0.9);
  doc.line(contentLeft, headerY, contentLeft + 35, headerY);

  // --- 3. DOCUMENT TITLE & METADATA RIBBON (Y: 48 to 65) ---
  headerY += 5;
  const bannerH = 17;
  doc.setFillColor(250, 248, 245); // Warm ivory
  doc.roundedRect(contentLeft, headerY, contentWidth, bannerH, 1.5, 1.5, 'F');
  doc.setDrawColor(197, 168, 128);
  doc.setLineWidth(0.35);
  doc.roundedRect(contentLeft, headerY, contentWidth, bannerH, 1.5, 1.5, 'S');

  // Title inside ribbon
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('OFFICIAL GOLD PURCHASE CERTIFICATE & INVOICE', contentLeft + 4, headerY + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Verified Bullion Acquisition & Allocated Depository Record', contentLeft + 4, headerY + 11.5);

  // Metadata right-aligned in ribbon
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(`Certificate No: ${certificateNumber}`, contentRight - 4, headerY + 6.5, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Issued: ${issueDate} at ${issueTime} IST`, contentRight - 4, headerY + 11.5, { align: 'right' });

  // --- 4. TWO-COLUMN PARTICULARS CARDS (Y: 71 to 117) ---
  let contentY = headerY + bannerH + 6;
  const colGap = 5;
  const colW = (contentWidth - colGap) / 2; // 86.5mm
  const cardH = 46;

  // Box 1: Client Particulars (Left)
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(contentLeft, contentY, colW, cardH, 1.5, 1.5, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(contentLeft, contentY, colW, cardH, 1.5, 1.5, 'S');

  // Box 1 Header
  doc.setFillColor(248, 250, 252);
  doc.rect(contentLeft + 0.2, contentY + 0.2, colW - 0.4, 6.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(166, 124, 66);
  doc.text('CLIENT / PURCHASER PARTICULARS', contentLeft + 4, contentY + 4.8);

  // Client Details with generous spacing
  const cX = contentLeft + 4;
  let cy = contentY + 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(data.clientName || 'N/A', cX, cy);

  cy += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Mobile: ${data.mobileNumber || 'N/A'}`, cX, cy);

  cy += 5;
  doc.text(`Location: ${data.location || 'N/A'}`, cX, cy);

  cy += 5;
  const splitAddress = doc.splitTextToSize(`Address: ${data.address || 'N/A'}`, colW - 8);
  doc.text(splitAddress.slice(0, 3), cX, cy);

  // Box 2: Custody & Settlement Specifications (Right)
  const col2X = contentLeft + colW + colGap;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(col2X, contentY, colW, cardH, 1.5, 1.5, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(col2X, contentY, colW, cardH, 1.5, 1.5, 'S');

  // Box 2 Header
  doc.setFillColor(248, 250, 252);
  doc.rect(col2X + 0.2, contentY + 0.2, colW - 0.4, 6.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(166, 124, 66);
  doc.text('SETTLEMENT & CUSTODY SPECIFICATIONS', col2X + 4, contentY + 4.8);

  // Key-Value rows in Box 2
  let tY = contentY + 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Transaction Mode:', col2X + 4, tY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Allocated Physical Bullion Purchase', col2X + colW - 4, tY, { align: 'right' });

  tY += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Custody Standard:', col2X + 4, tY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('100% Insured Swiss-Grade Vault Custody', col2X + colW - 4, tY, { align: 'right' });

  tY += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Payment Method:', col2X + 4, tY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  const paymentText = data.paymentMode?.trim() || 'Direct Bank Wire / RTGS';
  const splitPayment = doc.splitTextToSize(paymentText, 44);
  doc.text(splitPayment[0], col2X + colW - 4, tY, { align: 'right' });

  tY += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Hallmark Testing:', col2X + 4, tY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(166, 124, 66);
  doc.text('German Laser Spectrometer (99.9% Assay)', col2X + colW - 4, tY, { align: 'right' });

  tY += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Delivery Status:', col2X + 4, tY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // Emerald
  doc.text('Confirmed & Vault Allocated', col2X + colW - 4, tY, { align: 'right' });

  // --- 5. GOLD SPECIFICATION TABLE (Y: 123 to 160) ---
  // Table Width: 178mm (contentLeft = 16 to contentRight = 194)
  // Mathematical column layout with zero overlap:
  // Col 1 (Item): 16 to 76 (width: 60mm)
  // Col 2 (Percentage): 76 to 106 (width: 30mm)
  // Col 3 (Weight): 106 to 132 (width: 26mm)
  // Col 4 (MCX Rate): 132 to 160 (width: 28mm)
  // Col 5 (Total): 160 to 194 (width: 34mm)
  let tableY = contentY + cardH + 6;

  // Table Header
  doc.setFillColor(15, 23, 42); // #0f172a
  doc.rect(contentLeft, tableY, contentWidth, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('ITEM DESCRIPTION', contentLeft + 4, tableY + 5.2);
  doc.text('GOLD PERCENTAGE', contentLeft + 63, tableY + 5.2);
  doc.text('NET WEIGHT', contentLeft + 93, tableY + 5.2);
  doc.text('MCX BENCHMARK', contentLeft + 120, tableY + 5.2);
  doc.text('TOTAL VALUATION', contentRight - 4, tableY + 5.2, { align: 'right' });

  // Table Row 1 (Item Row)
  tableY += 8;
  const row1H = 15;
  doc.setFillColor(255, 255, 255);
  doc.rect(contentLeft, tableY, contentWidth, row1H, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.rect(contentLeft, tableY, contentWidth, row1H, 'S');

  // Col 1: Item Description
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  const goldItemText = data.goldType?.trim() || 'Allocated Investment Gold Bar';
  const splitGoldItem = doc.splitTextToSize(goldItemText, 56);
  doc.text(splitGoldItem[0], contentLeft + 4, tableY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(100, 116, 139);
  doc.text('BIS Hallmarked • Serialized & Vault Depository Sealed', contentLeft + 4, tableY + 10.5);

  // Col 2: Gold Percentage Badge
  const badgeX = contentLeft + 62;
  doc.setFillColor(254, 249, 235); // Gold pill fill
  doc.roundedRect(badgeX, tableY + 3.5, 26, 7.5, 1, 1, 'F');
  doc.setDrawColor(197, 168, 128);
  doc.setLineWidth(0.25);
  doc.roundedRect(badgeX, tableY + 3.5, 26, 7.5, 1, 1, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(140, 100, 42);
  doc.text(`${data.goldPercentage || '24%'} Purity`, badgeX + 13, tableY + 8.2, { align: 'center' });

  // Col 3: Net Weight
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`${weight.toFixed(2)} g`, contentLeft + 93, tableY + 6.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Fine Metal Mass', contentLeft + 93, tableY + 10.5);

  // Col 4: Benchmark Rate
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`${formattedRate} / g`, contentLeft + 120, tableY + 6.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('MCX Benchmark', contentLeft + 120, tableY + 10.5);

  // Col 5: Total Valuation
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(formattedValuation, contentRight - 4, tableY + 7.5, { align: 'right' });

  // Table Row 2: Custody & Testing Services
  tableY += row1H;
  const row2H = 10;
  doc.setFillColor(250, 250, 250);
  doc.rect(contentLeft, tableY, contentWidth, row2H, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(contentLeft, tableY, contentWidth, row2H, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('High-Security Swiss Vault Depository & German Spectrometer Laser Assay', contentLeft + 4, tableY + 6.2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(166, 124, 66);
  doc.text('COMPLIMENTARY', contentRight - 4, tableY + 6.2, { align: 'right' });

  // --- 6. COMMERCIAL SUMMARY & PURCHASE NOTES (Y: 164 to 192) ---
  tableY += row2H + 5;
  const summaryBoxW = 76;
  const summaryBoxX = contentRight - summaryBoxW;
  const summaryBoxH = 26;

  // Notes Box on Left (width = 97mm)
  const notesBoxW = contentWidth - summaryBoxW - 5;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(contentLeft, tableY, notesBoxW, summaryBoxH, 1.5, 1.5, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(contentLeft, tableY, notesBoxW, summaryBoxH, 1.5, 1.5, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(166, 124, 66);
  doc.text('OFFICIAL PURCHASE & ASSAY SPECIFICATIONS', contentLeft + 4, tableY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('• Allocated against institutional bullion reserve series #ST-2026.', contentLeft + 4, tableY + 11);
  doc.text(`• Gold percentage bracket: ${data.goldPercentage} confirmed as per client specification.`, contentLeft + 4, tableY + 15.5);
  doc.text(`• Payment settled via: ${paymentText.slice(0, 48)}.`, contentLeft + 4, tableY + 20);

  // Summary Box on Right (width = 76mm)
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(summaryBoxX, tableY, summaryBoxW, summaryBoxH, 1.5, 1.5, 'F');
  doc.setDrawColor(197, 168, 128);
  doc.setLineWidth(0.4);
  doc.roundedRect(summaryBoxX, tableY, summaryBoxW, summaryBoxH, 1.5, 1.5, 'S');

  let sY = tableY + 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Subtotal:', summaryBoxX + 4, sY);
  doc.text(formattedValuation, contentRight - 4, sY, { align: 'right' });

  sY += 5;
  doc.text('Insurance & Depository Custody:', summaryBoxX + 4, sY);
  doc.setTextColor(166, 124, 66);
  doc.text('INR 0 (Included)', contentRight - 4, sY, { align: 'right' });

  sY += 3;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  doc.line(summaryBoxX + 4, sY, contentRight - 4, sY);

  sY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('TOTAL AMOUNT:', summaryBoxX + 4, sY);

  doc.setTextColor(166, 124, 66);
  doc.setFontSize(10.5);
  doc.text(formattedValuation, contentRight - 4, sY, { align: 'right' });

  // --- 7. TRUST & COMPLIANCE BADGES (Y: 197 to 214) ---
  let trustY = tableY + summaryBoxH + 5;
  const badgeGap = 4;
  const badgeW = (contentWidth - badgeGap * 2) / 3; // 56.6mm
  const badgeH = 16;

  const badges = [
    {
      title: 'BIS HALLMARKED GUARANTEE',
      sub: 'German Laser Spectrometer Verified',
    },
    {
      title: '100% INSURED BANK VAULT',
      sub: 'Swiss-Grade Physical Security',
    },
    {
      title: 'INSTANT LIQUIDITY & BUYBACK',
      sub: 'Redeemable At Live Benchmark',
    },
  ];

  badges.forEach((b, i) => {
    const bx = contentLeft + i * (badgeW + badgeGap);
    doc.setFillColor(250, 248, 245);
    doc.roundedRect(bx, trustY, badgeW, badgeH, 1.2, 1.2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.25);
    doc.roundedRect(bx, trustY, badgeW, badgeH, 1.2, 1.2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(166, 124, 66);
    doc.text(b.title, bx + badgeW / 2, trustY + 6.2, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(b.sub, bx + badgeW / 2, trustY + 11, { align: 'center' });
  });

  // --- 8. AUTHORIZATION, SEAL & SIGNATURE BLOCK (Y: 219 to 251) ---
  let signY = trustY + badgeH + 5;

  // Left: Official Gold Seal (Concentric Circles)
  const sealCenterX = contentLeft + 24;
  const sealCenterY = signY + 14;

  doc.setDrawColor(197, 168, 128);
  doc.setLineWidth(0.8);
  doc.circle(sealCenterX, sealCenterY, 12, 'S');

  doc.setDrawColor(166, 124, 66);
  doc.setLineWidth(0.3);
  doc.circle(sealCenterX, sealCenterY, 10, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(166, 124, 66);
  doc.text('SCALEN STONE', sealCenterX, sealCenterY - 4.5, { align: 'center' });
  doc.text('•  •  •', sealCenterX, sealCenterY - 0.8, { align: 'center' });
  doc.text('OFFICIAL SEAL', sealCenterX, sealCenterY + 2.8, { align: 'center' });
  doc.text('ESTD 2014 • VERIFIED', sealCenterX, sealCenterY + 6.5, { align: 'center' });

  // Center: Security Digital Transaction Verification Box
  const qrBoxX = contentLeft + 54;
  const qrBoxW = 68;
  const qrBoxH = 27;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(qrBoxX, signY + 1, qrBoxW, qrBoxH, 1.2, 1.2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(qrBoxX, signY + 1, qrBoxW, qrBoxH, 1.2, 1.2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('DIGITAL TRANSACTION VERIFICATION', qrBoxX + qrBoxW / 2, signY + 6.5, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(166, 124, 66);
  doc.text(`HASH: ${certificateNumber}-X99`, qrBoxX + qrBoxW / 2, signY + 11.5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(100, 116, 139);
  doc.text('Immutable ledger record registered under Scalen Stone Vault Network.', qrBoxX + qrBoxW / 2, signY + 16.5, { align: 'center' });
  doc.text('256-bit cryptographic signature • Tamper-evident record active.', qrBoxX + qrBoxW / 2, signY + 20.5, { align: 'center' });
  doc.text('Verification registry: www.scalenstone.com/verify', qrBoxX + qrBoxW / 2, signY + 24.5, { align: 'center' });

  // Right: Signature Block
  const signRightX = contentRight;
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.4);
  doc.line(signRightX - 46, signY + 17, signRightX, signY + 17);

  // Elegant stylized signature representation
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(166, 124, 66);
  doc.text('R. K. Vardhan', signRightX - 23, signY + 14, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Authorized Signatory', signRightX - 23, signY + 21, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Bullion & Treasury Operations Desk', signRightX - 23, signY + 25, { align: 'center' });

  // --- 9. TERMS & CONDITIONS / FIDUCIARY AUDIT BOX (Y: 254 to 273) ---
  const termsY = signY + 32;
  const termsH = 19;
  doc.setFillColor(252, 250, 247); // Subtle luxury tone
  doc.roundedRect(contentLeft, termsY, contentWidth, termsH, 1, 1, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.25);
  doc.roundedRect(contentLeft, termsY, contentWidth, termsH, 1, 1, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(166, 124, 66);
  doc.text('TERMS OF BULLION CUSTODY, PURITY VERIFICATION & ALLOCATED OWNERSHIP', contentLeft + 4, termsY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(100, 116, 139);
  doc.text('1. Purity Guarantee: All precious metals are verified via non-destructive German XRF laser spectrometry and hallmarked under BIS statutory guidelines.', contentLeft + 4, termsY + 8.5);
  doc.text('2. Vault Custody: Allocated physical bullion remains 100% segregated in Swiss-standard high-security vaults underwritten by institutional bullion insurance.', contentLeft + 4, termsY + 12);
  doc.text('3. Buyback Rights: The client retains guaranteed liquidation rights at real-time MCX market benchmark rates with zero melting loss deduction.', contentLeft + 4, termsY + 15.5);

  // --- 10. FOOTER STATUTORY DISCLAIMER (Y: 278 to 286) ---
  const footerY = pageHeight - margin - 4; // 281mm
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  doc.line(contentLeft, footerY - 3, contentRight, footerY - 3);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'This is a computer-generated official bullion purchase certificate & invoice issued by Scalen Stone Finance under the Bullion & Precious Metals Regulatory Framework. Registered Office: Level 14, Tower One, Financial District, Gachibowli, Hyderabad, Telangana 500032. Branch Office: BK Towers, Visakhapatnam, Andhra Pradesh 530016. Direct: +91 97000 49444 | Email: advisory@scalenstone.com | Web: www.scalenstone.com',
    pageWidth / 2,
    footerY,
    { align: 'center', maxWidth: contentWidth }
  );

  const cleanName = (data.clientName || 'Client').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Scalen_Stone_Gold_Purchase_${cleanName}_${certificateNumber}.pdf`;

  // Auto-download the PDF
  doc.save(filename);

  return { doc, filename };
};
