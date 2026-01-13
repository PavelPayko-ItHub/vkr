import { type FC } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import { RoutePath } from 'components/app-router/routes'

import { useAppSelector } from 'core/hooks/rtk'
import { getUserInfo } from 'core/user/user-selectors'

import styles from './auth.module.css'

export const AuthComponent: FC = () => {
    const location = useLocation()
    // const [currentPage, setCurrentPage] = useState('login')
    // const handleAuthMode = (value: string): void => {
    //     setCurrentPage(value)
    // }

    const userInfo = useAppSelector(getUserInfo)
    if (userInfo) {
        const path: string = location.state?.from?.pathname
        return <Navigate to={path ? `${path}` : `${RoutePath.main}`}/>
    }

    return (
        <div className={styles.overlay}>
            Auth
        </div>
    )
}
