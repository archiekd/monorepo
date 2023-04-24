import { useParams } from "react-router-dom"

import BasicWrapper from "libs/ui/src/components/wrappers/BasicWrapper/BasicWrapper"

import CreateRoutineController from "../controllers/CreateRoutineController"

const CreateRoutinePage = () => {
  const { apparatus } = useParams()

  if (!apparatus) return <div>Error finding apparatus</div>

  return (
    <BasicWrapper>
      <CreateRoutineController apparatusName={apparatus} />
    </BasicWrapper>
  )
}

export default CreateRoutinePage
