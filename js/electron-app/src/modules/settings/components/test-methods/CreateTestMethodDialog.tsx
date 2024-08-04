import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
    type CreateUpdateTestMethodDto,
    TestMethodService
} from '@diagnosis-report-generator/api/services';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';

import AlertSnackbar from '@/modules/core/components/AlertSnackbar';
import FormTextField from '@/modules/core/components/form/FormTextField';
import { testMethodValidator } from '@/modules/settings/components/test-methods/validators';

interface CreateRecommendationDialogProps {
    open: boolean;
    onClose: () => void;
    onTestMethodsChanged: () => Promise<void>;
}

export default function CreateTestMethodDialog(props: CreateRecommendationDialogProps) {
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const handleCreateTestMethod = useCallback(
        async (dto: CreateUpdateTestMethodDto) => {
            try {
                await TestMethodService.create({
                    body: dto
                });
                await props.onTestMethodsChanged();
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    setOpenErrorSnackbar(true);
                }

                // TODO: Add snackbar for unexpected errors

                return;
            }

            props.onClose();
        },
        [props]
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
    }, [props.open]);

    return (
        <>
            <AlertSnackbar
                open={openErrorSnackbar}
                openSetter={setOpenErrorSnackbar}
                severity="error"
            >
                Wystąpił błąd podczas tworzenia zalecenia. Upewnij się, że nazwa metody badań jest
                unikatowa.
            </AlertSnackbar>
            <Dialog open={props.open} onClose={props.onClose}>
                <DialogTitle>Stwórz metodę badania</DialogTitle>
                <DialogContent>
                    <Stack>
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
                    <Button color="secondary" variant="contained" onClick={props.onClose}>
                        Anuluj
                    </Button>
                    <Button
                        variant="contained"
                        onClick={formik.submitForm}
                        disabled={!formik.isValid}
                    >
                        Stwórz
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
