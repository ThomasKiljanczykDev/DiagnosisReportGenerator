export enum MimeType {
    docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    zip = 'application/zip'
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
