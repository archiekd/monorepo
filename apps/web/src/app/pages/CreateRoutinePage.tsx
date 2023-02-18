import { useParams } from "react-router-dom"

import BasicWrapper from "libs/ui/src/components/wrappers/BasicWrapper/BasicWrapper"

import CreateRoutinePageController from "../controllers/CreateRoutinePageController"

const CreateRoutinePage = () => {
  const { apparatus } = useParams()

  if (!apparatus) return <div>Error finding apparatus</div>

  return (
    <BasicWrapper>
      <CreateRoutinePageController apparatusName={apparatus} />
    </BasicWrapper>
  )
}

export default CreateRoutinePage
