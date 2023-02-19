import { ComponentMeta, ComponentStory } from "@storybook/react"

import MoveCard from "./MoveCard"

export default {
  component: MoveCard
} as ComponentMeta<typeof MoveCard>

const Template: ComponentStory<typeof MoveCard> = (args) => <MoveCard {...args} />

export const Default = Template.bind({})

Default.parameters = {
  controls: { include: ["id", "description", "letterValue", "pointValue"] }
}
Default.args = {
  id: "test-id",
  description: "Double salto w/ double twist",
  letterValue: "D",
  pointValue: 0.4
}
