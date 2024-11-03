import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
    type CreateUpdateMutationDto,
    MutationService
} from '@diagnosis-report-generator/api/services';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';

import AlertSnackbar from '@/modules/core/components/AlertSnackbar';
import FormTextField from '@/modules/core/components/form/FormTextField';
import { mutationValidator } from '@/modules/settings/components/mutations/validators';

interface CreateMutationDialogProps {
    open: boolean;
    onClose: () => void;
    onMutationsChanged: () => Promise<void>;
}

export default function CreateMutationDialog(props: CreateMutationDialogProps) {
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const handleCreateMutation = useCallback(
        async (dto: CreateUpdateMutationDto) => {
            try {
                await MutationService.create({
                    body: dto
                });
                await props.onMutationsChanged();
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    setOpenErrorSnackbar(true);
                }

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
        validationSchema: toFormikValidationSchema(mutationValidator()),
        onSubmit: handleCreateMutation
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
        <>
            <AlertSnackbar
                open={openErrorSnackbar}
                openSetter={setOpenErrorSnackbar}
                severity="error"
            >
                <span>
                    Wystąpił błąd podczas tworzenia mutacji. Upewnij się, że nazwa mutacji jest
                    unikatowa.
                </span>
            </AlertSnackbar>
            <Dialog open={props.open} onClose={props.onClose}>
                <DialogTitle>Dodaj mutację</DialogTitle>
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
                    <Button
                        variant="contained"
                        onClick={formik.submitForm}
                        disabled={!formik.isValid}
                    >
                        Dodaj
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
