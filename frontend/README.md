# Frontend code

## Folder structure
```
frontend
    src
        index.js
        apps
            // what are apps?
            // - encapsulated with combination of business logics
            // - use shared tools, components as parts
            // - can have components of themselves
        tools
            // what are tools?
            // - encapsulated with certain business logic
            // - use shared components as parts
            // - can have components of themselves
            // - usually do not make change directly to data on server
        components
            // what are components?
            // - encapsulated with certain purpose in UI
            // - do not have business logic inside
            // - can use other components as parts
            // - can have sub-components of themelves
        api
            // Request handler
            // Endpoints configs
            // Converting data between endpoints and client code
        models
            // interfaces and constants represent business-logic objects
        errorb
            // error boundary components
        utils
            // contains functions shared to use commonly
        layout
            // common layout of all pages
        css
            // less constants and mixins
        values
            // javascript refection of values in css
        icons
            // SVG files, used to generate to iconfont
        i18n
            // translations of messages in different languages
```

## Development
Build
```
npm run build
```
Watch
```
npm run watch
```
