import { useState } from "react";
import { createPost } from "../../services/postService";
import { toast } from "react-toastify";
interface Props {
  onClose: () => void;
}
const CreatePost = ({onClose}:Props) => {
  const[publishing, setPublishing] = useState(false);
  const [postType, setPostType] = useState<"normal" | "project">("normal");
  const [tech, setTech] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
 const [content, setContent] = useState("");
const [media, setMedia] = useState<File[]>([]);
const [githubLink, setGithubLink] = useState("");
const [liveLink, setLiveLink] = useState("");
  const addTech = () => {
    if (!tech.trim()) return;

    setTechStack([...techStack, tech]);
    setTech("");
  };


const handlePublish = async () => {
  try {
    setPublishing(true);
    const formData = new FormData();

    formData.append("content", content);
    formData.append("postType", postType);

    if (postType === "project") {
      formData.append("githubLink", githubLink);
      formData.append("liveLink", liveLink);

      techStack.forEach((tech) => {
        formData.append("techStack", tech);
      });
    }

    media.forEach((file) => {
      formData.append("media", file);
    });

    const response = await createPost(formData);
    toast.success("Post created successfully!");
    console.log(response);

    onClose();

  } catch (error) {
    toast.error("Failed to create post. Please try again.");
    console.error("Error creating post:", error);
  } finally {
    setPublishing(false);
  }
};
  return (
 <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-auto bg-[#111111] border border-zinc-800 rounded-2xl p-8 shadow-lg custom-scrollbar">
    

      <h1 className="text-3xl font-bold text-white mb-2">
        Create Post
      </h1>

      <p className="text-gray-400 mb-8">
        Share your thoughts or showcase your latest project.
      </p>

      {/* Post Type */}

      <div className="flex gap-4 mb-6">

        <button
          onClick={() => setPostType("normal")}
          className={`px-5 py-2 rounded-lg transition ${
            postType === "normal"
              ? "bg-violet-600 text-white"
              : "bg-zinc-900 text-gray-400"
          }`}
        >
          Normal
        </button>

        <button
          onClick={() => setPostType("project")}
          className={`px-5 py-2 rounded-lg transition ${
            postType === "project"
              ? "bg-violet-600 text-white"
              : "bg-zinc-900 text-gray-400"
          }`}
        >
          Project
        </button>

      </div>

      {/* Content */}

      <textarea
       value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={6}
        className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white outline-none focus:border-violet-500 resize-none"
      />

      {/* Upload */}

      <div className="mt-6">

        <label className="block text-gray-300 mb-2">
          Upload Images / Videos
        </label>

        <input
          type="file"
          multiple
            accept="image/*,video/*"
  onChange={(e) => {
    if (e.target.files) {
      setMedia(Array.from(e.target.files));
    }
  }}

          className="w-full border border-dashed border-violet-600 rounded-xl p-8 text-gray-400"
        />

      </div>

      {/* Project Fields */}

      {postType === "project" && (
        <div className="space-y-5 mt-6">

          <input
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
            type="text"
            placeholder="Github Repository Link"
            className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-white outline-none focus:border-violet-500"
          />

          <input
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
            type="text"
            placeholder="Live Demo Link"
            className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-white outline-none focus:border-violet-500"
          />

          <div>

            <label className="text-gray-300">
              Tech Stack
            </label>

            <div className="flex mt-2 gap-2">

              <input
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                placeholder="React"
                className="flex-1 bg-black border border-zinc-700 rounded-lg p-3 text-white outline-none focus:border-violet-500"
              />

              <button
                onClick={addTech}
                className="bg-violet-600 hover:bg-violet-500 px-5 rounded-lg text-white"
              >
                Add
              </button>

            </div>

            <div className="flex flex-wrap gap-2 mt-4">

              {techStack.map((item) => (

                <span
                  key={item}
                  className="bg-violet-900 text-violet-300 px-3 py-1 rounded-full text-sm"
                >
                  {item}
                </span>

              ))}

            </div>

          </div>

        </div>
      )}

      {/* Buttons */}

      <div className="flex justify-end gap-4 mt-8">

        <button onClick={onClose}className="px-6 py-3 border border-zinc-700 rounded-lg text-gray-300 hover:border-violet-500">
          Cancel
        </button>

        <button onClick={handlePublish} disabled={publishing} className="px-8 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-500 text-white font-semibold hover:opacity-90">
          {publishing ? "Publishing..." : "Publish Post"}
        </button>

      </div>

    </div>
  );
};

export default CreatePost;