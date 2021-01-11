import React from 'react';
import { Button, Modal, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getCores, getPayloads } from '../utils/commonUtils';

/**
 * @interface DialogState
 *
 * Props set in Dialog state
 */
interface DialogState {
  modalShow: boolean;
}

/**
 * @interface DialogProps
 *
 * Props received by Dialog
 */
interface DialogProps {
  getLaunchDetails: Function;
}

/**
 * @class Dialog
 *
 * Component to render a dialog to compare launches
 */
class Dialog extends React.PureComponent<DialogProps, DialogState> {
  public constructor(props: DialogProps) {
    super(props);
    this.state = {
      modalShow: false
    };
  }

  public setShow(modalShow: boolean) {
    this.setState({ modalShow });
  }

  public getMissions() {
    return Object.values(this.props.getLaunchDetails()).map((el: any) => el);
  }

  public render() {
    return (
      <React.Fragment>
        <div style={{ paddingTop: '0.5rem' }}>
          <Button
            variant="secondary"
            onClick={() => {
              this.setShow(true);
            }}
            className="compare-btn"
          >
            Compare Launches
          </Button>
        </div>

        {Object.entries(this.props.getLaunchDetails()).length !== 2 ? (
          <Modal
            show={this.state.modalShow}
            onHide={() => {
              this.setShow(false);
            }}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Error!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>You have to select 2 launches for comparison</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  this.setShow(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          <Modal
            show={this.state.modalShow}
            onHide={() => {
              this.setShow(false);
            }}
            size="lg"
            centered
            dialogClassName="modal-width"
          >
            <Modal.Header closeButton>
              <Modal.Title>Comparison</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>{this.getMissions()[0].mission_name}</th>
                    <th>{this.getMissions()[1].mission_name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Launch Date</th>
                    <td>{this.getMissions()[0].launch_date_local}</td>
                    <td>{this.getMissions()[1].launch_date_local}</td>
                  </tr>
                  <tr>
                    <th>Launch Success</th>
                    <td>
                      {this.getMissions()[0].launch_success ? 'Yes' : 'No'}
                    </td>
                    <td>
                      {this.getMissions()[1].launch_success ? 'Yes' : 'No'}
                    </td>
                  </tr>
                  <tr>
                    <th>Launch Site</th>
                    <td>{this.getMissions()[0].launch_site.site_name_long}</td>
                    <td>{this.getMissions()[1].launch_site.site_name_long}</td>
                  </tr>
                  <tr>
                    <th>Wiki Link</th>
                    <td>
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '22rem'
                        }}
                      >
                        <a
                          href={this.getMissions()[0].links.wikipedia}
                          target="_blank"
                        >
                          {this.getMissions()[0].links.wikipedia
                            ? this.getMissions()[0].links.wikipedia
                            : 'Not Available'}
                        </a>
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '22rem'
                        }}
                      >
                        <a
                          href={this.getMissions()[1].links.wikipedia}
                          target="_blank"
                        >
                          {this.getMissions()[1].links.wikipedia
                            ? this.getMissions()[1].links.wikipedia
                            : 'Not Available'}
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Rocket Name</th>
                    <td>{this.getMissions()[0].rocket.rocket_name}</td>
                    <td>{this.getMissions()[1].rocket.rocket_name}</td>
                  </tr>
                  <tr>
                    <th>Rocket Type</th>
                    <td>{this.getMissions()[0].rocket.rocket_type}</td>
                    <td>{this.getMissions()[1].rocket.rocket_type}</td>
                  </tr>
                  <tr>
                    <th>First Stage</th>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            {getCores(
                              this.getMissions()[0].rocket.first_stage.cores
                            )}
                          </Tooltip>
                        }
                      >
                        <div
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '22rem'
                          }}
                        >
                          {getCores(
                            this.getMissions()[0].rocket.first_stage.cores
                          )}
                        </div>
                      </OverlayTrigger>
                    </td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            {getCores(
                              this.getMissions()[1].rocket.first_stage.cores
                            )}
                          </Tooltip>
                        }
                      >
                        <div
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '22rem'
                          }}
                        >
                          {getCores(
                            this.getMissions()[1].rocket.first_stage.cores
                          )}
                        </div>
                      </OverlayTrigger>
                    </td>
                  </tr>
                  <tr>
                    <th>Second Stage</th>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            {getPayloads(
                              this.getMissions()[0].rocket.second_stage.payloads
                            )}
                          </Tooltip>
                        }
                      >
                        <div
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '22rem'
                          }}
                        >
                          {getPayloads(
                            this.getMissions()[0].rocket.second_stage.payloads
                          )}
                        </div>
                      </OverlayTrigger>
                    </td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            {getPayloads(
                              this.getMissions()[1].rocket.second_stage.payloads
                            )}
                          </Tooltip>
                        }
                      >
                        <div
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '22rem'
                          }}
                        >
                          {getPayloads(
                            this.getMissions()[1].rocket.second_stage.payloads
                          )}
                        </div>
                      </OverlayTrigger>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  this.setShow(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default Dialog;
