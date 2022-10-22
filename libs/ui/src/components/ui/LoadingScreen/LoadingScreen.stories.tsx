import { ComponentMeta, ComponentStory } from "@storybook/react"

import { LoadingScreen } from "./LoadingScreen"

export default {
  component: LoadingScreen
} as ComponentMeta<typeof LoadingScreen>

const Template: ComponentStory<typeof LoadingScreen> = (args) => <LoadingScreen {...args}></LoadingScreen>

export const Default = Template.bind({})