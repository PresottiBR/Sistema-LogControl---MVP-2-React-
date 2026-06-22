import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";

function Home({ cargas, excluirCarga, atualizarStatus }) {
  const navigate = useNavigate();

  const [filtroData, setFiltroData] = useState("");
  const [filtroEmpresa, setFiltroEmpresa] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const limparFiltros = () => {
    setFiltroData("");
    setFiltroEmpresa("");
    setFiltroStatus("");
  };

  const lista = cargas.filter((c) => {
    return (
      (!filtroData || filtroData === "data" || c.dataEntrega === filtroData) &&
      (!filtroEmpresa || c.empresa.toLowerCase().includes(filtroEmpresa.toLowerCase())) &&
      (!filtroStatus || c.status === filtroStatus)
    );
  });

  return (
    <>
      <Header />

      <div className="container">

        <div className="boas-vindas">
          <h2>Bem-vindo</h2>
          <p>Gerencie suas cargas de forma simples</p>
        </div>

        <h3>Filtros</h3>

        {/* DATA */}
        <select
          value={filtroData}
          onChange={(e) => setFiltroData(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="data">Selecionar data</option>
        </select>

        {filtroData === "data" && (
          <input
            type="date"
            onChange={(e) => setFiltroData(e.target.value)}
          />
        )}

        {/* EMPRESA */}
        <input
          placeholder="Filtrar por empresa"
          value={filtroEmpresa}
          onChange={(e) => setFiltroEmpresa(e.target.value)}
        />

        {/* STATUS */}
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
        >
          <option value="">Todos status</option>
          <option value="pendente">Pendente</option>
          <option value="entregue">Entregue</option>
        </select>

        {/* LIMPAR */}
        <button onClick={limparFiltros}>
          Limpar Filtros
        </button>

        <h2>Lista de Cargas</h2>

        {lista.map((carga) => (
          <div key={carga.id} className="carga">

            <div onClick={() => navigate("/detalhes", { state: carga })}>
              <strong>{carga.nome}</strong><br />
              🏢 {carga.empresa} <br />
              {carga.origem} → {carga.destino} <br />
              📅 {carga.dataEntrega}
            </div>

            {/* STATUS */}
            <p className={carga.status === "entregue" ? "status-entregue" : "status-pendente"}>
              {carga.status === "entregue" ? "🟢 Entregue" : "🟡 Pendente"}
            </p>

            {/* BOTÃO */}
            {carga.status !== "entregue" && (
              <button onClick={() => atualizarStatus(carga.id)}>
                Marcar como entregue
              </button>
            )}

            <button
              className="btn-excluir"
              onClick={(e) => {
                e.stopPropagation();
                excluirCarga(carga.id);
              }}
            >
              Excluir
            </button>

          </div>
        ))}

        {lista.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
           Nenhuma carga encontrada
        </p>
        )}

        <button onClick={() => navigate("/nova")}>
          Nova Carga
        </button>

      </div>
    </>
  );
}

export default Home;