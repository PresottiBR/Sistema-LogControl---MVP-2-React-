function CardCarga({ carga, onExcluir, onEntregar, onClick }) {
  return (
    <div className="carga" onClick={onClick}>
      <strong>{carga.nome}</strong><br />
      🏢 {carga.empresa}<br />
      {carga.origem} → {carga.destino}<br />
      📅 {carga.dataEntrega}

      <p className={carga.status === "entregue" ? "status-entregue" : "status-pendente"}>
        {carga.status === "entregue" ? "🟢 Entregue" : "🟡 Pendente"}
      </p>

      {carga.status !== "entregue" && (
        <button onClick={(e) => {
          e.stopPropagation();
          onEntregar(carga.id);
        }}>
          Marcar como entregue
        </button>
      )}

      <button
        className="btn-excluir"
        onClick={(e) => {
          e.stopPropagation();
          onExcluir(carga.id);
        }}
      >
        Excluir
      </button>
    </div>
  );
}

export default CardCarga;