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

interface NavbarProps {
  rightExtra?: React.ReactNode;
}

export function Navbar({ rightExtra }: NavbarProps) {
  const navigate = useNavigate();

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
          <Link to="/comprimir-pdf">Comprimir PDF</Link>
          <Link to="/imagem-para-pdf">Imagem para PDF</Link>
          <Link to="/word-para-pdf">Word para PDF</Link>
          <Link to="/pdf-para-word">PDF para Word</Link>
          <Link to="/pdf-para-imagem">PDF para Imagem</Link>
          <Link to="/mesclar-pdf">Juntar PDF</Link>
        </NavLinks>

        <AuthArea>
          <GridIcon />
          {rightExtra}
        </AuthArea>
      </Container>
    </Nav>
  );
}
