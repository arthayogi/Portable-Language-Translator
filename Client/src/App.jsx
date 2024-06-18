import {
  RouterProvider,
  createBrowserRouter,
  redirect
} from 'react-router-dom'
import Login_page from './pages/Login-page'
import Register_page from './pages/Register-page'
import TLJP_Page from './pages/TLJP-page'
import TLEN_Page from './pages/TLEN-page'
import TLKR_Page from './pages/TLKR-page'
import Menu_Page from './pages/Menu-page'

function App() {

  function redirectHomeToLogin() {
    return redirect ("/login")
  }

  function redirectAfterLogin() {
    if(localStorage.access_token) return ("/menu")
  }

  function redirectToLogin() {
    if(!localStorage.access_token) return ("/menu")
  }

  const router = createBrowserRouter([
    {
      path: "/",
      loader: redirectHomeToLogin
    },
    {
      path: "/login",
      element: <Login_page />,
      // loader: redirectAfterLogin
    },
    {
      path: "/register",
      element: <Register_page />
    },
    {
      path: "/menu",
      element: <Menu_Page />,
      // loader: redirectToLogin
    },    {
      path: "/translate-jp",
      element: <TLJP_Page />,
      // loader: redirectToLogin
    },    {
      path: "/translate-en",
      element: <TLEN_Page />,
      // loader: redirectToLogin
    },
    {
      path: "/translate-kr",
      element: <TLKR_Page />,
      // loader: redirectToLogin
    },
  ])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
