import { gql, useMutation } from "@apollo/client"
import { FormValues } from "libs/ui/src/components/forms/CreateMoveForm/schema"

import { CreateMoveDocument } from "@routine-lab/apollo-api"
import { CreateMoveForm, GeneralWrapper } from "@routine-lab/ui"

gql`
  mutation createMove($newMoveInput: NewMoveInput!) {
    createMove(newMoveInput: $newMoveInput) {
      ...DefaultMoveValues
    }
  }
`

type Props = {}

export default function CreateMovePageController({}: Props) {
  const [createMove] = useMutation(CreateMoveDocument)

  const onSubmit = async (values: FormValues): Promise<void> => {
    await createMove({
      variables: {
        newMoveInput: {
          apparatus: values.apparatus,
          copGroup: values.group,
          description: values.description || "",
          isDoubleRotation: values.doubleRotation,
          letterValue: values.value
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
