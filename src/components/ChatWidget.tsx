import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { FaTimes, FaUpload, FaPaperPlane } from "react-icons/fa";

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 32px;
  width: 400px;
  max-width: 98vw;
  height: 540px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  z-index: 10001;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    right: 0;
    bottom: 0;
    border-radius: 0;
    max-width: 100vw;
    box-shadow: none;
  }
`;

const Header = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.15rem;
  font-weight: 600;
  @media (max-width: 600px) {
    padding: 16px 14px;
  }
`;

const Body = styled.div`
  padding: 18px 24px 12px 24px;
  flex: 1;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    padding: 14px 8px 8px 8px;
  }
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MessageBubble = styled.div<{ from: "user" | "bot" }>`
  max-width: 80%;
  margin: 10px 0;
  align-self: ${({ from }) => (from === "user" ? "flex-end" : "flex-start")};
  background: ${({ from, theme }) =>
    from === "user" ? theme.colors.primary : theme.colors.secondaryBackground};
  color: ${({ from, theme }) =>
    from === "user" ? "#fff" : theme.colors.text};
  border-radius: 18px;
  padding: 12px 18px;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  display: flex;
  align-items: flex-end;
  gap: 8px;
  word-break: break-word;
`;

const Avatar = styled.div<{ from: "user" | "bot" }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ from, theme }) =>
    from === "user" ? theme.colors.primary : "#e0e0e0"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ from }) => (from === "user" ? "#fff" : "#333")};
  font-size: 1.1rem;
  margin-right: ${({ from }) => (from === "bot" ? "8px" : "0")};
  margin-left: ${({ from }) => (from === "user" ? "8px" : "0")};
`;

const InputArea = styled.form`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  padding: 16px 24px 8px 24px;
  gap: 10px;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.secondaryBackground};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition: border 0.2s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SendButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-left: 4px;
  &:hover {
    background: #004377;
  }
  @media (max-width: 600px) {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    max-width: 36px;
    max-height: 36px;
    font-size: 1.05rem;
    padding: 0;
  }
`;

const UploadIconButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.secondaryBackground};
  border: none;
  border-radius: 8px;
  width: 42px;
  height: 42px;
  cursor: pointer;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.primary};
  transition: background 0.2s, color 0.2s;
  margin-right: 6px;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`;

const FileName = styled.span`
  display: block;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: 6px;
  padding: 4px 10px;
  margin-top: 4px;
  margin-left: 52px;
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatWidget = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [messages, setMessages] = useState<{from: "user"|"bot", text: string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [docId, setDocId] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function sendToBackend(question: string) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("doc_id", docId || "default");
      formData.append("question", question);
      const res = await fetch("http://127.0.0.1:8000/document/ask", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessages(msgs => [
        ...msgs,
        { from: "bot", text: data.answer || "Não entendi, tente novamente." }
      ]);
    } catch (e) {
      setMessages(msgs => [
        ...msgs,
        { from: "bot", text: "Erro ao conectar com a IA." }
      ]);
    }
    setLoading(false);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("http://127.0.0.1:8000/document/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setDocId(data.doc_id);
      setMessages(msgs => [
        ...msgs,
        { from: "bot", text: "Documento enviado! Agora você pode perguntar sobre ele." }
      ]);
    } catch (e) {
      setMessages(msgs => [
        ...msgs,
        { from: "bot", text: "Erro ao enviar o documento." }
      ]);
    }
    setLoading(false);
  }

  function handleClose() {
    setDocId(null);
    setFileName(null);
    setMessages([]);
    setInput("");
    onClose();
  }

  if (!open) return null;

  return (
    <WidgetContainer>
      <Header>
        <span>Assistente IA</span>
        <FaTimes onClick={handleClose} style={{ cursor: "pointer" }} />
      </Header>
      <Body ref={bodyRef}>
        <MessagesContainer>
          {messages.length === 0 && (
            <MessageBubble from="bot">
              <Avatar from="bot">🤖</Avatar>
              <span>Olá! Como posso ajudar você?</span>
            </MessageBubble>
          )}
          {messages.map((msg, i) => (
            <MessageBubble key={i} from={msg.from}>
              {msg.from === "bot" && <Avatar from="bot">🤖</Avatar>}
              <span>{msg.text}</span>
              {msg.from === "user" && <Avatar from="user">🧑</Avatar>}
            </MessageBubble>
          ))}
        </MessagesContainer>
      </Body>
      <InputArea onSubmit={e => {
        e.preventDefault();
        if (!input.trim() || loading) return;
        setMessages([...messages, {from: "user", text: input}]);
        sendToBackend(input);
        setInput("");
      }}>
        <UploadIconButton htmlFor="file-upload">
          <FaUpload />
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.txt"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileUpload}
            disabled={loading}
          />
        </UploadIconButton>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Digite sua dúvida..."
          disabled={loading}
        />
        <SendButton type="submit" disabled={loading} title="Enviar">
          <FaPaperPlane />
        </SendButton>
      </InputArea>
      {fileName && <FileName>{fileName}</FileName>}
    </WidgetContainer>
  );
}; 