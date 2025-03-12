import React from "react";
import Hero from "./components/Hero";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* minimum height is the height of the screen and the width is the width of the screen and overflow is hidden to avoid those scrollbars */}
      <Hero />
    </main>
  );
};

export default App;
