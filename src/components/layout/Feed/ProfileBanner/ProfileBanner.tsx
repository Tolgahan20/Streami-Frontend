'use client';

import React, { useState } from 'react';
import { User, Camera, Settings } from 'lucide-react';
import { WidgetGrid, PlatformWidget, StatsWidget } from '@/components/ui/widgets';
import styles from './ProfileBanner.module.css';

interface ProfileBannerProps {
  userName?: string;
  userHandle?: string;
  userDescription?: string;
  wallpaper?: string;
  isEditable?: boolean;
}

export const ProfileBanner: React.FC<ProfileBannerProps> = ({
  userName = 'Benjamin Loki',
  userHandle = '@benjamin_loki',
  userDescription = 'AI streamer co-pilot. Tips, overlays and growth tools for creators.',
  wallpaper,
  isEditable = true,
}) => {
  const [currentWallpaper, setCurrentWallpaper] = useState<string | undefined>(wallpaper);
  const [isEditingWidgets, setIsEditingWidgets] = useState(false);

  const handleWallpaperUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentWallpaper(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const bannerStyle: React.CSSProperties = currentWallpaper
    ? {
        backgroundImage: `url(${currentWallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div className={styles.profileBanner}>
      <div className={styles.wallpaperContainer} style={bannerStyle}>
        {!currentWallpaper && <div className={styles.defaultWallpaper} />}
        {isEditable && (
          <div className={styles.wallpaperControls}>
            <label htmlFor="wallpaper-upload" className={styles.uploadButton}>
              <Camera size={16} />
              <span>Change Wallpaper</span>
              <input
                id="wallpaper-upload"
                type="file"
                accept="image/*"
                onChange={handleWallpaperUpload}
                className={styles.fileInput}
              />
            </label>
            <button
              className={styles.editWidgetsButton}
              onClick={() => setIsEditingWidgets(!isEditingWidgets)}
            >
              <Settings size={16} />
              <span>{isEditingWidgets ? 'Done' : 'Edit Widgets'}</span>
            </button>
          </div>
        )}
      </div>

      <div className={styles.bannerContent}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <User size={32} />
          </div>
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{userName}</h2>
            <p className={styles.userHandle}>{userHandle}</p>
            <p className={styles.userDescription}>{userDescription}</p>
          </div>
        </div>

        <WidgetGrid isEditable={isEditingWidgets}>
          {/* Stats Widgets */}
          <StatsWidget
            id="widget-sales"
            size="medium"
            style="gradient"
            value="£3,200"
            label="Sales Generated"
            trend="up"
            trendValue="+15%"
            isEditable={isEditingWidgets}
          />
          
          <StatsWidget
            id="widget-listings"
            size="small"
            style="gradient"
            value="14"
            label="Live Listings"
            isEditable={isEditingWidgets}
          />
          
          <StatsWidget
            id="widget-followers"
            size="small"
            style="solid"
            value="5.3K"
            label="Twitch"
            isEditable={isEditingWidgets}
          />

          {/* Platform Widgets */}
          <PlatformWidget
            id="widget-youtube"
            size="small"
            style="solid"
            platform="YouTube"
            icon="🎥"
            stats="2.1K"
            isEditable={isEditingWidgets}
          />
          
          <PlatformWidget
            id="widget-twitter"
            size="small"
            style="solid"
            platform="X"
            icon="🐦"
            stats="9.8K"
            isEditable={isEditingWidgets}
          />
          
          <PlatformWidget
            id="widget-kick"
            size="small"
            style="solid"
            platform="Kick"
            icon="⚡"
            stats="1.45K"
            isEditable={isEditingWidgets}
          />
        </WidgetGrid>
      </div>
    </div>
  );
};

