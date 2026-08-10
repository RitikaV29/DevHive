const developers = [
  {
    id: 1,
    name: "Aman Sharma",
    username: "@amansharma",
    role: "Full Stack Developer",
    skills: ["React", "Node.js"]
  },
  {
    id: 2,
    name: "Priya Singh",
    username: "@priyasingh",
    role: "AI Developer",
    skills: ["Python", "GenAI"]
  },
  {
    id: 3,
    name: "Rahul Verma",
    username: "@rahulverma",
    role: "Frontend Developer",
    skills: ["React", "Tailwind"]
  }
];


const RightSidebar = () => {
  return (
    <aside className="hidden lg:block w-80 p-4">

      <div className="bg-base-200 rounded-xl p-5 sticky top-4">

        <h2 className="text-lg font-semibold mb-4">
          Developers To Follow
        </h2>

        <div className="space-y-4">

          {developers.map((developer) => (
            <div
              key={developer.id}
              className="flex items-center justify-between gap-3"
            >

              {/* Profile */}
              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  {developer.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-medium text-sm">
                    {developer.name}
                  </h3>

                  <p className="text-xs opacity-60">
                    {developer.role}
                  </p>

                  <div className="flex gap-1 mt-1">
                    {developer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs badge badge-outline"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>

              </div>


              {/* Follow Button */}
              <button className="btn btn-primary btn-xs">
                Follow
              </button>


            </div>
          ))}

        </div>

      </div>

    </aside>
  );
};

export default RightSidebar;