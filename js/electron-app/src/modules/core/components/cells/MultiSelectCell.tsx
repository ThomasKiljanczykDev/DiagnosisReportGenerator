import { Chip } from '@mui/material';
import { type GridRenderCellParams } from '@mui/x-data-grid';
import type { GridValidRowModel } from '@mui/x-data-grid/models/gridRows';

type ItemValue = string | number | undefined;

interface MultiSelectCellProps<R extends GridValidRowModel, I extends object> {
    params: GridRenderCellParams<R, I[]>;
    items: I[];
    value: ItemValue[];

    keyFn: (item: I) => ItemValue;
    displayFn: (item: I) => string;
}

export default function MultiSelectCell<R extends GridValidRowModel, I extends object>(
    props: MultiSelectCellProps<R, I>
) {
    return (
        <div
            style={{
                display: 'flex',
                height: '100%',
                width: '100%',
                alignItems: 'center'
            }}
        >
            {props.value.map((key) => {
                const selectedItem = props.items.find((item) => props.keyFn(item) == key);
                if (!selectedItem) {
                    return null;
                }

                const label = props.displayFn(selectedItem!);

                return <Chip key={key} label={label} />;
            })}
        </div>
    );
}
