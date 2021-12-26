# snowpack-plugin-files-handler
A snowpack plugin that can help you process files in the transform lifecycle hooks.

## Install
use npm or yarn

`npm i snowpack-plugin-files-handler --save-dev`

`yarn add snowpack-plugin-files-handler --dev`

## Example to use
you can use it in snowpack configuration file.

```
/**
    target: write file path you want to process.
    handler: the function to process the file, accept the original content and need to return a new content.
    exact: choose to exactly match file path
*/

export default {
  plugins: [
      [
          'snowpack-plugin-files-handler',
          {
              opts: [
                  {
                      target: String,
                      handler: Function
                      exact: Boolean
                  }
              ]
          }
      ]
  ]
};
```