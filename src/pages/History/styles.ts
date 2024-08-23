import styled from 'styled-components'

export const HistoryContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 3.5rem;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;

  margin-top: 2rem;

  table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;

      font-size: 0.875rem;
      text-align: left;
      line-height: 1.6;
      color: ${(props) => props.theme['gray-100']};

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }
      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_VARIANT = {
  InProgress: 'yellow-500',
  Interrupted: 'red-500',
  Completed: 'green-500',
} as const

interface StatusProps {
  variant: keyof typeof STATUS_VARIANT
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_VARIANT[props.variant]]};
  }
`
