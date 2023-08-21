export interface ApiState<T> {
  data: T;
  status: string;
  error: string | undefined;
}
