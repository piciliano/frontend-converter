import { useState } from "react";
import { Dropzone } from "../../components/dropzone/Dropzone";
import { FileProcessorResult } from "../fileProcessor/FileProcessorResult";
import { api } from "../../api";
import { Button } from "../../components/button/Button";

export const ConvertImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setError(null);
    setDownloadUrl(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setDownloadUrl(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post("/convert/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      pollStatus(data.job_id);
    } catch (e) {
      setError("Erro ao enviar o arquivo.");
      setLoading(false);
    }
  };

  const pollStatus = async (jobId: string) => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const { data } = await api.get(`/convert/image/status/${jobId}`, {
          responseType: "blob",
          validateStatus: (status) => true,
        });
        if (data.type === "application/pdf") {
          const url = window.URL.createObjectURL(data);
          setDownloadUrl(url);
          setLoading(false);
          clearInterval(interval);
        } else if (data.error) {
          setError(data.error);
          setLoading(false);
          clearInterval(interval);
        }
      } catch {
        setError("Erro ao verificar status.");
        setLoading(false);
        clearInterval(interval);
      }
      if (attempts > 30) {
        setError("Tempo limite atingido.");
        setLoading(false);
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <div>
      <h2>Imagem para PDF</h2>
      <Dropzone onFile={handleFile} />
      {file && <p>Arquivo selecionado: {file.name}</p>}
      <Button
        onClick={handleUpload}
        disabled={!file || loading}
        style={{ marginTop: 8, marginBottom: 8 }}
      >
        {loading ? "Enviando..." : "Converter"}
      </Button>
      <FileProcessorResult
        loading={loading}
        error={error}
        downloadUrl={downloadUrl}
        downloadLabel="Baixar PDF"
        downloadName="imagem_convertida.pdf"
      />
    </div>
  );
};
