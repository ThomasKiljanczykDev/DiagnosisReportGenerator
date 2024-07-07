import { useCallback, useMemo, useState } from 'react';

import { Grid, Tooltip } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import { type Patient, type Pesel, parsePesel } from '@/common/models/patient';
import { staffSelectors } from '@/common/redux/selectors';
import type { StaffMember } from '@/common/types/entities';
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
    const staff = useAppSelector(staffSelectors.selectAll);

    const [patientData, setPatientData] = useState<Patient[]>([]);

    const PATIENT_COLUMNS = useMemo(
        () =>
            [
                { field: 'cardNumber', headerName: 'Numer karty', editable: true, flex: 1 },
                { field: 'name', headerName: 'Nazwisko i imię', editable: true, flex: 1 },
                {
                    field: 'pesel',
                    headerName: 'PESEL',
                    editable: true,
                    flex: 1,
                    valueGetter: (pesel: Pesel) => pesel.string,
                    valueSetter: (peselString, patient) => {
                        const newPatient = structuredClone(patient);
                        newPatient.pesel = parsePesel(peselString);

                        return newPatient;
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
                    flex: 1,
                    ...createSingleSelectDefinition(
                        'doctor',
                        staff,
                        (staffMember) => staffMember.id,
                        (staffMember) => formatStaffMember(staffMember)
                    )
                },
                {
                    field: 'assistants',
                    headerName: 'Asystenci',
                    editable: true,
                    flex: 1,
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
                    flex: 1,
                    ...createMultiSelectDefinition(
                        'technicians',
                        staff,
                        (technician) => technician.id,
                        (technician) => formatStaffMember(technician)
                    )
                },
                {
                    field: 'consultants',
                    headerName: 'Konsultanci',
                    editable: true,
                    flex: 1,
                    ...createMultiSelectDefinition(
                        'consultants',
                        staff,
                        (consultant) => consultant.id,
                        (consultant) => formatStaffMember(consultant)
                    )
                },
                {
                    field: 'date',
                    headerName: 'Data',
                    editable: true,
                    type: 'date',
                    flex: 1
                }
            ] as GridColDef<Patient>[],
        [staff]
    );

    const onFileImport = useCallback((newPatientData: Patient[]) => {
        setPatientData(newPatientData);
    }, []);

    return (
        <AppPageContent title="Pacjenci">
            <Grid container flexDirection="column" height="100%" width="100%" spacing={3}>
                <Grid item flexShrink={0}>
                    <ReportsActionButtons onFileImport={onFileImport} patientData={patientData} />
                </Grid>
                <Grid flex={1} item minHeight={0} minWidth={0}>
                    <DataGrid columns={PATIENT_COLUMNS} rows={patientData} rowSelection={false} />
                </Grid>
            </Grid>
        </AppPageContent>
    );
}
