import type { InputHTMLAttributes } from "react";
import { StyledInput } from "./styled";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <StyledInput {...props} />;
};
