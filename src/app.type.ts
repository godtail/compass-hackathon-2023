export type UniResponse<T = any> = Promise<{
  status: 'success' | 'fail';
  data?: T;
  message?: string;
}>;
