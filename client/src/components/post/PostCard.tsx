// import { Heart, MessageCircle, Globe,  BookMarkedIcon, BookMarked, Bookmark } from "lucide-react";
// import { EllipsisVertical } from 'lucide-react';
// import { useEffect, useState } from "react";
// import { useAuth } from "../../auth/AuthContext";
// import { deletePost, likePost, toggleSavePost, updatePost } from "../../services/postService";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify";
// import { IoMdTrash } from "react-icons/io";
// import { MdEdit } from "react-icons/md";
// import PostEditModal, { type UpdatedPostData } from "./PostEditModal";
// import { createComment, createReply, deleteComment, getCommentsByPostId, } from "../../services/commentService";


// interface Media {
//   url: string;
//   mediaType: "image" | "video";
// }

// interface PostProps {
//   isSaved:boolean;
//   _id: string;
//   user: {
//     _id: string;
//     name: string;
//     username: string;
//     avatar: string;
//   };
//  isLiked:boolean;
//   postType: "normal" | "project";

//   content?: string;

//   media?: Media[];

//   likes: number;

//   comments: number;

//   githubLink?: string;

//   liveLink?: string;

//   techStack?: string[];

//   createdAt: string;
//     onDelete:(postId:string)=>void
//     onEdit:(updatedPost:UpdatedPostData)=>void
// }


// const PostCard = ({
//   isSaved,
//   isLiked,
//   _id,
//   user:postUser,
//   postType,
//   content,
//   media,
//   likes,
//   comments,
//   githubLink,
//   liveLink,
//   techStack,
//   createdAt,
//   onDelete,
//   onEdit
// }: PostProps) => {
//   const {user}= useAuth();
//   const isCurrentUser = user?._id === postUser._id;
//   console.log("isLiked from backend:", isLiked);
//   const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
// const [replyContent, setReplyContent] = useState("");
// const [showComments, setShowComments] = useState(false);
// const [commentContent, setCommentContent] = useState("");
//   const [showMenu, setShowMenu] = useState(false);
//   const[showEditModal,setShowEditModal]=useState(false);
//   const [likesCount, setLikesCount] = useState(likes);
//   const [isLikedState, setIsLikedState] = useState(isLiked);
//   const [commentsCount, setCommentsCount] = useState(comments);
//   const [commentsList, setCommentsList] = useState<any[]>([]);
//   const [isSavedState, setIsSavedState] = useState(isSaved);
//   useEffect(() => {
//     const fetchComments=async()=>{
//       try{
//         const result=await getCommentsByPostId(_id);
//         setCommentsList(result);
//       }
//       catch(error){
//         console.error("Error fetching comments:",error);
//       }
//     }
//     if(showComments){
//       fetchComments();
//     }
//   }, [_id,showComments]);

//   console.log("Comments List:", commentsList);
//   const handleLike=async()=>{
//     try{
//       const result=await likePost(_id);
//       setLikesCount(result.likes.length);
//       setIsLikedState(result.message === "Post liked successfully");
//     }catch(error){
//       console.error("Error liking post:",error);
//       toast.error("Failed to like the post.");
//     }
//   }

// const handleReplySubmit = async (parentCommentId: string) => {
//   if (!replyContent.trim()) return;

//   try {
//     await createReply(_id, replyContent, parentCommentId);

//     const updatedComments = await getCommentsByPostId(_id);

//     setCommentsList(updatedComments);
//     setReplyContent("");
//     setActiveReplyId(null);

    
//   } catch (error) {
//     console.error("Error creating reply:", error);
//     toast.error("Failed to add reply.");
//   }
// };
//  const handleSave = async () => {
//   try {
//     const response = await toggleSavePost(_id);

//     if (response.message === "Post saved successfully") {
//      setIsSavedState(true);
//     } else {
//       setIsSavedState(false);
   
//     }
//   } catch (error) {
//     console.error("Error saving post:", error);
//     toast.error("Failed to save post");
//   }
// };

  
//   const handleCommentSubmit = async () => {
//   if (!commentContent.trim()) return;

//   try {
//     const result = await createComment(_id, commentContent);

