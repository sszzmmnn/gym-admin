import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import SportsGymnasticsRounded from '@mui/icons-material/SportsGymnasticsRounded';
import { SvgIconProps } from '@mui/material';

import NewPass from './components/NewPass';
import NewClass from './components/NewClass';

// React.ReactElement if you want to put in the entire icon (with angle brackets) and not just its name
export const sidebarListItems: { title: string, icon: React.ElementType<SvgIconProps>, path: string }[] = [
    {
        title: 'Users',
        icon: GroupRoundedIcon,
        path: 'user'
    },
    {
        title: 'Members',
        icon: AutoAwesomeRoundedIcon,
        path: 'member'
    },
    {
        title: 'Passes',
        icon: ConfirmationNumberRoundedIcon,
        path: 'pass'
    },
    {
        title: 'Invoices',
        icon: ReceiptRoundedIcon,
        path: 'invoice'
    },
    {
        title: 'Classes',
        icon: SportsGymnasticsRounded,
        path: 'class'
    }
]

export const COMPONENTS = {
    PASS: NewPass,
    CLASS: NewClass
}