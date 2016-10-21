# Boilerplate

Contains a basic setup with a few simple examples which can be copied and used for any new plantminer-components.

## Prerequisites

- Read about [Redux](https://github.com/reactjs/redux) and [Redux Thunk](https://github.com/gaearon/redux-thunk)
- Read [Presentational vs Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.c8yjx0box)
- Install React Dev Tools for [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/?src=search)
- Install Redux Dev Tools for [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/remotedev/?src=cb-dl-recentlyadded)
- Watch React Dev Tools [Videos](https://egghead.io/lessons/developer-tools)
- The boilerplate already has Redux Dev Tools extension enabled in `src/index.js`

## Setup local
- Outside vagrantbox, in your console go to `/plantminer-components/boilerplate` and run 

    ```
    npm install
    ```

- After everything is successfully installed, run 
    
    ```
    npm start
    ```

- Go to your browser and navigate to `http://localhost:8080/index.html`


- Now you can open Redux Dev Tools and see your state and actions dispatched


- To run tests

    ```
    npm run tests
    ```

- To run production build

    ```
    npm run build
    ```

- **Eslint is run for both local and production builds**

## Structure

```
/src

    /actions                # contains actions and business logic
        boilerplate.js
    /components             # contains UI components (presentational)
        Button.js
    /constants              # contains action types and all other constants
        ActionTypes.js
    /containers             # contains both presentational and container components, provide data and behaviour
        Boilerplate.js
    /mocks                  # contains api mocks (json files)
    /reducers               # contains reducers
        boilerplate.js
        index.js
    /styles                 # contains component styles (each file to be named after components file)
        buttons.scss
        index.scss
    
    index.js                # entry point of application (contains 'Provider' and creation of 'store') 
    
.babelrc
.eslintrc
.stylelintrc
index.html                  # contains simple markup for component development
package.json

tests.config.js             # tests configuration setup
webpack.*.js                # development and production configurations
    
```

## Development
- Copy boilerplate and rename it to `your-component-name`
- Add name, description and version in package.json
- Update data-attributes in index.html and index.js
- Remove and rename anything you do not need 
- Now you can start working on your component


Component development is separate from `plantminer-web` or `plantminer-admin`.
You should not need to interact much with those applications as your component is a separate piece of functionality.
In order to test it all together, please follow these steps:


- Build your component from inside your component folder (for example, `plantminer-components/boilerplate`)

    ```
    npm run build
    ```

- Go to vagrantbox and go into `plantminer-components` folder
- Run 

    ```
    sudo npm link
    ``` 
    
    You should see something like 
    
    ```
    npm WARN plantminer-components@0.1.0 No license field.
    /usr/lib/node_modules/plantminer-components -> /var/www/plantminer-components
    ```

- Go to your application gulp folder, for example to `plantminer-web/dev/gulp`

- Open `package.json` file and add a new dependency or update the `#` which is your feature branch
    
    ```
    "plantminer-componenets": "git+ssh://git@bitbucket.org:minergroup/plantminer-components.git#feature\/PM-943"
    ```
    
- Inside `plantminer-web/dev/gulp` run 

    ```
    sudo npm link plantminer-components
    ```

    You should see something like
    
    ```
    /var/www/plantminer-web/dev/gulp/node_modules/plantminer-components -> /usr/lib/node_modules/plantminer-components -> /var/www/plantminer-components
    ```

    This will create a symlink from node_modules to your local component
    
- Run 

    ```
    gulp copy
    ```
    
    It will copy your components folder from `node_modules/plantminer-components/boilerplate/dist` to `/assets/v2/plantminer-components/boilerplate/dist`
    
- Start a watch task 

    ```
    gulp jswatch
    ```
    
    This will setup a watch on your dist folder, 
    which means every time you make a new build, the changes will be copied to `/assets/v2/plantminer-components/your-component/dist`

- Add dependency in `carabiner.php` to include js and css files, for example

    ```
    /assets/v2/plantminer-components/boilerplate/dist/bundle.js
    ```

- Add html tag to your php page, for example
    ```
    <div data-component="boilerplate"></div>
    ```











