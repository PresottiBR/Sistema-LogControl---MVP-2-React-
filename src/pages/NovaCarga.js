import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function NovaCarga({ cargas, setCargas }) {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");

  const [produtos, setProdutos] = useState([
    { nome: "", qtd: "" }
  ]);

  const adicionarProduto = () => {
    setProdutos([...produtos, { nome: "", qtd: "" }]);
  };

  const atualizarProduto = (index, campo, valor) => {
    const novos = [...produtos];
    novos[index][campo] = valor;
    setProdutos(novos);
  };

  const salvar = () => {
    const nova = {
      id: Date.now(),
      nome,
      empresa,
      origem,
      destino,
      dataEntrega,
      produtos,
      status: "pendente" // 🔥 IMPORTANTE
    };

    setCargas([...cargas, nova]);
    navigate("/");
  };

  return (
    <>
      <Header />

      <div className="container">
        <h2>Nova Carga</h2>

        <input placeholder="Nome da Carga" onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Empresa" onChange={(e) => setEmpresa(e.target.value)} />
        <input placeholder="Origem" onChange={(e) => setOrigem(e.target.value)} />
        <input placeholder="Destino" onChange={(e) => setDestino(e.target.value)} />

        <h4>Data</h4>
        <input type="date" onChange={(e) => setDataEntrega(e.target.value)} />

        <h4>Produtos</h4>

        {produtos.map((p, index) => (
          <div key={index} className="linha-produto">
            <input
              placeholder="Produto"
              onChange={(e) => atualizarProduto(index, "nome", e.target.value)}
            />
            <input
              placeholder="Qtd"
              type="number"
              onChange={(e) => atualizarProduto(index, "qtd", e.target.value)}
            />
          </div>
        ))}

        <button onClick={adicionarProduto}>+ Produto</button>

        <button onClick={salvar}>Salvar</button>
      </div>
    </>
  );
}

export default NovaCarga;