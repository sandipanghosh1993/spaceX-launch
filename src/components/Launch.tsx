import React from 'react';
import {
  OverlayTrigger,
  Tooltip,
  Row,
  Col,
  Container,
  Form
} from 'react-bootstrap';
import { getCores, getPayloads } from '../utils/commonUtils';

/**
 * @interface LaunchProps
 *
 * Props received by Launch
 */
interface LaunchProps {
  id: string;
  launch: any;
  hanldeLaunchDetails: Function;
}

/**
 * @class SearchBox
 *
 * Component to render launch details
 */
const Launch: React.FC<LaunchProps> = (props: LaunchProps) => (
  <Container
    style={{
      marginBottom: '2rem',
      marginTop: '2rem',
      border: '1px solid #CACFD2',
      borderRadius: '5px',
      paddingTop: '8px',
      paddingBottom: '10px'
    }}
  >
    <h4 style={{ color: '#515A5A' }}>
      <strong>{props.launch.mission_name}</strong>
      <div style={{ float: 'right' }}>
        <Form.Check
          id={props.id}
          onChange={(event: any) => {
            props.hanldeLaunchDetails(event.target.id, props.launch);
          }}
        />
      </div>
    </h4>
    <Row>
      <Col sm={6} md={6} lg={6}>
        <span>
          <strong>Launch Date: </strong>
          <div>{props.launch.launch_date_local}</div>
        </span>
        <span>
          <strong>Launch Success: </strong>
          <div>{props.launch.launch_success ? 'Yes' : 'No'}</div>
        </span>
        <span>
          <strong>Launch Site: </strong>
          <div>{props.launch.launch_site.site_name_long}</div>
        </span>
        <span>
          <strong>Wiki Link: </strong>
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            <a href={props.launch.links.wikipedia} target="_blank">
              {props.launch.links.wikipedia
                ? props.launch.links.wikipedia
                : 'Not Available'}
            </a>
          </div>
        </span>
      </Col>
      <Col sm={6} md={6} lg={6}>
        <span>
          <strong>Rocket Name: </strong>
          <div>{props.launch.rocket.rocket_name}</div>
        </span>
        <span>
          <strong>Rocket Type: </strong>
          <div>{props.launch.rocket.rocket_type}</div>
        </span>
        <span>
          <strong> First Stage: </strong>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip-top`}>
                {getCores(props.launch.rocket.first_stage.cores)}
              </Tooltip>
            }
          >
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {getCores(props.launch.rocket.first_stage.cores)}
            </div>
          </OverlayTrigger>
        </span>
        <span>
          <strong>Second Stage: </strong>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip-top`}>
                {getPayloads(props.launch.rocket.second_stage.payloads)}
              </Tooltip>
            }
          >
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {getPayloads(props.launch.rocket.second_stage.payloads)}
            </div>
          </OverlayTrigger>
        </span>
      </Col>
    </Row>
  </Container>
);

export default Launch;
