import { useCallback, useEffect } from 'react';

import axios from 'axios';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
    type CreateUpdateDiagnosisDto,
    DiagnosisService,
    type RecommendationDto
} from '@diagnosis-report-generator/api/services';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';

import FormMultiSelect from '@/modules/core/components/form/FormMultiSelect';
import FormTextField from '@/modules/core/components/form/FormTextField';
import { diagnosisValidator } from '@/modules/settings/components/diagnoses/validators';

interface CreateDiagnosisDialogProps {
    open: boolean;
    onClose: () => void;
    onDiagnosesChanged: () => Promise<void>;
    recommendations: RecommendationDto[];
}

export default function CreateDiagnosisDialog(props: CreateDiagnosisDialogProps) {
    const { enqueueSnackbar } = useSnackbar();

    const handleCreateDiagnosis = useCallback(
        async (dto: CreateUpdateDiagnosisDto) => {
            try {
                await DiagnosisService.create({
                    body: dto
                });
                await props.onDiagnosesChanged();
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    enqueueSnackbar(
                        'Wystąpił błąd podczas tworzenia rozpoznania. Upewnij się, że nazwa rozpoznania jest unikatowa',
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
            recommendationIds: []
        },
        validationSchema: toFormikValidationSchema(diagnosisValidator()),
        onSubmit: handleCreateDiagnosis
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
            <DialogTitle>Dodaj rozpoznanie</DialogTitle>
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
                    <FormMultiSelect
                        formik={formik}
                        label="Zalecenia"
                        field="recommendationIds"
                        items={Object.values(props.recommendations).map((recommendation) => ({
                            label: recommendation.name,
                            value: recommendation.id
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
