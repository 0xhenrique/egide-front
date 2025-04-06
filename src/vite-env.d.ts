/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly API_URL?: string;
    readonly VITE_EGIDE_SERVER?: string;
    [key: string]: string | undefined;
  };
}
