import { ComponentMeta, ComponentStory } from "@storybook/react"

import { StartValueBox } from "./StartValueBox"

export default {
  component: StartValueBox
} as ComponentMeta<typeof StartValueBox>

const Template: ComponentStory<typeof StartValueBox> = (args) => <StartValueBox {...args} />

export const WithValues = Template.bind({})
WithValues.args = {
  eScore: 10,
  dScore: {
    movesScore: 2.3,
    requirements: 2.5,
    connections: 0.1
  },
  totalStart: 14.9
}

export const NoValues = Template.bind({})
