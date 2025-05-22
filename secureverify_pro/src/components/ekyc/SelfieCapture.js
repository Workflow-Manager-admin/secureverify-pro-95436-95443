import React, { useRef, useState, useEffect } from 'react';
import { FaCamera, FaExclamationCircle } from 'react-icons/fa';
import Button from '../common/Button';

// PUBLIC_INTERFACE
/**
 * SelfieCapture component for capturing user selfies
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onCapture - Callback function when photo is captured
 */
const SelfieCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize camera on component mount
  useEffect(() => {
    const startCamera = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const cameraStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 } 
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = cameraStream;
          setStream(cameraStream);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Unable to access camera. Please make sure you have granted camera permissions.');
      } finally {
        setLoading(false);
      }
    };

    startCamera();

    // Clean up function to stop camera when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to data URL
    const imageData = canvas.toDataURL('image/png');
    
    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    
    // Call onCapture with the image data
    onCapture(imageData);
  };

  return (
    <div className="w-full text-center">
      <div 
        style={{
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          borderRadius: 'var(--border-radius)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {loading && (
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '300px',
              backgroundColor: 'var(--light-gray)'
            }}
          >
            <div className="loader"></div>
            <p style={{ marginLeft: '10px' }}>Initializing camera...</p>
          </div>
        )}
        
        {!loading && error && (
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              height: '300px',
              backgroundColor: 'var(--light-gray)',
              color: 'var(--error-red)'
            }}
          >
            <FaExclamationCircle size={36} style={{ marginBottom: '10px' }} />
            <p>{error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <>
            <video 
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 'var(--border-radius)',
                backgroundColor: 'var(--light-gray)'
              }}
              onCanPlay={() => setLoading(false)}
            />
            
            {/* Face outline overlay */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '2px dashed var(--white)',
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.3)',
                zIndex: 1
              }}
            />
          </>
        )}
      </div>
      
      {/* Hidden canvas for capturing image */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <div className="mt-4">
        <Button 
          onClick={capturePhoto}
          disabled={loading || error}
          className="mx-auto"
        >
          <FaCamera style={{ marginRight: '8px' }} /> Take Photo
        </Button>
      </div>
    </div>
  );
};

export default SelfieCapture;
