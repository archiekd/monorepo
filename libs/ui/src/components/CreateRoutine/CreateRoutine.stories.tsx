import { ComponentMeta, ComponentStory } from "@storybook/react"

import { CreateRoutine } from "./CreateRoutine"

export default {
  component: CreateRoutine
} as ComponentMeta<typeof CreateRoutine>

const Template: ComponentStory<typeof CreateRoutine> = (args) => <CreateRoutine {...args} />

export const CreateRoutineStory = Template.bind({})
