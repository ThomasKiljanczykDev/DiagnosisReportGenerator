import { type WebStorage } from 'redux-persist';

export class InterProcessStorage implements WebStorage {
    async getItem(key: string): Promise<string | null> {
        console.debug('start getItem', key);
        const item = await api.getStoreValue(key);
        if (item === undefined || item === null) {
            return null;
        }

        for (const itemKey in item) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            item[itemKey] = JSON.stringify(item[itemKey]);
        }

        console.debug('end getItem', key, item);
        return JSON.stringify(item);
    }

    async setItem(key: string, item: string): Promise<void> {
        console.debug('start setItem', key, item);
        const parsedItem = JSON.parse(item);
        for (const itemKey in parsedItem) {
            parsedItem[itemKey] = JSON.parse(parsedItem[itemKey]);
        }

        console.debug('end setItem', key, parsedItem);
        await api.setStoreValue(key, parsedItem);
    }

    async removeItem(key: string): Promise<void> {
        console.trace('start removeItem', key);
        await api.deleteStoreValue(key);
        console.trace('end removeItem', key);
    }
}
