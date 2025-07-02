import { FaCompress, FaFileImage, FaFileWord, FaLayerGroup } from "react-icons/fa";
import { MdImage, MdContentCut } from "react-icons/md";
import styled from "styled-components";
import { useState } from "react";
import { CompressPDF } from "../features/CompressPDF";
import { ConvertImage } from "../features/ConvertImage";
import { ConvertWord } from "../features/ConvertWord";
import { Footer } from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { FerramentCard } from "../components/ferramentCard/FerramentaCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin: 0 auto;
  max-width: 1000px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  padding: 32px 24px;
  min-width: 350px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
  min-height: calc(100vh - 64px - 220px);
  margin-bottom: 80px;
  @media (max-width: 900px) {
    max-width: 98vw;
    padding: 16px;
  }
  @media (max-width: 600px) {
    padding: 8px;
    margin-bottom: 32px;
  }
`;

const ferramentas = [
  {
    icon: <FaCompress />,
    color: "#4caf50",
    title: "Comprimir PDF",
    desc: "Diminua o tamanho do seu arquivo PDF, mantendo a melhor qualidade possível. Otimize seus arquivos PDF.",
    path: "/comprimir-pdf",
  },
  {
    icon: <FaFileImage />,
    color: "#ffc107",
    title: "Imagem para PDF",
    desc: "Converta suas imagens em PDF de forma rápida e fácil.",
    path: "/imagem-para-pdf",
  },
  {
    icon: <FaFileWord />,
    color: "#3b5998",
    title: "Word para PDF",
    desc: "Converta seus documentos WORD para PDF com a máxima qualidade e exatamente igual ao arquivo original.",
    path: "/word-para-pdf",
  },
  {
    icon: <FaFileWord />,
    color: "#3b5998",
    title: "PDF para Word",
    desc: "Converta arquivos PDF em documentos Word editáveis (.docx) mantendo a formatação.",
    path: "/pdf-para-word",
  },
  {
    icon: <MdImage />,
    color: "#ffc107",
    title: "PDF para Imagem",
    desc: "Converta páginas de PDF em imagens (PNG, JPG) para fácil visualização e compartilhamento.",
    path: "/pdf-para-imagem",
  },
  {
    icon: <FaLayerGroup />,
    color: "#8e24aa",
    title: "Juntar PDF",
    desc: "Mesclar e juntar pdfs e colocá-los em qualquer ordem que desejar",
    path: "/mesclar-pdf",
  },
  {
    icon: <MdContentCut />,
    color: "#e53935",
    title: "Dividir PDF",
    desc: "Separe todas as páginas ou extraia apenas as que desejar de um PDF",
    path: "/dividir-pdf",
  },
];

export default function Home() {
  const [modal, setModal] = useState<null | "compress" | "image" | "word">(
    null
  );
  const navigate = useNavigate();

  return (
    <MainContent>
      <p
        style={{
          color: "#6c757d",
          textAlign: "center",
          marginBottom: 48,
          fontSize: 18,
        }}
      >
        Ferramenta para comprimir PDF, converter imagens e Word para PDF. Não
        requer instalação.
      </p>
      <Grid>
        {ferramentas.map((f, i) => (
          <FerramentCard key={i} {...f} onClick={() => navigate(f.path)} />
        ))}
      </Grid>
      {modal && (
        <ModalBg onClick={() => setModal(null)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={() => setModal(null)} title="Fechar">
              ×
            </CloseBtn>
            {modal === "compress" && <CompressPDF />}
            {modal === "image" && <ConvertImage />}
            {modal === "word" && <ConvertWord />}
          </ModalBox>
        </ModalBg>
      )}
    </MainContent>
  );
}
