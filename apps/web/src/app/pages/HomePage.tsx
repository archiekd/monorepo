import React from "react"

import { GeneralWrapper } from "@routine-lab/ui"

import HomeController from "../controllers/HomeController"

const HomePage: React.FC = () => {
  return (
    <GeneralWrapper>
      <HomeController />
    </GeneralWrapper>
  )
}

export default HomePage
