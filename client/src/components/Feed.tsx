
// import { useCallback, useEffect, useMemo, useState } from "react";
// import CreatePost from "./post/CreatePost";
// import CreatePostCard from "./post/CreatePostCard";
// import PostCard from "./post/PostCard";
// import { getAllPosts } from "../services/postService";
// import { useAuth } from "../auth/AuthContext";

// /* ---------- helpers ---------- */

// const formatDate = (date: string) => {
//   const diff = Date.now() - new Date(date).getTime();
//   const minutes = Math.floor(diff / 60000);
//   const hours = Math.floor(diff / 3600000);
//   const days = Math.floor(diff / 86400000);

//   if (minutes < 1) return "Just now";
//   if (minutes < 60) return `${minutes}m ago`;
//   if (hours < 24) return `${hours}h ago`;
//   if (days < 7) return `${days}d ago`;

//   return new Date(date).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// };

// type Filter = "all" | "normal" | "project";

// const FILTERS: { key: Filter; label: string }[] = [
//   { key: "all", label: "All" },
//   { key: "normal", label: "Posts" },
//   { key: "project", label: "Projects" },
// ];

// /* ---------- small UI pieces ---------- */

// const PostSkeleton = () => (
//   <div className="rounded-2xl border border-white/10 bg-[#111] p-5">
//     <div className="flex items-center gap-3">
//       <div className="h-11 w-11 animate-pulse rounded-full bg-white/10" />
//       <div className="space-y-2">
//         <div className="h-3 w-32 animate-pulse rounded bg-white/10" />
//         <div className="h-2.5 w-20 animate-pulse rounded bg-white/5" />
//       </div>
//     </div>
//     <div className="mt-5 space-y-2.5">
//       <div className="h-3 w-full animate-pulse rounded bg-white/10" />
//       <div className="h-3 w-4/5 animate-pulse rounded bg-white/10" />
//     </div>
//     <div className="mt-5 h-52 animate-pulse rounded-xl bg-white/5" />
//     <div className="mt-5 flex gap-3">
//       <div className="h-8 w-16 animate-pulse rounded-full bg-white/10" />
//       <div className="h-8 w-16 animate-pulse rounded-full bg-white/10" />
//     </div>
//   </div>
// );

// const Notice = ({
//   title,
//   text,
//   action,
//   onAction,
// }: {
//   title: string;
//   text: string;
//   action: string;
//   onAction: () => void;
// }) => (
//   <div className="rounded-2xl border border-dashed border-white/15 px-6 py-14 text-center">
//     <h3 className="text-base font-semibold text-white">{title}</h3>
//     <p className="mx-auto mt-1.5 max-w-xs text-sm text-slate-400">{text}</p>
//     <button
//       onClick={onAction}
//       className="mt-5 rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
//     >
//       {action}
//     </button>
//   </div>
// );

// /* ---------- feed ---------- */

// const Feed = () => {
//   const auth = useAuth();
//   const userId = auth?.user?._id;

//   const [posts, setPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [filter, setFilter] = useState<Filter>("all");
//   const [showCreatePost, setShowCreatePost] = useState(false);

//   const fetchPosts = useCallback(
//     async (silent = false) => {
//       if (!userId) return;
//       if (!silent) setLoading(true);
//       setError(false);
//       try {
//         const response = await getAllPosts();
//         setPosts(response);
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [userId]
//   );

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   // modal: close on Escape + lock page scroll
//   useEffect(() => {
//     if (!showCreatePost) return;
//     const onKey = (e: KeyboardEvent) =>
//       e.key === "Escape" && setShowCreatePost(false);
//     document.addEventListener("keydown", onKey);
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.body.style.overflow = "";
//     };
//   }, [showCreatePost]);

//   const handlePostEdit = (updated: any) =>
//     setPosts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));

//   const handlePostDelete = (postId: string) =>
//     setPosts((prev) => prev.filter((p) => p._id !== postId));

//   const closeCreate = () => {
//     setShowCreatePost(false);
//     fetchPosts(true); // quietly refresh so a new post shows up
//   };

//   const counts = useMemo(
//     () => ({
//       all: posts.length,
//       normal: posts.filter((p) => p.postType !== "project").length,
//       project: posts.filter((p) => p.postType === "project").length,
//     }),
//     [posts]
//   );

//   const visible = useMemo(
//     () =>
//       filter === "all"
//         ? posts
//         : posts.filter((p) =>
//             filter === "project"
//               ? p.postType === "project"
//               : p.postType !== "project"
//           ),
//     [posts, filter]
//   );

//   return (
//     <div className="mx-auto w-full max-w-2xl space-y-5">
//       <CreatePostCard onClick={() => setShowCreatePost(true)} />

