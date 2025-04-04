# Image Compression & Analytics App

A web application that allows users to upload images, compress them, and view compression analytics.

## Features

- Image upload (JPEG, PNG)
- Image compression
- Compression analytics (original size, compressed size, compression ratio)
- Download compressed images
- Responsive design

## Tech Stack

- Frontend: React.js
- Backend: Node.js with Express.js
- Image Processing: Sharp library

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd image-compression-analytics
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

## Running the Application

1. Start the backend server:
```bash
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
npm run client
```

Or run both simultaneously:
```bash
npm run dev:full
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Usage

1. Open the application in your web browser
2. Click the file input to select an image
3. Click the "Compress Image" button
4. View the compression results
5. Download the compressed image using the download button

## API Endpoints

- POST `/api/compress`: Upload and compress an image
  - Request: Form data with 'image' field
  - Response: JSON with compression details

## License

MIT #   I m a g e C o m p r e s s i o n  
 