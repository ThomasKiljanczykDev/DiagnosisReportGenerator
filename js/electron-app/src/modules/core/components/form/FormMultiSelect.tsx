import * as React from 'react';
import {
    type LiHTMLAttributes,
    type ReactElement,
    type ReactNode,
    useCallback,
    useMemo
} from 'react';

import type { FormikProps, FormikState, FormikValues } from 'formik';

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
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

    const error = useMemo(() => {
        if (!props.formik.touched[props.field]) {
            return false;
        }

        return !!props.formik.errors[props.field];
    }, [props.formik.touched, props.formik.errors, props.field]);

    const errorText = useMemo(() => {
        const emptyErrorText = props.fixedHeight ? ' ' : '';

        if (!props.formik.touched[props.field]) {
            return emptyErrorText;
        }

        return props.formik.errors[props.field]?.toString() ?? emptyErrorText;
    }, [props.fixedHeight, props.formik.touched, props.formik.errors, props.field]);

    const handleOnChange = useCallback(
        (event: SelectChangeEvent<Value>, child: ReactNode) => {
            props.onChange?.(event, child);

            return props.formik.setFieldValue(props.field.toString(), event.target.value);
        },
        [props]
    );

    return (
        <FormControl error={error} fullWidth={props.fullWidth}>
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
            <FormHelperText>{errorText}</FormHelperText>
        </FormControl>
    );
}
