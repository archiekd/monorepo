import { ComponentMeta, ComponentStory } from "@storybook/react"

import { LoginForm } from "./LoginForm"

export default {
  component: LoginForm,
  argTypes: {
    onSubmit: {
      action: "onSubmit"
    }
  }
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <LoginForm
    onSubmit={(values) => {
      console.log("values", values)
    }}
    handleRegisterClick={() => console.log("register")}
    handleForgotPasswordClick={() => console.log("forgot")}
  />
)

export const Default = Template.bind({})
