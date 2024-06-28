import { type WebStorage } from 'redux-persist';

import { createElectronStore } from '@/main/backend';

export default class ElectronStorage implements WebStorage {
    private _electronStore = createElectronStore();

    async getItem(key: string): Promise<string | null> {
        const item = this._electronStore.get(key);
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
        this._electronStore.set(key, parsedItem);
    }

    async removeItem(key: string): Promise<void> {
        this._electronStore.delete(key);
    }
}
