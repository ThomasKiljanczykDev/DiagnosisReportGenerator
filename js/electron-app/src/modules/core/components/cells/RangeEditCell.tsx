import { type ChangeEvent, useCallback, useEffect, useState } from 'react';

import { type Range } from '@diagnosis-report-generator/api/services';
import { TextField } from '@mui/material';
import { type GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid';
import type { GridValidRowModel } from '@mui/x-data-grid/models/gridRows';

interface RangeEditCellProps<R extends GridValidRowModel> {
    params: GridRenderEditCellParams<R, Range>;
    defaultValue: Range;
}

export default function RangeEditCell<R extends GridValidRowModel>(props: RangeEditCellProps<R>) {
    const apiRef = useGridApiContext();

    const [value, setValue] = useState<Range>(props.defaultValue);

    const handleValueChange = useCallback(
        (field: keyof Range, e: ChangeEvent<HTMLInputElement>) => {
            let parsedInputValue: number | null = parseInt(e.target.value);
            if (!parsedInputValue) {
                parsedInputValue = null;
            }

            const newValue: Range = {
                ...value,
                [field]: parsedInputValue
            };

            setValue(newValue);
            apiRef.current.setEditCellValue({
                id: props.params.id,
                field: props.params.field,
                value: newValue,
                debounceMs: 250
            });
        },
        [value, apiRef, props.params.id, props.params.field]
    );

    const handleFromValueChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => handleValueChange('from', e),
        [handleValueChange]
    );

    const handleToValueChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => handleValueChange('to', e),
        [handleValueChange]
    );

    useEffect(() => {
        setValue(props.defaultValue);
    }, [props.defaultValue]);

    return (
        <div style={{ display: 'flex', margin: '2px', alignItems: 'center', userSelect: 'none' }}>
            <span
                style={{
                    flexShrink: 0
                }}
            >
                od&nbsp;
            </span>
            <TextField
                variant="standard"
                type="number"
                defaultValue={props.defaultValue.from}
                onChange={handleFromValueChange}
                error={
                    props.defaultValue.from != null &&
                    props.defaultValue.to != null &&
                    props.defaultValue.from >= props.defaultValue.to
                }
                InputProps={{
                    inputProps: {
                        min: 0
                    }
                }}
                style={{
                    flexGrow: 1,
                    padding: 0,
                    border: 0
                }}
            />
            <span
                style={{
                    flexShrink: 0
                }}
            >
                &nbsp;lat do&nbsp;
            </span>
            <TextField
                variant="standard"
                type="number"
                defaultValue={props.defaultValue.to}
                onChange={handleToValueChange}
                error={
                    props.defaultValue.from != null &&
                    props.defaultValue.to != null &&
                    props.defaultValue.to <= props.defaultValue.from
                }
                InputProps={{
                    inputProps: {
                        min: 0
                    }
                }}
                style={{
                    flexGrow: 1,
                    padding: 0,
                    border: 0
                }}
            />
            <span
                style={{
                    flexShrink: 0
                }}
            >
                &nbsp;lat
            </span>
        </div>
    );
}
