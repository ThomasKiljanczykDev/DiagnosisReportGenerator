import Papa from 'papaparse';
import { read, utils } from 'xlsx';

import { type StaffMemberDto, StaffService } from '@diagnosis-report-generator/api/services';

import { type Patient, parsePesel } from '@/types/patient';

export class ImportService {
    static async parseExcelFile(fileData: Uint8Array) {
        const workBook = read(fileData);
        const workSheet = workBook.Sheets[workBook.SheetNames[0]];

        const rawSheetData = utils.sheet_to_json<string[]>(workSheet, {
            header: 1,
            rawNumbers: false
        });

        return this.parsePatientData(rawSheetData);
    }

    static async parseCsvFile(fileData: string) {
        let rawSheetData = Papa.parse<string[]>(fileData, {
            header: false,
            skipEmptyLines: true
        }).data;

        rawSheetData = rawSheetData.slice(1);
        return this.parsePatientData(rawSheetData);
    }

    private static parsePatient(
        id: number,
        data: string[],
        staff: StaffMemberDto[]
    ): Patient | null {
        try {
            const sourceAssistants = data[5];
            const sourceConsultants = data[6];
            const sourceDoctor = data[7];

            const assistants = staff.filter((staffMember) =>
                sourceAssistants.toUpperCase().includes(staffMember.name.toUpperCase())
            );

            const consultants = staff.filter((staffMember) =>
                sourceConsultants.toUpperCase().includes(staffMember.name.toUpperCase())
            );

            const doctor = staff.find((staffMember) =>
                sourceDoctor.toUpperCase().includes(staffMember.name.toUpperCase())
            );

            return {
                id: id,
                date: new Date(),
                cardNumber: data[0],
                name: data[1],
                pesel: parsePesel(data[2]),
                doctor: doctor ?? null,
                assistants: assistants,
                consultants: consultants,
                technicians: [],
                genes: [],
                illness: null,
                diagnoses: []
            } as Patient;
        } catch (e) {
            console.error(`Error parsing patient data: ${data}`);
            return null;
        }
    }

    private static async parsePatientData(rawSheetData: string[][]): Promise<Patient[]> {
        const staff = await StaffService.getList().then((response) => response.items);

        rawSheetData = rawSheetData
            .map((row) => row.map((cell) => cell.trim()))
            .filter((row) => row.some((cell) => cell))
            .filter((row) => row.length > 0);

        return rawSheetData
            .slice(1)
            .map((row, index) => ImportService.parsePatient(index, row, staff))
            .filter((patient) => patient !== null && patient?.cardNumber)
            .map((patient) => patient!);
    }
}
