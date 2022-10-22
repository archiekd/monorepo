import { BrowserRouter } from "react-router-dom"

import { ApolloProvider } from "@apollo/client"
import { createTheme, CssBaseline } from "@mui/material"
import { ThemeProvider } from "styled-components"

import { theme } from "@routine-lab/ui"

import { client } from "./graphql"
import Router from "./routes"

export function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={createTheme(theme)}>
        <CssBaseline />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
