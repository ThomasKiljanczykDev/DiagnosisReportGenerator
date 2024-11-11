import { useCallback, useEffect } from 'react';

import axios from 'axios';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
    type CreateUpdateIllnessDto,
    IllnessService,
    type RecommendationDto
} from '@diagnosis-report-generator/api/services';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';

import FormMultiSelect from '@/modules/core/components/form/FormMultiSelect';
import FormTextField from '@/modules/core/components/form/FormTextField';
import { illnessValidator } from '@/modules/settings/components/illnesses/validators';

interface CreateIllnessDialogProps {
    open: boolean;
    onClose: () => void;
    onIllnessesChanged: () => Promise<void>;
    recommendations: RecommendationDto[];
}

export default function CreateIllnessDialog(props: CreateIllnessDialogProps) {
    const { enqueueSnackbar } = useSnackbar();

    const handleCreateIllness = useCallback(
        async (dto: CreateUpdateIllnessDto) => {
            try {
                await IllnessService.create({
                    body: dto
                });
                await props.onIllnessesChanged();
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    enqueueSnackbar(
                        'Wystąpił błąd podczas tworzenia choroby. Upewnij się, że nazwa choroby jest unikatowa',
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
        validationSchema: toFormikValidationSchema(illnessValidator()),
        onSubmit: handleCreateIllness
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
            <DialogTitle>Dodaj chorobę</DialogTitle>
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
                    {/* TODO: replace with a table where you move recommendation from left to right */}
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
