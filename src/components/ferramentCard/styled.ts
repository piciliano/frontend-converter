import styled from "styled-components";

export const Card = styled.div<{ color: string }>`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 180px;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  border: 1px solid #f0f0f0;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px) scale(1.02);
  }
`;

export const IconWrapper = styled.div<{ color: string }>`
  background: ${({ color }) => color}22;
  color: ${({ color }) => color};
  border-radius: 6px;
  padding: 8px;
  font-size: 2rem;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #222;
`;

export const Desc = styled.p`
  color: #6c757d;
  font-size: 1rem;
  margin: 0;
`;
