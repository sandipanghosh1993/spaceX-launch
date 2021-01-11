## SpaceX Launch

This App is hosted on [https://swaarm-spacex.herokuapp.com/](https://swaarm-spacex.herokuapp.com/)

## Getting Started

To get started make sure [node](https://nodejs.org/en/download/) is installed locally and then run `npm install` within this directory.

## Available Scripts

In this directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npx cypress open`

Launches cypress for end-to-end test. Make sure development sever is already running before launching cypress.

**Visualization:**

The app initially shows 5 launches with a search bar and a compare launches button at the top of the page. In the search bar there are 2 search fields to filter launches by mission name and rocket name. Each launch is shown in a rectangular square box with detailed information and a check box to select launches for comparison. After selecting 2 launches if the user clicks on the compare launches button a dialog comes up showing the comparison in a tabular format. If the user selects less than 2 or more than 2 launches and clicks on the compare launches button it will show an error dialog asking to select 2 launches. At the end of the launch list there is a show more button at the bottom of the page, clicking on that button loades 5 more launches and the page will be in infinite scroll.

**Following things could have been done with more time:**

1. Implement lazy loading to render launch list for better user experience on slow network.
2. Instead of keeping show more button on-scroll loading can be implemented.
3. Currently after clicking on the show more button previously checked checkboxes get unchecked. Checkbox state can be retained.
4. Unit test for each component.
5. End to end test for other workflows.

**Problems encountered:**

For different combinations of search the implementation of showing the correct list of launches with minimum number of re-render was challenging.
