import { StrictMode } from "react"
import * as ReactDOM from "react-dom/client"

import { ApolloProvider } from "@apollo/client"
import { theme } from "@monorepo/ui"
import { createTheme } from "@mui/material"
import { ThemeProvider } from "styled-components"

import App from "./app/App"
import { client } from "./app/graphql"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
