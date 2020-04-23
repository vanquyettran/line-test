# Frontend code

## Folder structure
```
frontend
    src
        index.js
        layout
            appearances
            components
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
        components
            // what are components?
            // - encapsulated with certain purpose in UI
            // - do not have business logic inside
            // - can use other components as parts
            // - can have sub-components of themelves
        icons
            // SVG files
        less
            // less constants and mixins
        i18n
            // translations of messages in different languages
```