//     console.log("Comment created:", result);

//     // Fetch updated comments
//     const updatedComments = await getCommentsByPostId(_id);

//     setCommentsList(updatedComments);
//     setCommentsCount(updatedComments.length);

//     setCommentContent("");
//   } catch (error) {
//     console.error("Error submitting the comment:", error);
//     toast.error("Failed to submit the comment.");
//   }
// };
//  const handleDelete = async () => {
//   const result = await Swal.fire({
//     title: "Delete Post?",
//     text: "Are you sure you want to delete this post?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#dc2626",
//     cancelButtonColor: "#52525b",
//     confirmButtonText: "Yes, delete it!",
//     cancelButtonText: "Cancel",
//   });

//   if (!result.isConfirmed) {
//     return;
//   }

//   try {
//     await deletePost(_id);
//     onDelete(_id);
//     toast.success("Post deleted successfully!");

//     setShowMenu(false);
//   } catch (error) {
//     console.error("Error deleting post:", error);

//     toast.error("Failed to delete the post.");
//   }
// };
// const handleDeleteComment = async (commentId: string) => {
//   try {
//     await deleteComment(commentId);

//     setCommentsList((prev) =>
//       prev.filter(
//         (comment) =>
//           comment._id !== commentId &&
//           comment.parentComment?.toString() !== commentId
//       )
//     );

//     setCommentsCount((prev) => prev - 1);

   
//   } catch (error) {
//     console.error("Error deleting comment:", error);
//     toast.error("Failed to delete comment.");
//   }
// };
// const topLevelComments = commentsList.filter(
//   (comment) => !comment.parentComment
// );

// const getReplies = (commentId: string) => {
//   return commentsList.filter((item) => {
//     const parentId =
//       typeof item.parentComment === "string"
//         ? item.parentComment
//         : item.parentComment?._id?.toString();

//     return parentId === commentId;
//   });
// };
// const handleEdit=async(updatedPost:UpdatedPostData)=>{
// try{
//  const formData=new FormData();
//  formData.append("content",updatedPost.content);
//  formData.append("postType",updatedPost.postType);
//  formData.append("githubLink",updatedPost.githubLink||"");
//   formData.append(
//       "liveLink",
//       updatedPost.liveLink || ""
//     );

//     formData.append(
//       "techStack",
//       JSON.stringify(updatedPost.techStack)
//     );
//     formData.append(
//       "existingMedia",
//       JSON.stringify(updatedPost.existingMedia)
//     );

//     updatedPost.newMedia.forEach((file:any) => {
//       formData.append("media", file);
//     });

//   const result = await updatePost(_id, formData);
//   console.log("Updated Post from server:", result);
//   onEdit(result.post);
//     toast.success("Post updated successfully!");

//     setShowEditModal(false);

// }catch(error){
//   console.error("Error updating post:", error);
//   toast.error("Failed to update the post.");
// }
// }

//   return (
//     <div  onClick={() => setShowMenu(false)}  className="bg-[#111111] border border-zinc-800 rounded-2xl p-6 shadow-lg hover:border-violet-600 transition-all duration-300">
//       {/* Header */}

//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           {postUser.avatar ? (
//             <img
//               src={postUser.avatar}
//               alt={postUser.name}
//               className="w-12 h-12 rounded-full object-cover"
//             />
//           ) : (
//             <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold">
//               {postUser.name?.charAt(0)?.toUpperCase() || "U"}
//             </div>
//           )}

//           <div>
//             <h3 className="text-white font-semibold">{postUser.name}</h3>

//             <p className="text-gray-400 text-sm">@{postUser.username}</p>
//           </div>
//         </div>

//         <div className="text-right">
//           {/* {postType === "project" && (
//             <span className="bg-violet-600 text-white text-xs px-3 py-1 rounded-full">
//               Project
//             </span>
//           )} */}
//          <div className="relative flex">

//  {isCurrentUser && (
//       <>
//         {/* Three dots */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setShowMenu((prev) => !prev);
//           }}
//           className="text-gray-400 hover:text-white transition"
//         >
//           <EllipsisVertical size={22} />
//         </button>

