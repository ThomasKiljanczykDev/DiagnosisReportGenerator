import { memo } from 'react';

import { MaterialSymbol } from 'react-material-symbols';

import BiotechRoundedIcon from '@mui/icons-material/BiotechRounded';
import CoronavirusRoundedIcon from '@mui/icons-material/CoronavirusRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import MedicalInformationRoundedIcon from '@mui/icons-material/MedicalInformationRounded';
import MedicationRoundedIcon from '@mui/icons-material/MedicationRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { Divider, Drawer, List } from '@mui/material';

import DrawerListItem from '@/modules/core/components/drawer/DrawerListItem';

const drawerWidth = 240;

const SettingsDrawer = memo(function SettingsDrawer() {
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                minWidth: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box'
                }
            }}
            anchor="left"
            variant="permanent"
        >
            <List>
                <DrawerListItem
                    text="Powróć do aplikacji"
                    navigateTo="/reports"
                    icon={<KeyboardBackspaceRoundedIcon />}
                />
            </List>
            <Divider />
            <List>
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

export default SettingsDrawer;
