import { useNavigate } from "react-router-dom"

import { ApparatusPicker } from "@routine-lab/ui"

// type Props = {}

export default function HomeController() {
  const navigate = useNavigate()
  return <ApparatusPicker onSelect={(apparatus) => navigate(`/routine/${apparatus}/create`)} />
}
