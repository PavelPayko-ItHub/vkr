import { type icons } from './icon-configs'

export type TIconName = keyof typeof icons

export interface IconProps {
    name: TIconName
    className?: string
    width?: number | string
    height?: number | string
    color?: string
}
