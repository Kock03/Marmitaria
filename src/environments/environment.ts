// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    projectId: 'restaurante-evt',
    appId: '1:964690624052:web:48c33fbce75688fe895461',
    databaseURL: 'https://restaurante-evt-default-rtdb.firebaseio.com',
    storageBucket: 'restaurante-evt.appspot.com',
    locationId: 'asia-east2',
    apiKey: 'AIzaSyBTKMS0Kn-6qiARKOMLNFud6_x0KKAsC6o',
    authDomain: 'restaurante-evt.firebaseapp.com',
    messagingSenderId: '964690624052',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
