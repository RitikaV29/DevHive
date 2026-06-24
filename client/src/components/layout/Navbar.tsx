import AnimatedLogo from "../AnimatedLogo";


const Navbar = () => {
  return (
    <nav className="bg-black border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        
       <AnimatedLogo/>

        <ul className="flex items-center gap-8 text-gray-300 font-medium">
          <li>
            <a
              href="#"
              className="hover:text-violet-500 transition-all duration-300"
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="#"
              className="hover:text-violet-500 transition-all duration-300"
            >
              Explore
            </a>
          </li>

          <li>
            <a
              href="#"
              className="hover:text-violet-500 transition-all duration-300"
            >
              Projects
            </a>
          </li>

          <li>
            <a
              href="#"
              className="hover:text-violet-500 transition-all duration-300"
            >
              Community
            </a>
          </li>

          <li>
            <a
              href="#"
              className="hover:text-violet-500 transition-all duration-300"
            >
              Jobs
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;