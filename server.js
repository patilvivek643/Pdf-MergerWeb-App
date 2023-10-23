const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const { mergePdfs } = require('./merge');

const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "template/index.html"));
});

app.post('/merge', upload.array('pdfs'), async (req, res, next) => {
  if (req.files.length < 2) {
    res.status(400).send('Please upload at least two PDF files to merge.');
    return;
  }

  const pdfPaths = req.files.map((file) => path.join(__dirname, file.path));
  const mergedFileName = await mergePdfs(pdfPaths);
  res.redirect(`http://localhost:3000/static/${mergedFileName}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
