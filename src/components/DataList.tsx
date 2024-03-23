import Checkbox from "@mui/joy/Checkbox"
import Sheet from "@mui/joy/Sheet"
import Table from "@mui/joy/Table"
import Chip from "@mui/joy/Chip"
import { ColorPaletteProp } from "@mui/joy/styles"
import CheckRounded from "@mui/icons-material/CheckRounded";
import CloseRounded from "@mui/icons-material/CloseRounded"
import PersonRounded from "@mui/icons-material/PersonRounded";
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import LocalPoliceRoundedIcon from '@mui/icons-material/LocalPoliceRounded';
import { IResponse } from "../types/types";
import RowButtons from "./RowButtons"

  /* TODO:
  * 1. Limit count of items being displayed to 20 (if there is more than 20 docs)
  *     no you can't always return the document count, you would always be making 2 DB calls dumbass
  *     so I should change ApiCall.page to 1 or disable the 1st button the fuck do I do
  * 2. Make buttons change ApiCall.page
  *     so I should move them to main? so I don't have to make an ApiCall import here?
  * 3. Look up pagination, there must be an easier way of doing this shit lol
  *     or there's like a way to show a first few buttons then the last one
  *     and if you're on the last one it shows the pages near it ( so like 50, 51, 52 of you're on 52 and 5, 6, 7, 8, 9 if ur on 7)
  * 4. Get this shit working cuh cuz you also got to make the header in gym-front
  */

const DataList = (props: { data: IResponse }) => {
  const { data } = props;

  const renderTableHeaders = () => {
    return data.headers.map(([headerKey, customName]) => {
      if(headerKey === '_id') return <th key={headerKey}>{customName}</th>
      return <th key={headerKey}>{customName}</th>
    });
  };

  const getRoleChip = (roles: string[]) => {
    return roles.map(role => (
      <Chip key={role} variant="soft" size='sm' startDecorator={
        {
          '1001': <PersonRounded />,
          '5000': <FitnessCenterRoundedIcon />,
          '100': <LocalPoliceRoundedIcon />
        }[role]
      }
      color={
        {
          '1001': 'neutral',
          '5000': 'success',
          '100': 'warning'
        }[role] as ColorPaletteProp
      }
      >
        {
        role == '5000'
          ? 'Coach'
          : role == '100'
            ? 'Admin'
            : 'User'
        }
      </Chip>
    ))
  }

  const getFeaturedChip = (isFeatured: boolean) => {
    return <Chip variant="soft" size='sm'
    startDecorator={
      isFeatured
      ? <CheckRounded/>
      : <CloseRounded />
    }
    color={
      {
        'true': 'success',
        'false': 'danger',
      }[isFeatured ? 'true' : 'false'] as ColorPaletteProp
    }
    >
    </Chip>
  }

  return (
    <>
      <Sheet
        className='table-container'
        variant='outlined'
        sx={{
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '0.75rem',
            '--TableCell-paddingX': '0.5rem'
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: 'center', width: 48 }}><Checkbox sx={{ verticalAlign: 'text-bottom'}} /></th>
              {renderTableHeaders()}
              <th style={{width: '120px'}}>Options</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((obj: any, i) =>(
              <tr key={i}>
                <td style={{ textAlign: 'center' }}><Checkbox size='md'/></td>
                {data.headers.map(([headerKey]) => (
                  <>
                    <td style={{wordWrap: 'break-word'}}>{
                      headerKey === 'roles'
                        ? getRoleChip(obj[headerKey])
                        : headerKey === 'featured'
                         ? getFeaturedChip(obj[headerKey])
                         : obj[headerKey]
                    }</td>
                  </>
                ))}
                <td>
                  <RowButtons data={obj} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  )
}

export default DataList