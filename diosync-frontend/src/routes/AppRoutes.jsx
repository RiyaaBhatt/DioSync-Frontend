import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from '../pages/notfound/NotFound'
import { AuthRoutes, routeMatch } from './routes'
import SecurityCheck from '../components/themeComponents/SecurityCheck'
import CommonElement from '../pages/CommonElement'
import GuestRoute from './GuestRoute'
import Wrapper from '../components/themeComponents/Wrapper'

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route element={<SecurityCheck />}> */}
        <Route element={<Wrapper />}>
          {(routeMatch.Owner || [])?.map((route, id) => (
            <Route key={id} path={route.path} element={<route.element />} />
          ))}
          {(routeMatch.SuperAdmin || [])?.map((route, id) => (
            <Route key={id} path={route.path} element={<route.element />} />
          ))}
          {(routeMatch.Manager || [])?.map((route, id) => (
            <Route key={id} path={route.path} element={<route.element />} />
          ))}
        </Route>
      {/* </Route> */}

      {AuthRoutes?.map((route, id) => (
        <Route
          key={id}
          path={route.path}
          element={
            <GuestRoute>
              <route.element />
            </GuestRoute>
          }
        />
      ))}
      <Route path='/commonelements' element={<CommonElement />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
