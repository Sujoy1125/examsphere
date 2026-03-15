import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Available Tests", path: "/tests" },
    { name: "My Attempts", path: "/my-attempts" },
    { name: "Results", path: "/analysis" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Profile", path: "/profile" },
  ];

  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 md:hidden ${open ? "block" : "hidden"}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-primary transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:w-20 lg:w-72 flex flex-col shadow-2xl`}
      >
        {/* Close Button (mobile) */}
        <button
          className="absolute top-4 right-4 text-white md:hidden"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        {/* Profile */}
        <div className="px-6 pt-10 pb-8 border-b border-white/10">
          <div className="flex gap-4 items-center">
            <div className="size-14 rounded-full bg-white/20 flex items-center justify-center text-white">
              👤
            </div>
            <div className="hidden lg:block">
              {/* <p className="text-white font-bold">Alex Johnson</p>
              <p className="text-white/60 text-xs">alex.j@student.com</p> */}
              <p className="text-white font-bold">
                {user?.fullName || "Student"}
              </p>
              <p className="text-white/60 text-xs">
                {user?.email || "student@email.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center h-12 px-4 rounded-xl transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "bg-white text-primary font-semibold shadow-lg"
                    : "text-white/80 hover:bg-white/10"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="w-full h-12 rounded-xl text-white/80 hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}


// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";

// export default function Sidebar({ open, setOpen }) {
//   const location = useLocation();

//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Available Tests", path: "/tests" },
//     { name: "Results", path: "/analysis" },
//     { name: "Leaderboard", path: "/leaderboard" },
//     { name: "Profile", path: "/profile" },
//   ];

//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//   }, []);

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className={`fixed inset-0 bg-black/60 z-40 md:hidden ${open ? "block" : "hidden"}`}
//         onClick={() => setOpen(false)}
//       />

//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-72 bg-primary transform transition-transform duration-300
//         ${open ? "translate-x-0" : "-translate-x-full"}
//         md:translate-x-0 md:static md:w-20 lg:w-72 flex flex-col shadow-2xl`}
//       >
//         {/* Close Button (mobile) */}
//         <button
//           className="absolute top-4 right-4 text-white md:hidden"
//           onClick={() => setOpen(false)}
//         >
//           ✕
//         </button>

//         {/* Profile */}
//         <div className="px-6 pt-10 pb-8 border-b border-white/10">
//           <div className="flex gap-4 items-center">
//             <div className="size-14 rounded-full bg-white/20 flex items-center justify-center text-white">
//               👤
//             </div>
//             <div className="hidden lg:block">
//               {/* <p className="text-white font-bold">Alex Johnson</p>
//               <p className="text-white/60 text-xs">alex.j@student.com</p> */}
//               <p className="text-white font-bold">
//                 {user?.fullName || "Student"}
//               </p>
//               <p className="text-white/60 text-xs">
//                 {user?.email || "student@email.com"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 px-4 py-8 space-y-2">
//           {menuItems.map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               onClick={() => setOpen(false)}
//               className={`flex items-center h-12 px-4 rounded-xl transition-all duration-200
//                 ${
//                   location.pathname === item.path
//                     ? "bg-white text-primary font-semibold shadow-lg"
//                     : "text-white/80 hover:bg-white/10"
//                 }`}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>

//         {/* Logout */}
//         <div className="p-4 border-t border-white/10">
//           <button
//             onClick={() => {
//               localStorage.clear();
//               window.location.href = "/login";
//             }}
//             className="w-full h-12 rounded-xl text-white/80 hover:bg-red-500/20"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }
