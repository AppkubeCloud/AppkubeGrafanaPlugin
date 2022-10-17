import * as React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { prefixRoute } from '../../utils/utils.routing';
import { Environments } from './Environments';
import { AccountSetup } from './AccountSetup';
import { AmazonServices } from './AmazonServices';
import { StorageDetails } from './StorageDetails';
import { AddDatasource } from './AddDatasource';
import { AddDatasourceCredential } from './AddDatasource/AddDatasouceCredential';
import { ExploreDataSourceDetail } from './AddDatasource/ExploreDataSourceDetail';
import { AddDatasourceProduct } from './AddDatasource/AddDatasourceProduct';
import { AddDatasourceInputs } from './AddDatasource/AddDatasourceInputs';
import { Kubernetes } from './Kubernetes';
import { DepartmentWiseProducts } from './DepartmentWiseProducts';
import { ProductWiseServicesSla } from './ProductWiseServicesSla';
import { DepartmentWiseCharts } from './DepartmentWiseProducts/departmentChart';

export class AssetManager extends React.Component<any, any> {
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
                <NavLink className={(isActive) => (!isActive ? '' : 'active')} to={prefixRoute(ROUTES.Environments)}>
                  Environments
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(isActive) => (!isActive ? '' : 'active')}
                  to={prefixRoute(ROUTES.DepartmentWiseProducts)}
                >
                  Department Wise Products
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="tab-container">
            <div className="containt">
              <Switch>
                <Route
                  path={prefixRoute(ROUTES.Environments)}
                  component={(props: any) => <Environments {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.AccountSetup)}
                  component={(props: any) => <AccountSetup {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.AmazonServices)}
                  component={(props: any) => <AmazonServices {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.StorageDetails)}
                  component={(props: any) => <StorageDetails {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.AddDatasource)}
                  component={(props: any) => <AddDatasource {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.AddDatasourceCredential)}
                  component={(props: any) => <AddDatasourceCredential {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.ExploreDataSourceDetail)}
                  component={(props: any) => <ExploreDataSourceDetail {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.AddDatasourceProduct)}
                  component={(props: any) => <AddDatasourceProduct {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.AddDatasourceInputs)}
                  component={(props: any) => <AddDatasourceInputs {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.Kubernetes)}
                  component={(props: any) => <Kubernetes {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.DepartmentWiseProducts)}
                  component={(props: any) => <DepartmentWiseProducts {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.ProductWiseServicesSla)}
                  component={(props: any) => <ProductWiseServicesSla {...props} meta={meta} />}
                />
                <Route
                  path={prefixRoute(ROUTES.DepartmentWiseCharts)}
                  component={(props: any) => <DepartmentWiseCharts {...props} meta={meta} />}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
