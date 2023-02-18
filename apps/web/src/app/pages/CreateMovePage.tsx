import { gql, useMutation } from "@apollo/client"

import { CreateMoveDocument } from "@routine-lab/apollo-api"
import { CreateMoveForm, GeneralWrapper } from "@routine-lab/ui"

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

export default CreateMovePage