//       {/* filter bar (scrolls with the page) */}
//       <div>
//         <div
//           role="tablist"
//           aria-label="Filter feed"
//           className="grid grid-cols-3 rounded-full border border-white/10 bg-[#111] p-1"
//         >
//           {FILTERS.map(({ key, label }) => {
//             const active = filter === key;
//             return (
//               <button
//                 key={key}
//                 role="tab"
//                 aria-selected={active}
//                 onClick={() => setFilter(key)}
//                 className={`flex items-center justify-center gap-2 rounded-full py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
//                   active
//                     ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
//                     : "text-slate-400 hover:text-white"
//                 }`}
//               >
//                 {label}
//                 <span
//                   className={`rounded-full px-1.5 text-xs tabular-nums ${
//                     active ? "bg-white/20" : "bg-white/10"
//                   }`}
//                 >
//                   {counts[key]}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* content */}
//       {loading ? (
//         <div className="space-y-5" aria-busy="true">
//           <PostSkeleton />
//           <PostSkeleton />
//         </div>
//       ) : error ? (
//         <Notice
//           title="Couldn't load the feed"
//           text="Check your connection and try again."
//           action="Retry"
//           onAction={() => fetchPosts()}
//         />
//       ) : visible.length === 0 ? (
//         <Notice
//           title={
//             filter === "project" ? "No projects yet" : "Nothing here yet"
//           }
//           text={
//             filter === "project"
//               ? "Share something you've built and it will show up here."
//               : "Be the first to post and get the conversation going."
//           }
//           action="Create a post"
//           onAction={() => setShowCreatePost(true)}
//         />
//       ) : (
//         <div className="space-y-5">
//           {visible.map((post) => (
//             <PostCard
//               key={post._id}
//                 isSaved={post.isSaved}
//                 _id={post._id}
//                 user={post.user}
//                 postType={post.postType}
//                 content={post.content}
//                 media={post.media}
//                 likes={post.likes?.length || 0}
//                 comments={post.comments?.length || 0}
//                 githubLink={post.githubLink}
//                 liveLink={post.liveLink}
//                 techStack={post.techStack}
//                 createdAt={formatDate(post.createdAt)}
//                 onDelete={handlePostDelete}
//                 onEdit={handlePostEdit}
//                 isLiked={post.isLiked}
//               />
//           ))}
//         </div>
//       )}

//       {/* create-post modal */}
//       {showCreatePost && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
//           onMouseDown={(e) => e.target === e.currentTarget && setShowCreatePost(false)}
//           role="dialog"
//           aria-modal="true"
//           aria-label="Create post"
//         >
//           <CreatePost onClose={closeCreate} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Feed;
import { useCallback, useEffect, useMemo, useState } from "react";
import CreatePost from "./post/CreatePost";
import CreatePostCard from "./post/CreatePostCard";
import PostCard from "./post/PostCard";
import { getAllPosts } from "../services/postService";
import { useAuth } from "../auth/AuthContext";

/* ---------- helpers ---------- */

const formatDate = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

type Filter = "all" | "normal" | "project";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "normal", label: "Posts" },
  { key: "project", label: "Projects" },
];

/* ---------- small UI pieces ---------- */

const PostSkeleton = () => (
  <div className="rounded-2xl border border-white/10 bg-[#111] p-5">
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 animate-pulse rounded-full bg-white/10" />
      <div className="space-y-2">
        <div className="h-3 w-32 animate-pulse rounded bg-white/10" />
        <div className="h-2.5 w-20 animate-pulse rounded bg-white/5" />
      </div>
    </div>
    <div className="mt-5 space-y-2.5">
      <div className="h-3 w-full animate-pulse rounded bg-white/10" />
      <div className="h-3 w-4/5 animate-pulse rounded bg-white/10" />
    </div>
    <div className="mt-5 h-52 animate-pulse rounded-xl bg-white/5" />
    <div className="mt-5 flex gap-3">
      <div className="h-8 w-16 animate-pulse rounded-full bg-white/10" />
      <div className="h-8 w-16 animate-pulse rounded-full bg-white/10" />
    </div>
  </div>
);

const Notice = ({
  title,
  text,
  action,
  onAction,
}: {
  title: string;
  text: string;
  action: string;
  onAction: () => void;
}) => (
  <div className="rounded-2xl border border-dashed border-white/15 px-6 py-14 text-center">
    <h3 className="text-base font-semibold text-white">{title}</h3>
    <p className="mx-auto mt-1.5 max-w-xs text-sm text-slate-400">{text}</p>
    <button
      onClick={onAction}
      className="mt-5 rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
    >
      {action}
    </button>
  </div>
);

/* ---------- feed ---------- */

