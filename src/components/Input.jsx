import React, { useContext, useRef, useState } from "react";
import { Context } from "./Context";
export default function Input(props) {
  const [text, settext] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [alert, setalert] = useState("");
  let id = document.getElementById("alert");
  let parag = document.getElementById("para");
  const alt = (alrt) => {
    id.classList.remove("hidden");
    setalert(alrt);
    setTimeout(() => {
      id.classList.add("hidden");
      setalert("");
    }, 1500);
  };
  const toupper = () => {
    if (text.length > 0) {
      let uptext = text.toUpperCase();
      settext(uptext);
      alt("Text Converted to UpperCase successfully!");
    }
  };
  const tolower = () => {
    if (text.length > 0) {
      let uptext = text.toLowerCase();
      settext(uptext);
      alt("Text Converted to LowerCase successfully!");
    }
  };
  const sonchange = (e) => {
    if (e.target.value.length > 0) {
      document.querySelector("#para").classList.remove("hidden");
    } else {
      document.querySelector("#para").classList.add("hidden");
    }
    settext(e.target.value);
  };
  const reset = (e) => {
    console.log(e.target.value);
    settext("");
    parag.classList.add("hidden");
    alt("Text reset successfully!");
  };
  const copied = async () => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };
  const downloadVariable = () => {
    let i = 1;
    // Convert the variable to a string representation
    let variableStr = JSON.stringify(text);
    variableStr = variableStr.replace(`"`, "");
    variableStr = variableStr.replace(/.$/, "");
    // Create a Blob with the variable's value
    const blob = new Blob([variableStr], { type: "text/plain" });

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `download${i}`;
    i++;

    // Trigger a click event on the link to initiate the download
    link.click();
    alt("Text downloaded Successfully")
    // Clean up by revoking the object URL
    URL.revokeObjectURL(link.href);
  };
  const Usepause = () => {
    const audioref = useRef(null);
    audioref.current.pause();
  };
  const pasted = async () => {
    if (text.length + 1 > 0) {
      document.querySelector("#para").classList.remove("hidden");
    } else {
      document.querySelector("#para").classList.add("hidden");
    }
    try {
      const tempInput = document.createElement("textarea");
      tempInput.style.visibility = "hidden";
      document.body.appendChild(tempInput);
      tempInput.focus();
      const clipboardText = await navigator.clipboard.readText();
      document.body.removeChild(tempInput);
      settext(text + clipboardText);
      console.log("Text pasted successfully!");
      alt("Text pasted successfully!");
    } catch (error) {
      console.error("Error pasting text:", error);
    }
  };
  const handleButtonClick = () => {
    let volume = document.getElementById("volume");
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    if (isPlaying) {
      volume.src = "mute.png";
      window.speechSynthesis.cancel(); // Pause the speech synthesis
    } else {
      window.speechSynthesis.speak(msg); // Start or resume playback
    }
    setIsPlaying(!isPlaying);
    volume.src = "volumefull.png";
  };
  const remove = () => {
    const cleanedString = text.replace(/\s+/g, " ").trim();
    settext(cleanedString);
    alt("All Extra spaces removed");
  };
  const value = useContext(Context);
  return (
    <div
      className={`min-h-[calc(100vh-70px)]`}
    >
      <div
        id="alert"
        className={`hidden w-screen top-[8%] absolute z-10 bg-indigo-900 text-center py-4 lg:px-4`}
      >
        <div
          className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
          role="alert"
        >
          <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
            Alert
          </span>
          <span className="font-semibold mr-2 text-left flex-auto">
            {alert}
          </span>
          <svg
            className="fill-current opacity-75 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
          </svg>
        </div>
      </div>

      <div
        id="box"
        className={`sm:mx-auto w-[98vw] mx-1  sm:w-4/5 my-5 rounded relative mt-16 p-4 `}
      >
        <img
          src="paste_12774366.png"
          className={`w-8 cursor-pointer right-1 absolute `}
          alt=""
          onClick={pasted}
        ></img>
        <h1 className="text-xl font-sans font-bold">
          Enter Text below to anylize
        </h1>
        <img
          id="copy"
          src="copy.png"
          onClick={copied}
          className={`absolute w-6 top-20  right-4 cursor-pointer ${!value.dark?"":"invert"}`}
          alt=""
        ></img>
        <textarea
          name="textarea"
          value={text}
          onChange={sonchange}
          id="text"
          className={`rounded-md pt-4 outline outline-1 w-full my-5 pl-2 pr-5  focus:outline-blue-300 focus:outline-2 py-1 ${
            value.dark ? "bg-gray-800 text-white" : ""
          } overflow-auto will-change-scroll`}
          rows="7"
          placeholder="Enter text to analyze"
        ></textarea>
        <h1 className=" text-xl font-semibold my-2">Text-Summay</h1>
        <p className="mb-1 mt-[-15x] text-sm">
          {text.trim().length} characters and{" "}
          {text.trim().length === 0
            ? text.trim().split(" ").length - 1
            : text.trim().split(" ").length}{" "}
          words {(text.trim().length * (1 / 300)).toFixed(2)} mintues
        </p>
        <div className="buttons flex flex-col items-center flex-wrap sm:flex-row gap-3">
          <button
            className=" h-fit bg-blue-700 text-md  text-white px-4 py-1 mx-1 rounded-sm min-w-[50vw] sm:min-w-fit"
            onClick={toupper}
          >
            Convert to Upper-Case
          </button>
          <button
            className="min-w-[50vw] sm:min-w-fit h-fit bg-blue-700 text-md text-white px-4 py-1 mx-1 rounded-sm"
            onClick={tolower}
          >
            Convert to Lower-Case
          </button>
          <button
            className="min-w-[50vw] sm:min-w-fit h-fit bg-blue-700 text-md text-white px-4 py-1 mx-1 rounded-sm"
            onClick={remove}
          >
            Remove extra spaces
          </button>
          <div className="flex flex-row gap-x-24 sm:gap-3">
            <img
              id="reset"
              src="reset.png"
              onClick={reset}
              className={`${!value.dark?"":"invert"} cursor-pointer w-5`}
              alt=""
            />
            <img
              id="download"
              src="download.png"
              className={`${!value.dark?"":"invert"} cursor-pointer w-5`}
              onClick={downloadVariable}
              alt=""
            />
            <img
              src={!isPlaying ? "volumefull.png" : "mute.png"}
              id="volume"
              className={`${!value.dark?"":"invert"} cursor-pointer w-5`}
              onClick={handleButtonClick}
              alt=""
            />
          </div>
        </div>
        <h1 className="text-xl font-semibold mb-2">Preview</h1>
        <p
          id="para"
          className="break-words overflow-y-auto p-2 max-h-[250px] outline outline-blue-500 outline-1 hidden rounded-md"
        >
          {text}
        </p>
      </div>
    </div>
  );
}
