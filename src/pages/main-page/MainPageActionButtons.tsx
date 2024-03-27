import { ChangeEvent, useCallback } from 'react';

import VisuallyHiddenInput from '@/components/VisuallyHiddenInput';
import ExportService from '@/services/export.service';
import { ImportService } from '@/services/import.service';
import { Patient } from '@/type/common';
import { MimeType, saveFile } from '@/util/util';
import { Button, Grid } from '@mui/material';

interface MainPageActionButtonsProps {
    patientData: Patient[];
    onFileImport: (patients: Patient[]) => void;
}

export default function MainPageActionButtons(props: MainPageActionButtonsProps) {
    const handleFileChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) {
                return;
            }

            // if file is excel
            let patientData: Patient[] = [];
            if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
                patientData = await ImportService.parseExcelFile(file);
            } else {
                patientData = await ImportService.parseCsvFile(file);
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

            const zipData = await ExportService.generateReport(file, props.patientData);
            const filename = `${file.name}-${new Date().toLocaleDateString()}.zip`;
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
                        onChange={handleReportGeneration}
                        type="file"
                    />
                </Button>
            </Grid>
        </Grid>
    );
}
