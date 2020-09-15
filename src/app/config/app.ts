import { HttpHeaders } from '@angular/common/http';

export const BASE_ENDPOINT = 'http://localhost:8085/api/v1';
// export const BASE_ENDPOINT = '/api/v1';
export const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsY2FzdGlsbG9lIiwiZXhwIjoxNTk5MDI5NzUxLCJpYXQiOjE1OTkwMTE3NTF9.vrI5sz251dOux-vPykxavGOJgnRZpgNFH_XTOy2v02kmukxM6J7dzrVYeZOvxu-vWB7Dehl9QoR4zu9yCg6IfQ';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + TOKEN
  })
};
/*export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': 'Bearer ' + TOKEN
  })
};*/
