export type DatabaseConfig = {
    isDocumentDatabase: boolean;
    url?: string;
    type?: string;
    host?: string;
    port?: number;
    password?: string;
    name?: string;
    dbName?: string;
    username?: string;
    synchronize?: boolean;
    maxConnections: number;
    sslEnabled?: boolean;
    rejectUnauthorized?: boolean;
    ca?: string;
    key?: string;
    cert?: string;
  };