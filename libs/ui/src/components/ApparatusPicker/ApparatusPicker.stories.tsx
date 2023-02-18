import { ComponentMeta, ComponentStory } from "@storybook/react"

import { ApparatusPicker } from "./ApparatusPicker"

export default {
  component: ApparatusPicker
} as ComponentMeta<typeof ApparatusPicker>

const Template: ComponentStory<typeof ApparatusPicker> = (args) => <ApparatusPicker {...args} />

export const CreateRoutineFormStory = Template.bind({})
