import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./ui/containers/Header";
import { ThemeProvider } from "./ui/elements/theme-provider";
import { Toaster } from "./ui/elements/sonner";
import { Games } from "./ui/containers/Games";
import { Player } from "./ui/containers/Player";

function Core() {
  return (
    <div id="app" className="flex flex-col items-center gap-8">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Games />
        <Player />
      </ThemeProvider>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Core />} />
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
