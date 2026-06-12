// Minimal Node.js global type shims (no @types/node available)
declare const process: {
  env: Record<string, string | undefined>;
  platform: string;
};

declare function fetch(input: string, init?: {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}): Promise<{ ok: boolean; status: number; json(): Promise<any> }>;
