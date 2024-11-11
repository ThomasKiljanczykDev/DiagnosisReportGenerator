import { memo } from 'react';

import { MaterialSymbol } from 'react-material-symbols';

import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import BiotechRoundedIcon from '@mui/icons-material/BiotechRounded';
import CoronavirusRoundedIcon from '@mui/icons-material/CoronavirusRounded';
import MedicalInformationRoundedIcon from '@mui/icons-material/MedicalInformationRounded';
import MedicationRoundedIcon from '@mui/icons-material/MedicationRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { Drawer, List } from '@mui/material';

import DrawerHeaderListItem from '@/modules/core/components/DrawerHeaderListItem';
import DrawerListItem from '@/modules/core/components/DrawerListItem';

export const drawerWidth = 240;

const AppDrawer = memo(function MainDrawer() {
    return (
        <Drawer
            sx={{
                flexShrink: 0,
                width: drawerWidth,
                minWidth: drawerWidth,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    transition: 'background-color 0.3s'
                }
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                <DrawerHeaderListItem text="Raporty" />
                <DrawerListItem
                    navigateTo="/reports/patients"
                    text="Pacjenci"
                    icon={<ArticleRoundedIcon />}
                />
                <DrawerHeaderListItem text="Ustawienia" />
                <DrawerListItem
                    text="Personel"
                    navigateTo="/settings/staff"
                    icon={<PeopleRoundedIcon />}
                />
                <DrawerListItem
                    text="Rozpoznania"
                    navigateTo="/settings/diagnoses"
                    icon={<MedicalInformationRoundedIcon />}
                />
                <DrawerListItem
                    text="Zalecenia"
                    navigateTo="/settings/recommendations"
                    icon={<MedicationRoundedIcon />}
                />
                <DrawerListItem
                    text="Metody Badań"
                    navigateTo="/settings/test-methods"
                    icon={<BiotechRoundedIcon />}
                />
                {/* TODO: Find a better icon in the future */}
                <DrawerListItem
                    text="Mutacje"
                    navigateTo="/settings/mutations"
                    icon={<MaterialSymbol icon="microbiology" size={24} />}
                />
                <DrawerListItem
                    text="Geny"
                    navigateTo="/settings/genes"
                    icon={<MaterialSymbol icon="genetics" size={24} />}
                />
                <DrawerListItem
                    text="Choroby"
                    navigateTo="/settings/illnesses"
                    icon={<CoronavirusRoundedIcon />}
                />
            </List>
        </Drawer>
    );
});

export default AppDrawer;
