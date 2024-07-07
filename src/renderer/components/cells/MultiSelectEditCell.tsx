import { type ReactNode, useCallback, useEffect, useState } from 'react';

import { Box, Chip, MenuItem, OutlinedInput, Select, type SelectChangeEvent } from '@mui/material';
import { type GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid';

type ItemValue = string | number;

interface MultiSelectEditCellProps<I extends object> {
    params: GridRenderEditCellParams<any, I>;
    items: I[];
    initialValue: ItemValue[];
    keyFn: (item: I) => ItemValue;
    displayFn: (item: I) => ReactNode;
}

export default function MultiSelectEditCell<I extends object>(props: MultiSelectEditCellProps<I>) {
    const apiRef = useGridApiContext();

    const [value, setValue] = useState<ItemValue[]>(props.initialValue);

    const handleValueChange = useCallback(
        (e: SelectChangeEvent<ItemValue[]>) => {
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
        [apiRef, props.params.id, props.params.field]
    );

    useEffect(() => {
        setValue(props.initialValue);
    }, [props.initialValue]);

    return (
        <div style={{ display: 'flex', flexGrow: 1 }}>
            <Select
                multiple
                value={value}
                onChange={handleValueChange}
                input={<OutlinedInput label="Chip" />}
                style={{
                    flexGrow: 1
                }}
                renderValue={(selectedKeys) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedKeys.map((key) => {
                            const selectedItem = props.items.find(
                                (item) => props.keyFn(item) == key
                            );
                            if (!selectedItem) {
                                return null;
                            }

                            const label = props.displayFn(selectedItem!);

                            return <Chip key={key} label={label} />;
                        })}
                    </Box>
                )}
            >
                {props.items.map((item) => (
                    <MenuItem key={props.keyFn(item)} value={props.keyFn(item)}>
                        {props.displayFn(item)}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}
