import { ThemeProvider } from '@emotion/react'
import theme from './theme'

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme= {theme}>

      { children }
    </ThemeProvider>
    
  )
}
