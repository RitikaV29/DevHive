
// interface Props {
//   onClick: () => void;
// }
// const CreatePostCard = ({ onClick }:Props) => {
//   return (
//     <div
//       onClick={onClick}
//       className="bg-[#111111] border border-zinc-800 rounded-2xl p-5 cursor-pointer hover:border-violet-500 transition"
//     >

//       <div className="flex items-center gap-4">

//         {/* Avatar */}
//         <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-lg">
//           R
//         </div>


//         {/* Input Look */}
//         <div className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-gray-400">
//           What's on your mind?
//         </div>

//       </div>


//       {/* Options */}

//       <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-800">
// {/* 
//         <div className="flex gap-6">

//           <button className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition">
//             <FiImage />
//             Image
//           </button>


//           <button className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition">
//             <FiCode />
//             Project
//           </button>

//         </div>
//  */}

//         <button
//           className="px-5 py-2 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-500 transition"
//         >
//           Create
//         </button>

//       </div>

//     </div>
//   );
// };

// export default CreatePostCard;


import { useAuth } from "../../auth/AuthContext";

interface Props {
  onClick: () => void;
}

const CreatePostCard = ({ onClick }: Props) => {
  const { user } = useAuth();
  const avatar = (user as any)?.avatar as string | undefined;
  const name = ((user as any)?.name as string | undefined) || "U";

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-[#111] p-4 shadow-lg shadow-black/30">
      {avatar ? (
        <img src={avatar} alt={name} className="h-11 w-11 shrink-0 rounded-full object-cover" />
      ) : (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 font-semibold text-white">
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      <button
        onClick={onClick}
        className="min-w-0 flex-1 truncate rounded-full border border-zinc-800 bg-black/60 px-5 py-3 text-left text-sm text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400"
      >
        What's on your mind?
      </button>

      <button
        onClick={onClick}
        className="shrink-0 rounded-full bg-violet-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
      >
        Create
      </button>
    </div>
  );
};

export default CreatePostCard;