'use client';

import React from "react";
import { motion } from "framer-motion";
import { HiHome, HiInformationCircle, HiPhone, HiCalendar, HiMail, HiGlobe } from "react-icons/hi";
import AppointmentBookingPage from "@/components/AppointmentBookingPage";

const Home = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 p-4 flex justify-between items-center">
        <a href="#home">
          <h1 className="text-xl font-bold text-white">Pediatric Care</h1>
        </a>
        <nav className="flex space-x-4">
          <a href="#about" onClick={() => scrollToSection("about")}>
            <HiInformationCircle className="w-6 h-6 text-white" />
            About Us
          </a>
          <a href="#contact" onClick={() => scrollToSection("contact")}>
            <HiPhone className="w-6 h-6 text-white" />
            Contact Us
          </a>
          <a href="#appointment" onClick={() => scrollToSection("appointment")}>
            <HiCalendar className="w-6 h-6 text-white" />
            Make an Appointment
          </a>
        </nav>
      </header>
      <main className="flex flex-col justify-center items-center p-4">
        <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
        <p className="text-xl text-gray-700">
          We provide comprehensive pediatric care services for children of all ages.
        </p>
        <motion.button
          onClick={() => scrollToSection("appointment")}
          whileHover={{ scale: 1.1 }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md font-bold shadow-md hover:bg-blue-600"
        >
          Make an Appointment
        </motion.button>
      </main>
      <section id="about" className="flex flex-col justify-center items-center bg-gray-200 p-4">
  <div className="w-full md:w-1/2">
    <img
      src="/landscape.jpg"
      alt="Children playing in a doctor's office"
      className="rounded-lg shadow-md"
    />
  </div>
  <div className="flex flex-col justify-center items-center w-full md:w-1/2 mt-4 md:mt-0">
    <h2 className="text-3xl font-bold mb-4 text-blue-500">Welcome to [Pediatric Clinic Name]!</h2>
    <p className="text-xl text-gray-700">
      We are a team of dedicated and experienced pediatric healthcare professionals who are committed to helping children reach their full potential.
    </p>
    <p className="mt-4 text-lg text-gray-700">
      We believe that every child deserves access to high-quality healthcare in a safe and welcoming environment. We offer a wide range of services, including:
    </p>
    <ul className="list-disc mt-4 ml-4 text-gray-700">
      <li>Well-child visits</li>
      <li>Sick-child visits</li>
      <li>Immunizations</li>
      <li>Sports physicals</li>
      <li>Laboratory and diagnostic testing</li>
      <li>Nutritional counseling</li>
      <li>Behavioral health services</li>
      <li>And much more</li>
    </ul>
    <p className="mt-4 text-lg text-gray-700">
      We are proud to be a part of the [City/Town] community and we are committed to providing excellent care to our patients. We believe in building strong relationships with our patients and their families, and we are always here to answer any questions or concerns you may have.
    </p>
    <p className="mt-4 text-lg text-gray-700">
      Here are some of the things that set us apart from other pediatric practices:
    </p>
    <ul className="list-disc mt-4 ml-4 text-gray-700">
      <li>
        <strong>Our team:</strong> We have a team of experienced and board-certified pediatricians who are passionate about providing quality care to children.
      </li>
      <li>
        <strong>Our services:</strong> We offer a wide range of services to meet the needs of children of all ages.
      </li>
      <li>
        <strong>Our technology:</strong> We use the latest technology to provide efficient and effective care.
      </li>
      <li>
        <strong>Our commitment to quality:</strong> We are committed to providing high-quality care to our patients and their families.
      </li>
    </ul>
    <a
      href="#appointment"
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md font-bold shadow-md hover:bg-blue-600"
    >
      Make an Appointment
    </a>
  </div>
</section>

<section id="contact" className="flex flex-col justify-center items-center bg-gray-200 p-4 text-gray-700">
  <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
  <p className="text-xl text-gray-700">
    We are here to answer any questions you may have. Please feel free to contact us using the information below:
  </p>
  <ul className="list-none mt-4 ml-4">
    <li className="flex items-center mb-2">
      <HiPhone className="w-6 h-6 text-blue-500 mr-2" />
      <span className="text-lg text-gray-700">[Phone Number]</span>
    </li>
    <li className="flex items-center mb-2">
      <HiMail className="w-6 h-6 text-blue-500 mr-2" />
      <a href="mailto:[Email Address]" className="text-lg text-gray-700">[Email Address]</a>
    </li>
  </ul>
  
  <h2 className="text-2xl font-bold mt-8 mb-4">Send us a message</h2>

  <form action="/contact-us" method="POST" className="flex flex-col space-y-4 w-full md:w-1/2">
    <div className="flex flex-col space-y-2">
      <label htmlFor="name" className="text-lg text-gray-700">Your Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        className="rounded-md border px-2 py-1 focus:outline-none"
      />
    </div>
    <div className="flex flex-col space-y-2">
      <label htmlFor="email" className="text-lg text-gray-700">Your Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        className="rounded-md border px-2 py-1 focus:outline-none"
      />
    </div>
    <div className="flex flex-col space-y-2">
      <label htmlFor="message" className="text-lg text-gray-700">Your Message:</label>
      <textarea
        id="message"
        name="message"
        required
        className="rounded-md border px-2 py-1 focus:outline-none resize-none"
        rows="5"
      ></textarea>
    </div>
    <button
      type="submit"
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md font-bold shadow-md hover:bg-blue-600"
    >
      Send Message
    </button>
  </form>

</section>


      <section id="appointment" className="p-4">
        <AppointmentBookingPage />
      </section>
    </div>
  );
};

export default Home;
