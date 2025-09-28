import React from 'react';
import { PostCard } from '@/components/ui/feed';
import styles from './FeedContent.module.css';

// Dummy data for the feed
const feedData = [
  {
    id: 1,
    username: '@PixelPanda',
    content: 'Just shipped an overlay pack for Streami creators. First 100 are free.',
    likes: 1204,
    comments: 86
  },
  {
    id: 2,
    username: '@AikoVT',
    content: 'Goal: hit Partner this month. Daily shorts and live every night. Tips welcome.',
    likes: 842,
    comments: 122
  },
  {
    id: 3,
    username: '@KaraPlays',
    content: 'Testing a Streami overlay with channel points triggers. Thoughts?',
    likes: 156,
    comments: 23,
    reply: {
      username: '@ReplyBot',
      content: 'Love the stinger. Maybe soften the drop shadow.'
    },
    hasVideo: true
  },
  {
    id: 4,
    username: '@TechNoctis',
    content: 'Thread: OBS dual-PC scene collection with transitions and audio routing.',
    likes: 2031,
    comments: 203,
    attachment: 'Attachment - Scene Collection.json'
  },
  {
    id: 5,
    username: '@OverlayForge',
    content: 'Launching Streami-exclusive storefront soon. Creators keep 90 percent.',
    likes: 3554,
    comments: 441
  },
  {
    id: 6,
    username: '@StreamMaster',
    content: 'Just finished setting up my new streaming setup. The quality improvement is incredible!',
    likes: 892,
    comments: 67
  },
  {
    id: 7,
    username: '@ContentCreator',
    content: 'Working on a new overlay pack for gaming streams. Should be ready next week!',
    likes: 1234,
    comments: 89
  },
  {
    id: 8,
    username: '@TechGuru',
    content: 'Pro tip: Use Streami\'s analytics to track your growth across platforms. The insights are game-changing!',
    likes: 2156,
    comments: 156
  },
  {
    id: 9,
    username: '@GameStreamer',
    content: 'Just hit 10K followers on Twitch! Thanks to everyone who\'s been supporting my journey. Next goal: Partner!',
    likes: 4567,
    comments: 234
  },
  {
    id: 10,
    username: '@ArtCreator',
    content: 'Working on some custom emotes for my channel. The creative process is so satisfying!',
    likes: 1789,
    comments: 98
  },
  {
    id: 11,
    username: '@MusicProducer',
    content: 'Dropping a new track tomorrow! Perfect for streamers looking for background music. DM me for early access!',
    likes: 3234,
    comments: 187
  },
  {
    id: 12,
    username: '@TechReviewer',
    content: 'Reviewing the new Streami Pro features. The multi-platform streaming is a game changer!',
    likes: 2876,
    comments: 145
  },
  {
    id: 13,
    username: '@FitnessStreamer',
    content: 'Morning workout stream starting in 30 minutes! Join me for some motivation and fitness tips.',
    likes: 1456,
    comments: 67
  },
  {
    id: 14,
    username: '@CookingShow',
    content: 'Today\'s recipe: Homemade pasta with Streami\'s cooking overlay. Perfect for food content creators!',
    likes: 3789,
    comments: 298
  }
];

export const FeedContent: React.FC = () => {
  return (
    <div className={styles.content}>
      <div className={styles.feed}>
        {feedData.map((post) => (
          <PostCard
            key={post.id}
            username={post.username}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
            reply={post.reply}
            hasVideo={post.hasVideo}
            attachment={post.attachment}
          />
        ))}
      </div>
    </div>
  );
};
