import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaFile, FaTrash, FaCheck } from 'react-icons/fa';

// PUBLIC_INTERFACE
/**
 * DocumentUpload component for handling document file uploads
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onFileChange - Callback function when file is selected or removed
 * @param {string} props.error - Error message to display
 * @param {Array} props.acceptedFileTypes - Array of accepted MIME types
 * @param {number} props.maxFileSizeMB - Maximum file size in MB
 */
const DocumentUpload = ({ 
  onFileChange, 
  error, 
  acceptedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'],
  maxFileSizeMB = 10
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      onFileChange(selectedFile);

      // Create preview if it's an image
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  }, [onFileChange]);

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onFileChange(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {}),
    maxSize: maxFileSizeMB * 1024 * 1024, // Convert MB to bytes
    multiple: false
  });

  const getFileIcon = () => {
    if (!file) return <FaUpload size={40} />;
    
    if (file.type === 'application/pdf') {
      return <FaFile size={40} />;
    }
    
    return preview ? null : <FaFile size={40} />;
  };

  return (
    <div>
      {!file ? (
        <div
          {...getRootProps()}
          style={{
            border: `2px dashed ${error ? 'var(--error-red)' : 'var(--medium-gray)'}`,
            borderRadius: 'var(--border-radius)',
            padding: '40px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: isDragActive ? 'var(--light-blue)' : 'transparent',
            transition: 'var(--transition)'
          }}
        >
          <input {...getInputProps()} />
          <div style={{ color: 'var(--primary-blue)', marginBottom: '16px' }}>
            <FaUpload size={40} />
          </div>
          
          {isDragActive ? (
            <p>Drop the file here...</p>
          ) : (
            <>
              <p className="mb-2" style={{ fontWeight: '500' }}>
                Drag & drop your document here, or click to select
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Supported formats: JPG, PNG, PDF. Maximum size: {maxFileSizeMB}MB.
              </p>
            </>
          )}
        </div>
      ) : (
        <div 
          style={{
            border: '2px solid var(--medium-gray)',
            borderRadius: 'var(--border-radius)',
            padding: '20px',
            position: 'relative'
          }}
        >
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <button
              onClick={removeFile}
              style={{
                backgroundColor: 'var(--white)',
                border: '1px solid var(--medium-gray)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--dark-gray)'
              }}
            >
              <FaTrash />
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-3" style={{ color: 'var(--success-green)' }}>
              <FaCheck size={24} />
            </div>
            
            <h3 className="mb-2">Document Uploaded</h3>
            <p className="mb-4">{file.name}</p>
            
            {preview && (
              <div style={{ maxWidth: '300px', marginBottom: '20px' }}>
                <img 
                  src={preview} 
                  alt="Document preview" 
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--medium-gray)'
                  }}
                />
              </div>
            )}
            
            {!preview && getFileIcon()}
          </div>
        </div>
      )}

      {error && (
        <p className="error-message mt-2">{error}</p>
      )}
    </div>
  );
};

export default DocumentUpload;