//         {/* Edit/Delete menu */}
//         {showMenu && (
//           <div className="absolute right-0 mt-2  bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50">
            
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setShowMenu(false);
//                 setShowEditModal(true)
//                 // edit logic
//               }}
//               className="w-full text-left px-4 py-2 text-gray-400 hover:bg-violet-600 hover:text-white rounded-t-lg"
//             >
//               <MdEdit/>
//             </button>

//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setShowMenu(false);
//                 handleDelete();
//               }}
//               className="w-full text-left px-4 py-2 text-gray-400 hover:bg-red-600 hover:text-white rounded-b-lg"
//             >
//               <IoMdTrash/>
//             </button>

//           </div>
//         )}
//       </>
//     )}
//     <Bookmark onClick={handleSave} size={20}  className={isSavedState ? "text-violet-500" : "text-gray-400"}
//     fill={isSavedState ? "currentColor" : "none"}/>
 
// </div>
       

//           <p className="text-xs text-gray-500 mt-2">{createdAt}</p>
//         </div>
//       </div>

//       {/* Content */}

//       {content && <p className="text-gray-300 mt-5 leading-7">{content}</p>}

//       {/* Media */}

//       {media && media.length > 0 && (
//         <div
//           className={`grid gap-3 mt-5 ${
//             media.length === 1 ? "grid-cols-1" : "grid-cols-2"
//           }`}
//         >
//           {media.map((item, index) =>
//             item.mediaType === "image" ? (
//               <img
//                 key={index}
//                 src={item.url}
//                 alt=""
//                 className="rounded-xl w-full object-cover max-h-96"
//               />
//             ) : (
//               <video key={index} controls className="rounded-xl w-full">
//                 <source src={item.url} />
//               </video>
//             ),
//           )}
//         </div>
//       )}

//       {/* Project Links */}

//       {postType === "project" && (
//         <div className="mt-5 space-y-3">
//           {githubLink && (
//             <a
//               href={githubLink}
//               target="_blank"
//               className="flex items-center gap-2 text-violet-400 hover:text-violet-300"
//             >
//               GitHub Repository
//             </a>
//           )}

//           {liveLink && (
//             <a
//               href={liveLink}
//               target="_blank"
//               className="flex items-center gap-2 text-violet-400 hover:text-violet-300"
//             >
//               <Globe size={18} />
//               Live Demo
//             </a>
//           )}

//           {techStack && techStack.length > 0 && (
//             <div className="flex flex-wrap gap-2 mt-3">
//               {techStack.map((tech) => (
//                 <span
//                   key={tech}
//                   className="bg-violet-950 text-violet-300 px-3 py-1 rounded-full text-sm border border-violet-700"
//                 >
//                   {tech}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Footer */}

//       <div className="border-t border-zinc-800 mt-6 pt-4 flex items-center gap-8">
//         <button onClick={handleLike} className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition">
//         <Heart
//     size={20}
//      className={isLikedState ? "text-red-500" : "text-gray-400"}
//   fill={isLikedState ? "currentColor" : "none"}
    
//   />
//           {likesCount}
//         </button>

//         <button  onClick={() => setShowComments((prev) => !prev)} className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition">
//           <MessageCircle size={20} />
//           {commentsCount}
//         </button>
        
//       </div>
      
//       {
//         showEditModal && (
//           <PostEditModal 
//           post={{
//       _id,
//       postType,
//       content,
//       media,
//       githubLink,
//       liveLink,
//       techStack,
//     }}
//     onClose={() => setShowEditModal(false)}
//     onSave={handleEdit}
    
//           />
//         )
//       }
//       {showComments && (
//   <div className="mt-4 border-t border-zinc-800 pt-4">
//     <div className="max-h-80 overflow-y-auto space-y-4">
//   {commentsList.length === 0 ? (
//     <p className="text-gray-400 text-sm">
//       No comments yet.
//     </p>
//   ) : (
//     topLevelComments.map((comment) => (
//       <div key={comment._id} className="flex gap-3">
//         {comment.user?.avatar ? (
//           <img
//             src={comment.user.avatar}
//             alt={comment.user.name}
//             className="w-9 h-9 rounded-full object-cover"
//           />
//         ) : (
//           <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-semibold">
//             {comment.user?.name?.charAt(0)?.toUpperCase() || "U"}
//           </div>
//         )}

