import { useEffect, useState } from "react";
import CreatePost from "./post/CreatePost";
import CreatePostCard from "./post/CreatePostCard";
import PostCard from "./post/PostCard";
import { getAllPosts, getPostsByUserId } from "../services/postService";
import { useAuth } from "../auth/AuthContext";

const Feed = () => {
 const formatDate = (date: string) => {
  const postDate = new Date(date);
  const now = new Date();

  const diff = now.getTime() - postDate.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return postDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const auth = useAuth();
   const userId=auth?.user?._id;
  console.log("Authenticated user:", auth?.user);
  console.log("Authenticated user:", auth?.user);
 
  const handlePostDelete = (postId: string) => {
  setPosts((prevPosts) =>
    prevPosts.filter((post) => post._id !== postId)
  );
};
  //   {
  //     id: 1,
  //     user: {
  //       name: "Ritika Vishwakarma",
  //       username: "ritika.dev",
  //       avatar:
  //         "https://i.pravatar.cc/150?img=5",
  //     },
  //     postType: "normal" as const,
  //     content:
  //       "Finally completed my React Social Feed UI 🚀. Next step is connecting it with the backend.",
  //     media: [
  //       {
  //         url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000",
  //         mediaType: "image" as const,
  //       },
  //     ],
  //     likes: 128,
  //     comments: 24,
  //     createdAt: "2h ago",
  //   },

  //   {
  //     id: 2,
  //     user: {
  //       name: "Aman Sharma",
  //       username: "aman.codes",
  //       avatar:
  //         "https://i.pravatar.cc/150?img=12",
  //     },
  //     postType: "project" as const,
  //     content:
  //       "Built an AI Resume Analyzer using React, Node.js and Gemini API.",
  //     media: [
  //       {
  //         url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000",
  //         mediaType: "image" as const,
  //       },
  //     ],
  //     githubLink: "https://github.com/example",
  //     liveLink: "https://example.com",
  //     techStack: [
  //       "React",
  //       "Node.js",
  //       "Express",
  //       "MongoDB",
  //       "Gemini API",
  //     ],
  //     likes: 342,
  //     comments: 51,
  //     createdAt: "Yesterday",
  //   },

  //   {
  //     id: 3,
  //     user: {
  //       name: "Priya Singh",
  //       username: "priya_ui",
  //       avatar:
  //         "https://i.pravatar.cc/150?img=30",
  //     },
  //     postType: "normal" as const,
  //     content:
  //       "Dark UI + Glassmorphism is still my favorite combination 😍",
  //     likes: 76,
  //     comments: 8,
  //     createdAt: "3 days ago",
  //   },
  // ];
  useEffect(()=>{
    const fetchPosts=async()=>{

      try{
       
        if(!userId){
          console.error("User ID is not available.");
          return;
        }
        const response=await getAllPosts();
        setPosts(response);
      
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);
 console.log(posts)
  return (
    <div className="space-y-5">
      <CreatePostCard onClick={() => setShowCreatePost(true)} />
      {showCreatePost && (
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
  <CreatePost onClose={() => setShowCreatePost(false)} />
</div>
      )}
    <div className="space-y-5">
  {posts.map((post) => (
    <PostCard
    _id={post._id}
      key={post._id}
     user={post.user}
      postType={post.postType}
      content={post.content}
      media={post.media}
      likes={post.likes?.length || 0}
      comments={post.comments?.length || 0}
      githubLink={post.githubLink}
      liveLink={post.liveLink}
      techStack={post.techStack}
      createdAt={formatDate(post.createdAt)}
      onDelete={handlePostDelete}
    />
  ))}
</div>
    </div>
  );
};

export default Feed;
