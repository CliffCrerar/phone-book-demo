// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {CommonEnv} from './common_env';



export const environment = {
  production: false,
  dataHostLive: "https://mongodb-rest-api-1.c1i44.now.sh",
  //dataHostLive: "http://localhost:3050",
  lookupKey:{
    getAllRecords: '1d963791-5450-4275-a614-7349b54df552',
    postContact: '33183092-929b-44b4-9d7e-d2a8b3a98ead',
    deleteContact: '2033695f-12c5-477c-9be0-30319f3242ea'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
