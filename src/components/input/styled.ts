import styled from "styled-components";

export const StyledInput = styled.input`
  padding: ${({ theme }) => theme.spacing(1)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.font.size.medium};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.card};
  outline: none;
  transition: border 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
