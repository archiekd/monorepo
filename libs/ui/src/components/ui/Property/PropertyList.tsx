import { List, ListProps } from "@mui/material"

interface Props extends ListProps {
  children: React.ReactNode
}

export const PropertyList = ({ children, ...rest }: Props) => {
  return (
    <List dense={true} {...rest}>
      {children}
    </List>
  )
}
