import styled from "styled-components";

export const DropContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.secondaryBackground};
  cursor: pointer;
  transition: border 0.2s;

  &:hover {
    border-color: #004377;
  }
`;
