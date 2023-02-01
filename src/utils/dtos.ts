export class BaseResponseDto {
  success: boolean;
  message: string;
  data: Array<any> | null | undefined | object;
}
