export type OmitKey<T extends object, K extends keyof T> = Omit<T, K>;
