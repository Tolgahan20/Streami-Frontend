import React from 'react';
import { Heart, MessageCircle, User, Play, MoreHorizontal } from 'lucide-react';
import styles from './FeedContent.module.css';

export const FeedContent: React.FC = () => {
  return (
    <div className={styles.content}>
      <div className={styles.feed}>
        {/* Post 1 */}
        <div className={styles.post}>
          <div className={styles.postHeader}>
            <div className={styles.avatar}>
              <User size={20} />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.username}>@PixelPanda</div>
            </div>
          </div>
          <div className={styles.postContent}>
            Just shipped an overlay pack for Streami creators. First 100 are free.
          </div>
          <div className={styles.postStats}>
            <span className={styles.stat}>
              <Heart size={16} />
              <span>1,204</span>
            </span>
            <span className={styles.stat}>
              <MessageCircle size={16} />
              <span>86</span>
            </span>
          </div>
        </div>

        {/* Post 2 */}
        <div className={styles.post}>
          <div className={styles.postHeader}>
            <div className={styles.avatar}>
              <User size={20} />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.username}>@AikoVT</div>
            </div>
          </div>
          <div className={styles.postContent}>
            Goal: hit Partner this month. Daily shorts and live every night. Tips welcome.
          </div>
          <div className={styles.postStats}>
            <span className={styles.stat}>
              <Heart size={16} />
              <span>842</span>
            </span>
            <span className={styles.stat}>
              <MessageCircle size={16} />
              <span>122</span>
            </span>
          </div>
        </div>

        {/* Post 3 with Video */}
        <div className={styles.post}>
          <div className={styles.postHeader}>
            <div className={styles.avatar}>
              <User size={20} />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.username}>@KaraPlays</div>
            </div>
          </div>
          <div className={styles.postContent}>
            Testing a Streami overlay with channel points triggers. Thoughts?
          </div>
          
          {/* Reply */}
          <div className={styles.reply}>
            <div className={styles.replyHeader}>
              <div className={styles.avatar}>
                <User size={16} />
              </div>
              <div className={styles.username}>@ReplyBot</div>
            </div>
            <div className={styles.replyContent}>
              Love the stinger. Maybe soften the drop shadow.
            </div>
          </div>

          {/* Video Player */}
          <div className={styles.videoPlayer}>
            <div className={styles.videoHeader}>
              <div className={styles.liveTag}>LIVE</div>
              <button className={styles.videoMenu}>
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div className={styles.videoContent}>
              <div className={styles.playButton}>
                <Play size={24} />
              </div>
            </div>
            <div className={styles.videoProgress}>
              <div className={styles.progressBar}></div>
            </div>
          </div>

          <div className={styles.postStats}>
            <span className={styles.stat}>
              <Heart size={16} />
              <span>156</span>
            </span>
            <span className={styles.stat}>
              <MessageCircle size={16} />
              <span>23</span>
            </span>
          </div>
        </div>

        {/* Post 4 */}
        <div className={styles.post}>
          <div className={styles.postHeader}>
            <div className={styles.avatar}>
              <User size={20} />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.username}>@TechNoctis</div>
            </div>
          </div>
          <div className={styles.postContent}>
            Thread: OBS dual-PC scene collection with transitions and audio routing.
          </div>
          <div className={styles.attachment}>
            <div className={styles.attachmentIcon}>📎</div>
            <span>Attachment - Scene Collection.json</span>
          </div>
          <div className={styles.postStats}>
            <span className={styles.stat}>
              <Heart size={16} />
              <span>2,031</span>
            </span>
            <span className={styles.stat}>
              <MessageCircle size={16} />
              <span>203</span>
            </span>
          </div>
        </div>

        {/* Post 5 */}
        <div className={styles.post}>
          <div className={styles.postHeader}>
            <div className={styles.avatar}>
              <User size={20} />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.username}>@OverlayForge</div>
            </div>
          </div>
          <div className={styles.postContent}>
            Launching Streami-exclusive storefront soon. Creators keep 90 percent.
          </div>
          <div className={styles.postStats}>
            <span className={styles.stat}>
              <Heart size={16} />
              <span>3,554</span>
            </span>
            <span className={styles.stat}>
              <MessageCircle size={16} />
              <span>441</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
