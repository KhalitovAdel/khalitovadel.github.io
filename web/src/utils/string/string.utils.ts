export class StringUtils {
    public static firstUpper(value = ''): string {
        const first = value.substr(0, 1).toUpperCase();

        return first.concat(value.substr(1).toLowerCase());
    }
}
