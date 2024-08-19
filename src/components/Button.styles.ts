import styled, { css } from 'styled-components'

export type ButtonVariantType = 'primary' | 'secondary'

interface ButtonContainerProps {
    variant: ButtonVariantType
}

const buttonVariants = {
    primary: 'orange',
    secondary: 'purple',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 100px;

    ${props => {
        return css`
            background-color: ${buttonVariants[props.variant]}
        `
    }}
`
