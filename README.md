# LINE pre-test

## Install and run
```
npm install
npm start
```
Change port config in `.env` file. Default port: `3669`

## Test scenario
Open this URL in your browser 
```
GET http://localhost:3669
```
- Choose time to publish or scheduling
- Choose photo icon in editor top bar to set content type is IMAGE
- Upload one or more images by using browse button or drag-drop files in drop box
- Publish post by click Publish/Schedule button and waiting for some seconds to see result
- There are roughly 30% of upload requests would be error, and error will be displayed that you can see
- You can see request body in log screen where you run start command

## Test endpoints
Upload media
```
PUT /_api/media/upload
```
Upload post
```
POST /_api/post/upload
```

## Frontend folder structure
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

## Frontend diagram
```
./diagram/Diagram.png
```
