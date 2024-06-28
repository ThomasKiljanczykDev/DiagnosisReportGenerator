import { type ChangeEvent, useCallback } from 'react';

import { type Patient } from '@/common/models/patient';
import VisuallyHiddenInput from '@/renderer/components/VisuallyHiddenInput';
import { MimeType, saveFile } from '@/renderer/util/file-util';
import { Button, Grid } from '@mui/material';

interface MainPageActionButtonsProps {
    patientData: Patient[];
    onFileImport: (patients: Patient[]) => void;
}

export default function ReportsActionButtons(props: MainPageActionButtonsProps) {
    const handleFileChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) {
                return;
            }

            // if file is excel
            let patientData: Patient[];
            if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
                const fileData = new Uint8Array(await file.arrayBuffer());
                patientData = await api.parseExcelFile(fileData);
            } else {
                const fileData = await file.text();
                patientData = await api.parseCsvFile(fileData);
            }

            props.onFileImport(patientData);
        },
        [props.onFileImport]
    );

    const handleReportGeneration = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file || !props.patientData.length) {
                return;
            }

            const fileData = new Uint8Array(await file.arrayBuffer());
            const zipData = await api.renderReportPackage(fileData, props.patientData);
            const filenameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');
            const filename = `${filenameWithoutExtension}-${new Date().toLocaleDateString()}.zip`;
            saveFile(zipData, filename, MimeType.zip);
        },
        [props.patientData]
    );

    return (
        <Grid container spacing={2}>
            <Grid item>
                <Button component="label" role="none" variant="contained">
                    Importuj plik
                    <VisuallyHiddenInput
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                        type="file"
                    />
                </Button>
            </Grid>
            <Grid item>
                <Button
                    component="label"
                    role="none"
                    variant="contained"
                    disabled={!props.patientData.length}
                >
                    Generuj raporty
                    <VisuallyHiddenInput
                        accept=".docx"
                        title={'Wybierz plik szablonu raportu'}
                        onChange={handleReportGeneration}
                        type="file"
                    />
                </Button>
            </Grid>
        </Grid>
    );
}
