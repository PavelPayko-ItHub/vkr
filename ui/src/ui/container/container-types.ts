import { type CSSProperties, type ReactNode } from 'react'

export interface IContainerProps {
    children?: ReactNode
    className?: string
    style?: CSSProperties
    maxWidth?: number
}
