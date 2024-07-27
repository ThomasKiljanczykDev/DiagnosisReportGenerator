import { useCallback } from 'react';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { IconButton, Tooltip } from '@mui/material';
import { type GridRenderCellParams } from '@mui/x-data-grid';

interface ActionCellProps<T extends { id: string }> {
    params: GridRenderCellParams<T>;
    onAdd: (entity: T) => void;
    onRemove: (id: string) => void;
}

export default function ActionCell<T extends { id: string }>(props: ActionCellProps<T>) {
    const isAnyEdited = Object.keys(props.params.row).some((field) => {
        const cell = props.params.api.getCellParams(props.params.id, field);
        return cell?.cellMode == 'edit';
    });

    const handleAdd = useCallback(() => {
        props.onAdd(props.params.row);
    }, [props]);

    const handleRemove = useCallback(() => {
        props.onRemove(props.params.row.id);
    }, [props]);

    const isNewRow = !props.params.row.id;
    return isNewRow ? (
        <Tooltip title="Dodaj" arrow={true}>
            <IconButton onClick={handleAdd} disabled={isAnyEdited}>
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
