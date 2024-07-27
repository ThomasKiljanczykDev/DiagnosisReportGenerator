import type { GridColDef, ValueOptions } from '@mui/x-data-grid';

import MultiSelectCell from '@/components/cells/MultiSelectCell';
import MultiSelectEditCell from '@/components/cells/MultiSelectEditCell';

export function createSingleSelectDefinition<
    R extends Record<string, any>,
    P extends keyof R,
    V extends R[P],
    O extends V
>(
    property: P,
    options: O[],
    idGetter: (option: V) => string,
    labelGetter: (option: V) => string
): Partial<GridColDef<R, string>> {
    return {
        type: 'singleSelect',
        valueOptions: options,
        valueGetter: (value: V) => idGetter(value),
        valueSetter: (optionValue: string, row: R) => {
            const selectedOption = options.find((option) => idGetter(option) === optionValue);
            if (!selectedOption) {
                return row;
            }

            row[property] = selectedOption;
            return row;
        },
        // TODO: Should be of type V, but MUI X Data Grid accepts only ValueOptions
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        getOptionValue: (option: ValueOptions) => idGetter(option),
        // TODO: Should be of type V, but MUI X Data Grid accepts only ValueOptions
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        getOptionLabel: (option: ValueOptions) => labelGetter(option),
        renderCell: (params) => labelGetter(params.row[property] as V)
    };
}

export function createMultiSelectDefinition<
    R extends Record<string, any>,
    P extends keyof R,
    V extends R[P] & Array<any>,
    O extends V
>(
    _property: P,
    options: O,
    idGetter: (option: V[0]) => string,
    labelGetter: (option: V[0]) => string
) {
    return {
        type: 'custom',
        renderEditCell: (params) => (
            <MultiSelectEditCell
                params={params}
                items={options}
                initialValue={params.value?.map((item: V[0]) => idGetter(item)) ?? []}
                keyFn={(item) => idGetter(item)}
                displayFn={(item) => labelGetter(item)}
            />
        ),
        renderCell: (params) => (
            <MultiSelectCell
                params={params}
                items={options}
                value={params.value?.map((item: V[0]) => idGetter(item)) ?? []}
                keyFn={(item) => idGetter(item)}
                displayFn={(item) => labelGetter(item)}
            />
        )
    } as Partial<GridColDef<R, V>>;
}
