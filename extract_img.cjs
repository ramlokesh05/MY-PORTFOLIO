const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

async function extractBase64() {
  const logsDir = 'C:/Users/ABC/.gemini/antigravity/brain/2f2b4fe2-c2fa-481f-bffb-678ad946b11b/.system_generated/logs';
  const files = fs.readdirSync(logsDir).filter(f => f.endsWith('.json')).reverse();
  
  let base64Data = null;
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(logsDir, file), 'utf8');
    // Using simple substring searching since regex matches might exceed max length
    const idx = content.indexOf('9j/4AAQSkZJRgAB');
    if (idx !== -1) {
      // Find the end of this base64 string
      const endQuote = content.indexOf('"', idx);
      if (endQuote !== -1) {
         base64Data = content.substring(idx, endQuote).replace(/\\\\n/g, '').replace(/\\n/g, '');
         console.log('Found image data of length:', base64Data.length);
         break;
      }
    }
  }

  if (!base64Data) {
    console.error('Could not find image payload in logs.');
    process.exit(1);
  }

  const buffer = Buffer.from(base64Data, 'base64');
  const outputPath = 'C:/Users/ABC/Documents/Portfolio/public/profile.jpg';

  // Process and crop to a clean square
  try {
    const metadata = await sharp(buffer).metadata();
    console.log('Original image size:', metadata.width, 'x', metadata.height);

    // Assuming a portrait picture based on the user prompt "crop this image"
    // We want a square from the top/center to capture the face/upper body.
    const size = Math.min(metadata.width, metadata.height);
    
    await sharp(buffer)
      .extract({ 
        width: size, 
        height: size, 
        left: Math.floor((metadata.width - size) / 2), 
        top: 0 
      }) // Crop top square
      .resize(400, 400, { fit: 'cover' })
      .grayscale() // Noir strict
      .tint({ r: 25, g: 15, b: 15 }) // Reddish tint
      .jpeg({ quality: 90 })
      .toFile(outputPath);
      
    console.log('Successfully saved to', outputPath);
  } catch (err) {
    console.error('Sharp error:', err);
  }
}

extractBase64();
