import { ComponentMeta, ComponentStory } from "@storybook/react"
import { UiButton } from "./UiButton"

export default {
  component: UiButton
} as ComponentMeta<typeof UiButton>

const Template: ComponentStory<typeof UiButton> = (args) => <UiButton {...args}>{args.children}</UiButton>

export const Default = Template.bind({})

Default.parameters = {
  controls: { include: ["children", "color", "variant", "size"] }
}
Default.args = {
  children: "Button",
  variant: "outlined",
  color: "primary"
}