//       <div className="flex-1">

//   <div className="flex justify-between items-start">

//     {/* Username + Comment */}
//     <div>
//       <p className="text-white text-sm font-semibold">
//         {comment.user?.username
//           ? `@${comment.user.username}`
//           : comment.user?.name}
//       </p>

//       <p className="text-gray-300 text-sm mt-1">
//         {comment.content}
//       </p>
//      {/* Reply button */}
// <button
//   onClick={() => {
//     setActiveReplyId(
//       activeReplyId === comment._id ? null : comment._id
//     );
//     setReplyContent("");
//   }}
//   className="text-gray-500 hover:text-violet-400 text-xs mt-2"
// >
//   Reply
// </button>

// {/* Reply input */}
// {activeReplyId === comment._id && (
//   <div className="flex gap-2 mt-3">
//     <input
//       type="text"
//       value={replyContent}
//       onChange={(e) => setReplyContent(e.target.value)}
//       placeholder="Write a reply..."
//       className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 text-white text-sm outline-none"
//     />

//     <button
//       onClick={() => handleReplySubmit(comment._id)}
//       className="bg-violet-600 text-white px-4 py-2 rounded-full text-sm"
//     >
//       Reply
//     </button>
//   </div>
// )}
// {/* Display replies */}
// <div className="ml-8 mt-3 space-y-3">
//   {getReplies(comment._id).map((reply) => (
//     <div key={reply._id} className="flex gap-2">
//       {reply.user?.avatar ? (
//         <img
//           src={reply.user.avatar}
//           alt={reply.user.name}
//           className="w-7 h-7 rounded-full object-cover"
//         />
//       ) : (
//         <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs">
//           {reply.user?.name?.charAt(0)?.toUpperCase() || "U"}
//         </div>
//       )}

//       <div className="flex-1">
//         <p className="text-white text-xs font-semibold">
//           {reply.user?.username
//             ? `@${reply.user.username}`
//             : reply.user?.name}
//         </p>

//         <p className="text-gray-300 text-sm mt-1">
//           {reply.content}
//         </p>
//       </div>
//     </div>
//   ))}
// </div>
//     </div>

//     {/* Three dots */}
//     {comment.canDelete && (
//       <div className="relative">

//         <button
//           onClick={(e) => {
//             e.stopPropagation();

//             setCommentsList((prev) =>
//               prev.map((item) =>
//                 item._id === comment._id
//                   ? {
//                       ...item,
//                       showMenu: !item.showMenu,
//                     }
//                   : {
//                       ...item,
//                       showMenu: false,
//                     }
//               )
//             );
//           }}
//           className="text-gray-400 hover:text-white p-1"
//         >
//           <EllipsisVertical size={18} />
//         </button>

//         {/* Delete popup */}
//         {comment.showMenu && (
//           <div className="absolute right-0 top-7 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 overflow-hidden">

//             <button
//               onClick={() => handleDeleteComment(comment._id)}
//               className="px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 w-full text-left"
//             >
//               Delete
//             </button>

//           </div>
//         )}

//       </div>
//     )}

//   </div>

// </div>
//       </div>
//     ))
//   )}
// </div>

//     <div className="flex gap-2 mt-4">
//       <input
//         value={commentContent}
//         onChange={(e) => setCommentContent(e.target.value)}
//         type="text"
//         placeholder="Add a comment..."
//         className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 text-white outline-none"
//       />

//       <button onClick={handleCommentSubmit} className="bg-violet-600 text-white px-4 py-2 rounded-full">
//         Post
//       </button>
//     </div>
//   </div>
// )}
//     </div>
    
//   );
// };

// export default PostCard;

