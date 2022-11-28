import { useState } from "react"

import { ComponentMeta, ComponentStory } from "@storybook/react"

import { NavigationBar, NavigationBarProps } from "./NavigationBar"

export default {
  component: NavigationBar
} as ComponentMeta<typeof NavigationBar>

const Template: ComponentStory<typeof NavigationBar> = (args) => {
  const [activeTab, setActiveTab] = useState<NavigationBarProps["activeItem"]>(args.activeItem)
  return (
    <NavigationBar
      {...args}
      activeItem={activeTab}
      onClick={(value) => {
        setActiveTab(value)
      }}
    />
  )
}

export const NavigationBarStory = Template.bind({})
NavigationBarStory.args = {
  activeItem: "home"
}
