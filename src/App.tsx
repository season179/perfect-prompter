import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import { Toaster } from "sonner";
import { ApiKeyProvider } from "./contexts/ApiKeyContext";

function App() {
  return (
    <ApiKeyProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Toaster position="top-right" />
          {/* Tempo integration removed for compatibility with Vite 6 */}
        </>
      </Suspense>
    </ApiKeyProvider>
  );
}

export default App;
