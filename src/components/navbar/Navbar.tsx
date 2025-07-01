import { FaTh } from "react-icons/fa";
import {
  Nav,
  Container,
  Logo,
  NavLinks,
  Link,
  AuthArea,
  LoginBtn,
  RegisterBtn,
  GridIcon,
} from "./styled";

import LogoHeader from "../../assets/Header.png";

interface NavbarProps {
  rightExtra?: React.ReactNode;
}

export function Navbar({ rightExtra }: NavbarProps) {
  return (
    <Nav>
      <Container>
        <Logo>
          <img src={LogoHeader} alt="" />
        </Logo>

        <NavLinks>
          <Link to="/comprimir-pdf">Comprimir PDF</Link>
          <Link to="/imagem-para-pdf">Imagem para PDF</Link>
          <Link to="/word-para-pdf">Word para PDF</Link>
          <Link to="/pdf-para-word">PDF para Word</Link>
          <Link to="/pdf-para-imagem">PDF para Imagem</Link>
        </NavLinks>

        <AuthArea>
          <GridIcon />
          {rightExtra}
        </AuthArea>
      </Container>
    </Nav>
  );
}
