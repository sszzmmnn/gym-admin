import { Box, Typography, Alert, IconButton } from "@mui/joy"
import { ReportRounded, CloseRounded } from "@mui/icons-material"
import useApiPath from "../hooks/useApiPath"
import useFetch from "../hooks/useFetch"
import useDisplay from "../hooks/useDisplay"
import { IResponse } from "../types/types"

import DataList from "../components/DataList"
import NewPass from "../components/NewPass"
import Pagination from "../components/Pagination"

const Main = () => {
  const { apiPath } = useApiPath();
  const { display } = useDisplay();
  const {fetch, docCount, error, setError}: {
    fetch: IResponse, 
    docCount: number,
    error: string,
    setError: React.Dispatch<React.SetStateAction<string>>
  } = useFetch();
  
  return (
    <Box
      component='main'
      className='main-content'
      sx={{
        px:{
          xs: 2,
          md: 6
        },
        pt: {
          xs: 'calc(12px + (var(--Header-height, 52px)))',
          md: 3
        },
        pb: {
          xs: 2,
          md: 3
        },
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: 0,
        height: '100dvh',
        gap: 1
      }}
    >
      {error &&
        <Alert
        color='danger'
        variant='soft'
        startDecorator={<ReportRounded />}
        endDecorator={
          <IconButton variant='soft' color='danger' onClick={() => setError('')}>
            <CloseRounded />
          </IconButton>
        }
        >
          <b>Error</b> <Typography level="body-sm" color='danger'>{error}</Typography>
        </Alert>
      }
      {display.isOpen 
        ? display.component
        : apiPath.path 
          ? <>
            <Typography py={2} level='h2'>{apiPath.path.charAt(0).toUpperCase() + apiPath.path.slice(1)}</Typography>
            <DataList data={fetch}/>
            <Pagination docCount={docCount}/>
          </>
          : <>
            <Typography level='h2'>Welcome to the fiTTime Admin Panel!</Typography>
            <Typography level='body-md' py={2}>Click any item to the left to start searching through data.</Typography>
          </>
      }
    </Box>
  )
}

export default Main