const Feed = () => {
  const auth = useAuth();
  const userId = auth?.user?._id;

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [showCreatePost, setShowCreatePost] = useState(false);

  const fetchPosts = useCallback(
    async (silent = false) => {
      if (!userId) return;
      if (!silent) setLoading(true);
      setError(false);
      try {
        const response = await getAllPosts();
        setPosts(response);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // modal: close on Escape + lock page scroll
  useEffect(() => {
    if (!showCreatePost) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setShowCreatePost(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showCreatePost]);

  const handlePostEdit = (updated: any) =>
    setPosts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));

  const handlePostDelete = (postId: string) =>
    setPosts((prev) => prev.filter((p) => p._id !== postId));

  const closeCreate = () => {
    setShowCreatePost(false);
    fetchPosts(true); // quietly refresh so a new post shows up
  };

  const counts = useMemo(
    () => ({
      all: posts.length,
      normal: posts.filter((p) => p.postType !== "project").length,
      project: posts.filter((p) => p.postType === "project").length,
    }),
    [posts]
  );

  const topTech = useMemo(() => {
    const tally: Record<string, number> = {};
    posts.forEach((p) =>
      (p.techStack || []).forEach((t: string) => {
        tally[t] = (tally[t] || 0) + 1;
      })
    );
    return Object.entries(tally)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [posts]);

  const visible = useMemo(
    () =>
      filter === "all"
        ? posts
        : posts.filter((p) =>
            filter === "project"
              ? p.postType === "project"
              : p.postType !== "project"
          ),
    [posts, filter]
  );

  return (
    <div className="mx-auto flex w-full max-w-3xl items-start gap-6 xl:max-w-5xl">
      <div className="min-w-0 flex-1 space-y-5">
      <CreatePostCard onClick={() => setShowCreatePost(true)} />

      {/* filter bar (scrolls with the page) */}
      <div>
        <div
          role="tablist"
          aria-label="Filter feed"
          className="grid grid-cols-3 rounded-full border border-white/10 bg-[#111] p-1"
        >
          {FILTERS.map(({ key, label }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(key)}
                className={`flex items-center justify-center gap-2 rounded-full py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
                  active
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {label}
                <span
                  className={`rounded-full px-1.5 text-xs tabular-nums ${
                    active ? "bg-white/20" : "bg-white/10"
                  }`}
                >
                  {counts[key]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* content */}
      {loading ? (
        <div className="space-y-5" aria-busy="true">
          <PostSkeleton />
          <PostSkeleton />
        </div>
      ) : error ? (
        <Notice
          title="Couldn't load the feed"
          text="Check your connection and try again."
          action="Retry"
          onAction={() => fetchPosts()}
        />
      ) : visible.length === 0 ? (
        <Notice
          title={
            filter === "project" ? "No projects yet" : "Nothing here yet"
          }
          text={
            filter === "project"
              ? "Share something you've built and it will show up here."
              : "Be the first to post and get the conversation going."
          }
          action="Create a post"
          onAction={() => setShowCreatePost(true)}
        />
      ) : (
        <div className="space-y-5">
          {visible.map((post) => (
            <PostCard
              key={post._id}
                isSaved={post.isSaved}
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
                onDelete={handlePostDelete}
                onEdit={handlePostEdit}
                isLiked={post.isLiked}
              />
          ))}
        </div>
      )}

      {/* create-post modal */}
      {showCreatePost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onMouseDown={(e) => e.target === e.currentTarget && setShowCreatePost(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Create post"
        >
          <CreatePost onClose={closeCreate} />
        </div>
      )}
      </div>

      {/* right rail (wide screens only) */}
      <aside className="sticky top-0 hidden w-80 shrink-0 space-y-4 xl:block">
        <div className="rounded-2xl border border-zinc-800 bg-[#111] p-5">
          <h3 className="font-semibold text-white">Share what you're building</h3>
          <p className="mt-1.5 text-sm leading-6 text-zinc-400">
            Post a project with its repo, live demo and tech stack so other developers can find it.
          </p>
          <button
            onClick={() => setShowCreatePost(true)}
            className="mt-4 w-full rounded-xl bg-violet-600 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
          >
            Create a post
          </button>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-[#111] p-5">
          <h3 className="font-semibold text-white">In your feed</h3>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-black/40 p-3">
              <dd className="text-2xl font-semibold tabular-nums text-white">{counts.normal}</dd>
              <dt className="text-xs text-zinc-500">Posts</dt>
            </div>
            <div className="rounded-xl bg-black/40 p-3">
              <dd className="text-2xl font-semibold tabular-nums text-white">{counts.project}</dd>
              <dt className="text-xs text-zinc-500">Projects</dt>
            </div>
          </dl>
        </div>

        {topTech.length > 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-[#111] p-5">
            <h3 className="font-semibold text-white">Popular tech</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {topTech.map(([tech, n]) => (
                <span
                  key={tech}
                  className="flex items-center gap-1.5 rounded-lg bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-300"
                >
                  {tech}
                  <span className="tabular-nums text-zinc-500">{n}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Feed;