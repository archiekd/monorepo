import { ComponentMeta, ComponentStory } from "@storybook/react"

import { MoveListDrawer } from "./MoveListDrawer"

export default {
  component: MoveListDrawer
} as ComponentMeta<typeof MoveListDrawer>

const Template: ComponentStory<typeof MoveListDrawer> = (args) => <MoveListDrawer {...args} />

export const Default = Template.bind({})

Default.parameters = {
  controls: { include: ["isOpen", "closeMoveList", "moves"] }
}
Default.args = {
  isOpen: true,
  moves: [{ id: "1", description: "Double Double", pointValue: 0.4, value: "D" }]
}
