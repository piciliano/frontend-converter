import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import { CompressPDF } from "../features/CompressPDF";
import { ConvertImage } from "../features/ConvertImage";
import { ConvertWord } from "../features/ConvertWord";
import { PDFToWord } from "../features/PDFToWord";
import { PDFToImage } from "../features/PDFToImage";
import { MainContent } from "../App.styles";
import { MergePDF } from "../features/MergePDF";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/comprimir-pdf"
        element={
          <MainContent>
            <CompressPDF />
          </MainContent>
        }
      />
      <Route
        path="/imagem-para-pdf"
        element={
          <MainContent>
            <ConvertImage />
          </MainContent>
        }
      />
      <Route
        path="/word-para-pdf"
        element={
          <MainContent>
            <ConvertWord />
          </MainContent>
        }
      />
      <Route
        path="/pdf-para-word"
        element={
          <MainContent>
            <PDFToWord />
          </MainContent>
        }
      />
      <Route
        path="/pdf-para-imagem"
        element={
          <MainContent>
            <PDFToImage />
          </MainContent>
        }
      />
      <Route
        path="/mesclar-pdf"
        element={
          <MainContent>
            <MergePDF />
          </MainContent>
        }
      />
    </Routes>
  );
}
