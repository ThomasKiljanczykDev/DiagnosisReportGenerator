import { memo } from 'react';

import { ListItem, ListItemText } from '@mui/material';

interface DrawerListItemProps {
    text: string;
}

const DrawerHeaderListItem = memo(function DrawerListItem(props: DrawerListItemProps) {
    return (
        <ListItem
            sx={{
                paddingY: 0,
                paddingX: 2
            }}
        >
            <ListItemText
                primary={props.text}
                sx={{
                    height: '40px',
                    alignContent: 'end'
                }}
            />
        </ListItem>
    );
});

export default DrawerHeaderListItem;
