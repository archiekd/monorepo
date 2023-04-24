import { useParams } from "react-router-dom"

import BasicWrapper from "libs/ui/src/components/wrappers/BasicWrapper/BasicWrapper"

import { EditRoutineController } from "../controllers/EditRoutineController"

type Props = {}

export const EditRoutinePage = ({}: Props) => {
  const { apparatus, routineId } = useParams()

  if (!apparatus) return <div>Error finding apparatus</div>
  if (!routineId) return <div>Error finding routine id</div>

  return (
    <BasicWrapper>
      <EditRoutineController apparatusName={apparatus} routineId={routineId} />
    </BasicWrapper>
  )
}
