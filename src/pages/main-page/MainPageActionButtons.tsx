import { ChangeEvent, useCallback, useState } from 'react';
import { createReport } from 'docx-templates';
import * as XLSX from 'xlsx';

import { Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
});

interface MainPageActionButtonsProps {
    onFileImport: (fileContent: string[][]) => void;
}

export default function MainPageActionButtons({ onFileImport }: MainPageActionButtonsProps) {
    const [importedFile, setImportedFile] = useState<File | null>(null);

    const handleFileChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            setImportedFile(file ?? null);
            if (!file) {
                return;
            }

            const fileData = await file.arrayBuffer();
            const workBook = XLSX.read(fileData);
            const workSheet = workBook.Sheets[workBook.SheetNames[0]];
            let workSheetJson: string[][] = XLSX.utils.sheet_to_json(workSheet, {
                header: 1,
                rawNumbers: false
            });

            workSheetJson = workSheetJson
                .map(row => row.map(cell => cell.trim()))
                .filter(row => row.some(cell => cell))
                .filter(row => row.length > 0);

            onFileImport(workSheetJson);
        },
        [onFileImport]
    );

    const handleReportGeneration = useCallback(async () => {
        if (!importedFile) {
            return;
        }

        const docxBuffer = await importedFile.arrayBuffer();
        const uint8Array = new Uint8Array(docxBuffer);

        const data = {
            date: new Date().toLocaleDateString(),
            cardNo: '123456789',
            name: 'Jan Kowalski',
            pesel: '123456789'
        };

        const report = await createReport({
            template: uint8Array,
            cmdDelimiter: ['{{', '}}'],
            data
        });

        // Show save file prompt
        const blob = new Blob([report], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'report.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [importedFile]);

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
                <Button onClick={handleReportGeneration} variant="contained">
                    Generuj raporty
                </Button>
            </Grid>
        </Grid>
    );
}
