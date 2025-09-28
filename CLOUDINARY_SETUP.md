# Cloudinary Setup Guide

## 1. Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com) and sign up
2. Verify your email and complete setup

## 2. Get Your Credentials
1. Go to your [Cloudinary Dashboard](https://cloudinary.com/console)
2. Copy your credentials:
   - **Cloud Name** (e.g., `my-cloud-name`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)

## 3. Add Environment Variables
Add these to your `.env.local` file:

```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

## 4. Benefits of Cloudinary
- ✅ **Automatic image optimization** (WebP, AVIF formats)
- ✅ **Responsive images** with automatic sizing
- ✅ **Face detection** for smart cropping
- ✅ **Global CDN** for fast delivery
- ✅ **Automatic compression** to reduce file sizes
- ✅ **Transformations** on-the-fly (resize, crop, filters)
- ✅ **Secure uploads** with signed URLs
- ✅ **Free tier** with generous limits

## 5. Usage Examples

### Automatic Avatar Optimization
```typescript
// Automatically optimized for different sizes
const smallAvatar = CloudinaryService.getOptimizedAvatarUrl(publicId, 50);
const mediumAvatar = CloudinaryService.getOptimizedAvatarUrl(publicId, 200);
const largeAvatar = CloudinaryService.getOptimizedAvatarUrl(publicId, 400);
```

### Smart Cropping
The service automatically:
- Detects faces in images
- Crops to 400x400 with face-centered gravity
- Optimizes quality and format
- Stores in organized folders

## 6. Migration from Local Storage
Once Cloudinary is set up, your avatars will be:
- Stored in the cloud (not on your server)
- Automatically optimized and compressed
- Served via global CDN
- Properly named and organized
