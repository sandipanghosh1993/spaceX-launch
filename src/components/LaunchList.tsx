import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button, Spinner } from 'react-bootstrap';
import Launch from './Launch';

const GET_LAUNCHES = gql`
  query Lunches($offset: Int!, $mission: String!, $rocket: String!) {
    launchesPast(
      limit: 5
      offset: $offset
      find: { mission_name: $mission, rocket_name: $rocket }
    ) {
      mission_name
      launch_date_local
      launch_success
      launch_site {
        site_name_long
      }
      links {
        wikipedia
      }
      rocket {
        rocket_name
        rocket_type
        first_stage {
          cores {
            flight
            core {
              reuse_count
              status
            }
          }
        }
        second_stage {
          payloads {
            payload_type
            payload_mass_kg
          }
        }
      }
    }
  }
`;

/**
 * @interface LaunchListState
 *
 * Props set in LaunchList state
 */
interface LaunchListState {
  offset: number;
}

/**
 * @interface LaunchListProps
 *
 * Props received by LaunchList
 */
interface LaunchListProps {
  mission: string;
  rocket: string;
  isReset: Function;
  offset: number;
  hanldeLaunchDetails: Function;
  emptyLaunchDetails: Function;
}

/**
 * @class LaunchList
 *
 * Component to render launch list
 */
class LaunchList extends React.PureComponent<LaunchListProps, LaunchListState> {
  list: any = [];
  offset: number = 0;
  public constructor(props: LaunchListProps) {
    super(props);
    this.state = {
      offset: props.offset
    };
  }

  static getDerivedStateFromProps(props: LaunchListProps) {
    if (props.isReset()) {
      return {
        offset: props.offset
      };
    }
    return null;
  }

  public handleShowMore() {
    this.props.emptyLaunchDetails();
    this.setState({ offset: this.state.offset + 5 });
  }

  public getLaunches(data: any) {
    this.list = this.list.concat(
      data.launchesPast.map((launch: any, index: number) => (
        <React.Fragment
          key={launch.mission_name + index + new Date().getTime()}
        >
          <Launch
            launch={launch}
            id={launch.mission_name + index + new Date().getTime()}
            hanldeLaunchDetails={this.props.hanldeLaunchDetails}
          />
        </React.Fragment>
      ))
    );
    return this.list;
  }

  public render() {
    if (this.props.isReset()) {
      this.list = [];
    }

    return (
      <Query
        query={GET_LAUNCHES}
        variables={{
          offset: this.state.offset,
          mission: this.props.mission,
          rocket: this.props.rocket
        }}
      >
        {({ loading, data }: any) => {
          if (loading) {
            return this.list.length ? (
              this.list.concat(
                <Spinner animation="border" key={'spinner-key'} />
              )
            ) : (
              <h4 style={{ padding: '2rem' }}>Loading...</h4>
            );
          }
          return (
            <div className="launch-list">
              {this.getLaunches(data)}
              {data.launchesPast.length < 5 ? null : (
                <div style={{ paddingBottom: '1rem' }}>
                  <Button
                    variant="primary"
                    onClick={this.handleShowMore.bind(this)}
                  >
                    Show More Missions
                  </Button>
                </div>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default LaunchList;
