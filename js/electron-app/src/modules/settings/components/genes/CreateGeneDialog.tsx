import { useCallback, useEffect } from 'react';

import axios from 'axios';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
    type CreateUpdateGeneDto,
    GeneService,
    type MutationDto,
    type TestMethodDto
} from '@diagnosis-report-generator/api/services';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';

import FormMultiSelect from '@/modules/core/components/form/FormMultiSelect';
import FormTextField from '@/modules/core/components/form/FormTextField';
import { geneValidator } from '@/modules/settings/components/genes/validators';

interface CreateGeneDialogProps {
    open: boolean;
    onClose: () => void;
    onGenesChanged: () => Promise<void>;
    testMethods: TestMethodDto[];
    mutations: MutationDto[];
}

export default function CreateGeneDialog(props: CreateGeneDialogProps) {
    const { enqueueSnackbar } = useSnackbar();

    const handleCreateGene = useCallback(
        async (dto: CreateUpdateGeneDto) => {
            try {
                await GeneService.create({
                    body: dto
                });
                await props.onGenesChanged();
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    enqueueSnackbar(
                        'Wystąpił błąd podczas tworzenia genu. Upewnij się, że nazwa genu jest unikatowa',
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
            testMethodIds: [],
            mutationIds: []
        },
        validationSchema: toFormikValidationSchema(geneValidator()),
        onSubmit: handleCreateGene
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
            <DialogTitle>Dodaj gen</DialogTitle>
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
                        label="Metody badań"
                        field="testMethodIds"
                        items={Object.values(props.testMethods).map((testMethod) => ({
                            label: testMethod.name,
                            value: testMethod.id
                        }))}
                    />
                    <FormMultiSelect
                        formik={formik}
                        label="Mutacje"
                        field="mutationIds"
                        items={Object.values(props.mutations).map((mutation) => ({
                            label: mutation.name,
                            value: mutation.id
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
