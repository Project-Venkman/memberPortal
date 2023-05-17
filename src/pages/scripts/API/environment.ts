// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environments = {
    local: {
        production: false,
        ProtonPack: 'http://localhost:7071/',
        Hypermint: 'http://localhost:3000/',
        Prefix: 'http://',
    },
    development: {
        production: false,
        // ProtonPack: 'https://protonpackapi-dev.azurewebsites.net/',
        ProtonPack: 'http://localhost:3001/',
        // ProtonPack: 'https://apiv2.projectvenkman.com/',
        Hypermint: 'http://localhost:3000/',
        Prefix: 'https://',
    },
    production: {
        production: false,
        // ProtonPack: "https://protonpackapi.azurewebsites.net/",
        ProtonPack: 'https://apiv2.projectvenkman.com/',
        Hypermint: 'https://protonpackapiserver-dooxr4hhta-uc.a.run.app/',
        Prefix: 'https://',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
