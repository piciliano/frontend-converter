import React from "react";
import styled from "styled-components";
import { FaRegCommentDots } from "react-icons/fa";

const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10000;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  box-shadow: 0 6px 24px 0 rgba(0,0,0,0.28), 0 1.5px 6px 0 rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: #004377;
    box-shadow: 0 10px 32px 0 rgba(0,0,0,0.32), 0 2px 8px 0 rgba(0,0,0,0.20);
  }

  @media (max-width: 600px) {
    width: 44px;
    height: 44px;
    font-size: 1.4rem;
    bottom: 16px;
    right: 16px;
  }
`;

export const ChatFloatingButton = ({ onClick }: { onClick: () => void }) => (
  <FloatingButton onClick={onClick} title="Abrir chat de ajuda">
    <FaRegCommentDots />
  </FloatingButton>
); 