import { Box, CssBaseline, CssVarsProvider } from "@mui/joy"
import { ApiPathContextProvider } from "../contexts/ApiPathProvider"
import { DisplayContextProvider } from "../contexts/DisplayProvider"

import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Main from "./Main"

const Home = () => {

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box sx={{display: 'flex', minHeight: '100dvh'}}>
        <Header />
        <ApiPathContextProvider>
          <DisplayContextProvider>
            <Sidebar />
            <Main />
          </DisplayContextProvider>
        </ApiPathContextProvider>
      </Box>
    </CssVarsProvider>
  )
}

export default Home