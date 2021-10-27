# pokemon-client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### App Description

Here's a pokemon web application that utilizing:
* VueJS as its framework
* NodeJS as back-end services 
* Auth0 as its authentication

You must sign in first to see the pokemon.
After signing in, the app can shows a random Pokemon on `Random` menu and list of Pokemon on `Types` menu.
On Types menu, it shows list of Pokemon based on a type which can be selected on sidebar. 
Each pokemon has its stats performance which is displayed on bar cart utilizing Vue Google Cart.
This app is also utilizing Bootstrap Vue to implement responsive display.

To run the app locally, run the command `npm run serve` in your terminal and open http://localhost:8080 on your browser. 

If you want to run the back end locally:
1. Clone the back end repository [here](https://github.com/ulfahasanah/pokemon-server)
1. Edit the API base url to http://localhost:3000 which is located at `src/config/server.js`