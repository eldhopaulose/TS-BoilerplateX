// src/models/ApiResponse.ts

export interface ApiResponse {
  message: string;
  success: boolean;
  statusCode: number;
  data: any[];
}

export class ApiResponseClass implements ApiResponse {
  message: string;
  success: boolean;
  statusCode: number;
  data: any[];

  constructor(
    message: string,
    success: boolean,
    statusCode: number,
    data: any[]
  ) {
    this.message = message;
    this.success = success;
    this.statusCode = statusCode;
    this.data = data;
  }
}
