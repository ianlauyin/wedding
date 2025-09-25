export interface AjaxErrorBody {
  code: number | null;
  message: string;
}

export class AjaxError extends Error {
  status: number | null;

  constructor(error: AjaxErrorBody | null) {
    super(error?.message);
    this.status = error?.code ?? null;
  }
}
