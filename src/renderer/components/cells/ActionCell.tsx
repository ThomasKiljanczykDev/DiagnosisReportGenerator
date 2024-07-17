import { useCallback } from 'react';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { IconButton, Tooltip } from '@mui/material';

interface ActionCellProps<T extends { id: string }> {
    onAdd: (entity: T) => void;
    onRemove: (id: string) => void;
    entity: T;
}

export default function ActionCell<T extends { id: string }>(props: ActionCellProps<T>) {
    const handleAdd = useCallback(() => {
        props.onAdd(props.entity);
    }, [props]);

    const handleRemove = useCallback(() => {
        props.onRemove(props.entity.id);
    }, [props]);

    const isNewRow = !props.entity.id;
    return isNewRow ? (
        <Tooltip title="Dodaj" arrow={true}>
            <IconButton onClick={handleAdd}>
                <AddRoundedIcon />
            </IconButton>
        </Tooltip>
    ) : (
        <Tooltip title="Usuń" arrow={true}>
            <IconButton onClick={handleRemove}>
                <RemoveRoundedIcon />
            </IconButton>
        </Tooltip>
    );
}
