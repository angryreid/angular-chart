export type RequestMethod = 'get' | 'post';

export interface RequestOptions {
  url?: string | null;
  method?: RequestMethod | null;
}
