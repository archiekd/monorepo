import { ListItem, ListItemText } from "@mui/material"

type Props = {
  label: string
  value: string | React.ReactNode
  color?: string
  maxWidth?: "25%" | "50%" | "75%" | "100%"
}

export const Property = ({ label, value, maxWidth = "25%", color }: Props) => {
  return (
    <ListItem>
      <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} sx={{ maxWidth, color }}>
        {label}
      </ListItemText>
      <ListItemText primaryTypographyProps={{ fontSize: 14, color }}>{value}</ListItemText>
    </ListItem>
  )
}
