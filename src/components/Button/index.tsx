import { ButtonHTMLAttributes, ReactElement } from "react";
import { ButtonContainer } from "./styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: ReactElement;
}

export function Button({ text, icon, ...rest }: ButtonProps) {
  return (
    <ButtonContainer {...rest}>
      {icon} {text}
    </ButtonContainer>
  );
}
