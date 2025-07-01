import styled from "styled-components";

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
  min-height: calc(100vh - 64px - 220px);
  margin-bottom: 80px;

  @media (max-width: 900px) {
    max-width: 98vw;
    padding: 16px;
  }
  @media (max-width: 600px) {
    padding: 8px;
    margin-bottom: 32px;
  }
`;
