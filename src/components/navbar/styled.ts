import styled from "styled-components";
import { FaTh } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

export const Nav = styled.nav`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  max-width: 180px;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 48px;
  }

  @media (max-width: 700px) {
    max-width: 140px;

    img {
      max-height: 40px;
    }
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 28px;
  align-items: center;
  flex: 1;
  justify-content: center;
  font-family: 'Muller', 'Roboto', Arial, sans-serif;

  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Link = styled(RouterLink)`
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  padding: 8px 12px;
  border-radius: 6px;
  position: relative;
  font-family: 'Muller', 'Roboto', Arial, sans-serif;

  &:hover {
    color: ${({ theme }) => theme.colors.hoverText};
    background: ${({ theme }) => theme.colors.hoverBackground};

    &::before {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 12px;
      right: 12px;
      height: 2px;
      background: #4f46e5;
      border-radius: 2px;
    }
  }
`;

export const AuthArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const LoginBtn = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  padding: 10px 18px;
  border-radius: 8px;
  background: transparent;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 92, 169, 0.05);
  }
`;

export const RegisterBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #004377;
    transform: translateY(-1px);
  }
`;

export const GridIcon = styled(FaTh)`
  font-size: 1.2rem;
  color: #4a5568;
  margin-left: 20px;
  cursor: pointer;
  transition: all 0.2s;
  padding: 10px;
  border-radius: 8px;

  &:hover {
    background: #f8fafc;
    color: #4f46e5;
  }
`;
