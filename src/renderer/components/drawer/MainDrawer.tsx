import { memo } from 'react';

import DrawerListItem from '@/renderer/components/drawer/DrawerListItem';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Divider, Drawer, List, Toolbar } from '@mui/material';

const drawerWidth = 240;

const MainDrawer = memo(function MainDrawer() {
    return (
        <Drawer
            sx={{
                flexShrink: 0,
                width: drawerWidth,
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
                    navigateTo={'/reports'}
                    text={'Raporty'}
                    icon={<ArticleRoundedIcon />}
                />
            </List>
            <Divider />
            <List>
                <DrawerListItem
                    navigateTo={'/settings/genes'}
                    text={'Ustawienia'}
                    icon={<SettingsRoundedIcon />}
                />
            </List>
        </Drawer>
    );
});

export default MainDrawer;
