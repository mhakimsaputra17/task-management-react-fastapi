import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="bg-white font-[Poppins] min-h-screen">
        <div className="max-w-3xl mx-auto p-4 md:p-8">
          <header className="mb-8">
            <h1 className="text-5xl font-medium text-center mb-8">
              Task Management
            </h1>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
