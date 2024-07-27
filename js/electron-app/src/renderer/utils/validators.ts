export function validateName(
    name: string | undefined,
    collection: { name: string }[]
): string | undefined {
    let errorMessage: string | undefined = undefined;

    if (!name) {
        errorMessage = 'Nazwa nie może być pusta';
    } else if (collection.some((item) => item.name === name)) {
        errorMessage = 'Nazwa musi być unikatowa';
    }

    return errorMessage;
}
