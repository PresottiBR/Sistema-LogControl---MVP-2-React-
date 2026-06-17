import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import NovaCarga from "./pages/NovaCarga";
import Detalhes from "./pages/Detalhes";
import "./styles.css";

function App() {
  const [cargas, setCargas] = useState([]);

  const excluirCarga = (id) => {
    const novas = cargas.filter((c) => c.id !== id);
    setCargas(novas);
  };

  const atualizarStatus = (id) => {
    const novas = cargas.map((c) =>
      c.id === id ? { ...c, status: "entregue" } : c
    );
    setCargas(novas);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cargas={cargas}
              excluirCarga={excluirCarga}
              atualizarStatus={atualizarStatus}  
            />
          }
        />

        <Route
          path="/nova"
          element={
            <NovaCarga
              cargas={cargas}
              setCargas={setCargas}
            />
          }
        />

        <Route path="/detalhes" element={<Detalhes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;