import { ComponentMeta, ComponentStory } from "@storybook/react"

import { ConnectionRoutineMove } from "./ConnectionRoutineMove"

export default {
  component: ConnectionRoutineMove
} as ComponentMeta<typeof ConnectionRoutineMove>

const Template: ComponentStory<typeof ConnectionRoutineMove> = (args) => <ConnectionRoutineMove {...args} />

export const Default = Template.bind({})

Default.parameters = {
  controls: { include: ["moves"] }
}
Default.args = {
  moves: [
    { moveDescription: "Double salto w/ double twist", letterValue: "D", pointValue: 0.4 },
    { moveDescription: "Double salto w/ double twist", letterValue: "D", pointValue: 0.4 }
  ]
}
