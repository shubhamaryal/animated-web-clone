import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* minimum height is the height of the screen and the width is the width of the screen and overflow is hidden to avoid horizontal scrollbars */}
      {/* overflow goes in the main div */}
      {/* relative absolute is for positioning the elements */}
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
