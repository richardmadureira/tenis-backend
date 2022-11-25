export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            DATABASE_URL: string;
            DIR_ARQUIVOS: string;
            DIR_AVATARS: string;
            URL_INICIAL: string;
        }
    }
}