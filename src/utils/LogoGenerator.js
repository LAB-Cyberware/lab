import { createCanvas, loadImage } from 'canvas';
import path from 'path';

export const overlayImagesServer = async (baseImageData, logoPath) => {
  try {
    const baseImg = await loadImage(baseImageData);

    const logoFullPath = path.join(process.cwd(), 'public', logoPath);
    const overlayImg = await loadImage(logoFullPath);
    
    const canvas = createCanvas(baseImg.width, baseImg.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(baseImg, 0, 0);

    const containerSize = Math.min(baseImg.width, baseImg.height) * 0.15;
    const padding = 20;
    const containerX = baseImg.width - containerSize - padding;
    const containerY = padding;
    
    const logoSize = containerSize * 0.8;
    const logoX = containerX + (containerSize - logoSize) / 2;
    const logoY = containerY + (containerSize - logoSize) / 2;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(containerX + containerSize/2, containerY + containerSize/2, containerSize/2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(logoX + logoSize/2, logoY + logoSize/2, logoSize/2 * 0.9, 0, 2 * Math.PI);
    ctx.clip();
    
    const overlayAspect = overlayImg.width / overlayImg.height;
    if (overlayAspect > 1) {
      const drawHeight = logoSize;
      const drawWidth = drawHeight * overlayAspect;
      const offsetX = -(drawWidth - logoSize) / 2;
      ctx.drawImage(overlayImg, logoX + offsetX, logoY, drawWidth, drawHeight);
    } else {
      const drawWidth = logoSize;
      const drawHeight = drawWidth / overlayAspect;
      const offsetY = -(drawHeight - logoSize) / 2;
      ctx.drawImage(overlayImg, logoX, logoY + offsetY, drawWidth, drawHeight);
    }
    
    ctx.restore();
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(containerX + containerSize/2, containerY + containerSize/2, containerSize/2, 0, 2 * Math.PI);
    ctx.stroke();
    
    return canvas.toDataURL('image/png');
    
  } catch (error) {
    console.error('Error overlaying logo:', error);
    return baseImageData;
  }
};