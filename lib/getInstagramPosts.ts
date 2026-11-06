import fs from "fs";
import path from "path";

export interface InstagramMediaItem {
  id: string;
  filename: string;
  src: string;
  type: "image" | "video";
}

const SUPPORTED_EXTENSIONS = /\.(jpe?g|png|webp|mp4|webm)$/i;
const VIDEO_EXTENSIONS = /\.(mp4|webm)$/i;

/**
 * Discovers and sorts all supported media items in public/posts/ at build time.
 * Supports jpg, jpeg, png, webp, mp4, webm.
 * Sorted alphabetically / numerically by filename.
 */
export function getInstagramPosts(): InstagramMediaItem[] {
  try {
    const postsDir = path.join(process.cwd(), "public", "posts");
    if (!fs.existsSync(postsDir)) {
      return [];
    }

    const files = fs.readdirSync(postsDir);

    const validFiles = files
      .filter((file) => !file.startsWith(".") && SUPPORTED_EXTENSIONS.test(file))
      .sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
      );

    return validFiles.map((filename) => {
      const isVideo = VIDEO_EXTENSIONS.test(filename);
      return {
        id: filename,
        filename,
        src: `/posts/${filename}`,
        type: isVideo ? "video" : "image",
      };
    });
  } catch (error) {
    console.error("Failed to read public/posts:", error);
    return [];
  }
}