import {
  Heart,
  MessageCircle,
  Globe,
  Bookmark,
  EllipsisVertical,
  Pencil,
  Trash2,

  Send,
  GitBranch,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import {
  deletePost,
  likePost,
  toggleSavePost,
  updatePost,
} from "../../services/postService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import PostEditModal, { type UpdatedPostData } from "./PostEditModal";
import {
  createComment,
  createReply,
  deleteComment,
  getCommentsByPostId,
} from "../../services/commentService";

interface Media {
  url: string;
  mediaType: "image" | "video";
}

interface PostProps {
  isSaved: boolean;
  _id: string;
  user: {
    _id: string;
    name: string;
    username: string;
    avatar: string;
  };
  isLiked: boolean;
  postType: "normal" | "project";
  content?: string;
  media?: Media[];
  likes: number;
  comments: number;
  githubLink?: string;
  liveLink?: string;
  techStack?: string[];
  createdAt: string;
  onDelete: (postId: string) => void;
  onEdit: (updatedPost: UpdatedPostData) => void;
}

/* ---------- small UI helpers (no logic) ---------- */

const Avatar = ({
  src,
  name,
  size = "h-11 w-11",
}: {
  src?: string;
  name?: string;
  size?: string;
}) =>
  src ? (
    <img src={src} alt={name} className={`${size} shrink-0 rounded-full object-cover`} />
  ) : (
    <div
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-semibold text-white`}
    >
      {name?.charAt(0)?.toUpperCase() || "U"}
    </div>
  );

const iconBtn =
  "rounded-full p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400";

const actionBtn =
  "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400";

const PostCard = ({
  isSaved,
  isLiked,
  _id,
  user: postUser,
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
  onEdit,
}: PostProps) => {
  const { user } = useAuth();
  const isCurrentUser = user?._id === postUser._id;

  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [commentsCount, setCommentsCount] = useState(comments);
  const [commentsList, setCommentsList] = useState<any[]>([]);
  const [isSavedState, setIsSavedState] = useState(isSaved);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const result = await getCommentsByPostId(_id);
        setCommentsList(result);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    if (showComments) {
      fetchComments();
    }
  }, [_id, showComments]);

  const handleLike = async () => {
    try {
      const result = await likePost(_id);
      setLikesCount(result.likes.length);
      setIsLikedState(result.message === "Post liked successfully");
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like the post.");
    }
  };

  const handleReplySubmit = async (parentCommentId: string) => {
    if (!replyContent.trim()) return;
    try {
      await createReply(_id, replyContent, parentCommentId);
      const updatedComments = await getCommentsByPostId(_id);
      setCommentsList(updatedComments);
      setReplyContent("");
      setActiveReplyId(null);
    } catch (error) {
      console.error("Error creating reply:", error);
      toast.error("Failed to add reply.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await toggleSavePost(_id);
      setIsSavedState(response.message === "Post saved successfully");
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post");
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) return;
    try {
      await createComment(_id, commentContent);
      const updatedComments = await getCommentsByPostId(_id);
      setCommentsList(updatedComments);
      setCommentsCount(updatedComments.length);
      setCommentContent("");
    } catch (error) {
      console.error("Error submitting the comment:", error);
      toast.error("Failed to submit the comment.");
    }
  };

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
    if (!result.isConfirmed) return;

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

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setCommentsList((prev) =>
        prev.filter(
          (comment) =>
            comment._id !== commentId &&
            comment.parentComment?.toString() !== commentId
        )
      );
      setCommentsCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment.");
    }
  };

  const topLevelComments = commentsList.filter((comment) => !comment.parentComment);

  const getReplies = (commentId: string) =>
    commentsList.filter((item) => {
      const parentId =
        typeof item.parentComment === "string"
          ? item.parentComment
          : item.parentComment?._id?.toString();
      return parentId === commentId;
    });

  const handleEdit = async (updatedPost: UpdatedPostData) => {
    try {
      const formData = new FormData();
      formData.append("content", updatedPost.content);
      formData.append("postType", updatedPost.postType);
      formData.append("githubLink", updatedPost.githubLink || "");
      formData.append("liveLink", updatedPost.liveLink || "");
      formData.append("techStack", JSON.stringify(updatedPost.techStack));
      formData.append("existingMedia", JSON.stringify(updatedPost.existingMedia));
      updatedPost.newMedia.forEach((file: any) => {
        formData.append("media", file);
      });

      const result = await updatePost(_id, formData);
      onEdit(result.post);
      toast.success("Post updated successfully!");
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update the post.");
    }
  };

  /* media grid: 1 = wide, 2 = side by side, 3+ = first one spans the row */
  const mediaCount = media?.length || 0;
  const tileClass = (index: number) =>
    mediaCount === 1
      ? "aspect-video"
      : mediaCount >= 3 && index === 0
      ? "col-span-2 aspect-video"
      : "aspect-square";

  return (
    <article
      onClick={() => setShowMenu(false)}
      className="rounded-2xl border border-zinc-800 bg-[#111] p-5 shadow-lg shadow-black/30 transition-colors hover:border-zinc-700 sm:p-6"
    >
      {/* Header */}
      <header className="flex items-start gap-3">
        <Avatar src={postUser.avatar} name={postUser.name} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2">
            <h3 className="truncate font-semibold text-white">{postUser.name}</h3>
            {postType === "project" && (
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-xs font-medium text-violet-300">
                Project
              </span>
            )}
          </div>
          <div className="flex items-center gap-x-3 text-sm text-zinc-500">
            <span className="truncate">@{postUser.username}</span>
            <time className="shrink-0 text-xs text-zinc-600">{createdAt}</time>
          </div>
        </div>

        <div className="relative flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            aria-label={isSavedState ? "Remove from saved" : "Save post"}
            aria-pressed={isSavedState}
            className={`${iconBtn} ${isSavedState ? "text-violet-400" : ""}`}
          >
            <Bookmark size={19} fill={isSavedState ? "currentColor" : "none"} />
          </button>

          {isCurrentUser && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu((prev) => !prev);
                }}
                aria-label="Post options"
                aria-haspopup="menu"
                aria-expanded={showMenu}
                className={iconBtn}
              >
                <EllipsisVertical size={19} />
              </button>

              {showMenu && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-1 w-36 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 py-1 shadow-xl"
                >
                  <button
                    role="menuitem"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                      setShowEditModal(true);
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                  >
                    <Pencil size={15} /> Edit
                  </button>
                  <button
                    role="menuitem"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                      handleDelete();
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </header>

      {/* Content */}
      {content && (
        <p className="mt-4 whitespace-pre-wrap break-words leading-7 text-zinc-300">
          {content}
        </p>
      )}

      {/* Media */}
      {media && media.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 overflow-hidden rounded-xl">
          {media.map((item, index) => (
            <div
              key={index}
              className={`overflow-hidden bg-black ${
                mediaCount === 1 ? "col-span-2" : ""
              } ${tileClass(index)}`}
            >
              {item.mediaType === "image" ? (
                <img src={item.url} alt="" className="h-full w-full object-cover" />
              ) : (
                <video controls className="h-full w-full object-cover">
                  <source src={item.url} />
                </video>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Project links + stack */}
      {postType === "project" &&
        (githubLink || liveLink || (techStack && techStack.length > 0)) && (
          <div className="mt-4 rounded-xl border border-zinc-800 bg-black/40 p-4">
            {(githubLink || liveLink) && (
              <div className="flex flex-wrap gap-2">
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-zinc-700 px-3.5 py-2 text-sm text-zinc-200 transition hover:border-violet-500 hover:text-white"
                  >
                    <GitBranch size={16} /> Source code
                  </a>
                )}
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-violet-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
                  >
                    <Globe size={16} /> Live demo
                  </a>
                )}
              </div>
            )}

            {techStack && techStack.length > 0 && (
              <div className={`flex flex-wrap gap-1.5 ${githubLink || liveLink ? "mt-3" : ""}`}>
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

      {/* Footer */}
      <div className="mt-5 flex items-center gap-1 border-t border-zinc-800/80 pt-3">
        <button
          onClick={handleLike}
          aria-pressed={isLikedState}
          className={`${actionBtn} ${
            isLikedState ? "text-rose-500" : "hover:text-rose-400"
          }`}
        >
          <Heart size={19} fill={isLikedState ? "currentColor" : "none"} />
          <span className="tabular-nums">{likesCount}</span>
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          aria-expanded={showComments}
          className={`${actionBtn} ${
            showComments ? "text-violet-400" : "hover:text-violet-400"
          }`}
        >
          <MessageCircle size={19} />
          <span className="tabular-nums">{commentsCount}</span>
        </button>
      </div>

      {showEditModal && (
        <PostEditModal
          post={{ _id, postType, content, media, githubLink, liveLink, techStack }}
          onClose={() => setShowEditModal(false)}
          onSave={handleEdit}
        />
      )}

      {/* Comments */}
      {showComments && (
        <div className="mt-3 border-t border-zinc-800/80 pt-4">
          <div className="max-h-96 space-y-4 overflow-y-auto pr-1">
            {commentsList.length === 0 ? (
              <p className="py-4 text-center text-sm text-zinc-500">
                No comments yet. Start the conversation.
              </p>
            ) : (
              topLevelComments.map((comment) => (
                <div key={comment._id} className="flex gap-3">
                  <Avatar
                    src={comment.user?.avatar}
                    name={comment.user?.name}
                    size="h-9 w-9"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-zinc-900 px-4 py-2.5">
                        <p className="text-sm font-semibold text-white">
                          {comment.user?.username
                            ? `@${comment.user.username}`
                            : comment.user?.name}
                        </p>
                        <p className="mt-0.5 break-words text-sm text-zinc-300">
                          {comment.content}
                        </p>
                      </div>

                      {comment.canDelete && (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCommentsList((prev) =>
                                prev.map((item) =>
                                  item._id === comment._id
                                    ? { ...item, showMenu: !item.showMenu }
                                    : { ...item, showMenu: false }
                                )
                              );
                            }}
                            aria-label="Comment options"
                            className={iconBtn}
                          >
                            <EllipsisVertical size={16} />
                          </button>

                          {comment.showMenu && (
                            <div className="absolute right-0 top-full z-50 mt-1 w-28 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl">
                              <button
                                onClick={() => handleDeleteComment(comment._id)}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setActiveReplyId(activeReplyId === comment._id ? null : comment._id);
                        setReplyContent("");
                      }}
                      className="ml-3 mt-1 text-xs font-medium text-zinc-500 hover:text-violet-400"
                    >
                      Reply
                    </button>

                    {activeReplyId === comment._id && (
                      <div className="mt-2 flex gap-2">
                        <input
                          type="text"
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleReplySubmit(comment._id)
                          }
                          placeholder="Write a reply"
                          autoFocus
                          className="flex-1 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white outline-none focus:border-violet-500"
                        />
                        <button
                          onClick={() => handleReplySubmit(comment._id)}
                          disabled={!replyContent.trim()}
                          className="rounded-full bg-violet-600 px-4 py-2 text-sm text-white transition hover:bg-violet-500 disabled:opacity-40"
                        >
                          Reply
                        </button>
                      </div>
                    )}

                    {getReplies(comment._id).length > 0 && (
                      <div className="mt-3 space-y-3 border-l border-zinc-800 pl-4">
                        {getReplies(comment._id).map((reply) => (
                          <div key={reply._id} className="flex gap-2.5">
                            <Avatar
                              src={reply.user?.avatar}
                              name={reply.user?.name}
                              size="h-7 w-7"
                            />
                            <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-zinc-900 px-3.5 py-2">
                              <p className="text-xs font-semibold text-white">
                                {reply.user?.username
                                  ? `@${reply.user.username}`
                                  : reply.user?.name}
                              </p>
                              <p className="mt-0.5 break-words text-sm text-zinc-300">
                                {reply.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
              type="text"
              placeholder="Add a comment"
              className="flex-1 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
            />
            <button
              onClick={handleCommentSubmit}
              disabled={!commentContent.trim()}
              aria-label="Post comment"
              className="rounded-full bg-violet-600 p-2.5 text-white transition hover:bg-violet-500 disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default PostCard;