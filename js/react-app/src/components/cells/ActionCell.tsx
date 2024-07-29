import { useCallback } from 'react';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowDownwardRounded from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRounded from '@mui/icons-material/ArrowUpwardRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { IconButton, Tooltip } from '@mui/material';
import { type GridRenderCellParams } from '@mui/x-data-grid';

interface ActionCellProps<T extends { id: string }> {
    params: GridRenderCellParams<T>;
    onAdd: (entity: T) => void;
    onRemove: (id: string) => void;
    onMoveUp?: (id: string) => void;
    onMoveDown?: (id: string) => void;
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
    return (
        <div
            style={{
                display: 'flex',
                width: 'max-content',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'left'
            }}
        >
            {isNewRow ? (
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
            )}
            {!isNewRow && props.onMoveUp && (
                <Tooltip title="Przenieś w górę" arrow={true}>
                    <IconButton onClick={() => props.onMoveUp?.(props.params.row.id)}>
                        <ArrowUpwardRounded />
                    </IconButton>
                </Tooltip>
            )}
            {!isNewRow && props.onMoveDown && (
                <Tooltip title="Przenieś w dół" arrow={true}>
                    <IconButton onClick={() => props.onMoveDown?.(props.params.row.id)}>
                        <ArrowDownwardRounded />
                    </IconButton>
                </Tooltip>
            )}
        </div>
    );
}
