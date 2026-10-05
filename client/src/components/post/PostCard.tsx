import { Heart, MessageCircle, Globe } from "lucide-react";
import { EllipsisVertical } from 'lucide-react';
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { deletePost, likePost, updatePost } from "../../services/postService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import PostEditModal, { type UpdatedPostData } from "./PostEditModal";
import { createComment, getCommentsByPostId, } from "../../services/commentService";


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
 isLiked:boolean;
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
    onEdit:(updatedPost:UpdatedPostData)=>void
}


const PostCard = ({
  isLiked,
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
  onDelete,
  onEdit
}: PostProps) => {
  const {user}= useAuth();
  const isCurrentUser = user?._id === postUser._id;
  console.log("isLiked from backend:", isLiked);
const [showComments, setShowComments] = useState(false);
const [commentContent, setCommentContent] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const[showEditModal,setShowEditModal]=useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [commentsCount, setCommentsCount] = useState(comments);
  const [commentsList, setCommentsList] = useState<any[]>([]);
  useEffect(() => {
    const fetchComments=async()=>{
      try{
        const result=await getCommentsByPostId(_id);
        setCommentsList(result);
      }
      catch(error){
        console.error("Error fetching comments:",error);
      }
    }
    if(showComments){
      fetchComments();
    }
  }, [_id,showComments]);

  console.log("Comments List:", commentsList);
  const handleLike=async()=>{
    try{
      const result=await likePost(_id);
      setLikesCount(result.likes.length);
      setIsLikedState(result.message === "Post liked successfully");
    }catch(error){
      console.error("Error liking post:",error);
      toast.error("Failed to like the post.");
    }
  }


  const handleCommentSubmit=async()=>{
    try{
     const result=await createComment(_id,commentContent);
     console.log("Comment created:",result);
     setCommentContent("");
     setCommentsCount((prev) => prev + 1);
    }
    catch(error){
      console.error("Error submitting comment:",error);
      toast.error("Failed to submit the comment.");
    }
  }
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

const handleEdit=async(updatedPost:UpdatedPostData)=>{
try{
 const formData=new FormData();
 formData.append("content",updatedPost.content);
 formData.append("postType",updatedPost.postType);
 formData.append("githubLink",updatedPost.githubLink||"");
  formData.append(
      "liveLink",
      updatedPost.liveLink || ""
    );

    formData.append(
      "techStack",
      JSON.stringify(updatedPost.techStack)
    );
    formData.append(
      "existingMedia",
      JSON.stringify(updatedPost.existingMedia)
    );

    updatedPost.newMedia.forEach((file:any) => {
      formData.append("media", file);
    });

  const result = await updatePost(_id, formData);
  console.log("Updated Post from server:", result);
  onEdit(result.post);
    toast.success("Post updated successfully!");

    setShowEditModal(false);

}catch(error){
  console.error("Error updating post:", error);
  toast.error("Failed to update the post.");
}
}

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
                setShowEditModal(true)
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
        <button onClick={handleLike} className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition">
        <Heart
    size={20}
     className={isLikedState ? "text-red-500" : "text-gray-400"}
  fill={isLikedState ? "currentColor" : "none"}
    
  />
          {likesCount}
        </button>

        <button  onClick={() => setShowComments((prev) => !prev)} className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition">
          <MessageCircle size={20} />
          {commentsCount}
        </button>
        
      </div>
      
      {
        showEditModal && (
          <PostEditModal 
          post={{
      _id,
      postType,
      content,
      media,
      githubLink,
      liveLink,
      techStack,
    }}
    onClose={() => setShowEditModal(false)}
    onSave={handleEdit}
    
          />
        )
      }
      {showComments && (
  <div className="mt-4 border-t border-zinc-800 pt-4">
    <div className="max-h-80 overflow-y-auto space-y-4">
  {commentsList.length === 0 ? (
    <p className="text-gray-400 text-sm">
      No comments yet.
    </p>
  ) : (
    commentsList.map((comment) => (
      <div key={comment._id} className="flex gap-3">
        {comment.user?.avatar ? (
          <img
            src={comment.user.avatar}
            alt={comment.user.name}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-semibold">
            {comment.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}

        <div>
          <p className="text-white text-sm font-semibold">
            {comment.user?.username
              ? `@${comment.user.username}`
              : comment.user?.name}
          </p>

          <p className="text-gray-300 text-sm mt-1">
            {comment.content}
          </p>
        </div>
      </div>
    ))
  )}
</div>

    <div className="flex gap-2 mt-4">
      <input
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        type="text"
        placeholder="Add a comment..."
        className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 text-white outline-none"
      />

      <button onClick={handleCommentSubmit} className="bg-violet-600 text-white px-4 py-2 rounded-full">
        Post
      </button>
    </div>
  </div>
)}
    </div>
    
  );
};

export default PostCard;
