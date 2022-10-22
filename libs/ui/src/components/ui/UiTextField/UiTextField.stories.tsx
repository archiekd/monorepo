import { ComponentMeta, ComponentStory } from "@storybook/react"

import { UiTextField } from "./UiTextField"

export default {
  component: UiTextField
} as ComponentMeta<typeof UiTextField>

const Template: ComponentStory<typeof UiTextField> = (args) => <UiTextField {...args}></UiTextField>

export const Default = Template.bind({})

Default.parameters = {
    controls: {include: ["type", "sx", "inputSx", "disableUnderline"]}
}
Default.args = {
    type: "text",
    disableUnderline: true
}