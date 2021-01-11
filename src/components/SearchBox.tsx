import React from 'react';
import { Image, InputGroup, FormControl, Button } from 'react-bootstrap';

/**
 * @interface SearchBoxProps
 *
 * Props received by SearchBox
 */
interface SearchBoxProps {
  handleSearch: Function;
}

/**
 * @interface SearchBoxState
 *
 * Props set in SearchBox state
 */
interface SearchBoxState {
  mission: string;
  rocket: string;
}

/**
 * @class SearchBox
 *
 * Component to render a search field to filter out data based on search text
 */
class SearchBox extends React.PureComponent<SearchBoxProps, SearchBoxState> {
  public constructor(props: SearchBoxProps) {
    super(props);
    this.state = {
      mission: '',
      rocket: ''
    };
  }

  public handleReset() {
    // populate the mission list when search text is cleared
    const { mission, rocket } = this.state;
    if (mission.trim() === '' && rocket.trim() === '') {
      this.props.handleSearch('', '');
    }
  }

  public handleButtonPress(event: any) {
    event.preventDefault();
    const { mission, rocket } = this.state;
    this.props.handleSearch(mission, rocket);
  }

  public render() {
    return (
      <InputGroup className="searchbox">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <Image
              src={require('../icons/search_icon.png')}
              width="24px"
              height="24px"
            />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Type Mission Name"
          type="search"
          aria-label="search"
          value={this.state.mission}
          onChange={(event: any) => {
            this.setState({ mission: event.target.value }, this.handleReset);
          }}
          onKeyPress={(event: any) => {
            if (event.charCode === 13 && event.target.value.trim()) {
              this.handleButtonPress(event);
            }
          }}
        />
        <FormControl
          placeholder="Type Rocket Name"
          type="search"
          aria-label="search"
          value={this.state.rocket}
          onChange={(event: any) => {
            this.setState({ rocket: event.target.value }, this.handleReset);
          }}
          onKeyPress={(event: any) => {
            if (event.charCode === 13 && event.target.value.trim()) {
              this.handleButtonPress(event);
            }
          }}
        />
        <InputGroup.Append>
          <Button
            disabled={!(this.state.mission.trim() || this.state.rocket.trim())}
            variant="outline-secondary"
            onClick={this.handleButtonPress.bind(this)}
          >
            Go
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

export default SearchBox;
