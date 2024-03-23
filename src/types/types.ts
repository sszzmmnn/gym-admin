export interface IAuth {
  token: string,
  roles: number[]
}

export interface IApiPath {
  path: string,
  page: number
}

export interface IResponse {
  headers: string[][],
  data: object[]
}