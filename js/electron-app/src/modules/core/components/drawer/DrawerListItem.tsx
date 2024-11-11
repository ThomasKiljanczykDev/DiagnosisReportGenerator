import { type ReactNode, memo, useCallback, useMemo } from 'react';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
    type RegisteredRouter,
    type RoutePaths,
    useLocation,
    useNavigate
} from '@tanstack/react-router';

interface DrawerListItemProps {
    text: string;
    navigateTo: RoutePaths<RegisteredRouter['routeTree']>;
    icon: ReactNode;
}

const DrawerListItem = memo(function DrawerListItem(props: DrawerListItemProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const selected = useMemo(() => {
        return location.pathname == props.navigateTo;
    }, [location.pathname, props.navigateTo]);

    const handleClick = useCallback(() => {
        navigate({
            from: location.pathname,
            to: props.navigateTo
        });
    }, [location.pathname, navigate, props.navigateTo]);

    return (
        <ListItem
            sx={{
                paddingY: 0,
                paddingX: 2,
            }}
        >
            <ListItemButton
                onClick={handleClick}
                selected={selected}
                sx={{
                    borderRadius: 2
                }}
            >
                <ListItemIcon>{props.icon}</ListItemIcon>
                <ListItemText primary={props.text} />
            </ListItemButton>
        </ListItem>
    );
});

export default DrawerListItem;
