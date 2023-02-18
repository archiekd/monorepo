import { ComponentMeta, ComponentStory } from "@storybook/react"

import SearchInput from "./SearchInput"

export default {
  component: SearchInput
} as ComponentMeta<typeof SearchInput>

const Template: ComponentStory<typeof SearchInput> = (args) => <SearchInput {...args} />

export const Default = Template.bind({})

Default.parameters = {
  controls: { include: ["searchIcon"] }
}
Default.args = {
  searchIcon: true
}
