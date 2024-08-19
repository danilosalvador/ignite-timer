import styled from 'styled-components'

export type ButtonVariantType = 'primary' | 'secondary'

interface ButtonContainerProps {
    variant: ButtonVariantType
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    border-radius: 4px;
    border: 0;
    margin: 8px;

    background-color: ${props => props.theme['green-500']};
    color: ${props => props.theme.white};
`
