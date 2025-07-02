import {
  Nav,
  Container,
  Logo,
  NavLinks,
  Link,
  AuthArea,
  GridIcon,
} from "./styled";

import LogoHeader from "../../assets/Header.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaCompress, FaFileImage, FaFileWord, FaLayerGroup, FaChevronDown, FaFileAlt, FaRegCopy
} from "react-icons/fa";

interface NavbarProps {
  rightExtra?: React.ReactNode;
}

const categorias = [
  {
    titulo: "CONVERTER PDF",
    itens: [
      { label: "Imagem para PDF", path: "/imagem-para-pdf", icon: <FaFileImage color="#fbc02d" /> },
      { label: "Word para PDF", path: "/word-para-pdf", icon: <FaFileWord color="#1976d2" /> },
      { label: "PDF para Word", path: "/pdf-para-word", icon: <FaFileAlt color="#1976d2" /> },
      { label: "PDF para Imagem", path: "/pdf-para-imagem", icon: <FaFileImage color="#e67e22" /> },
    ]
  },
  {
    titulo: "ORGANIZAR PDF",
    itens: [
      { label: "Juntar PDF", path: "/mesclar-pdf", icon: <FaLayerGroup color="#e74c3c" /> },
      { label: "Dividir PDF", path: "/dividir-pdf", icon: <FaRegCopy color="#e67e22" /> },
    ]
  },
  {
    titulo: "OTIMIZAR PDF",
    itens: [
      { label: "Comprimir PDF", path: "/comprimir-pdf", icon: <FaCompress color="#7cb342" /> },
    ]
  }
];

const principais = [
  { label: "Comprimir PDF", path: "/comprimir-pdf" },
  { label: "Imagem para PDF", path: "/imagem-para-pdf" },
  { label: "Word para PDF", path: "/word-para-pdf" },
];

export function Navbar({ rightExtra }: NavbarProps) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Nav>
      <Container>
        <Logo>
          <img
            src={LogoHeader}
            alt=""
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </Logo>

        <NavLinks>
          {principais.map(f => (
            <Link key={f.path} to={f.path}>{f.label}</Link>
          ))}
          <div style={{ position: "relative" }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: 6,
              }}
              onClick={() => setDropdownOpen(v => !v)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
            >
              TODAS AS FERRAMENTAS PDF <FaChevronDown style={{ marginLeft: 4 }} />
            </button>
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: 40,
                  left: 0,
                  background: "#fff",
                  color: "#222",
                  minWidth: 600,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                  borderRadius: 10,
                  zIndex: 1000,
                  padding: "18px 24px",
                  display: "flex",
                  gap: 32,
                  justifyContent: "center",
                }}
              >
                {categorias.map(cat => (
                  <div key={cat.titulo} style={{ minWidth: 180 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, letterSpacing: 1, color: "#005CA9" }}>{cat.titulo}</div>
                    {cat.itens.map(f => (
                      <div
                        key={f.path}
                        onClick={() => {
                          navigate(f.path);
                          setDropdownOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 0 10px 0",
                          cursor: "pointer",
                          fontWeight: 500,
                          fontSize: 15,
                          borderRadius: 6,
                          transition: "background 0.18s",
                        }}
                        onMouseDown={e => e.preventDefault()}
                        onMouseOver={e => (e.currentTarget.style.background = "#f8fafc")}
                        onMouseOut={e => (e.currentTarget.style.background = "#fff")}
                      >
                        <span style={{ fontSize: 20, marginRight: 8 }}>{f.icon}</span>
                        {f.label}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </NavLinks>

        <AuthArea>
          <GridIcon />
          {rightExtra}
        </AuthArea>
      </Container>
    </Nav>
  );
}
