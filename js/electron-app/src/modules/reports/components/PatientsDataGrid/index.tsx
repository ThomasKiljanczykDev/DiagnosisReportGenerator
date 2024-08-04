import { useCallback, useEffect, useMemo, useState } from 'react';

import {
    type DiagnosisDto,
    DiagnosisService,
    type GeneDto,
    GeneService,
    type IllnessDto,
    IllnessService,
    type StaffMemberDto,
    StaffService
} from '@diagnosis-report-generator/api/services';
import {
    DataGrid,
    type GridColDef,
    type GridPreProcessEditCellProps,
    useGridApiRef
} from '@mui/x-data-grid';

import EditCellWithErrorRenderer from '@/modules/core/components/cells/EditCellWithErrorRenderer';
import { formatStaffMember } from '@/modules/core/utils/formatting';
import { type Patient, type Pesel, parsePesel } from '@/types/patient';
import { createMultiSelectDefinition, createSingleSelectDefinition } from '@/modules/core/utils/datagrid';

interface PatientsDataGridProps {
    patients: Patient[];
    onRowUpdate: (newRow: Patient) => void;
}

export default function PatientsDataGrid(props: PatientsDataGridProps) {
    const apiRef = useGridApiRef();

    const [staff, setStaff] = useState<StaffMemberDto[]>([]);
    const [illnesses, setIllnesses] = useState<IllnessDto[]>([]);
    const [genes, setGenes] = useState<GeneDto[]>([]);
    const [diagnoses, setDiagnoses] = useState<DiagnosisDto[]>([]);

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
                } as GridColDef<Patient, StaffMemberDto | null>,
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
                } as GridColDef<Patient, StaffMemberDto[]>,
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
                } as GridColDef<Patient, StaffMemberDto[]>,
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
                } as GridColDef<Patient, GeneDto[]>,
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
                } as GridColDef<Patient, IllnessDto | null>,
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
                } as GridColDef<Patient, DiagnosisDto | null>,
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

    useEffect(() => {
        const abortController = new AbortController();

        StaffService.getList(undefined, { signal: abortController.signal }).then((response) => {
            setStaff(response.items);
        });

        IllnessService.getList(undefined, { signal: abortController.signal }).then((response) => {
            setIllnesses(response.items);
        });

        GeneService.getList(undefined, { signal: abortController.signal }).then((response) => {
            setGenes(response.items);
        });

        DiagnosisService.getList(undefined, { signal: abortController.signal }).then((response) => {
            setDiagnoses(response.items);
        });

        return () => {
            abortController.abort();
        };
    }, []);

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
