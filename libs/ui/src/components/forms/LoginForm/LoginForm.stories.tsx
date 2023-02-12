import { ComponentMeta, ComponentStory } from "@storybook/react"

import { LoginForm } from "./LoginForm"

export default {
  component: LoginForm
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />

export const LoginFormStory = Template.bind({})
