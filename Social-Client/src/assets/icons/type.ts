export default interface Props {
  width: string
  height: string
  fill?: string
}

export interface NavigationProps extends Props {
  active?: boolean
  theme?: boolean
}
