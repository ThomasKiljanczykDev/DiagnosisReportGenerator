import { memo } from 'react';

import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Divider, Drawer, List, Toolbar } from '@mui/material';

import DrawerListItem from '@/components/drawer/DrawerListItem';

const drawerWidth = 240;

const MainDrawer = memo(function MainDrawer() {
    return (
        <Drawer
            sx={{
                flexShrink: 0,
                width: drawerWidth,
                minWidth: drawerWidth,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box'
                }
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List>
                <DrawerListItem
                    navigateTo="/reports"
                    text="Raporty"
                    icon={<ArticleRoundedIcon />}
                />
            </List>
            <Divider />
            <List>
                <DrawerListItem
                    navigateTo="/settings/staff"
                    text="Ustawienia"
                    icon={<SettingsRoundedIcon />}
                />
            </List>
        </Drawer>
    );
});

export default MainDrawer;
