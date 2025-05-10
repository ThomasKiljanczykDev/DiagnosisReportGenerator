import { type ReactNode, memo, useCallback, useMemo } from 'react';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from '@tanstack/react-router';

import type { FileRouteTypes } from '@/routeTree.gen';

interface DrawerListItemProps {
    text: string;
    navigateTo: FileRouteTypes['to'];
    icon: ReactNode;
}

const DrawerListItem = memo(function DrawerListItem(props: DrawerListItemProps) {
    const pathname = useLocation({
        select: (location) => location.pathname
    }) as FileRouteTypes['fullPaths'];
    const navigate = useNavigate();

    const selected = useMemo(() => pathname == props.navigateTo, [pathname, props.navigateTo]);

    const handleClick = useCallback(
        () =>
            navigate({
                from: pathname,
                to: props.navigateTo
            }),
        [pathname, navigate, props.navigateTo]
    );

    return (
        <ListItem
            sx={{
                paddingY: 0,
                paddingX: 2
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
