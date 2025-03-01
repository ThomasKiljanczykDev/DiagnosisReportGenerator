import { useCallback, useEffect } from 'react';

import axios from 'axios';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
    type CreateUpdateTestMethodDto,
    TestMethodService
} from '@diagnosis-report-generator/api/services';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';

import FormTextField from '@/modules/core/components/form/FormTextField';
import { testMethodValidator } from '@/modules/settings/components/test-methods/validators';

interface CreateTestMethodDialogProps {
    open: boolean;
    onClose: () => void;
    onTestMethodsChanged: () => Promise<void>;
}

export default function CreateTestMethodDialog(props: CreateTestMethodDialogProps) {
    const { enqueueSnackbar } = useSnackbar();

    const handleCreateTestMethod = useCallback(
        async (dto: CreateUpdateTestMethodDto) => {
            try {
                await TestMethodService.create({
                    body: dto
                });
                await props.onTestMethodsChanged();
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    enqueueSnackbar(
                        'Wystąpił błąd podczas tworzenia metody badania. Upewnij się, że nazwa metody badania jest unikatowa',
                        {
                            variant: 'error'
                        }
                    );
                }

                return;
            }

            props.onClose();
        },
        [enqueueSnackbar, props]
    );

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: toFormikValidationSchema(testMethodValidator()),
        onSubmit: handleCreateTestMethod
    });

    useEffect(() => {
        if (!props.open) {
            window.setTimeout(() => {
                formik.resetForm();
            }, 100);
        } else {
            formik.submitForm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open]);

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Dodaj metodę badania</DialogTitle>
            <DialogContent>
                <Stack spacing="1rem">
                    <FormTextField
                        label="Nazwa"
                        variant="standard"
                        formik={formik}
                        field="name"
                        required
                        fixedHeight
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={props.onClose}>
                    Anuluj
                </Button>
                <Button variant="contained" onClick={formik.submitForm} disabled={!formik.isValid}>
                    Dodaj
                </Button>
            </DialogActions>
        </Dialog>
    );
}
