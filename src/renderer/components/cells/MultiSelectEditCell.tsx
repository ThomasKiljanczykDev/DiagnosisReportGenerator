import { type Key, type ReactNode, useCallback, useEffect, useState } from 'react';

import { Box, Chip, MenuItem, OutlinedInput, Select, type SelectChangeEvent } from '@mui/material';
import { type GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid';

type ItemKey = Key | null | undefined;

interface MultiSelectEditCellProps<I extends object> {
    params: GridRenderEditCellParams<any, I>;
    items: I[];
    defaultValue: ItemKey[];
    keyFn: (item: I) => ItemKey;
    valueFn: (item: I) => ReactNode;
}

export default function MultiSelectEditCell<I extends object>(props: MultiSelectEditCellProps<I>) {
    const apiRef = useGridApiContext();

    const [value, setValue] = useState<ItemKey[]>(props.defaultValue);

    const handleValueChange = useCallback(
        (e: SelectChangeEvent<ItemKey[]>) => {
            let newValue = e.target.value;
            if (!Array.isArray(newValue)) {
                newValue = [];
            }

            setValue(newValue);
            apiRef.current.setEditCellValue({
                id: props.params.id,
                field: props.params.field,
                value: newValue,
                debounceMs: 250
            });
        },
        [props.params.id, props.params.field, apiRef.current]
    );

    useEffect(() => {
        setValue(props.defaultValue);
    }, [props.defaultValue]);

    return (
        <div style={{ display: 'flex' }}>
            <Select
                multiple
                defaultValue={value}
                onChange={handleValueChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={selectedKeys => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedKeys.map(key => {
                            console.log('props.items', props.items);
                            console.log('key', key);
                            const selectedItem = props.items.find(item => props.keyFn(item) == key);
                            console.log('item', selectedItem);
                            const label = props.valueFn(selectedItem!);
                            console.log('label', label);

                            return <Chip key={key} label={label} />;
                        })}
                    </Box>
                )}
            >
                {props.items.map(item => (
                    <MenuItem key={props.keyFn(item)}>{props.valueFn(item)}</MenuItem>
                ))}
            </Select>
        </div>
    );
}
