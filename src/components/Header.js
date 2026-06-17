import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="header">

      <div className="header-top">
        <span className="menu-btn" onClick={() => setMenu(!menu)}>
          ☰
        </span>

        <h2>LogControl</h2>
      </div>

      {menu && (
        <div className="menu">
          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/nova")}>Nova Carga</p>
        </div>
      )}

    </div>
  );
}

export default Header;