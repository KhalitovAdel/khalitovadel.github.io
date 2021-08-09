export class CookieStorage {
    protected storage: Map<string, string> = new Map();

    public setCookieFromString(value = ''): void {
        const target = value.split(';')[0].split('=');
        const key = target[0];
        const val = target[1];
        this.storage.set(key, val);
    }

    public setCookieFromStringArray(value: string[]): void {
        value.map(this.setCookieFromString.bind(this));
    }

    public getCookieString(): string {
        let result = '';
        this.storage.forEach((value, key) => (result = result.concat(`${result ? '; ' : ''}${key}=${value}`)));

        return result.trim();
    }

    public clear(): void {
        this.storage = new Map();
    }

    public getByKey(key: string): string | undefined {
        return this.storage.get(key);
    }

    public removeByKey(key: string): void {
        this.storage.delete(key);
    }
}
