import { CountdownContainer, TimeSeparator } from './styles'

export function Countdown() {
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <TimeSeparator>:</TimeSeparator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
