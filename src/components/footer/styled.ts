import styled from "styled-components";

export const FooterBg = styled.footer`
  background: #005ca9;
  color: #fff;
  padding: 64px 0 0 0;
  font-family: "Roboto", Arial, sans-serif;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
`;

export const FooterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  justify-content: space-between;
  padding: 0 32px;
`;

export const Col = styled.div`
  flex: 1 1 280px;
  min-width: 260px;
  margin-bottom: 32px;
`;

export const Logo = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 1.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

export const SubLogo = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 12px;
  letter-spacing: 2.5px;
  opacity: 0.9;
`;

export const Desc = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 24px;
  opacity: 0.9;
`;

export const Title = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  padding-bottom: 8px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  margin-bottom: 14px;
  font-size: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.5;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateX(4px);
  }

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

export const Social = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 16px;

  svg {
    font-size: 1.2rem;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-2px) scale(1.1);
      opacity: 0.9;
    }
  }
`;

export const BottomBar = styled.div`
  background: rgba(0, 0, 0, 0.15);
  color: #fff;
  padding: 20px 0;
  margin-top: 32px;
  text-align: center;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
  }
`;
