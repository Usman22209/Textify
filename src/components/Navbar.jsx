import React, { useContext, useState } from "react";
import { Context } from "./Context";
import { Link } from "react-router-dom";
export default function Navbar() {
  const props = useContext(Context);
  const[open,setOpen]=useState(false);
  return (
    <div
      className={`h-[70px] flex w-screen relative items-center justify-between px-[10%] ${
        props.dark ? "bg-gray-900 text-white" : "bg-gray-300"
      }`}
      id="main"
    >
      <Link to="/" className="py-3 text-2xl font-extrabold">
        Textify
      </Link>
      <img
        src="hamburger.svg"
        className={`sm:hidden right-2 absolute w-10 ${props.dark ? "invert" : ""}`}
        alt=""
        onClick={()=>setOpen(!open)}
      />
      <ul className={`flex *:mx-2 items-center text-sm sm:text-base  sm:flex-row transition-all absolute sm:static opacity-100 ${open?"top-[70px] gap-2 left-3 opacity-100":"-top-[200px] opacity-0"}`}>
        <li className="">
          <Link to="/" onClick={()=>props.setSelect("home")} className={`${props.select==="home"?"text-blue-500":""}`}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={()=>props.setSelect("about")} className={`${props.select==="about"?"text-blue-500":""}`}>About</Link>
        </li>
        <li className="">
          <Link to="/contact" onClick={()=>props.setSelect("contact")} className={`${props.select==="contact"?"text-blue-500":""}`}>Contact us</Link>
        </li>
        <li className=" cursor-pointer flex items-center">
          <img
            id="pic"
            src={!props.dark ? "dark.png" : "light.png"}
            className="w-9 cursor-pointer"
            onClick={() => {
              props.setDark(!props.dark);
              console.log(props.dark);
            }}
            alt=""
          />
          <span>{props.dark ? "Dark" : "Light"} Mode</span>
        </li>
      </ul>
    </div>
  );
}
