import Lottie from "react-lottie"

import { Box } from "@mui/material"

import animationData from "../../../assets/loading.json"
import { UiTypography } from "../Typography/Typography"

type Props = {
  loadingString?: string
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}

export const LoadingScreen = ({ loadingString }: Props) => {
  return (
    <Box justifyContent="center" alignItems="center" height="100%" flexDirection="column" flexGrow={1} alignSelf="stretch">
      <Lottie options={defaultOptions} height={200} width={200} speed={2} />
      <UiTypography variant="h3">{loadingString}</UiTypography>
    </Box>
  )
}
