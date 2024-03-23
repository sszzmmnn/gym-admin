import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import Home from './pages/Home';
import Login from './pages/Login';

import RootLayout from './layouts/RootLayout';

import RequireAuth from './middleware/requireAuth';

import '@fontsource/inter';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route path='login' element={<Login />} />
        <Route element={ <RequireAuth allowedRoles={[100]} /> }>
          <Route index element={<Home />} />
        </Route>
      </Route>
    )
  );
  return (
    <RouterProvider router={router}/>
  )
}

export default App
