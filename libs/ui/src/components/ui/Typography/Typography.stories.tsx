import { ComponentMeta, ComponentStory } from "@storybook/react"

import { UiTypography } from "./Typography"

export default {
  component: UiTypography
} as ComponentMeta<typeof UiTypography>

const Template: ComponentStory<typeof UiTypography> = (args) => <UiTypography {...args}>{args.children}</UiTypography>

export const Default = Template.bind({})

Default.parameters = {
    controls: {include: ["children", "weight", "size", "lHeight", "customColor"]}
}
Default.args = {
    children: "Text",
    weight: "regular",
    size: "md",
    lHeight: "lg"
}