import type { ReactNode } from "react";
import { Card, IconWrapper, Title, Desc } from "./styled";

interface FerramentaCardProps {
  icon: ReactNode;
  color: string;
  title: string;
  desc: string;
  onClick?: () => void;
  badge?: ReactNode;
}

export function FerramentCard({
  icon,
  color,
  title,
  desc,
  onClick,
  badge,
}: FerramentaCardProps) {
  return (
    <Card color={color} onClick={onClick}>
      <IconWrapper color={color}>{icon}</IconWrapper>
      {badge}
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
    </Card>
  );
}
