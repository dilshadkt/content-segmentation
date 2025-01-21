import React from "react";

const Header = () => {
  return (
    <div className="flexStart w-full">
      <div className="flexStart gap-x-3">
        <input
          type="text"
          placeholder="Serach Department"
          className="border border-[#B5B3B3] outline-none bg-transparent rounded-lg py-2 text-sm px-3"
        />
        <button className="bg-black  group shadow-md flexCenter w-10 rounded-lg  aspect-square">
          <img
            src="/icons/search.svg"
            alt=""
            className="w-6 group-hover:scale-110 transition-all duration-300"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
