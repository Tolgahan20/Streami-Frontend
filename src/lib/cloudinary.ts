import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

export class CloudinaryService {
  /**
   * Upload avatar image to Cloudinary
   */
  static async uploadAvatar(
    file: File | Blob,
    userId: string
  ): Promise<CloudinaryUploadResult> {
    try {
      // Convert file to buffer for Cloudinary upload stream
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Upload using upload_stream for better performance
      const result = await new Promise<{
        public_id: string;
        secure_url: string;
        width: number;
        height: number;
        format: string;
        resource_type: string;
      }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'streami/avatars',
            public_id: `avatar_${userId}_${Date.now()}`,
            transformation: [
              { width: 400, height: 400, crop: 'fill', gravity: 'face' },
              { quality: 'auto', fetch_format: 'auto' }
            ],
            resource_type: 'image',
            overwrite: true,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result!);
          }
        ).end(buffer);
      });

      return {
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        resource_type: result.resource_type,
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      // Re-throw the original error so the fallback system can catch it
      throw error;
    }
  }

  /**
   * Delete avatar from Cloudinary
   */
  static async deleteAvatar(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      throw new Error('Failed to delete avatar from cloud storage');
    }
  }

  /**
   * Convert File or Blob to base64 string (Node.js compatible)
   */
  private static async fileToBase64(file: File | Blob): Promise<string> {
    // Convert to ArrayBuffer first
    const arrayBuffer = await file.arrayBuffer();
    // Convert ArrayBuffer to Buffer
    const buffer = Buffer.from(arrayBuffer);
    // Convert Buffer to base64
    return buffer.toString('base64');
  }

  /**
   * Generate optimized avatar URL with transformations
   */
  static getOptimizedAvatarUrl(publicId: string, size: number = 200): string {
    return cloudinary.url(publicId, {
      width: size,
      height: size,
      crop: 'fill',
      gravity: 'face',
      quality: 'auto',
      fetch_format: 'auto',
    });
  }
}
