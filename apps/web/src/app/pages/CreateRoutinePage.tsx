import React from "react"
import { useParams } from "react-router-dom"

// eslint-disable-next-line @typescript-eslint/ban-types
type CreateRoutinePageProps = {}

const CreateRoutinePage: React.FC<CreateRoutinePageProps> = () => {
  const { apparatus } = useParams()

  return <div>Create {apparatus} Routine Page!</div>
}

export default CreateRoutinePage
