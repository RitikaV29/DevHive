
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";
import UserCard from "../components/user/UserCard";
import { ChevronDown } from "lucide-react";


const FindDevelopers = () => {
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [developers, setDevelopers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true);

        const response = await getAllUsers(
          searchTerm,
          selectedTech
        );
      

        setDevelopers(response.users|| []);
      } catch (error) {
        console.error("Error fetching developers:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchDevelopers, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedTech]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Find Developers
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Discover developers, explore their skills and connect with them.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">

        <input
          type="text"
          placeholder="Search by name or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-[#181818] border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500"
        />

        
<div className="relative w-full sm:w-56">
  <button
    type="button"
    onClick={() => setIsTechOpen(!isTechOpen)}
    className="w-full flex items-center justify-between bg-[#181818] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-200 hover:border-violet-500 transition"
  >
    {selectedTech || "All Skills"}
    <span className="text-violet-400"><ChevronDown size={16} /></span>
  </button>

  {isTechOpen && (
    <div className="absolute top-full left-0 mt-2 w-full bg-[#1c1c1c] border border-zinc-800 rounded-xl p-1.5 shadow-xl shadow-black/40 z-50">
      {[
        "",
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "TypeScript",
        "JavaScript",
        "Python",
      ].map((tech) => (
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
          {tech || "All Skills"}
          {selectedTech === tech && <span>✓</span>}
        </button>
      ))}
    </div>
  )}
</div>

      </div>

      {/* Developers Count */}
      <p className="text-sm text-gray-400">
        {developers.length} developers found
      </p>

      {/* Developers List */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">
          Loading developers...
        </div>
      ) : developers.length === 0 ? (
        <div className="text-center py-16 bg-[#181818] border border-zinc-800 rounded-xl">
          <h3 className="text-white font-semibold">
            No developers found
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            Try searching with a different name or skill.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {developers.map((developer) => (
    <UserCard
      key={developer._id}
      developer={developer}
    />
  ))}
        
        </div>
      )}

    </div>
  );
};

export default FindDevelopers;
