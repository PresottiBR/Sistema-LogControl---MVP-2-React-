import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Detalhes() {
  const location = useLocation();
  const navigate = useNavigate();
  const carga = location.state;

  return (
    <>
      <Header />

      <div className="container">

        <button className="btn-voltar" onClick={() => navigate("/")}>
          ← Voltar
        </button>

        <h1>Detalhes da Carga</h1>

        <p><strong>Nome:</strong> {carga?.nome}</p>
        <p><strong>Empresa:</strong> {carga?.empresa}</p>
        <p><strong>Origem:</strong> {carga?.origem}</p>
        <p><strong>Destino:</strong> {carga?.destino}</p>
        <p><strong>Data:</strong> {carga?.dataEntrega}</p>

        <p><strong>Produtos:</strong></p>
        <ul>
  {carga?.produtos?.map((p, i) => (
    <li key={i}>
      {p.nome} - {p.quantidade} un
    </li>
  ))}
</ul>

      </div>
    </>
  );
}

export default Detalhes;