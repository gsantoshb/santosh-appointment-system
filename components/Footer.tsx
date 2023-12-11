import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between py-4 px-6 bg-gray-800 text-white">
      <nav className="flex space-x-4">
        <a href="/about-us" className="text-sm hover:underline">
          About Us
        </a>
        <a href="/contact-us" className="text-sm hover:underline">
          Contact Us
        </a>
      </nav>
      <div className="flex space-x-4 mt-4">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          className="text-white hover:text-gray-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 0-1-1z"
            />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          className="text-white hover:text-gray-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 3.982A7.996 7.996 0 0 0 16 15.985V15a2 2 0 0 0 2-2l.004-8.285A7.997 7.997 0 0 0 8 3.982zM4 8V15a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8L8 4a2 2 0 0 0-2 2z"
            />
          </svg>
        </a>
      </div>
      <p className="text-sm mt-4">&copy; {new Date().getFullYear()} Your Company Name</p>
    </footer>
  );
};

export default Footer;
