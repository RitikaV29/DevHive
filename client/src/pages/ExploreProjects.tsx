
import { useEffect, useState } from "react";

import { getAllPosts } from "../services/postService";
import { useAuth } from "../auth/AuthContext";
import PostCard from "../components/post/PostCard";
import { ArrowBigDown, ChevronDown } from "lucide-react";

const ExploreProjects = () => {
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const auth = useAuth();
  const userId = auth?.user?._id;
const [searchTerm, setSearchTerm] = useState("");
const [selectedTech, setSelectedTech] = useState("");
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

  const handlePostEdit = (updatedPost: any) => {
    setProjects((prev) =>
      prev.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  const handlePostDelete = (postId: string) => {
    setProjects((prev) =>
      prev.filter((post) => post._id !== postId)
    );
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!userId) return;

        const response = await getAllPosts();

        const projectPosts = response.filter(
          (post: any) => post.postType === "project"
        );

        setProjects(projectPosts);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [userId]);
const filteredProjects = projects.filter((post) => {
  const matchesSearch =
    post.content?.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesTech =
    !selectedTech || post.techStack?.includes(selectedTech);

  return matchesSearch && matchesTech;
});
  return (
    <div className="space-y-5">

      
<div>
  <h1 className="text-2xl font-bold text-white">
    Explore Projects
  </h1>
  <p className="text-gray-400 text-sm mt-1">
    Discover projects built by developers in the community.
  </p>

  <div className="flex flex-col sm:flex-row gap-3 mt-5">
    <input
      type="text"
      placeholder="Search projects..."
      className="flex-1 bg-[#181818] border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

  
<div className="relative w-full sm:w-56">
  <button
    type="button"
    onClick={() => setIsTechOpen(!isTechOpen)}
    className="w-full flex items-center justify-between bg-[#181818] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-200 hover:border-violet-500 transition"
  >
    {selectedTech || "All Technologies"}
    <span className="text-violet-400"><ChevronDown size={18}/></span>
  </button>

  {isTechOpen && (
    <div className="absolute top-full left-0 mt-2 w-full bg-[#1c1c1c] border border-zinc-800 rounded-xl p-1.5 shadow-xl shadow-black/40 z-50">
      {["", "React", "Node.js", "MongoDB", "Express", "TypeScript"].map((tech) => (
        <button
          key={tech || "all"}
          type="button"
          onClick={() => {
            setSelectedTech(tech);
            setIsTechOpen(false);
          }}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition ${
            selectedTech === tech
              ? "bg-violet-500/15 text-violet-400"
              : "text-gray-300 hover:bg-violet-500/10 hover:text-violet-300"
          }`}
        >
          {tech || "All Technologies"}
          {selectedTech === tech && <span>✓</span>}
        </button>
      ))}
    </div>
  )}
</div>

  </div>
</div>


      {projects.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          No projects available yet.
        </div>
      ) : (
        <div className="space-y-5">
          {filteredProjects.map((post) => (
            <PostCard
              key={post._id}
              _id={post._id}
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
              isSaved={post.isSaved}
              isLiked={post.isLiked}
              onDelete={handlePostDelete}
              onEdit={handlePostEdit}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default ExploreProjects;
