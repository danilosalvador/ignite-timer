import { ThemeProvider } from 'styled-components'
import { Router } from './Router'

import { defaultTheme } from './styles/theme/default'
import { GlobalStyle } from './styles/global'
import { CyclesContextProvider } from './contexts/CyclesContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>
    </ThemeProvider>
  )
}
