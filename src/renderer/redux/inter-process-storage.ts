import { type WebStorage } from 'redux-persist';

export class InterProcessStorage implements WebStorage {
    async getItem(key: string): Promise<string | null> {
        const item = await api.getStoreValue(key);
        if (item === undefined || item === null) {
            return null;
        }

        for (const itemKey in item) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            item[itemKey] = JSON.stringify(item[itemKey]);
        }

        return JSON.stringify(item);
    }

    async setItem(key: string, item: string): Promise<void> {
        const parsedItem = JSON.parse(item);
        for (const itemKey in parsedItem) {
            parsedItem[itemKey] = JSON.parse(parsedItem[itemKey]);
        }

        await api.setStoreValue(key, parsedItem);
    }

    async removeItem(key: string): Promise<void> {
        await api.deleteStoreValue(key);
    }
}
