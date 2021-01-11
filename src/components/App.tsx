import React from 'react';
import SearchBox from './SearchBox';
import Dialog from './Dialog';
import LaunchList from './LaunchList';

/**
 * @interface AppState
 *
 * Props set in App state
 */
interface AppState {
  mission: string;
  rocket: string;
}

/**
 * @class App
 *
 * Used as root component
 */
class App extends React.PureComponent<{}, AppState> {
  reset: boolean = false;
  launchDetails: any = {};
  public constructor(props: any) {
    super(props);
    this.state = {
      mission: '',
      rocket: ''
    };
  }

  public handleSearch(mission: string, rocket: string) {
    this.reset = true;
    this.launchDetails = {};
    this.setState({ mission, rocket });
  }

  public componentDidUpdate() {
    if (this.reset) {
      this.reset = false;
    }
  }

  public isReset() {
    return this.reset;
  }

  public emptyLaunchDetails() {
    this.launchDetails = {};
  }

  public getLaunchDetails() {
    return this.launchDetails;
  }

  public hanldeLaunchDetails(id: string, launch: any) {
    if (!this.launchDetails[id]) {
      this.launchDetails[id] = launch;
    } else {
      delete this.launchDetails[id];
    }
  }

  public render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ padding: '1rem' }}>
          <strong>SpaceX Launch</strong>
        </h1>
        <div className="outer-div">
          <SearchBox handleSearch={this.handleSearch.bind(this)} />
          <Dialog getLaunchDetails={this.getLaunchDetails.bind(this)} />
        </div>
        <LaunchList
          mission={this.state.mission}
          rocket={this.state.rocket}
          isReset={this.isReset.bind(this)}
          offset={0}
          hanldeLaunchDetails={this.hanldeLaunchDetails.bind(this)}
          emptyLaunchDetails={this.emptyLaunchDetails.bind(this)}
        />
      </div>
    );
  }
}

export default App;
