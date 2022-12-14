import {FC, ReactNode, useEffect} from 'react';
import {TypeComponentAuthFields} from "@/shared/types/auth.types";
import {useAuth} from "@/hooks/useAuth";
import {useActions} from "@/hooks/useActions";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {ssr: false})

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<TypeComponentAuthFields & IAuthProviderProps> = (
  {
    children, Component: {isOnlyAdmin, isOnlyUser}
  }) => {

  const {user} = useAuth()
  const {logout, checkAuth} = useActions()

  const {pathname} = useRouter()

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) checkAuth()
  }, [])

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken')
    if (!refreshToken && user) logout()
  }, [pathname])

  return !isOnlyAdmin && !isOnlyUser ? <>{children}</> : <DynamicCheckRole Component={{isOnlyAdmin, isOnlyUser}}>
    {children}
  </DynamicCheckRole>
};