# Plantminer-components boilerplate

Contains a basic setup with a few simple examples which can be copied and used for any new plantminer-components.

## Prerequisites
It is very useful to have React Dev Tools and Redux Dev Tools extensions enabled in Chrome/Firefox.

Some intro videos to React Dev Tools https://egghead.io/lessons/developer-tools

The boilerplate has already ReduxDevTools extension enabled in index.js and by adding it to chrome it should pick up your store.

Read about containers vs components as we have a split into these two folders
https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.c8yjx0box

## Setup
1. Outside vagrantbox, in your console go to /plantminer-components/boilerplate and run `npm install`
2. After everything is successfully installed, run `npm start`
3. Go to your browser and navigate to http://localhost:8080/index.html
4. Open redux tools and see the log of your state and actions dispatched
5. When you are ready for production `npm run build`

## Structure
```
/src

    /actions      # contains all actions and business logic
    /components   # contains ui components 
    /constants    # contains ActionTypes.js and other component specific constants
    /containers   # contains data and how things work
    /mocks        # contains api mocks (json files)
    /reducers     # contains reducers
    /styles       # contains component styles (each file to be named after components file)
    
    index.js      # contains 'Provider' and creation of 'store' - entry point of the component 
    
.babelrc          # contains babel presets and plugins
.eslintrc         # contains eslint styles
.stylelingr       # contains css rules
index.html        # contains simple markup for component development
package.json      # contains all dependencies

tests.config.js   # contains test config setup
webpack.*.js      # develop and produciton configurations
    
```

## Development
1. Copy boilerplate and rename it to 'your-component-name'
2. Add name, description and version in package.json
3. Update data-attributes in index.html and index.js
4. Remove and rename anything you do not need 
5. Now you can start working on your component

Component development is separate from 'plantminer-web' or 'plantminer-admin'.
You should not need to interact much with those applications as your component is a separate piece of functionality.
In order to test it all together, please follow these steps:

1. Build your component from inside your component folder (for ex., plantminer-components/boilerplate)
    
    `npm run build`

2. Go to vagrantbox and cd into 'plantminer-components' folder
3. Run `sudo npm link` - you should see something like 
    
    `npm WARN plantminer-components@0.1.0 No license field.
     /usr/lib/node_modules/plantminer-components -> /var/www/plantminer-components`

4. Go to your application gulp folder, for example to 'plantminer-web/dev/gulp'

5. Open package.json file and add a new dependency
    
    `"plantminer-componenets": "git+ssh://git@bitbucket.org:minergroup/plantminer-components.git#feature\/PM-943"`
    
    where '#' is your feature branch
    
6. Inside 'plantminer-web/dev/gulp' run `sudo npm link plantminer-components`

    You should see something link 
    
    `/var/www/plantminer-web/dev/gulp/node_modules/plantminer-components -> /usr/lib/node_modules/plantminer-components -> /var/www/plantminer-components`

    This will create a symlink from node_modules to your local component
    
7. Run `gulp copy`. It will copy your components folder 
    from node_modules/plantminer-components/boilerplate/dist to /assets/v2/plantminer-components/boilerplate/dist
    
8. Start a watch task `gulp jswatch`. This will setup a watch on your dist folder, 
which means every time you make a new build, the changes will be copied to /assets/v2/plantminer-components/your-component/dist 

9. Add dependency in carabiner.php to include '/assets/v2/plantminer-components/boilerplate/dist/bundle.js' and css if needed.

10. Add html tag to your php page, for example 
    ` <div data-component="boilerplate"></div>`











