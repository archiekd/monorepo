import { StrictMode } from "react"
import * as ReactDOM from "react-dom/client"
import { ThemeProvider } from "styled-components"

import { ApolloProvider } from "@apollo/client"
import { theme } from "@monorepo/ui"

import App from "./app/app"
import { client } from "./app/graphql"
import { createTheme } from "@mui/material"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={createTheme(theme)}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>
)
