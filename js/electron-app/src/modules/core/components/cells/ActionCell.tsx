import { useCallback } from 'react';

import ArrowDownwardRounded from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRounded from '@mui/icons-material/ArrowUpwardRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { IconButton, Tooltip } from '@mui/material';
import { type GridRenderCellParams } from '@mui/x-data-grid';

interface ActionCellProps<T extends { id: string }> {
    params: GridRenderCellParams<T>;
    onRemove: (id: string) => void;
    onMoveUp?: (id: string) => void;
    onMoveDown?: (id: string) => void;
}

export default function ActionCell<T extends { id: string }>(props: ActionCellProps<T>) {
    const handleRemove = useCallback(() => {
        props.onRemove(props.params.row.id);
    }, [props]);

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
            <Tooltip title="Usuń" arrow={true}>
                <IconButton onClick={handleRemove}>
                    <DeleteRoundedIcon />
                </IconButton>
            </Tooltip>
            {props.onMoveUp && (
                <Tooltip title="Przenieś w górę" arrow={true}>
                    <IconButton onClick={() => props.onMoveUp?.(props.params.row.id)}>
                        <ArrowUpwardRounded />
                    </IconButton>
                </Tooltip>
            )}
            {props.onMoveDown && (
                <Tooltip title="Przenieś w dół" arrow={true}>
                    <IconButton onClick={() => props.onMoveDown?.(props.params.row.id)}>
                        <ArrowDownwardRounded />
                    </IconButton>
                </Tooltip>
            )}
        </div>
    );
}
