import { type CSSProperties, type FC } from 'react'

import { type IContainerProps } from './container-types'

import styles from './container.module.css'
import { cn } from '../../core/utils/class-names'

export const ContainerComponent: FC<IContainerProps> = ({
    children,
    className,
    style,
    maxWidth = 960
}) => {
    const settings: CSSProperties = { ...style, maxWidth }
    return (
        <div
            style={settings}
            className={cn(styles.container, [className])}
        >
            {children}
        </div>
    )
}
