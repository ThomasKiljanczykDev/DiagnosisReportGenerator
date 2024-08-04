import { type ReactNode, memo, useCallback, useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { type Path, useNavigate } from '@/router';

interface DrawerListItemProps {
    text: string;
    navigateTo: Path;
    icon: ReactNode;
}

const DrawerListItem = memo(function DrawerListItem(props: DrawerListItemProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const selected = useMemo(() => {
        return location.pathname == props.navigateTo;
    }, [location.pathname, props.navigateTo]);

    const handleClick = useCallback(() => {
        navigate(props.navigateTo);
    }, [navigate, props.navigateTo]);

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={handleClick} selected={selected}>
                <ListItemIcon>{props.icon}</ListItemIcon>
                <ListItemText primary={props.text} />
            </ListItemButton>
        </ListItem>
    );
});

export default DrawerListItem;
