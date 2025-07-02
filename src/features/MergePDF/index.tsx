import { useState } from "react";
import styled from "styled-components";
import { Dropzone } from "../../components/dropzone/Dropzone";
import { Button } from "../../components/button/Button";
import { Loader } from "../../components/loader/Loader";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 32px 24px;
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0 16px 0;
`;

const FileItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
  padding: 10px 14px;
  margin-bottom: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
`;

const FileName = styled.span`
  flex: 1;
  margin-right: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const StatusMsg = styled.div`
  margin-top: 18px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

export function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFile = (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Apenas arquivos PDF são permitidos.");
      return;
    }
    setFiles((prev) => [...prev, file]);
    setError(null);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newFiles = Array.from(files);
    const [removed] = newFiles.splice(result.source.index, 1);
    newFiles.splice(result.destination.index, 0, removed);
    setFiles(newFiles);
  };

  const remove = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (files.length < 2) {
      setError("Adicione pelo menos dois arquivos PDF.");
      return;
    }
    setLoading(true);
    setError(null);
    setStatus(null);
    setDownloadUrl(null);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("ordem", JSON.stringify(files.map((_, i) => i)));
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/convert/merge-pdf`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.job_id) {
        setJobId(data.job_id);
        setStatus("Processando...");
        checkStatus(data.job_id);
      } else {
        setError("Erro ao enviar arquivos.");
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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/convert/merge-pdf/status/${jobId}`);
        if (res.headers.get("content-type")?.includes("application/pdf")) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setStatus("Concluído! Clique para baixar o PDF mesclado.");
          clearInterval(interval);
          setLoading(false);
        } else {
          const data = await res.json();
          if (data.status === "finished") {
            setStatus("Concluído! Clique para baixar o PDF mesclado.");
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
      <h2 style={{ textAlign: "center", marginBottom: 18 }}>Juntar PDF</h2>
      <p style={{ color: "#6c757d", textAlign: "center", marginBottom: 18 }}>
        Mesclar e juntar pdfs e colocá-los em qualquer ordem que desejar
      </p>
      <Dropzone onFile={onFile} accept="application/pdf" />
      {error && <StatusMsg style={{ color: "#d32f2f" }}>{error}</StatusMsg>}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="pdf-list">
          {(provided) => (
            <FileList ref={provided.innerRef} {...provided.droppableProps}>
              {files.map((file, i) => (
                <Draggable key={file.name + i} draggableId={file.name + i} index={i}>
                  {(provided, snapshot) => (
                    <FileItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        boxShadow: snapshot.isDragging ? '0 4px 16px rgba(0,0,0,0.12)' : undefined,
                        background: snapshot.isDragging ? '#f3f3f3' : undefined,
                      }}
                    >
                      <FileName>{file.name}</FileName>
                      <Actions>
                        <Button type="button" onClick={() => remove(i)}><FaTrash /></Button>
                      </Actions>
                    </FileItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </FileList>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={handleSubmit} disabled={loading || files.length < 2} style={{ width: "100%", marginTop: 12 }}>
        {loading ? <Loader /> : "Mesclar PDFs"}
      </Button>
      {status && <StatusMsg>{status}</StatusMsg>}
      {downloadUrl && (
        <a href={downloadUrl} download="pdf-mesclado.pdf">
          <Button style={{ width: "100%", marginTop: 16 }}>Baixar PDF Mesclado</Button>
        </a>
      )}
    </Container>
  );
} 