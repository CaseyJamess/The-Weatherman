# caseys-weatherman

V2.0 31-5-2023!

Updates:

- Utilised a more component based design to really highlight understanding of React - see 'components' 

- Removed React Bootstrap and redesigned with Tailwind CSS, for a streamlined way of building highly responsive apps/webpages - https://tailwindcss.com/ 

- Incorporated a 'Global Cities' Component at the top of the page for imporant cities around the globe!

- Included extra components feauturing icons from iconscout for more information about the weather - https://iconscout.com/unicons

- Included NPM toasty to give the user visual feedback when a location was being loaded/displayed - https://www.npmjs.com/package/react-toastify

- Using Luxon to display accurate location time - https://www.npmjs.com/package/luxon

- Added a custom font with Google fonts - https://fonts.google.com/

- Key architecture change, instead of manually computing metric -> imperial conversions, I am requesting a changed URL to OpenWeather that passes me the results 

- Added a 'Utility.js' folder to call functions from, to improve readability and code structure 

- A responsive background depending on the time/weather. For example if it is above 25 celsius/77 fahrenheit the background has an orange tint, or if it is at night time, the background goes dark... the default is blue.

- An error message on the top of the screen to indicate any errors with the user's input, or if the API response has failed


*****************

- Note, some functionality is limited due to the free version of the OpenWeather API, and also makes it difficult to pass information around the react components - hence some code looking long winded 

For example, I cannot get daily forecasts with V2.5 OpenWeather API's free weather call, nor can I input Lat/Lon inputs on current weather calls, meaning that I cannot get the users current location, for example

If V3 is released it will include this functionality as well as having a drop down menu to suggest locations whilst you are typing an input - and being able to click & use the suggested area. 

This allows the user for example to be able to specify locations that have the same name - i.e Manchester in Tennessee, USA vs the default which is Manchester in the UK

Note - this will be if I decide to upgrade my subscription to a paid version or OpenWeather adds more functionality on their free API!

**********************

The Weatherman is an app to showcase the weather of any Town or City around the globe! Created using OpenWeather's API : https://openweathermap.org/api

Feel free to add any functionality changes or styles of your own :) 

You will need to create a .env file inside your directory and inside create : REACT_APP_WEATHER_API_KEY & assign it the value of your own API Key


Happy Coding! 


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

