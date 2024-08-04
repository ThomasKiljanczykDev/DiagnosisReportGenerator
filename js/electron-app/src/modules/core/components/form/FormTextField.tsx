import { type ChangeEvent, type ReactElement, useCallback, useMemo } from 'react';

import type { FormikProps, FormikState, FormikValues } from 'formik';

import type { InternalStandardProps as StandardProps } from '@mui/material';
import type { InputProps as StandardInputProps } from '@mui/material/Input/Input';
import type { InputBaseProps } from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import type { BaseTextFieldProps } from '@mui/material/TextField/TextField';

interface FormTextInputProps<Values extends FormikValues> extends BaseTextFieldProps {
    onChange?: StandardProps<InputBaseProps>['onChange'];
    InputProps?: Partial<StandardInputProps>;

    formik: FormikProps<Values> & FormikState<Values>;
    field: string;
    fixedHeight?: boolean;
}

export default function FormTextField<Values extends FormikValues>(
    props: FormTextInputProps<Values>
): ReactElement {
    const value = useMemo(
        () => props.formik.values[props.field],
        [props.field, props.formik.values]
    );

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

    const sanitizedValue = useMemo(() => {
        if (value != null && props.type === 'number') {
            return parseFloat(value);
        }
        return value;
    }, [value, props.type]);

    const handleOnChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            props.onChange?.(event);
            if (props.type === 'number') {
                return props.formik.setFieldValue(
                    props.field.toString(),
                    parseFloat(event.target.value)
                );
            }
            return props.formik.setFieldValue(props.field.toString(), event.target.value);
        },
        [props]
    );

    return (
        <TextField
            {...props}
            name={props.field.toString()}
            helperText={errorText}
            error={error}
            value={sanitizedValue}
            onChange={handleOnChange}
            onBlur={props.formik.handleBlur}
        />
    );
}
