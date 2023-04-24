import { RoutinePageController } from "./RoutinePageController"

type Props = {
  apparatusName: string
  routineId: string
}

export const EditRoutineController = ({}: Props) => {
  return <RoutinePageController onSelect={async (move) => {}} routine={[]} />
}
