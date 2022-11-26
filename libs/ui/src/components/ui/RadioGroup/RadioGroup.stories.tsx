import { ComponentMeta, ComponentStory } from "@storybook/react"

import { UiRadioGroup } from "./RadioGroup"

export default {
  component: UiRadioGroup
} as ComponentMeta<typeof UiRadioGroup>

const Template: ComponentStory<typeof UiRadioGroup> = (args) => <UiRadioGroup {...args}></UiRadioGroup>

export const Default = Template.bind({})

Default.parameters = {
  controls: { include: ["options", "size"] }
}
Default.args = {
  options: [
    { value: "floor", label: "Floor" },
    { value: "pommel", label: "Pommels" }
  ]
}
