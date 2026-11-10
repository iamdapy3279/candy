import fs from "fs";
import path from "path";

export interface InstagramMediaItem {
  id: string;
  filename: string;
  src: string;
  type: "image" | "video";
  poster?: string;
}

const SUPPORTED_EXTENSIONS = /\.(jpe?g|png|webp|mp4|webm)$/i;
const VIDEO_EXTENSIONS = /\.(mp4|webm)$/i;
const POSTER_PATTERN = /[-_.]poster\.(jpe?g|png|webp)$/i;

/**
 * Discovers and sorts all supported media items in public/posts/ at build time.
 * Supports jpg, jpeg, png, webp, mp4, webm.
 * Automatically pairs any `*-poster.webp/jpg/png` file with its corresponding video
 * while excluding poster files from becoming independent cards.
 * Sorted alphabetically / numerically by filename.
 */
export function getInstagramPosts(): InstagramMediaItem[] {
  try {
    const postsDir = path.join(process.cwd(), "public", "posts");
    if (!fs.existsSync(postsDir)) {
      return [];
    }

    const files = fs.readdirSync(postsDir);

    // 1. Identify any poster image files
    const posterMap = new Map<string, string>();
    for (const file of files) {
      if (POSTER_PATTERN.test(file)) {
        const baseName = file.replace(POSTER_PATTERN, "");
        posterMap.set(baseName, `/posts/${file}`);
      }
    }

    // 2. Discover actual media items, excluding standalone poster images
    const validFiles = files
      .filter(
        (file) =>
          !file.startsWith(".") &&
          !POSTER_PATTERN.test(file) &&
          SUPPORTED_EXTENSIONS.test(file)
      )
      .sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
      );

    return validFiles.map((filename) => {
      const isVideo = VIDEO_EXTENSIONS.test(filename);
      const baseName = filename.replace(/\.[^.]+$/, "");
      const explicitPoster = posterMap.get(baseName);

      return {
        id: filename,
        filename,
        src: `/posts/${filename}`,
        type: isVideo ? "video" : "image",
        poster: explicitPoster || (isVideo ? `/posts/${filename}#t=0.001` : undefined),
      };
    });
  } catch (error) {
    console.error("Failed to read public/posts:", error);
    return [];
  }
}
