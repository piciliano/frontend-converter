import styled from "styled-components";

export const ToggleBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 12px;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.card};
  }
`;
