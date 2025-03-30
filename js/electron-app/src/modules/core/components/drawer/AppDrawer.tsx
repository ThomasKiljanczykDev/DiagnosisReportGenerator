import { memo } from 'react';

import { GeneticsRounded, MicrobiologyRounded } from '@mui-symbols-material/w400';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import BiotechRoundedIcon from '@mui/icons-material/BiotechRounded';
import CoronavirusRoundedIcon from '@mui/icons-material/CoronavirusRounded';
import MedicalInformationRoundedIcon from '@mui/icons-material/MedicalInformationRounded';
import MedicationRoundedIcon from '@mui/icons-material/MedicationRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { Drawer, List } from '@mui/material';

import DrawerHeaderListItem from '@/modules/core/components/drawer/DrawerHeaderListItem';
import DrawerListItem from '@/modules/core/components/drawer/DrawerListItem';

const drawerWidth = 240;

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
                <DrawerListItem
                    text="Mutacje"
                    navigateTo="/settings/mutations"
                    icon={<MicrobiologyRounded />}
                />
                <DrawerListItem
                    text="Geny"
                    navigateTo="/settings/genes"
                    icon={<GeneticsRounded />}
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
