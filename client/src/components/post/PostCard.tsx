import { Heart, MessageCircle, Globe } from "lucide-react";
import { EllipsisVertical } from 'lucide-react';
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { deletePost } from "../../services/postService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";


interface Media {
  url: string;
  mediaType: "image" | "video";
}

interface PostProps {
  _id: string;
  user: {
    _id: string;
    name: string;
    username: string;
    avatar: string;
  };

  postType: "normal" | "project";

  content?: string;

  media?: Media[];

  likes: number;

  comments: number;

  githubLink?: string;

  liveLink?: string;

  techStack?: string[];

  createdAt: string;
    onDelete:(postId:string)=>void
}

const PostCard = ({
  _id,
  user:postUser,
  postType,
  content,
  media,
  likes,
  comments,
  githubLink,
  liveLink,
  techStack,
  createdAt,
  onDelete
}: PostProps) => {
  const {user}= useAuth();
  const isCurrentUser = user?._id === postUser._id;
  
  const [showMenu, setShowMenu] = useState(false);
 const handleDelete = async () => {
  const result = await Swal.fire({
    title: "Delete Post?",
    text: "Are you sure you want to delete this post?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#52525b",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) {
    return;
  }

  try {
    await deletePost(_id);
    onDelete(_id);
    toast.success("Post deleted successfully!");

    setShowMenu(false);
  } catch (error) {
    console.error("Error deleting post:", error);

    toast.error("Failed to delete the post.");
  }
};
  return (
    <div  onClick={() => setShowMenu(false)}  className="bg-[#111111] border border-zinc-800 rounded-2xl p-6 shadow-lg hover:border-violet-600 transition-all duration-300">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {postUser.avatar ? (
            <img
              src={postUser.avatar}
              alt={postUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold">
              {postUser.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <div>
            <h3 className="text-white font-semibold">{postUser.name}</h3>

            <p className="text-gray-400 text-sm">@{postUser.username}</p>
          </div>
        </div>

        <div className="text-right">
          {/* {postType === "project" && (
            <span className="bg-violet-600 text-white text-xs px-3 py-1 rounded-full">
              Project
            </span>
          )} */}
         <div className="relative">

 {isCurrentUser && (
      <>
        {/* Three dots */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu((prev) => !prev);
          }}
          className="text-gray-400 hover:text-white transition"
        >
          <EllipsisVertical size={22} />
        </button>

        {/* Edit/Delete menu */}
        {showMenu && (
          <div className="absolute right-0 mt-2  bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50">
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
                // edit logic
              }}
              className="w-full text-left px-4 py-2 text-gray-400 hover:bg-violet-600 hover:text-white rounded-t-lg"
            >
              <MdEdit/>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
                handleDelete();
              }}
              className="w-full text-left px-4 py-2 text-gray-400 hover:bg-red-600 hover:text-white rounded-b-lg"
            >
              <IoMdTrash/>
            </button>

          </div>
        )}
      </>
    )}

</div>
       
          <p className="text-xs text-gray-500 mt-2">{createdAt}</p>
        </div>
      </div>

      {/* Content */}

      {content && <p className="text-gray-300 mt-5 leading-7">{content}</p>}

      {/* Media */}

      {media && media.length > 0 && (
        <div
          className={`grid gap-3 mt-5 ${
            media.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {media.map((item, index) =>
            item.mediaType === "image" ? (
              <img
                key={index}
                src={item.url}
                alt=""
                className="rounded-xl w-full object-cover max-h-96"
              />
            ) : (
              <video key={index} controls className="rounded-xl w-full">
                <source src={item.url} />
              </video>
            ),
          )}
        </div>
      )}

      {/* Project Links */}

      {postType === "project" && (
        <div className="mt-5 space-y-3">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              className="flex items-center gap-2 text-violet-400 hover:text-violet-300"
            >
              GitHub Repository
            </a>
          )}

          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              className="flex items-center gap-2 text-violet-400 hover:text-violet-300"
            >
              <Globe size={18} />
              Live Demo
            </a>
          )}

          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-violet-950 text-violet-300 px-3 py-1 rounded-full text-sm border border-violet-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer */}

      <div className="border-t border-zinc-800 mt-6 pt-4 flex items-center gap-8">
        <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition">
          <Heart size={20} />
          {likes}
        </button>

        <button className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition">
          <MessageCircle size={20} />
          {comments}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
