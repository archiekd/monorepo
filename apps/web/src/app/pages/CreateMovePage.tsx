import React from "react"

import { gql, useMutation } from "@apollo/client"

import { CreateMoveForm, GeneralWrapper } from "@routine-lab/ui"

import { ApparatusName, CopGroup, CreateMoveDocument, MoveValue } from "../../generated/types"

gql`
  mutation createMove($newMoveInput: NewMoveInput!) {
    createMove(newMoveInput: $newMoveInput) {
      ...DefaultMoveValues
    }
  }
`

type FormValues = {
  name: string
  description: string | null | undefined
  value: string | undefined
  doubleRotation: boolean
  apparatus: string | undefined
  group: string | undefined
}

const CreateMovePage: React.FC = () => {
  const [createMove] = useMutation(CreateMoveDocument)

  const onSubmit = async (values: FormValues): Promise<void> => {
    console.log(values.group)
    await createMove({
      variables: {
        newMoveInput: {
          apparatus: values.apparatus as ApparatusName,
          copGroup: values.group as CopGroup,
          description: values.description || "",
          isDoubleRotation: values.doubleRotation,
          letterValue: values.value as MoveValue
        }
      }
    })
  }
  return (
    <GeneralWrapper>
      <CreateMoveForm onSubmit={onSubmit} />
    </GeneralWrapper>
  )
}

export default CreateMovePage
