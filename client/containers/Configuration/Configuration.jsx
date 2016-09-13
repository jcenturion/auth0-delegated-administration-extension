import React, { Component } from 'react';
import { LoadingPanel, Error } from '../../components/Dashboard';

import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { scriptActions } from '../../actions';

import Editor from '../../components/Editor';
import './Configuration.css';

class Configuration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1,
      scripts: props.scripts || { }
    };
  }

  componentWillMount = () => {
    this.props.fetchScript('access');
    this.props.fetchScript('filter');
    this.props.fetchScript('write');
    this.props.fetchScript('memberships');
    this.props.fetchScript('styles');
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      scripts: nextProps.scripts.toJS()
    });
  }

  updateScript = (name) => (code) => {
    const scripts = this.state.scripts;
    scripts[name] = code;
    this.setState({
      scripts
    });
  };

  saveScript = (name) => () => {
    this.props.updateScript(name, this.state.scripts[name]);
  };

  getValue = (scripts, index) => {
    const val = scripts.get(index);
    if (val) {
      return val.toString();
    } else {
      return '';
    }
  };


  render() {
    const { scripts, loading, error } = this.props;

    return (
      <LoadingPanel show={loading} animationStyle={{ paddingTop: '5px', paddingBottom: '5px' }}>
        <Error message={error} />
        <div className="users">
          <div className="row content-header">
            <div className="col-xs-12 userTableContent">
              <h2>Configuration</h2>
            </div>
          </div>
          <div className="row user-tabs">
            <div className="col-xs-12">
              <Tabs defaultActiveKey={this.state.activeTab} animation={false}>
                <Tab eventKey={1} title="Filter Hook">
                  <Editor
                    value={this.state.scripts.filter}
                    onChange={this.updateScript('filter')}
                  />
                  <div className="saveConfigurationButton">
                    <button onClick={this.saveScript('filter')} className="btn btn-success">Save Filter Hook
                    </button>
                  </div>
                </Tab>
                <Tab eventKey={2} title="Access Hook">
                  <Editor
                    value={this.state.scripts.access}
                    onChange={this.updateScript('access')}
                  />
                  <div className="saveConfigurationButton">
                    <button onClick={this.saveScript('access')} className="btn btn-success">Save Access Hook</button>
                  </div>
                </Tab>
                <Tab eventKey={4} title="Write Hook">
                  <p>The <strong>write hook</strong> will run every time a new user is created. This hook will allow you to shape the user object before it's sent to Auth0. The context object contains the request (with the current user) and the payload sent by the end user.</p>
                  <Editor
                    value={this.state.scripts.write}
                    onChange={this.updateScript('write')}
                  />
                  <div className="saveConfigurationButton">
                    <button onClick={this.saveScript('write')} className="btn btn-success">Save Write Query
                    </button>
                  </div>
                </Tab>
                <Tab eventKey={3} title="Memberships Query">
                  <Editor
                    value={this.state.scripts.memberships}
                    onChange={this.updateScript('memberships')}
                  />
                  <div className="saveConfigurationButton">
                    <button onClick={this.saveScript('memberships')} className="btn btn-success">Save Memberships Query
                    </button>
                  </div>
                </Tab>
                <Tab eventKey={5} title="Styles">
                  <Editor
                    value={this.state.scripts.styles}
                    onChange={this.updateScript('styles')}
                  />
                  <div className="saveConfigurationButton">
                    <button onClick={this.saveScript('styles')} className="btn btn-success">Save Styles
                    </button>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </LoadingPanel>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.scripts.get('error'),
    scripts: state.scripts.get('records'),
    loading: state.scripts.get('loading')
  };
}

export default connect(mapStateToProps, { ...scriptActions })(Configuration);