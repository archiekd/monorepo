import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import "../src/theme/base.css"
import { theme } from "../src/theme/default"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
  docs: {
    inlineStories: false
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={createTheme(theme)}>
      <div
        style={
          {
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            // height: "100vh"
          }
        }
      >
        <CssBaseline />
        <Story />
      </div>
    </ThemeProvider>
  )
]
