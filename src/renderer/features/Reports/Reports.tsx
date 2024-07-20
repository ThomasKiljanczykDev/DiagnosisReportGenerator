import { useCallback, useMemo, useState } from 'react';

import { Grid, Tooltip } from '@mui/material';
import { DataGrid, type GridColDef, useGridApiRef } from '@mui/x-data-grid';

import { type Patient, type Pesel, parsePesel } from '@/common/models/patient';
import { genesSelectors, illnessesSelectors, staffSelectors } from '@/common/redux/selectors';
import type { Gene, Illness, StaffMember } from '@/common/types/entities';
import { formatStaffMember } from '@/common/utils/formatting';
import AppPageContent from '@/renderer/components/AppPageContent';
import { useAppSelector } from '@/renderer/hooks/redux';
import {
    createMultiSelectDefinition,
    createSingleSelectDefinition
} from '@/renderer/utils/datagrid';

import './Reports.css';
import ReportsActionButtons from './ReportsActionButtons';

export default function Reports() {
    const apiRef = useGridApiRef();

    const staff = useAppSelector(staffSelectors.selectAll);
    const illnesses = useAppSelector(illnessesSelectors.selectAll);
    const genes = useAppSelector(genesSelectors.selectAll);

    const [patientData, setPatientData] = useState<Patient[]>([]);

    const PATIENT_COLUMNS = useMemo(
        () =>
            [
                {
                    field: 'cardNumber',
                    headerName: 'Numer karty',
                    editable: true
                },
                {
                    field: 'name',
                    headerName: 'Nazwisko i imię',
                    editable: true
                },
                {
                    field: 'pesel',
                    headerName: 'PESEL',
                    editable: true,
                    valueGetter: (pesel: Pesel) => pesel.string,
                    valueSetter: (peselString, patient) => {
                        patient.pesel = parsePesel(peselString);
                        return patient;
                    },
                    renderCell: (params) => {
                        const hasError = params.row.pesel.error !== undefined;

                        function CellErrorTooltip() {
                            return (
                                <Tooltip title={params.row.pesel.error} arrow={true}>
                                    <div>{params.value || ''}</div>
                                </Tooltip>
                            );
                        }

                        return (
                            <div className={hasError ? 'cell-error' : ''}>
                                {hasError && <CellErrorTooltip />}
                                {!hasError && <> {params.value || ''} </>}
                            </div>
                        );
                    }
                },
                {
                    field: 'doctor',
                    headerName: 'Lekarz prowadzący',
                    editable: true,
                    width: 100,
                    ...createSingleSelectDefinition(
                        'doctor',
                        staff,
                        (staffMember) => staffMember?.id ?? '',
                        (staffMember) => formatStaffMember(staffMember)
                    )
                } as GridColDef<Patient, StaffMember | null>,
                {
                    field: 'assistants',
                    headerName: 'Asystenci',
                    editable: true,
                    ...createMultiSelectDefinition(
                        'assistants',
                        staff,
                        (assistant) => assistant.id,
                        (assistant) => formatStaffMember(assistant)
                    )
                } as GridColDef<Patient, StaffMember[]>,
                {
                    field: 'technicians',
                    headerName: 'Technicy',
                    editable: true,
                    ...createMultiSelectDefinition(
                        'technicians',
                        staff,
                        (technician) => technician.id,
                        (technician) => formatStaffMember(technician)
                    )
                } as GridColDef<Patient, StaffMember[]>,
                {
                    field: 'consultants',
                    headerName: 'Konsultanci',
                    editable: true,
                    ...createMultiSelectDefinition(
                        'consultants',
                        staff,
                        (consultant) => consultant.id,
                        (consultant) => formatStaffMember(consultant)
                    )
                },
                {
                    field: 'genes',
                    headerName: 'Geny',
                    editable: true,
                    ...createMultiSelectDefinition(
                        'genes',
                        genes,
                        (gene) => gene.id,
                        (gene) => gene.name
                    )
                } as GridColDef<Patient, Gene[]>,
                {
                    field: 'illness',
                    headerName: 'Choroba',
                    editable: true,
                    ...createSingleSelectDefinition(
                        'illness',
                        illnesses,
                        (illness) => illness?.id ?? '',
                        (illness) => illness?.name ?? ''
                    )
                } as GridColDef<Patient, Illness | null>,
                {
                    field: 'date',
                    headerName: 'Data',
                    type: 'date',
                    editable: true
                }
            ] as GridColDef<Patient>[],
        [genes, illnesses, staff]
    );

    const processRowUpdate = useCallback((newRow: Patient) => {
        setPatientData((prevPatientData) =>
            prevPatientData.map((patient) =>
                patient.id === newRow.id ? { ...patient, ...newRow } : patient
            )
        );

        return newRow;
    }, []);

    const onFileImport = useCallback(
        (newPatientData: Patient[]) => {
            setPatientData(newPatientData);
            window.setTimeout(async () => {
                await apiRef.current.autosizeColumns();
            }, 100);
        },
        [apiRef]
    );

    return (
        <AppPageContent title="Pacjenci">
            <Grid
                container
                flexDirection="column"
                height="100%"
                width="100%"
                spacing={3}
                minWidth={0}
                minHeight={0}
                maxWidth="100%"
            >
                <Grid item flexShrink={0} minWidth={0} minHeight={0} maxWidth="100%">
                    <ReportsActionButtons onFileImport={onFileImport} patientData={patientData} />
                </Grid>
                <Grid item flex={1} minWidth={0} minHeight={0} maxWidth="100%">
                    <DataGrid
                        apiRef={apiRef}
                        columns={PATIENT_COLUMNS}
                        rows={patientData}
                        rowSelection={false}
                        autosizeOnMount={true}
                        processRowUpdate={processRowUpdate}
                        style={{
                            overflowX: 'scroll'
                        }}
                    />
                </Grid>
            </Grid>
        </AppPageContent>
    );
}
