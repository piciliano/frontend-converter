import { useState, useEffect } from "react";
import styled from "styled-components";
import { Dropzone } from "../../components/dropzone/Dropzone";
import { Button } from "../../components/button/Button";
import { Loader } from "../../components/loader/Loader";
import { PDFDocument } from 'pdf-lib';
import "pdfjs-dist/web/pdf_viewer.css";
import { MdPictureAsPdf } from "react-icons/md";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 32px 24px;
`;

const StatusMsg = styled.div`
  margin-top: 18px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const FileName = styled.span`
  display: block;
  margin: 16px 0 8px 0;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 320px;
`;

const PagesInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 12px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const PdfIconsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 16px 0;
`;

const PdfIconBox = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid ${({ selected, theme }) => selected ? theme.colors.primary : theme.colors.border};
  border-radius: 6px;
  padding: 8px 6px 2px 6px;
  cursor: pointer;
  background: ${({ selected, theme }) => selected ? theme.colors.primary + '22' : 'transparent'};
  transition: border 0.2s, background 0.2s;
  min-width: 54px;
`;

export function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<string>("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const PAGES_PER_VIEW = 20;

  useEffect(() => {
    if (!file) {
      setNumPages(0);
      setSelectedPages([]);
      setCurrentPage(0);
      return;
    }
    const getNumPages = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();
        setNumPages(pageCount);
        setSelectedPages(Array.from({ length: pageCount }, (_, i) => i));
      } catch (err) {
        setError("Erro ao processar o PDF. Tente outro arquivo.");
        setNumPages(0);
        setSelectedPages([]);
        setCurrentPage(0);
        console.error('Erro ao processar PDF:', err);
      }
    };
    getNumPages();
  }, [file]);

  const togglePage = (idx: number) => {
    setSelectedPages((prev) =>
      prev.includes(idx)
        ? prev.filter((i) => i !== idx)
        : [...prev, idx].sort((a, b) => a - b)
    );
  };

  const selectAll = () => setSelectedPages(Array.from({ length: numPages }, (_, i) => i));
  const clearAll = () => setSelectedPages([]);

  const onFile = (f: File) => {
    if (f.type !== "application/pdf") {
      setError("Apenas arquivos PDF são permitidos.");
      return;
    }
    setFile(f);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Selecione um arquivo PDF.");
      return;
    }
    if (selectedPages.length === 0) {
      setError("Selecione pelo menos uma página.");
      return;
    }
    console.log('Páginas selecionadas para envio:', selectedPages);
    setLoading(true);
    setError(null);
    setStatus(null);
    setDownloadUrl(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pages", JSON.stringify(selectedPages));
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/convert/split-pdf`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log('Resposta do backend:', data);
      if (data.job_id) {
        setJobId(data.job_id);
        setStatus("Processando...");
        checkStatus(data.job_id);
      } else {
        setError("Erro ao enviar arquivo.");
      }
    } catch {
      setError("Erro ao conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (jobId: string) => {
    setLoading(true);
    try {
      const interval = setInterval(async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/convert/split-pdf/status/${jobId}`);
        if (res.headers.get("content-type")?.includes("application/pdf")) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setStatus("Concluído! Clique para baixar o PDF gerado.");
          clearInterval(interval);
          setLoading(false);
        } else {
          const data = await res.json();
          if (data.status === "finished") {
            setStatus("Concluído! Clique para baixar o PDF gerado.");
            clearInterval(interval);
            setLoading(false);
          } else if (data.error) {
            setError(data.error);
            clearInterval(interval);
            setLoading(false);
          } else {
            setStatus("Processando...");
          }
        }
      }, 2000);
    } catch {
      setError("Erro ao consultar status do processamento.");
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 style={{ textAlign: "center", marginBottom: 18 }}>Dividir PDF</h2>
      <p style={{ color: "#6c757d", textAlign: "center", marginBottom: 18 }}>
        Separe todas as páginas ou extraia apenas as que desejar de um PDF
      </p>
      <Dropzone onFile={onFile} accept="application/pdf" />
      {file && <FileName title={file.name}>{file.name}</FileName>}
      {numPages > 0 && (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <Button type="button" onClick={selectAll} disabled={selectedPages.length === numPages}>Selecionar todas</Button>
            <Button type="button" onClick={clearAll} disabled={selectedPages.length === 0}>Limpar seleção</Button>
          </div>
          <PdfIconsGrid>
            {Array.from({ length: Math.min(PAGES_PER_VIEW, numPages - currentPage * PAGES_PER_VIEW) }, (_, idx) => {
              const pageIdx = currentPage * PAGES_PER_VIEW + idx;
              return (
                <PdfIconBox key={pageIdx} selected={selectedPages.includes(pageIdx)} onClick={() => togglePage(pageIdx)} title={`Página ${pageIdx + 1}`}>
                  <MdPictureAsPdf size={36} color={selectedPages.includes(pageIdx) ? '#005CA9' : '#6c757d'} />
                  <div style={{ textAlign: 'center', fontSize: 13, color: '#6c757d', marginTop: 2 }}>Página {pageIdx + 1}</div>
                </PdfIconBox>
              );
            })}
          </PdfIconsGrid>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8 }}>
            <Button type="button" onClick={() => setCurrentPage((p) => Math.max(0, p - 1))} disabled={currentPage === 0}>Anterior</Button>
            <span style={{ alignSelf: 'center', color: '#6c757d' }}>
              Página {currentPage + 1} de {Math.ceil(numPages / PAGES_PER_VIEW)}
            </span>
            <Button type="button" onClick={() => setCurrentPage((p) => p + 1)} disabled={(currentPage + 1) * PAGES_PER_VIEW >= numPages}>Próxima</Button>
          </div>
        </>
      )}
      <Button onClick={handleSubmit} disabled={loading || !file || selectedPages.length === 0} style={{ width: "100%", marginTop: 12 }}>
        {loading ? <Loader /> : "Dividir PDF"}
      </Button>
      {status && <StatusMsg>{status}</StatusMsg>}
      {downloadUrl && (
        <a href={downloadUrl} download="pdf-dividido.pdf">
          <Button style={{ width: "100%", marginTop: 16 }}>Baixar PDF</Button>
        </a>
      )}
      {error && <StatusMsg style={{ color: "#d32f2f" }}>{error}</StatusMsg>}
    </Container>
  );
} 