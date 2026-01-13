import { type CSSProperties, type FC } from 'react'

import { cn } from 'core/utils/class-names'

import { type IContainerProps } from './container-types'

import styles from './container.module.css'

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
