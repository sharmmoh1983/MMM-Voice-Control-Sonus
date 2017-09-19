# MMM-Voice-Control-Sonus

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Module to control Magic Mirror through voice using Sonus library

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Voice-Control-Sonus',
            config: {
              projectId: 'aimevoice2017',
              keyFilename: '/resources/AimeVoice-91efae41b5b4-1.json',
              hotWord : 'smart mirror',
              hotWordFile : '/resources/smart-mirror.pmdl'

            }
        }
    ]
}
```

## Dependencies
```
sudo apt-get install sox libsox-fmt-all
sudo apt-get install libasound2-dev
sudo apt-get install libatlas-base-deva
npm run electron-rebuild

```
