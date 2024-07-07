import type { GridColDef, ValueOptions } from '@mui/x-data-grid';

import MultiSelectCell from '@/renderer/components/cells/MultiSelectCell';
import MultiSelectEditCell from '@/renderer/components/cells/MultiSelectEditCell';

export function createSingleSelectDefinition<
    R extends Record<string, any>,
    V extends R[P],
    P extends keyof R
>(
    property: P,
    options: V[],
    idGetter: (option: V) => string,
    labelGetter: (option: V) => string
): Partial<GridColDef<R, string>> {
    return {
        type: 'singleSelect',
        valueOptions: options,
        valueGetter: (value: V) => idGetter(value),
        valueSetter: (optionValue: string, row: R) => {
            const updatedRow = structuredClone(row);

            const selectedOption = options.find((option) => idGetter(option) === optionValue);
            if (!selectedOption) {
                return updatedRow;
            }

            updatedRow[property] = selectedOption;
            return updatedRow;
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
    V extends R[P] & Array<any>,
    P extends keyof R
>(
    _property: P,
    options: V,
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
