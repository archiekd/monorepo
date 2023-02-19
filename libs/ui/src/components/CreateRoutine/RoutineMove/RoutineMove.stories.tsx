import { ComponentMeta, ComponentStory } from "@storybook/react"

import { RoutineMove } from "./RoutineMove"

export default {
  component: RoutineMove
} as ComponentMeta<typeof RoutineMove>

const Template: ComponentStory<typeof RoutineMove> = (args) => <RoutineMove {...args} />

export const Default = Template.bind({})

Default.parameters = {
  controls: { include: ["letterValue", "pointValue", "moveDescription"] }
}
Default.args = {
  moveDescription: "Double salto w/ double twist",
  letterValue: "D",
  pointValue: 0.4
}
