import {
    type LiHTMLAttributes,
    type ReactElement,
    type ReactNode,
    useCallback,
    useMemo
} from 'react';
import * as React from 'react';

import type { FormikProps, FormikState, FormikValues } from 'formik';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { InputProps as StandardInputProps } from '@mui/material/Input/Input';
import type { BaseSelectProps } from '@mui/material/Select/Select';
import type { SelectChangeEvent, SelectInputProps } from '@mui/material/Select/SelectInput';

interface SelectItem {
    value?: LiHTMLAttributes<unknown>['value'];
    label: string;
}

interface FormMultiSelectProps<Values extends FormikValues, Value> extends BaseSelectProps<Value> {
    onChange?: SelectInputProps<Value>['onChange'];
    InputProps?: Partial<StandardInputProps>;

    formik: FormikProps<Values> & FormikState<Values>;
    field: string;
    fixedHeight?: boolean;
    items: SelectItem[];
}

export default function FormMultiSelect<Values extends FormikValues, Value>(
    props: FormMultiSelectProps<Values, Value>
): ReactElement {
    const value = useMemo(
        () => props.formik.values[props.field],
        [props.field, props.formik.values]
    ) as Value;

    const handleOnChange = useCallback(
        (event: SelectChangeEvent<Value>, child: ReactNode) => {
            props.onChange?.(event, child);

            return props.formik.setFieldValue(props.field.toString(), event.target.value);
        },
        [props]
    );

    return (
        <FormControl fullWidth={props.fullWidth}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                {...props}
                name={props.field.toString()}
                multiple
                value={value}
                onChange={handleOnChange}
                onBlur={props.formik.handleBlur}
            >
                {props.items.map((item) => (
                    <MenuItem key={item.label} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
