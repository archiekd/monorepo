import { ComponentMeta, ComponentStory } from "@storybook/react"

import { StartValueBox } from "./StartValueBox"

export default {
  component: StartValueBox
} as ComponentMeta<typeof StartValueBox>

const Template: ComponentStory<typeof StartValueBox> = (args) => <StartValueBox {...args} />

export const WithValues = Template.bind({})
WithValues.args = {
  base: 10.0,
  dScore: 2.7,
  requirements: 2.5,
  connections: 0.2,
  totalStart: 15.4
}

export const NoValues = Template.bind({})
