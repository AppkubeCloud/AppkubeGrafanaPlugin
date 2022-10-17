import * as React from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { prefixRoute } from '../../utils/utils.routing';
import { AssetManager } from '../AssetManager';
import { WorkflowEngine } from '../WorkflowEngine';
// import { PLUGIN_BASE_URL } from '../../constants';

export class Plugins extends React.Component<any, any> {
  breadCrumbs: any;
  constructor(props: any) {
    super(props);
    this.state = {};
    this.breadCrumbs = [
      {
        label: 'Home',
        route: `/`,
      },
      {
        label: 'All Plugins',
        isCurrentPage: true,
      },
    ];
  }

  render() {
    const { meta, history } = this.props;
    const currentPath = history.location.pathname;
    return (
      <BrowserRouter>
        <div className="asset-container">
          <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="ALL PLUGINS" />
          <div className="all-plugins-page-container">
            <div className="common-container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="asset-heading">All Plugins</div>
                </div>
              </div>
            </div>
            <div className="common-container border-bottom-0">
              <div className="plugins-tabs-container">
                <ul className="tabs">
                  <li>
                    <NavLink
                      className={`${currentPath.indexOf(ROUTES.AssetManager) !== -1 ? 'active' : ''}`}
                      to={prefixRoute(ROUTES.Environments)}
                    >
                      Asset Manager
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`${currentPath.indexOf(ROUTES.WorkflowEngine) !== -1 ? 'active' : ''}`}
                      to={prefixRoute(ROUTES.WorkflowDashboard)}
                    >
                      Workflow Engine
                    </NavLink>
                  </li>
                </ul>
                <div className="tabs-container">
                  <div className="containt">
                    <Switch>
                      <Route
                        path={prefixRoute(ROUTES.AssetManager)}
                        component={(props: any) => <AssetManager {...props} meta={meta} />}
                      />
                      <Route
                        path={prefixRoute(ROUTES.WorkflowEngine)}
                        component={(props: any) => <WorkflowEngine {...props} meta={meta} />}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
