import { useState } from "react";
import {
  Home,
  SquarePen,
  Rocket,
  Users,
  UserSearch,
  Bookmark,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
   const{user}=useAuth();
   const{logout}=useAuth();

   const handleLogout=async()=>{
   await logout();
   navigate("/")
   }
   console.log(user);
  const menuItems = [
    
    { title: "Feed", icon: Home, link: "/userDashboard/feed" },
    { title: "Create Post", icon: SquarePen, link: "/userDashboard/createPost" },
    { title: "Explore Projects", icon: Rocket },
    { title: "Communities", icon: Users },
    { title: "Find Developers", icon: UserSearch },
    { title: "Saved Posts", icon: Bookmark },
    { title: "Notifications", icon: Bell },
    { title: "Profile", icon: User },
    { title: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`min-h-screen bg-[#0d0d0d] border-r border-zinc-800 px-4 py-6 flex flex-col transition-all duration-300
      ${collapsed ? "w-20" : "w-72"}`}
    >
      {/* Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-300 hover:text-white"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Menu */}
      <div className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
  const isActive = item.link === location.pathname;

          return (
            <button
              key={item.title}
              onClick={() => item.link && navigate(item.link)}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-gray-300 hover:bg-violet-600 hover:text-white"
              }`}
            >
              <Icon size={21} />
              {!collapsed && (
                <span className="font-medium">{item.title}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* User */}
      <div className="border-t border-zinc-800 pt-5">
        <div className="flex items-center gap-3 mb-5">
         {user?.avatar ? (
            <img
              src={user.avatar}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          {!collapsed && (
            <div>
              <h3 className="text-white font-semibold">{user?.name}</h3>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          )}
        </div>

        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 bg-red-500/10 text-red-400 py-3 rounded-xl hover:bg-red-500 hover:text-white transition">
          <LogOut  size={20} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;