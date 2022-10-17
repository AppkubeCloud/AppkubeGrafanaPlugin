import * as React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { prefixRoute } from '../../utils/utils.routing';
import { WorkflowDashboard } from './WorkflowDashboard';
import { ProjectWise } from './ProjectWise';
import { CreateUsecase } from './CreateUsecase';
import { MatrixView } from './MatrixView';
import { ProcurementDetail } from './Procurement';
import { ProjectOverView } from './ProjectOverView';
import { ResourceWiseViewAllTasks } from './ResourceWiseViewAllTasks';

export class WorkflowEngine extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { meta } = this.props;
    return (
      <div className="d-block width-100">
        <div className="page-tabs">
          <div className="tab">
            <ul>
              <li>
                <NavLink
                  className={(isActive) => (!isActive ? '' : 'active')}
                  to={prefixRoute(ROUTES.WorkflowDashboard)}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink className={(isActive) => (!isActive ? '' : 'active')} to={prefixRoute(ROUTES.Procurement)}>
                  Procurement
                </NavLink>
              </li>
              <li>
                <NavLink className={(isActive) => (!isActive ? '' : 'active')} to={prefixRoute(ROUTES.MatrixView)}>
                  Matrix View
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="tab-container">
            <div className="containt">
              <Switch>
                <Route
                  path={prefixRoute(ROUTES.WorkflowDashboard)}
                  component={(props: any) => <WorkflowDashboard {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.ProjectWise)}
                  component={(props: any) => <ProjectWise {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.CreateUsecase)}
                  component={(props: any) => <CreateUsecase {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.MatrixView)}
                  component={(props: any) => <MatrixView {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.Procurement)}
                  component={(props: any) => <ProcurementDetail {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.ProjectOverView)}
                  component={(props: any) => <ProjectOverView {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.ResourceWiseViewAllTasks)}
                  component={(props: any) => <ResourceWiseViewAllTasks {...props} meta={meta} />}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
