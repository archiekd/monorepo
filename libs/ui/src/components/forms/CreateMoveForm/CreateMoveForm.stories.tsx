import { ComponentMeta, ComponentStory } from "@storybook/react"

import { CreateMoveForm } from "./CreateMoveForm"

export default {
  component: CreateMoveForm,
  argTypes: {
    onSubmit: {
      action: "onSubmit"
    }
  }
} as ComponentMeta<typeof CreateMoveForm>

const Template: ComponentStory<typeof CreateMoveForm> = (args) => <CreateMoveForm {...args} />

export const Default = Template.bind({})
