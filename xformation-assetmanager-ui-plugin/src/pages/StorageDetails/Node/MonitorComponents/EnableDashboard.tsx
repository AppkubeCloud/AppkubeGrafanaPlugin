import * as React from 'react';
import { v4 } from 'uuid';

export class EnableDashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dashboardData: [],
    };
  }

  setDashboardData = (data: any) => {
    this.setState({
      dashboardData: data,
    })
  }

  displayTable = () => {
    const retData: any = [];
    const { dashboardData } = this.state;
    dashboardData.forEach((dataSource: any, dataSourceIndex: any) => {
      if (dataSource.isChecked) {
        const { dashboards } = dataSource;
        const dashboardJSX: any = [];
        dashboards.forEach((dashboard: any, dashboardIndex: any) => {
          if (dashboard.isChecked) {
            dashboardJSX.push(
              <tbody key={v4()}>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={dashboard.isChecked}
                    />
                  </td>
                  <td>{dashboard.name}</td>
                  {/* <td>
                    <a>
                      <i className="fa fa-eye"></i>
                    </a>
                  </td> */}
                </tr>
              </tbody>
            );
          }
        });
        retData.push(
          <table key={v4()} className="table-tbody first-table" width="100%">
            <tr>
              <td style={{ paddingLeft: "0", paddingRight: "0" }}>
                <table width="100%">
                  <tr>
                    <td>
                      <a>{dataSource.name}</a>
                    </td>
                    <td>
                      <a>{dataSource.type}</a>
                    </td>
                    <td>
                      <table className="table-inner" width="100%">
                        {dashboardJSX}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        );
      }
    });
    return retData;
  };

  render() {
    return (
      <div className="verify-inputs-section">
        <div className="configure-inputs-table">
          <table className="table-thead" width="100%">
            <tr>
              <th>Input</th>
              <th>Input Type</th>
              <th>
                Available Dashboards
                <div className="float-right">
                  <a>
                    <i className="fa fa-plus"></i>
                  </a>
                  <a>
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </th>
            </tr>
          </table>
          {this.displayTable()}
        </div>
      </div>
    );
  }
}
