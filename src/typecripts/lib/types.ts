export interface NotifyResponse {
  errors: Record<string, unknown>;
  notify?: Record<string, unknown>;
}

interface CreatedInstance {
  errors: Record<string, never>;
  'instances.create': [
    {
      host: string;
      product: string;
      location: string;
      instanceGuid: string;
      account: {
        subdomain: string;
      };
      status: 'created';
    }
  ];
}

interface RequestOptions {
  accepts?: Record<string, string>;
  autoRetry?: boolean;
  cache?: boolean;
  contentType?: boolean | string;
  cors?: boolean;
  crossDomain?: boolean;
  data?: Record<string, string> | string | unknown[];
  dataType?: string;
  headers?: Record<string, string>;
  httpCompleteResponse?: boolean;
  ifModified?: boolean;
  jwt?: Record<string, string>;
  mimeType?: string;
  secure?: boolean;
  timeout?: number;
  traditional?: boolean;
  type?: string;
  url: string;
  xhrFields?: Record<string, string | boolean>;
}

export interface ZAFClient {
  // TODO: Type out zaf client API.
  context(): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(input: string | string[]): Promise<any>;
  /**
   * The invoke method below is being overloaded.
   * zafClient returned here by iframe is an arrow function that
   * accepts the below two signatures.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoke(...args: string[]): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoke(actions: { [key: string]: string[] }): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoke<T>(key: string | string[], value?: T): Promise<any>;
  invoke(
    action: 'notify',
    message: string,
    kind: 'notice' | 'alert' | 'error',
    options: { sticky: boolean }
  ): Promise<NotifyResponse>;
  invoke(
    type: 'instances.create',
    options: { location: string; url: string; size?: { height: string; width: string } }
  ): Promise<CreatedInstance>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set<V>(value: V): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set<V>(target: string, value: V): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on<T extends string>(e: T, handler: (data: any) => void): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request(options: RequestOptions): Promise<any>;
  instance(instanceGuid: string): ZAFClient;
}