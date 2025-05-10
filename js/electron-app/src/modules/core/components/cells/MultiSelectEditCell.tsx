import { type ReactNode, useCallback, useEffect, useState } from 'react';

import { Box, Chip, MenuItem, OutlinedInput, Select, type SelectChangeEvent } from '@mui/material';
import {
    type GridRenderEditCellParams,
    type GridValidRowModel,
    useGridApiContext
} from '@mui/x-data-grid';

export type ItemValue = string | number | undefined;

interface MultiSelectEditCellProps<R extends GridValidRowModel, I extends object> {
    params: GridRenderEditCellParams<R, I[]>;
    items: I[];
    initialValue: ItemValue[];
    keyFn: (item: I) => ItemValue;
    displayFn: (item: I) => ReactNode;
    valueFn?: (item: I) => I[keyof I];
}

export default function MultiSelectEditCell<R extends GridValidRowModel, I extends object>(
    props: MultiSelectEditCellProps<R, I>
) {
    const apiRef = useGridApiContext();

    const [value, setValue] = useState<ItemValue[]>(props.initialValue);

    const handleValueChange = useCallback(
        (e: SelectChangeEvent<ItemValue[]>) => {
            let newValue = e.target.value;
            if (!Array.isArray(newValue)) {
                newValue = [];
            }

            setValue(newValue);

            const valueItems = newValue
                .map((key) => props.items.find((item) => props.keyFn(item) == key))
                .filter((item) => item !== undefined)
                .map((item) => item!)
                .map((item) => (props.valueFn ? props.valueFn(item) : item));

            apiRef.current.setEditCellValue({
                id: props.params.id,
                field: props.params.field,
                value: valueItems,
                debounceMs: 250
            });
        },
        [apiRef, props]
    );

    useEffect(() => {
        setValue(props.initialValue);
    }, [props.initialValue]);

    return (
        <div style={{ display: 'flex', flexGrow: 1, minWidth: 0, minHeight: 0 }}>
            <Select
                multiple
                value={value}
                onChange={handleValueChange}
                input={<OutlinedInput label="Chip" />}
                style={{
                    flexGrow: 1,
                    minWidth: 0,
                    minHeight: 0
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
