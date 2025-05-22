import React, { useRef, useState, useEffect } from 'react';
import { FaCamera, FaExclamationCircle } from 'react-icons/fa';
import Button from '../common/Button';

// PUBLIC_INTERFACE
/**
 * SelfieCapture component for capturing user selfies
 * Handles camera permissions, video streaming, and photo capture
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
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Initialize camera on component mount
  useEffect(() => {
    let mounted = true;
    const startCamera = async () => {
      try {
        setLoading(true);
        setError(null);
        setPermissionDenied(false);
        
        // Define optimal camera constraints for best cross-browser compatibility
        const constraints = {
          audio: false,
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        };
        
        // Request camera access
        console.log('Requesting camera access...');
        const cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        
        // Only proceed if component is still mounted
        if (!mounted) {
          // Clean up the stream if component unmounted during access request
          cameraStream.getTracks().forEach(track => track.stop());
          return;
        }
        
        if (videoRef.current) {
          // Set stream to video element
          videoRef.current.srcObject = cameraStream;
          
          // Explicitly call play() to ensure video starts in all browsers
          try {
            await videoRef.current.play();
          } catch (playErr) {
            console.error('Error playing video:', playErr);
            throw new Error('Failed to play video stream');
          }
          
          // Set stream to state for later cleanup
          setStream(cameraStream);
        }
      } catch (err) {
        // Only handle error if component is still mounted
        if (!mounted) return;
        
        console.error('Error accessing camera:', err);
        
        // Handle specific error types
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setPermissionDenied(true);
          setError('Camera access denied. Please grant permission to use your camera.');
        } else if (err.name === 'NotFoundError') {
          setError('No camera detected. Please ensure your device has a working camera.');
        } else if (err.name === 'NotReadableError' || err.name === 'AbortError') {
          setError('Camera is already in use by another application or not accessible.');
        } else {
          setError('Unable to access camera. Please check your browser settings and try again.');
        }
      } finally {
        // Only update loading state if component is still mounted
        if (mounted) {
          setLoading(false);
        }
      }
    };

    startCamera();

    // Clean up function to stop camera when component unmounts
    return () => {
      mounted = false;
      if (stream) {
        console.log('Stopping camera stream...');
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
      
      // Clear video source
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  // Handle video loaded metadata
  const handleVideoMetadata = () => {
    console.log('Video metadata loaded');
    setLoading(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Check if the video is ready
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      console.warn('Video not ready for capture');
      return;
    }
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to data URL (for display purposes only)
    const imageData = canvas.toDataURL('image/png');
    
    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    // Call onCapture with the image data
    onCapture(imageData);
  };

  const retryAccessCamera = () => {
    // Reset states and try to initialize camera again
    setStream(null);
    setError(null);
    setLoading(true);
    setPermissionDenied(false);
    
    // Cleanup any existing stream
    if (videoRef.current && videoRef.current.srcObject) {
      const currentStream = videoRef.current.srcObject;
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
      videoRef.current.srcObject = null;
    }
    
    // Re-initialize effect to restart camera
    const startCamera = async () => {
      try {
        const constraints = {
          audio: false,
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        };
        
        const cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = cameraStream;
          await videoRef.current.play();
          setStream(cameraStream);
        }
      } catch (err) {
        console.error('Error retrying camera access:', err);
        
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setPermissionDenied(true);
          setError('Camera access denied. Please grant permission to use your camera.');
        } else {
          setError('Unable to access camera. Please check your browser settings and try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    startCamera();
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
              backgroundColor: 'var(--kavia-dark)',
              color: 'var(--text-color)'
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
              backgroundColor: 'var(--kavia-dark)',
              color: 'var(--error-red)'
            }}
          >
            <FaExclamationCircle size={36} style={{ marginBottom: '10px' }} />
            <p>{error}</p>
            {permissionDenied && (
              <div className="mt-4">
                <p className="mb-2 text-sm">
                  You need to allow camera access in your browser settings.
                </p>
                <Button 
                  onClick={retryAccessCamera} 
                  size="small"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        )}
        
        {!loading && !error && (
          <>
            <video 
              ref={videoRef}
              autoPlay
              playsInline
              muted
              onLoadedMetadata={handleVideoMetadata}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 'var(--border-radius)',
                backgroundColor: 'var(--kavia-dark)'
              }}
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
                border: '2px dashed var(--text-color)',
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
