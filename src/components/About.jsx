// About.js
import React, { useContext } from "react";
import { Context } from "./Context";

const About = () => {
  const value = useContext(Context);
  return (
    <div
      id="about"
      className={`p-6 pt-8 min-h-[calc(100vh-70px)] ${value.dark?"bg-gray-800 *:text-white":""}`}

    >
      <h2 className="text-2xl font-semibold mb-3 mt-2">About Textify</h2>
      <p className="">
        Textify is more than just a tool; it's a playground for text
        enthusiasts, a productivity booster for professionals, and an essential
        utility for anyone who interacts with words on a daily basis.
      </p>
      <p className=" mt-4">
        Our OCR app functions as your personal text wizard, equipped with the
        ability to identify and transform text from any image or document.
        Whether it's handwritten notes or printed materials, our app precisely
        captures and converts text, streamlining your daily tasks.
      </p>
      <h3 className="text-lg font-semibold mt-6">
        Features that redefine Textify:
      </h3>
      <ul className="list-disc list-inside mt-2">
        <li>Fast text extraction</li>
        <li>Text editing and formatting</li>
        <li>Searchable text functionality</li>
        <li>Image import with text output</li>
        <li>Multiple export options</li>
        <li>Batch processing</li>
        <li>Secure data handling</li>
        <li>User-friendly interface</li>
      </ul>
      <p className="mt-6">
        Textify is perfect for students, professionals, and anyone who wants to
        efficiently manage and manipulate text. Whether you're organizing
        documents, extracting contact info from business cards, or
        revolutionizing your note-taking process, Textify has got you covered.
      </p>
      <p className="mt-4">
        Unlock the true potential of text recognition with Textify. Download it
        now and let the OCR revolution begin!
      </p>
    </div>
  );
};

export default About;
