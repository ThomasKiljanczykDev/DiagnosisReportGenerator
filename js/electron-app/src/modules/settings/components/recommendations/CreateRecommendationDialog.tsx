import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
    type CreateUpdateRecommendationDto,
    RecommendationLevel,
    RecommendationService
} from '@diagnosis-report-generator/api/services';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack
} from '@mui/material';

import AlertSnackbar from '@/modules/core/components/AlertSnackbar';
import FormSelect from '@/modules/core/components/form/FormSelect';
import FormTextField from '@/modules/core/components/form/FormTextField';
import { int32max } from '@/modules/core/utils/constants';
import { recommendationValidator } from '@/modules/settings/components/recommendations/validators';

interface CreateRecommendationDialogProps {
    open: boolean;
    onClose: () => void;
    onRecommendationsChanged: () => Promise<void>;
}

export default function CreateRecommendationDialog(props: CreateRecommendationDialogProps) {
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const handleCreateRecommendation = useCallback(
        async (dto: CreateUpdateRecommendationDto) => {
            try {
                await RecommendationService.create({
                    body: dto
                });
                await props.onRecommendationsChanged();
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    setOpenErrorSnackbar(true);
                }
            }
        },
        [props]
    );

    const formik = useFormik({
        initialValues: {
            name: '',
            content: '',
            level: RecommendationLevel.I,
            priority: int32max,
            ageRange: {
                from: undefined,
                to: undefined
            }
        },
        validationSchema: toFormikValidationSchema(recommendationValidator()),
        onSubmit: handleCreateRecommendation
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
                Wystąpił błąd podczas tworzenia zalecenia. Upewnij się, że nazwa zalecenia jest
                unikatowa.
            </AlertSnackbar>
            <Dialog open={props.open} onClose={props.onClose}>
                <DialogTitle>Stwórz zalecenie</DialogTitle>
                <DialogContent>
                    <Stack>
                        <Box display="flex" gap="0.75rem" width="100%">
                            <FormTextField
                                label="Nazwa"
                                variant="standard"
                                formik={formik}
                                field="name"
                                required
                                fixedHeight
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexGrow: 1,
                                    alignContent: 'center',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <FormSelect
                                    formik={formik}
                                    label="Poziom zalecenia"
                                    field="level"
                                    fullWidth
                                    items={Object.values(RecommendationLevel).map((level) => ({
                                        label: level,
                                        value: level
                                    }))}
                                />
                            </div>
                        </Box>
                        <FormTextField
                            label="Opis"
                            variant="standard"
                            formik={formik}
                            field="content"
                            required
                            fixedHeight
                        />

                        <Box display="flex" gap="0.75rem">
                            <FormTextField
                                label="Wiek od"
                                variant="standard"
                                formik={formik}
                                field="ageRange.from"
                                type="number"
                                fixedHeight
                            />
                            <FormTextField
                                label="Wiek do"
                                variant="standard"
                                formik={formik}
                                field="ageRange.to"
                                type="number"
                                fixedHeight
                            />
                        </Box>
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
