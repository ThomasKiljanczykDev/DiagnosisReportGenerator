import { Chip } from '@mui/material';
import { type GridRenderCellParams } from '@mui/x-data-grid';

type ItemValue = string | number | undefined;

interface MultiSelectCellProps<I extends object> {
    params: GridRenderCellParams<any, I[]>;
    items: I[];
    value: ItemValue[];

    keyFn: (item: I) => ItemValue;
    displayFn: (item: I) => string;
}

export default function MultiSelectCell<I extends object>(props: MultiSelectCellProps<I>) {
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
