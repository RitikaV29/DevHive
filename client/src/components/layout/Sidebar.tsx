

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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const menuItems = [
  { title: "Feed", icon: Home, link: "/userDashboard/feed" },
  { title: "Create Post", icon: SquarePen, link: "/userDashboard/createPost" },
  { title: "Explore Projects", icon: Rocket, link: "/userDashboard/exploreProjects" },
  { title: "Communities", icon: Users, link: "/userDashboard/communities" },
  { title: "Find Developers", icon: UserSearch, link: "/userDashboard/findDevelopers" },
  { title: "Saved Posts", icon: Bookmark, link: "/userDashboard/savedPosts" },
  { title: "Notifications", icon: Bell, link: "/userDashboard/notifications" },
  { title: "Profile", icon: User, link: "/userDashboard/myProfile" },
  { title: "Settings", icon: Settings, link: "/userDashboard/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-zinc-800/80 bg-[#0d0d0f] px-3 py-4 transition-[width] duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      {/* Toggle */}
      <div className={`mb-4 flex ${collapsed ? "justify-center" : "justify-end"}`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400"
        >
          {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = !!item.link && location.pathname.startsWith(item.link);

          return (
            <button
              key={item.title}
              onClick={() => item.link && navigate(item.link)}
              title={collapsed ? item.title : undefined}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex w-full items-center gap-3.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400 ${
                collapsed ? "justify-center" : ""
              } ${
                isActive
                  ? "bg-violet-600/15 text-violet-200"
                  : item.link
                  ? "text-zinc-400 hover:bg-white/5 hover:text-white"
                  : "text-zinc-600 hover:bg-white/[0.03] hover:text-zinc-400"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-violet-500" />
              )}
              <Icon size={20} className={`shrink-0 ${isActive ? "text-violet-400" : ""}`} />
              {!collapsed && <span className="truncate">{item.title}</span>}
              {!collapsed && !item.link && (
                <span className="ml-auto rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-500">
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="mt-4 border-t border-zinc-800/80 pt-4">
        <div
          className={`flex items-center gap-3 rounded-xl p-2 ${
            collapsed ? "justify-center" : "bg-white/[0.03]"
          }`}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user?.name}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 font-semibold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          {!collapsed && (
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white">{user?.name}</h3>
              <p className="truncate text-xs text-zinc-500">{user?.email}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-xl py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
        >
          <LogOut size={19} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
