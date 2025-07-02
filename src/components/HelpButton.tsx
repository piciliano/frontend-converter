import React from "react";
import styled from "styled-components";
import { FaRegCommentDots } from "react-icons/fa";

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 10px 22px;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: #004377;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }

  @media (max-width: 600px) {
    padding: 7px 14px;
    font-size: 0.92rem;
    border-radius: 18px;
    gap: 6px;
  }
`;

export const HelpButton = ({ onClick }: { onClick: () => void }) => (
  <Button onClick={onClick} title="Precisa de ajuda?">
    <FaRegCommentDots size={20} style={{ marginRight: 4 }} />
    Precisa de ajuda?
  </Button>
); 