import { useState } from "react";
import { X, Plus, Trash2, Upload } from "lucide-react";

interface Media {
  url: string;
  mediaType: "image" | "video";
}

interface PostData {
  _id: string;
  postType: "normal" | "project";
  content?: string;
  media?: Media[];
  githubLink?: string;
  liveLink?: string;
  techStack?: string[];
}

export interface UpdatedPostData {
  postType: "normal" | "project";
  content: string;
  githubLink?: string;
  liveLink?: string;
  techStack: string[];
  existingMedia: Media[];
  newMedia: File[];
}

interface PostEditModalProps {
  post: PostData;
  onClose: () => void;
  onSave: (updatedPost: UpdatedPostData) => void;
}

const PostEditModal = ({
  post,
  onClose,
  onSave,
}: PostEditModalProps) => {
  // -----------------------------
  // POST TYPE
  // -----------------------------

  const [postType, setPostType] = useState<"normal" | "project">(
    post.postType
  );

  // -----------------------------
  // CONTENT
  // -----------------------------

  const [content, setContent] = useState(post.content || "");

  // -----------------------------
  // PROJECT FIELDS
  // -----------------------------

  const [githubLink, setGithubLink] = useState(
    post.githubLink || ""
  );

  const [liveLink, setLiveLink] = useState(
    post.liveLink || ""
  );

  const [techStack, setTechStack] = useState<string[]>(
    post.techStack || []
  );

  const [techInput, setTechInput] = useState("");

  // -----------------------------
  // EXISTING MEDIA
  // -----------------------------

  const [existingMedia, setExistingMedia] = useState<Media[]>(
    post.media || []
  );

  // -----------------------------
  // NEW MEDIA
  // -----------------------------

  const [newMedia, setNewMedia] = useState<File[]>([]);

  // -----------------------------
  // ADD TECH
  // -----------------------------

  const handleAddTech = () => {
    const trimmedTech = techInput.trim();

    if (!trimmedTech) return;

    // Prevent duplicate technology
    if (
      techStack.some(
        (tech) => tech.toLowerCase() === trimmedTech.toLowerCase()
      )
    ) {
      setTechInput("");
      return;
    }

    setTechStack((prev) => [...prev, trimmedTech]);

    setTechInput("");
  };

  // -----------------------------
  // REMOVE TECH
  // -----------------------------

  const handleRemoveTech = (techToRemove: string) => {
    setTechStack((prev) =>
      prev.filter((tech) => tech !== techToRemove)
    );
  };

  // -----------------------------
  // REMOVE EXISTING MEDIA
  // -----------------------------

  const handleRemoveExistingMedia = (indexToRemove: number) => {
    setExistingMedia((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // -----------------------------
  // ADD NEW MEDIA
  // -----------------------------

  const handleMediaChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    setNewMedia((prev) => [...prev, ...selectedFiles]);

    // Allows selecting same file again
    e.target.value = "";
  };

  // -----------------------------
  // REMOVE NEW MEDIA
  // -----------------------------

  const handleRemoveNewMedia = (indexToRemove: number) => {
    setNewMedia((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // -----------------------------
  // SUBMIT
  // -----------------------------

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      postType,
      content,
      githubLink:
        postType === "project" ? githubLink : "",
      liveLink:
        postType === "project" ? liveLink : "",
      techStack:
        postType === "project" ? techStack : [],
      existingMedia,
      newMedia,
    });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111111] border border-zinc-800 rounded-2xl shadow-2xl"
      >

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="sticky top-0 z-10 bg-[#111111] flex items-center justify-between px-6 py-5 border-b border-zinc-800">

          <div>
            <h2 className="text-2xl font-semibold text-white">
              Edit Post
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update your post details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

        <form onSubmit={handleSubmit}>

          <div className="p-6 space-y-6">

            {/* ================================= */}
            {/* POST TYPE */}
            {/* ================================= */}

            <div>
              <label className="block text-sm text-gray-400 mb-3">
                Post Type
              </label>

              <div className="flex gap-3">

                {/* NORMAL */}

                <button
                  type="button"
                  onClick={() => setPostType("normal")}
                  className={`px-6 py-3 rounded-lg transition font-medium ${
                    postType === "normal"
                      ? "bg-violet-600 text-white"
                      : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
                  }`}
                >
                  Normal
                </button>

                {/* PROJECT */}

                <button
                  type="button"
                  onClick={() => setPostType("project")}
                  className={`px-6 py-3 rounded-lg transition font-medium ${
                    postType === "project"
                      ? "bg-violet-600 text-white"
                      : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
                  }`}
                >
                  Project
                </button>

              </div>
            </div>

            {/* ================================= */}
            {/* CONTENT */}
            {/* ================================= */}

            <div>
              <label className="block text-sm text-gray-400 mb-3">
                Content
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                rows={6}
                className="w-full resize-none rounded-xl bg-black border border-zinc-700 p-4 text-gray-200 placeholder:text-gray-600 outline-none focus:border-violet-600 transition"
              />
            </div>

            {/* ================================= */}
            {/* EXISTING MEDIA */}
            {/* ================================= */}

            {existingMedia.length > 0 && (
              <div>

                <label className="block text-sm text-gray-400 mb-3">
                  Current Media
                </label>

                <div className="grid grid-cols-2 gap-4">

                  {existingMedia.map((item, index) => (
                    <div
                      key={`${item.url}-${index}`}
                      className="relative group rounded-xl overflow-hidden border border-zinc-800 bg-black"
                    >

                      {item.mediaType === "image" ? (
                        <img
                          src={item.url}
                          alt="Post media"
                          className="w-full h-40 object-cover"
                        />
                      ) : (
                        <video
                          src={item.url}
                          controls
                          className="w-full h-40 object-cover"
                        />
                      )}

                      {/* DELETE EXISTING MEDIA */}

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveExistingMedia(index)
                        }
                        className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  ))}

                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Click the trash icon to remove existing media.
                </p>

              </div>
            )}

            {/* ================================= */}
            {/* ADD NEW MEDIA */}
            {/* ================================= */}

            <div>

              <label className="block text-sm text-gray-400 mb-3">
                Add Images / Videos
              </label>

              <label className="flex flex-col items-center justify-center gap-2 w-full min-h-28 border border-dashed border-violet-600 rounded-xl bg-zinc-950 hover:bg-zinc-900 cursor-pointer transition">

                <Upload
                  size={24}
                  className="text-violet-400"
                />

                <span className="text-gray-400">
                  Choose Images or Videos
                </span>

                <span className="text-xs text-gray-600">
                  You can select multiple files
                </span>

                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                  className="hidden"
                />

              </label>

              {/* NEW FILE LIST */}

              {newMedia.length > 0 && (
                <div className="mt-4 space-y-2">

                  {newMedia.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3"
                    >

                      <div className="flex items-center gap-3 min-w-0">

                        <div className="w-8 h-8 rounded-md bg-violet-950 flex items-center justify-center">
                          <Upload
                            size={16}
                            className="text-violet-400"
                          />
                        </div>

                        <div className="min-w-0">

                          <p className="text-sm text-gray-300 truncate">
                            {file.name}
                          </p>

                          <p className="text-xs text-gray-600">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>

                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveNewMedia(index)
                        }
                        className="text-gray-500 hover:text-red-500 transition ml-3"
                      >
                        <X size={18} />
                      </button>

                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* ================================= */}
            {/* PROJECT DETAILS */}
            {/* ================================= */}

            {postType === "project" && (
              <div className="border-t border-zinc-800 pt-6 space-y-5">

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Project Details
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Add links and technologies used in your project.
                  </p>
                </div>

                {/* GITHUB */}

                <div>

                  <label className="block text-sm text-gray-400 mb-2">
                    GitHub Repository
                  </label>

                  <input
                    type="url"
                    value={githubLink}
                    onChange={(e) =>
                      setGithubLink(e.target.value)
                    }
                    placeholder="https://github.com/username/project"
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-violet-600 transition"
                  />

                </div>

                {/* LIVE LINK */}

                <div>

                  <label className="block text-sm text-gray-400 mb-2">
                    Live Demo
                  </label>

                  <input
                    type="url"
                    value={liveLink}
                    onChange={(e) =>
                      setLiveLink(e.target.value)
                    }
                    placeholder="https://your-project.com"
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-violet-600 transition"
                  />

                </div>

                {/* TECH STACK */}

                <div>

                  <label className="block text-sm text-gray-400 mb-2">
                    Tech Stack
                  </label>

                  {/* EXISTING TECH */}

                  {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">

                      {techStack.map((tech) => (
                        <span
                          key={tech}
                          className="flex items-center gap-2 bg-violet-950 text-violet-300 px-3 py-1.5 rounded-full text-sm border border-violet-800"
                        >
                          {tech}

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveTech(tech)
                            }
                            className="hover:text-red-400 transition"
                          >
                            <X size={14} />
                          </button>

                        </span>
                      ))}

                    </div>
                  )}

                  {/* ADD TECH */}

                  <div className="flex gap-2">

                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) =>
                        setTechInput(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTech();
                        }
                      }}
                      placeholder="e.g. React"
                      className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-violet-600 transition"
                    />

                    <button
                      type="button"
                      onClick={handleAddTech}
                      className="flex items-center gap-2 px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition"
                    >
                      <Plus size={18} />
                      Add
                    </button>

                  </div>

                </div>

              </div>
            )}

          </div>

          {/* ================================= */}
          {/* FOOTER */}
          {/* ================================= */}

          <div className="sticky bottom-0 bg-[#111111] flex justify-end gap-3 px-6 py-4 border-t border-zinc-800">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-zinc-700 text-gray-300 hover:bg-zinc-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default PostEditModal;