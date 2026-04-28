import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

interface ExportOptions {
  filename?: string;
  quality?: number;
  scale?: number;
}

export const exportToPng = async (
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> => {
  const { filename = 'solar-tag', scale = 3 } = options;

  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: scale,
    backgroundColor: '#071f17',
    style: {
      fontFamily: "'Space Grotesk', sans-serif",
    },
  });

  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = dataUrl;
  link.click();
};

export const exportToPdf = async (
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> => {
  const { filename = 'solar-tag', scale = 3 } = options;

  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: scale,
    backgroundColor: '#071f17',
  });

  const img = new Image();
  img.src = dataUrl;

  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
  });

  const imgWidth = img.naturalWidth / scale;
  const imgHeight = img.naturalHeight / scale;

  // A4 or custom size based on image
  const pdf = new jsPDF({
    orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
    unit: 'px',
    format: [imgWidth, imgHeight],
  });

  pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save(`${filename}.pdf`);
};

export const copyToClipboard = async (element: HTMLElement): Promise<void> => {
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#071f17',
  });

  const response = await fetch(dataUrl);
  const blob = await response.blob();

  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': blob }),
  ]);
};
