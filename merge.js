const PDFMerger = require('pdf-merger-js');

const mergePdfs = async (pdfFiles) => {
  const merger = new PDFMerger();

  for (const pdfFile of pdfFiles) {
    await merger.add(pdfFile);
  }

  const mergedFileName = new Date().getTime();
  await merger.save(`public/${mergedFileName}.pdf`);
  
  return mergedFileName;
}

module.exports = { mergePdfs };
