import styled from "styled-components";

export const StyledButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #004377;
    color: ${({ theme }) => theme.colors.hoverText};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
    cursor: not-allowed;
  }
`;
