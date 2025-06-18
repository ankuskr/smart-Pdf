# form-to-pdf-generator-angular-node
A full-stack Angular + Node.js application that collects user form data (14 fields) along with an e-signature, then generates a downloadable PDF document containing all the information.
=======
# 📄 Form to PDF Generator (Angular + Node.js)

A full-stack application built using Angular 16 and Node.js that enables users to fill out a form with 14 input fields, capture an e-signature, and generate a professional-looking PDF document with all submitted data.

---

## 🚀 Features

- ✅ 14-field dynamic user form
- ✍️ E-signature capture via HTML5 Canvas or Angular Signature Pad
- 📄 PDF generation with embedded form data and signature
- 💾 PDF available for instant download
- 🔄 Frontend built with Angular 16
- 🔧 Backend powered by Node.js and Express
- 📦 PDF generation using `jsPDF`, `pdf-lib`, or `pdfkit`

---

## 🛠️ Tech Stack

| Layer     | Technology                                     |
| --------- | ---------------------------------------------- |
| Frontend  | Angular 16, TypeScript, TailwindCSS (optional) |
| Backend   | Node.js, Express.js                            |
| PDF Tool  | jsPDF / pdf-lib / pdfkit                       |
| Signature | HTML5 Canvas / Angular Signature Pad           |

---

## 📁 Project Structure

myapp/
├── server/
│ ├── server.js
│ ├── routes/
│ └── utils/pdfGenerator.js
├── src/ # Angular frontend
│ ├── app/
│ │ ├── components/
│ │ │ ├── form/
│ │ │ └── signature-pad/
│ │ ├── services/
│ │ └── app.module.ts
│ ├── assets/
│ └── index.html
├── angular.json
├── package.json
└── README.md

## 💻 Getting Started

### 🔧 Install Dependencies

# Frontend

npm install
🖥️ Running the App
npm run dev
