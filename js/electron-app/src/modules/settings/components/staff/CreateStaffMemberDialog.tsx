import { useCallback, useEffect } from 'react';

import axios from 'axios';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
    type CreateUpdateStaffMemberDto,
    StaffRole,
    StaffService
} from '@diagnosis-report-generator/api/services';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';

import FormSelect from '@/modules/core/components/form/FormSelect';
import FormTextField from '@/modules/core/components/form/FormTextField';
import { staffRoleToPolishString } from '@/modules/core/utils/text-util';
import { staffMemberValidator } from '@/modules/settings/components/staff/validators';

interface CreateStaffMemberDialogProps {
    open: boolean;
    onClose: () => void;
    onStaffChanged: () => Promise<void>;
}

export default function CreateStaffMemberDialog(props: CreateStaffMemberDialogProps) {
    const { enqueueSnackbar } = useSnackbar();

    const handleCreateStaffMember = useCallback(
        async (dto: CreateUpdateStaffMemberDto) => {
            try {
                await StaffService.create({
                    body: dto
                });
                await props.onStaffChanged();
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    enqueueSnackbar(
                        'Wystąpił błąd podczas tworzenia członka personelu. Upewnij się, że imię i nazwisko jest unikatowe',
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
            name: '',
            title: '',
            role: StaffRole.Doctor
        },
        validationSchema: toFormikValidationSchema(staffMemberValidator()),
        onSubmit: handleCreateStaffMember
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
            <DialogTitle>Dodaj członka personelu</DialogTitle>
            <DialogContent>
                <Stack spacing="1rem">
                    <FormTextField
                        label="Imię i nazwisko"
                        variant="standard"
                        formik={formik}
                        field="name"
                        required
                        fixedHeight
                    />
                    <FormTextField
                        label="Tytuł"
                        variant="standard"
                        formik={formik}
                        field="title"
                        required
                        fixedHeight
                    />
                    <br />
                    <FormSelect
                        formik={formik}
                        label="Rola"
                        field="role"
                        fullWidth
                        items={Object.values(StaffRole).map((role) => ({
                            label: staffRoleToPolishString(role),
                            value: role
                        }))}
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
