# Student Score Table - mini front end app excercise

**Demo**: deployed using Netlify [here](https://tubular-pony-0a0cf2.netlify.app/).

## Tech-stack

- Create React App
- TypeScript
- SCSS
- Framer Motion

### Plan of works

- [x] Form, Table and Filter components
- [x] use Context for table data state managment
- [x] filter table by available fields
- [x] sort table by column
- [x] add new records
- [x] style default theme
- [x] mobile media queries
- [ ] edit current record
- [ ] i18z with `React-Intl` (EN, PL)
- [ ] animations using `framer-motion`
- [ ] unit tests
- [ ] integration tests
- [ ] E2£ tests

### Planned improvements

- [ ] hide filter form in animated drawer
- [ ] add new record to top of the table **OR** use smooth `scrollIntoView()` once record added to bottom of the list
- [ ] dark theme switcher
- [ ] highlight used filter fields if filter is active
- [ ] mock API to introduce async data fetching simulation
- [ ] use `Yup` for data validation
- [ ] swap Context API to micro state manager
- [ ] swap Formik to React Hook Form - should mitigate too many re-renders
- [ ] use `Select2` library for accessible custom select inputs

## Known bugs

- [ ] current implementation of **sort table by column** introduced stale state when controlling state with the component level `useState` + `useEffect` hooks. This results in render being behind actual state value. Logging values in the console proves values being correctly sorted.
- [ ] column with `filter: false` still has onClick set

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
