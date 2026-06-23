import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import NovaCarga from "./pages/NovaCarga";
import Detalhes from "./pages/Detalhes";
import "./styles.css";

// COMPONENTE 404
function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      textAlign: "center"
    }}>
      <h1 style={{
        color: "#000",
        fontSize: "48px",
        fontWeight: "bold",
        marginBottom: "20px"
      }}>
        404 NOT FOUND
      </h1>

      <button
  onClick={() => navigate("/")}
  style={{
    width: "100%",
    maxWidth: "300px",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  Voltar para Home
</button>
    </div>
  );
}

function App() {
  const [cargas, setCargas] = useState(() => {
    const dados = localStorage.getItem("cargas");
    return dados ? JSON.parse(dados) : [];
  });

  useEffect(() => {
    localStorage.setItem("cargas", JSON.stringify(cargas));
  }, [cargas]);

  const excluirCarga = (id) => {
    setCargas((prev) => prev.filter((c) => c.id !== id));
  };

  const atualizarStatus = (id) => {
    setCargas((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "entregue" } : c
      )
    );
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

        {/* ROTA 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
