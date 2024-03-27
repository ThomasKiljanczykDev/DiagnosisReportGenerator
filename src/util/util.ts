import { Sex } from '@/util/parse-pesel';

export enum MimeType {
    docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    zip = 'application/zip'
}

export function sexToPolishString(sex: Sex): string {
    switch (sex) {
        case Sex.Male:
            return 'Mężczyzna';
        case Sex.Female:
            return 'Kobieta';
        default:
            return 'Nieznana';
    }
}

export function saveFile(
    fileContent: BufferSource | Blob | string,
    filename: string,
    fileType: MimeType
) {
    const blob = new Blob([fileContent], {
        type: fileType
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
