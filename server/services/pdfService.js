const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const generatePDF = async (user) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let userid = user._id.toString();
  let signatureBase64 = '';
  const signaturePath = path.join(__dirname, '..', user.signature);
  if (fs.existsSync(signaturePath)) {
    const imageBuffer = fs.readFileSync(signaturePath);
    const mimeType = 'image/jpeg';
    signatureBase64 = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
  }

  const htmlContent = `
  <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          color: #333;
          background: #fff;
          font-size: 14px;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #005792;
          font-size: 24px;
        }

        .form-container {
          border: 1px solid #ccc;
          padding: 25px;
          border-radius: 10px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          text-align: left;
          padding: 10px;
          vertical-align: top;
          border-bottom: 1px solid #eee;
        }

        th {
          width: 30%;
          background-color: #f9f9f9;
          color: #333;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .signature-section {
          margin-top: 40px;
          text-align: left;
        }

        .signature-box {
          border: 1px dashed #888;
          width: 180px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
        }

        .signature-box img {
          max-width: 150px;
          max-height: 70px;
        }

        .footer {
          margin-top: 60px;
          font-size: 12px;
          text-align: center;
          color: #777;
        }
      </style>
    </head>
    <body>
      <h1>User Registration Details</h1>
      <div class="form-container">
        <table>
          <tr><th>Full Name</th><td>${user.fullName}</td></tr>
          <tr><th>Email</th><td>${user.email}</td></tr>
          <tr><th>Phone Number</th><td>${user.phoneNumber}</td></tr>
          <tr><th>Date of Birth</th><td>${user.dateOfBirth}</td></tr>
          <tr><th>Gender</th><td>${user.gender}</td></tr>
          <tr><th>Address Line 1</th><td>${user.addressLine1}</td></tr>
          <tr><th>Address Line 2</th><td>${user.addressLine2 || '-'}</td></tr>
          <tr><th>Country</th><td>${user.country}</td></tr>
          <tr><th>State</th><td>${user.state}</td></tr>
          <tr><th>City</th><td>${user.city}</td></tr>
          <tr><th>Zip Code</th><td>${user.zipCode}</td></tr>
          <tr><th>Occupation</th><td>${user.occupation}</td></tr>
          <tr><th>Annual Income</th><td>${user.annualIncome}</td></tr>
        </table>

        <div class="signature-section">
          <strong>e-Signature:</strong>
          <div class="signature-box">
            <img src="${signatureBase64}" alt="Signature" />
          </div>
        </div>
      </div>

      <div class="footer">
        This document is auto-generated and digitally signed.
      </div>
    </body>
  </html>
`;


  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  const fileName = `${userid}_Details.pdf`;
  const filePath = path.join(__dirname, '..', 'pdfs', fileName);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await page.pdf({ path: filePath, format: 'A4' });

  await browser.close();

  return `/pdfs/${fileName}`;
};
module.exports = {
  generatePDF,
};
