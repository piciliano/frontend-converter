import { useRef, useState } from "react";
import { DropContainer, ErrorMsg } from "./styled";
import { MdErrorOutline } from "react-icons/md";

interface DropzoneProps {
  onFile: (file: File) => void;
  accept?: string;
}

function fileAccepted(file: File, accept?: string): boolean {
  if (!accept) return true;
  const acceptList = accept.split(",").map((a) => a.trim());
  const mime = file.type;
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  return acceptList.some((a) => {
    if (a.startsWith(".")) return ext === a.toLowerCase();
    if (a.includes("/")) return mime === a;
    return false;
  });
}

export const Dropzone = ({ onFile, accept }: DropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!fileAccepted(file, accept)) {
        setError("Tipo de arquivo não suportado.");
        return;
      }
      setError(null);
      onFile(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!fileAccepted(file, accept)) {
        setError("Tipo de arquivo não suportado.");
        return;
      }
      setError(null);
      onFile(file);
    }
  };

  return (
    <DropContainer
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleChange}
        accept={accept}
      />
      Arraste e solte um arquivo aqui ou clique para selecionar
      {error && (
        <ErrorMsg>
          <MdErrorOutline size={22} />
          {error}
        </ErrorMsg>
      )}
    </DropContainer>
  );
};
