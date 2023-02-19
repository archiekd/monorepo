import { ComponentMeta, ComponentStory } from "@storybook/react"

import { CreateRoutineForm } from "./CreateRoutineForm"

export default {
  component: CreateRoutineForm
} as ComponentMeta<typeof CreateRoutineForm>

const Template: ComponentStory<typeof CreateRoutineForm> = (args) => <CreateRoutineForm {...args} />

export const CreateRoutineFormStory = Template.bind({})

CreateRoutineFormStory.parameters = {
  controls: { include: ["title", "startValue", "addMove"] }
}

CreateRoutineFormStory.args = {
  title: "Floor",
  startValue: {
    eScore: 10,
    dScore: {
      movesScore: 2.3,
      requirements: 2.5,
      connections: 0.1
    },
    totalStart: 14.9
  },
  routine: [
    [
      {
        letterValue: "C",
        moveDescription: "Test",
        pointValue: 0.3
      },
      {
        letterValue: "C",
        moveDescription: "Test",
        pointValue: 0.3
      }
    ],
    {
      letterValue: "C",
      moveDescription: "Test",
      pointValue: 0.3
    },
    {
      letterValue: "C",
      moveDescription: "Test",
      pointValue: 0.3
    },
    [
      {
        letterValue: "C",
        moveDescription: "Test",
        pointValue: 0.3
      },
      {
        letterValue: "C",
        moveDescription: "Test",
        pointValue: 0.3
      }
    ],
    {
      letterValue: "C",
      moveDescription: "Test",
      pointValue: 0.3
    }
  ]
}
