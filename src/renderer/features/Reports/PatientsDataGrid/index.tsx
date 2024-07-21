import { useCallback, useMemo } from 'react';

import {
    DataGrid,
    type GridColDef,
    type GridPreProcessEditCellProps,
    useGridApiRef
} from '@mui/x-data-grid';

import { type Patient, type Pesel, parsePesel } from '@/common/models/patient';
import {
    diagnosesSelectors,
    genesSelectors,
    illnessesSelectors,
    staffSelectors
} from '@/common/redux/selectors';
import type { Diagnosis, Gene, Illness, StaffMember } from '@/common/types/entities';
import { formatStaffMember } from '@/common/utils/formatting';
import EditCellWithErrorRenderer from '@/renderer/components/cells/EditCellWithErrorRenderer';
import { useAppSelector } from '@/renderer/hooks/redux';
import {
    createMultiSelectDefinition,
    createSingleSelectDefinition
} from '@/renderer/utils/datagrid';

interface PatientsDataGridProps {
    patients: Patient[];
    onRowUpdate: (newRow: Patient) => void;
}

export default function PatientsDataGrid(props: PatientsDataGridProps) {
    const apiRef = useGridApiRef();

    const staff = useAppSelector(staffSelectors.selectAll);
    const illnesses = useAppSelector(illnessesSelectors.selectAll);
    const genes = useAppSelector(genesSelectors.selectAll);
    const diagnoses = useAppSelector(diagnosesSelectors.selectAll);

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
                    preProcessEditCellProps: (
                        params: GridPreProcessEditCellProps<string, Patient>
                    ) => {
                        const newPesel = parsePesel(params.props.value ?? '');

                        return {
                            ...params.props,
                            error: newPesel.error
                        };
                    },
                    valueGetter: (pesel: Pesel) => pesel.string,
                    valueSetter: (peselString, patient) => {
                        patient.pesel = parsePesel(peselString);
                        return patient;
                    },
                    renderEditCell: EditCellWithErrorRenderer
                } as GridColDef<Patient, string>,
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
                    field: 'diagnosis',
                    headerName: 'Rozpoznanie',
                    editable: true,
                    ...createSingleSelectDefinition(
                        'diagnosis',
                        diagnoses,
                        (diagnosis) => diagnosis?.id ?? '',
                        (diagnosis) => diagnosis?.name ?? ''
                    )
                } as GridColDef<Patient, Diagnosis | null>,
                {
                    field: 'date',
                    headerName: 'Data',
                    type: 'date',
                    editable: true
                }
            ] as GridColDef<Patient>[],
        [diagnoses, genes, illnesses, staff]
    );

    const processRowUpdate = useCallback(
        (newRow: Patient) => {
            props.onRowUpdate(newRow);
            return newRow;
        },
        [props]
    );

    return (
        <DataGrid
            apiRef={apiRef}
            columns={PATIENT_COLUMNS}
            rows={props.patients}
            rowSelection={false}
            autosizeOnMount={true}
            processRowUpdate={processRowUpdate}
            style={{
                overflowX: 'scroll'
            }}
        />
    );
}
