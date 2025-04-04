import { useState } from 'react'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [compressionResult, setCompressionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setCompressionResult(null);
      setError(null);
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      console.log('Sending request to compress image...');
      const response = await fetch('http://localhost:5000/api/compress', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(`Compression failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Compression successful:', data);
      setCompressionResult(data);
    } catch (err) {
      console.error('Compression error:', err);
      setError(`Error compressing image: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Compression & Analytics</h1>
      </header>
      <main className="App-main">
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="file-input"
          />
          {preview && (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="image-preview" />
            </div>
          )}
          <button
            onClick={handleCompress}
            disabled={!selectedFile || loading}
            className="compress-button"
          >
            {loading ? 'Compressing...' : 'Compress Image'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {compressionResult && (
          <div className="results-section">
            <h2>Compression Results</h2>
            <div className="results-grid">
              <div className="result-item">
                <h3>Original Size</h3>
                <p>{formatFileSize(compressionResult.originalSize)}</p>
              </div>
              <div className="result-item">
                <h3>Compressed Size</h3>
                <p>{formatFileSize(compressionResult.compressedSize)}</p>
              </div>
              <div className="result-item">
                <h3>Compression Ratio</h3>
                <p>{compressionResult.compressionRatio}%</p>
              </div>
            </div>
            <div className="download-section">
              <a
                href={`http://localhost:5000/uploads/${compressionResult.compressedPath}`}
                download
                className="download-button"
              >
                Download Compressed Image
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
