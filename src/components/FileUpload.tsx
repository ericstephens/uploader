'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ApiResponse {
  status: number;
  data: string;
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === 'application/pdf') {
        setFile(file);
        setUploadStatus('File selected: ' + file.name);
        setApiResponse(null);
      } else {
        setUploadStatus('Please upload a PDF file');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploadStatus('Uploading...');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus('File processed successfully');
        setApiResponse(data.apiResponse);
      } else {
        setUploadStatus('Upload failed');
      }
    } catch (error) {
      setUploadStatus('Error uploading file');
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the PDF file here...</p>
        ) : (
          <p>Drag and drop a PDF file here, or click to select a file</p>
        )}
      </div>

      {file && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">{uploadStatus}</p>
          <button
            onClick={handleUpload}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Process File
          </button>
        </div>
      )}

      {apiResponse && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          <h3 className="font-bold mb-2">API Response:</h3>
          <p>Status: {apiResponse.status}</p>
          <p className="mt-2 text-sm">Response data length: {apiResponse.data.length} characters</p>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm">View full response</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-60 text-xs">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
} 