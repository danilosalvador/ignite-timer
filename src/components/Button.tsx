import { ButtonContainer, ButtonVariantType } from './Button.styles'

interface ButtonProps {
  variant?: ButtonVariantType
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}>Test</ButtonContainer>
}
