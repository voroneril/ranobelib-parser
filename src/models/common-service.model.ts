export interface CommonServiceModel {
    userAlert(): void;
    getBookURL(): string;
    delay(time: number): Promise<void>;
}