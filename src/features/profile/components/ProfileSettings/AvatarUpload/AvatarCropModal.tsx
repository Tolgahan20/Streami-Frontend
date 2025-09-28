"use client";

import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Button } from '@/components/ui/button/Button';
import { Text } from '@/components/ui/typography/Typography';
import { X, Crop, ZoomIn, ZoomOut } from 'lucide-react';
import styles from './AvatarCropModal.module.css';

interface AvatarCropModalProps {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
  onCrop: (croppedImageBlob: Blob) => void;
}

export const AvatarCropModal: React.FC<AvatarCropModalProps> = ({
  imageSrc,
  isOpen,
  onClose,
  onCrop
}) => {
  const editorRef = useRef<AvatarEditor>(null);
  const [scale, setScale] = useState(1.2);

  const handleZoomChange = (newScale: number) => {
    setScale(Math.max(0.5, Math.min(3, newScale)));
  };

  const handleCrop = () => {
    if (!editorRef.current) return;

    // Get the canvas from the editor
    const canvas = editorRef.current.getImageScaledToCanvas();
    
    // Convert to blob
    canvas.toBlob((blob: Blob | null) => {
      if (blob) {
        onCrop(blob);
        onClose();
      }
    }, 'image/jpeg', 0.9);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <Text variant="h3" className={styles.title}>
            <Crop size={20} />
            Crop Avatar
          </Text>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.editorContainer}>
            <AvatarEditor
              ref={editorRef}
              image={imageSrc}
              width={300}
              height={300}
              border={20}
              borderRadius={150}
              scale={scale}
              rotate={0}
              backgroundColor="transparent"
              style={{ borderRadius: 'var(--radius-lg)' }}
            />
          </div>

          {/* Zoom controls */}
          <div className={styles.zoomControls}>
            <button 
              className={styles.zoomButton}
              onClick={() => handleZoomChange(scale - 0.1)}
              disabled={scale <= 0.5}
            >
              <ZoomOut size={16} />
            </button>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={scale}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              className={styles.zoomSlider}
            />
            <button 
              className={styles.zoomButton}
              onClick={() => handleZoomChange(scale + 0.1)}
              disabled={scale >= 3}
            >
              <ZoomIn size={16} />
            </button>
          </div>

          <div className={styles.instructions}>
            <Text color="muted" variant="small">
              Drag to reposition, scroll to zoom, and adjust the crop area. The circular area shows what will be kept.
            </Text>
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCrop}>
            Crop & Save
          </Button>
        </div>
      </div>
    </div>
  );
};
