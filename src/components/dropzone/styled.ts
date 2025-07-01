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

export const ErrorMsg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 16px;
  border-radius: 6px;
  background: rgba(211, 47, 47, 0.08);
  color: ${({ theme }) => theme.colors.error || '#d32f2f'};
  border: 1.5px solid ${({ theme }) => theme.colors.error || '#d32f2f'};
  font-weight: 500;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(211, 47, 47, 0.07);
`;
