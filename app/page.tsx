import { getInstagramPosts } from "@/lib/getInstagramPosts";
import HomeClientShell from "@/components/HomeClientShell";

export default function Home() {
  // Discovered at build-time from public/posts/
  const instagramPosts = getInstagramPosts();

  return <HomeClientShell instagramPosts={instagramPosts} />;
}
