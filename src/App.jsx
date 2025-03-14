import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* minimum height is the height of the screen and the width is the width of the screen and overflow is hidden to avoid horizontal scrollbars */}
      {/* relative absolute is for positioning the elements */}
      <Navbar />
      <Hero />
      <About />
    </main>
  );
};

export default App;
