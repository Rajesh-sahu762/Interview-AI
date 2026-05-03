let mammoth;
try {
  mammoth = require('mammoth');
} catch (err) {
  mammoth = null;
  console.warn('Mammoth package is not installed. DOCX parsing will be disabled.');
}

/**
 * Extract text from DOCX file
 * @param {Buffer} buffer - The DOCX file buffer
 * @returns {Promise<string>} Extracted text content
 */
async function extractTextFromDocx(buffer) {
  if (!mammoth) {
    throw new Error('DOCX parsing requires the mammoth package. Install it with npm install mammoth');
  }

  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || '';
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Failed to parse DOCX file');
  }
}

/**
 * Extract text from file based on type
 * @param {Buffer} buffer - The file buffer
 * @param {string} fileType - The MIME type of the file
 * @returns {Promise<string>} Extracted text content
 */
async function extractTextFromFile(buffer, fileType) {
  if (fileType === 'application/pdf') {
    const pdfParse = require('pdf-parse/lib/pdf-parse.js');
    const resumeData = await pdfParse(buffer);
    return resumeData.text;
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return await extractTextFromDocx(buffer);
  } else if (fileType === 'text/plain') {
    return buffer.toString('utf-8');
  } else {
    throw new Error('Unsupported file format');
  }
}

module.exports = {
  extractTextFromDocx,
  extractTextFromFile,
};
