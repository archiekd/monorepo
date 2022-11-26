import { ComponentMeta, ComponentStory } from "@storybook/react"

import { UiToggle } from "./UiToggle"

export default {
  component: UiToggle
} as ComponentMeta<typeof UiToggle>

const Template: ComponentStory<typeof UiToggle> = (args) => <UiToggle {...args}></UiToggle>

export const Default = Template.bind({})

Default.parameters = {
    controls: {include: ["label", "labelPlacement", "color", "size"]}
}
Default.args = {
    labelPlacement: "end",
    color: "primary",
    size: "medium"
}