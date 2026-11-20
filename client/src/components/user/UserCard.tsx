
interface User {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  skills?: string[];
  followers?: string[];
  following?: string[];
  githubLink?: string;
}

interface UserCardProps {
  developer: User;
}

const UserCard = ({ developer }: UserCardProps) => {
  return (
    <div className="bg-[#181818] border border-zinc-800 rounded-2xl p-5 hover:border-violet-500/50 transition-all">

      {/* Profile */}
      <div className="flex items-center gap-3">
        {developer.avatar ? (
          <img
            src={developer.avatar}
            alt={developer.name}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center text-white text-xl font-semibold">
            {developer.name?.charAt(0)?.toUpperCase()}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="text-white font-semibold truncate">
            {developer.name}
          </h3>
          <p className="text-gray-400 text-sm">
            @{developer.username}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-400 text-sm mt-4 line-clamp-2">
        {developer.bio || "No bio available."}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {developer.skills?.length ? (
          developer.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-xs">
            No skills added
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-800">

        <div className="flex gap-4 text-xs text-gray-400">
          <span>{developer.followers?.length || 0} Followers</span>
          <span>{developer.following?.length || 0} Following</span>
        </div>

        {developer.githubLink && (
          <a
            href={developer.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 text-sm hover:text-violet-300"
          >
            GitHub ↗
          </a>
        )}

      </div>
    </div>
  );
};

export default UserCard;
