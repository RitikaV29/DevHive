
interface Props {
  onClick: () => void;
}
const CreatePostCard = ({ onClick }:Props) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#111111] border border-zinc-800 rounded-2xl p-5 cursor-pointer hover:border-violet-500 transition"
    >

      <div className="flex items-center gap-4">

        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-lg">
          R
        </div>


        {/* Input Look */}
        <div className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-gray-400">
          What's on your mind?
        </div>

      </div>


      {/* Options */}

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-800">
{/* 
        <div className="flex gap-6">

          <button className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition">
            <FiImage />
            Image
          </button>


          <button className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition">
            <FiCode />
            Project
          </button>

        </div>
 */}

        <button
          className="px-5 py-2 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-500 transition"
        >
          Create
        </button>

      </div>

    </div>
  );
};

export default CreatePostCard;