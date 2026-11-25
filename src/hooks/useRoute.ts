import { createContext, useContext } from 'react'
import type { Route } from '../routes'

export const RouteContext = createContext<Route>({ id: 'home', path: '/' })

/** The page being rendered (for nav state) */
export const useRoute = () => useContext(RouteContext)
