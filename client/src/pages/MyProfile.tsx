import { useEffect, useState } from "react";

import {

  MapPin,
  Users,
  UserRound,
  Loader2,
} from "lucide-react";
import { getMyProfile } from "../services/userService";
import { TbSourceCode } from "react-icons/tb";

interface UserProfile {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  skills?: string[];
  githubLink?: string;
  followers?: any[];
  following?: any[];
}

const MyProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await getMyProfile();
      setUser(response.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin text-violet-500" size={30} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-400 py-20">
        Unable to load profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white p-5 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Profile Header */}
        <div className="bg-[#181818] border border-zinc-800 rounded-2xl overflow-hidden">

          <div className="h-40 bg-gradient-to-r from-violet-900/60 via-purple-800/40 to-[#181818]" />

          <div className="px-6 pb-6">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

              <div className="-mt-14">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-28 h-28 rounded-full border-4 border-[#181818] object-cover"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full border-4 border-[#181818] bg-violet-600 flex items-center justify-center text-4xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <button
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 transition text-sm font-medium"
              >
                Edit Profile
              </button>

            </div>

            {/* User Information */}
            <div className="mt-4">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-400 mt-1">@{user.username}</p>

              <p className="text-gray-300 mt-4 max-w-2xl">
                {user.bio || "Add a bio to tell other developers about yourself."}
              </p>
            </div>

            {/* Followers / Following */}
            <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-gray-400">

              <div className="flex items-center gap-2">
                <Users size={17} className="text-violet-400" />
                <span>
                  <strong className="text-white">
                    {user.followers?.length || 0}
                  </strong>{" "}
                  Followers
                </span>
              </div>

              <div className="flex items-center gap-2">
                <UserRound size={17} className="text-violet-400" />
                <span>
                  <strong className="text-white">
                    {user.following?.length || 0}
                  </strong>{" "}
                  Following
                </span>
              </div>

              {user.githubLink && (
                <a
                  href={user.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-violet-400 hover:text-violet-300"
                >
                  <TbSourceCode size={17} />
                  GitHub
                </a>
              )}

            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6 bg-[#181818] border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Technical Skills</h2>

          {user.skills?.length ? (
            <div className="flex flex-wrap gap-3">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No skills added yet.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default MyProfile;