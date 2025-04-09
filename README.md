# PDF File Uploader

A modern web application built with Next.js that allows users to upload PDF files, save them to a local directory, and process them through an external API.

## Features

- Drag and drop PDF file upload
- File validation (PDF only)
- Automatic saving to ~/Downloads/uploads directory
- Prepared for external API integration
- Modern UI with Tailwind CSS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Drag and drop a PDF file into the upload area or click to select a file
2. Click the "Process File" button to upload and process the file
3. The file will be saved to ~/Downloads/uploads directory
4. The application is prepared to integrate with an external API (TODO section in the code)

## Project Structure

- `src/components/FileUpload.tsx` - Main file upload component
- `src/app/api/upload/route.ts` - API route for handling file uploads
- `src/app/page.tsx` - Main application page

## External API Integration

To integrate with an external API:

1. Uncomment and modify the API call section in `src/app/api/upload/route.ts`
2. Add your API endpoint and any required authentication
3. Handle the API response as needed
