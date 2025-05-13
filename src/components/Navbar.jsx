import React from "react";
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <div className="bg-slate-700 text-white flex justify-between p-4 px-45">
      <div className="logo font-bold text-2xl">
        <span className="text-green-400">&lt;</span> PassVault
        <span className="text-green-400"> / &gt;</span>
      </div>
      <div className="">
        <FaGithub size={30} />
      </div>
    </div>
  );
};

export default Navbar;
