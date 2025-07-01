import { Button } from "../../components/button/Button";
import styled from "styled-components";
import { Loader } from "../../components/loader/Loader";

const ResultBox = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const ErrorMsg = styled.p`
  color: #d32f2f;
  font-weight: 500;
`;

interface FileProcessorResultProps {
  loading: boolean;
  error?: string | null;
  downloadUrl?: string | null;
  downloadLabel?: string;
  downloadName?: string;
  previewUrl?: string | null;
  previewType?: "image" | "pdf" | "docx";
}

export function FileProcessorResult({
  loading,
  error,
  downloadUrl,
  downloadLabel = "Baixar Arquivo",
  downloadName = "arquivo",
  previewUrl,
  previewType,
}: FileProcessorResultProps) {
  return (
    <ResultBox>
      {loading && <Loader />}
      {downloadUrl && (
        <a href={downloadUrl} download={downloadName}>
          <Button as="span">{downloadLabel}</Button>
        </a>
      )}
      {previewUrl && previewType === "image" && (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ maxWidth: 320, borderRadius: 8, marginTop: 8 }}
        />
      )}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </ResultBox>
  );
}
