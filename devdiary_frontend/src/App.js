import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./components/layout/MainLayout";
import Logs from "./pages/Logs";
import Standup from "./pages/Standup";
import Integrations from "./pages/Integrations";
import Insights from "./pages/Insights";

// PUBLIC_INTERFACE
function App() {
  /** Application entrypoint: sets providers and routing. */
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Logs />} />
            <Route path="/standup" element={<Standup />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
