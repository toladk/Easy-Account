// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  verssion: 'v1/',
  // baseUrl:  'http://10.0.38.24:81/easyAccount/api/',
  // baseUrl2:  'http://10.0.38.24:81/api/',
  // login : 'http://10.0.38.24:81/easyAccount/api/v1/session/user-login',
  // login2 : 'http://10.0.38.24:81/easyAccount/api/v1/session/user-login',
  // signup : 'http://10.0.38.24:81/api/signup',

  baseUrl:  'http://10.0.33.122:81/easyAccount/api/',
  baseUrl2:  'http://10.0.33.122:81/api/',
  login : 'http://10.0.33.122:81/easyAccount/api/v1/session/user-login',
  login2 : 'http://10.0.33.122:81/easyAccount/api/v1/session/user-login',
  signup : 'http://10.0.33.122:81/api/signup',
  commonAPI: 'http://10.0.33.12:8017/',
  twoFactor: 'http://10.0.33.122:81/easyAccount/api/',
  instructionUrl: 'http://10.0.33.122:44000/api/v1/',

  // baseUrl : 'http://localhost:8000/api/',
  // imageUrl : 'http://localhost:8000/upload',
  // login: 'http://localhost:8000/api/login',
  // signup: 'http://localhost:8000/api/signup',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
