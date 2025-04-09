import FileUpload from '@/components/FileUpload';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">PDF File Uploader</h1>
        <p className="text-gray-600 mb-8 text-center">
          Upload your PDF file to process it with our external API
        </p>
        <FileUpload />
      </div>
    </main>
  );
}
