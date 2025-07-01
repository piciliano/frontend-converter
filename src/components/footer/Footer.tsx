import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaRss,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaLaptop,
} from "react-icons/fa";

import {
  FooterBg,
  FooterContainer,
  Col,
  Logo,
  Desc,
  Title,
  List,
  ListItem,
  Social,
  BottomBar,
} from "./styled";

import LOGO from "../../assets/ALAGOAS.png";

export function Footer() {
  return (
    <FooterBg>
      <FooterContainer>
        <Col>
          <Logo>
            <img
              src={LOGO}
              alt="Logo do Estado de Alagoas"
              style={{
                width: "15rem",
                background: "#fff",
              }}
            />
          </Logo>
        </Col>

        <Col>
          <Title>
            <FaLaptop style={{ marginRight: 8 }} />
            Acesso Rápido
          </Title>
          <List>
            <ListItem>Início</ListItem>
            <ListItem>Governo</ListItem>
            <ListItem>Secretarias e Órgãos</ListItem>
            <ListItem>Últimas Notícias</ListItem>
            <ListItem>Fotos</ListItem>
            <ListItem>Pesquisa de Satisfação</ListItem>
          </List>
        </Col>

        {/* Coluna 3 - Contato */}
        <Col>
          <Title>
            <FaMapMarkerAlt style={{ marginRight: 8 }} />
            Controladoria Geral do Estado
          </Title>
          <List>
            <ListItem>
              <FaPhone /> (82) 3315-1000
            </ListItem>
            <ListItem>
              <FaEnvelope /> gabinete.cge@al.gov.br
            </ListItem>
            <ListItem>
              <FaMapMarkerAlt />
              Rua Cincinato Pinto, s/n Centro <br />
              CEP 57020-050 - Maceió/AL
            </ListItem>
            <ListItem>
              <FaClock /> Segunda a sexta, das 8h às 17h
            </ListItem>
          </List>
        </Col>
      </FooterContainer>

      {/* Barra inferior */}
      <BottomBar>
        <span>© {new Date().getFullYear()} Governo de Alagoas</span>
        <span>Todos os direitos reservados</span>
        <span>Versão 1.0.0</span>
      </BottomBar>
    </FooterBg>
  );
}
