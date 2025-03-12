import localforage from 'localforage'

export default class LocalStore {
    constructor(options) {
      this.store = localforage.createInstance({
            name: options?.name || 'myStore',
        });

    }
    setItem(key, value) {
        this.store.setItem(key, value);
    }
    getItem(key) {
        return this.store.getItem(key);
    }
}