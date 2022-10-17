import * as React from 'react';
import { Breadcrumbs } from '../../Breadcrumbs';
import resourcesUserImg from '../../../img/resources-user-img.png';
import resourseIcon1 from '../../../img/resourse-icon1.png';
import resourseIcon2 from '../../../img/resourse-icon2.png';
import resourseIcon3 from '../../../img/resourse-icon3.png';
import cardArrowIcon from '../../../img/card-arrow-icon.png';
import { ROUTES } from '../../../constants';
import { prefixRoute } from '../../../utils/utils.routing';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
//import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);


export class ResourceWiseViewAllTasks extends React.Component<any, any> {
  breadCrumbs: any;
  createStreamRef: any;
  newStreamRef: any;
  manageOutputRef: any;
  allEventRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      tcpInputs: [],
      openCreateMenu: false,
      streamTableData: [],
      indexSets: [],

      humanResources: {
        total: null,
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
        datasets: [
          {
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

            lineTension: 0.2,
            backgroundColor: [
              'rgba(113, 234, 255, 21)',
              // 'rgba(255, 153, 0, 1)',
              // 'rgba(0, 137, 214, 1)',
              // 'rgba(216, 69, 57, 1)',
            ],
          },
        ],
      },
      barOptions: {
        indexAxis: "x" as const,
        plugins: {
          scales: {
            y: {
              ticks: {
                fontColor: 'black',
                stepSize: 10,
                beginAtZero: true,
              },
              gridLines: {
                display: false
              }
            },
            x: {
              ticks: {
                fontColor: 'black',
                display: false,
                stepSize: 10,
              },
              gridLines: {
                display: false
              }
            },
          },
          legend: {
            display: false,
          },
          title: {
            display: false,
            text: 'Total Cost: $6,71,246',
            position: 'bottom',
            color: '#202020',
            font: {
              size: 18
            },
          },
          responsive: true,
        }
      },
    };
    this.breadCrumbs = [
      {
        label: 'Home',
        route: `/`,
      },
      {
        label: 'Kubernetes | Overview',
        isCurrentPage: true,
      },
    ];

  }

  render() {
    const { barOptions, humanResources } = this.state
    return (
      <div className="owrkflow-resource-wise-View-container">
        <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="WORKFLOW MANAGEMENT" />
        <div className="resource-wise-View-page-container">
          <div className="resource-wise-View-page-heading">
            <div className="row">
              <div className="col-lg-12">
                <div className="resource-wise-View-head">
                  <div className="heading-content-left">
                    <div className="heading-icon"><img src={resourcesUserImg} alt="" /></div>
                    <div className="heading-content">
                      <h3>Angela Moss</h3>
                      <span>Project-Xformation</span>
                    </div>
                  </div>
                  <div className="heading-content-right">
                    <span><Link to={prefixRoute(ROUTES.WorkflowDashboard)}><i className="fa fa-times" aria-hidden="true"></i></Link></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-wise-resources">
            <div className="row">
              <div className="col-lg-12">
                <div className="project-resources-heading">Project</div>
              </div>
            </div>
            <div className="project-resources-section">
              <div className="project-resources-inner">
                <div className="project-resources-box">
                  <div className="user-content">
                    <div className="user-img"><img src={resourseIcon1} alt="" /></div>
                    <div className="user-text">
                      <span>Xformation Platform</span>
                    </div>
                  </div>
                  <div className="resources-progress-heading">
                    <h4>Role-Project Management</h4>
                    <span>Total Task-  10</span>
                  </div>
                  <div className="project-progressbar text-center">
                    <CircularProgressbar value={66} text={`80%`}
                      strokeWidth={15}
                      styles={buildStyles({
                        strokeLinecap: {},
                        trailColor: "#E5E7E9",
                        pathColor: "#6317c2",
                        textColor: "black",
                      })}
                    />
                    <p>Task Completed</p>
                    <div className="card-arrow-image"><img src={cardArrowIcon} alt="" /></div>
                  </div>
                </div>
                <div className="project-resources-box">
                  <div className="user-content">
                    <div className="user-img"><img src={resourseIcon2} alt="" /></div>
                    <div className="user-text">
                      <span>Procurement Solution</span>
                    </div>
                  </div>
                  <div className="resources-progress-heading">
                    <h4>Role-Project Management</h4>
                    <span>Total Task-  10</span>
                  </div>
                  <div className="project-progressbar text-center">
                    <CircularProgressbar value={66} text={`80%`}
                      strokeWidth={15}
                      styles={buildStyles({
                        strokeLinecap: {},
                        trailColor: "#E5E7E9",
                        pathColor: "#6317c2",
                        textColor: "black",
                      })}
                    />
                    <p>Task Completed</p>
                    <div className="card-arrow-image"><img src={cardArrowIcon} alt="" /></div>
                  </div>
                </div>
                <div className="project-resources-box">
                  <div className="user-content">
                    <div className="user-img"><img src={resourseIcon3} alt="" /></div>
                    <div className="user-text">
                      <span>HRMS</span>
                    </div>
                  </div>
                  <div className="resources-progress-heading">
                    <h4>Role-Project Management</h4>
                    <span>Total Task-  10</span>
                  </div>
                  <div className="project-progressbar text-center">
                    <CircularProgressbar value={66} text={`80%`}
                      strokeWidth={15}
                      styles={buildStyles({
                        strokeLinecap: {},
                        trailColor: "#E5E7E9",
                        pathColor: "#6317c2",
                        textColor: "black",
                      })}
                    />
                    <p>Task Completed</p>
                    <div className="card-arrow-image"><img src={cardArrowIcon} alt="" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-wise-status">
            <div className="heading">All Task</div>
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-lg-4">
                <div className="task-heading-content">
                  <p>Role - Project Management</p>
                  <span>Total Task- 10</span>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="filler-search">
                  <select>
                    <option>Sort by</option>
                    <option>Sort by 1</option>
                    <option>Sort by 2</option>
                    <option>Sort by 3</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="search-bar">
                  <input type="text" className="control-form" placeholder="Search Usecase" />
                  <i className="fa fa-search" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div className="project-wise-table">
              <div className="table">
                <div className="thead">
                  <div className="th">Task </div>
                  <div className="th">Project</div>
                  <div className="th">Release</div>
                  <div className="th">Stage</div>
                  <div className="th">Status</div>
                  <div className="th">Duedate</div>
                  <div className="th last">Duedate</div>
                </div>
                <div className="tbody">
                  <div className="tr">
                    <div className="td tast-content">Task 1</div>
                    <div className="td project-content">Xformation</div>
                    <div className="td project-content">2nd</div>
                    <div className="td project-content">Publish/Oprate</div>
                    <div className="td project-content">Completed  </div>
                    <div className="td project-content">25/02/2022</div>
                    <div className="td project-content">Xformation</div>
                  </div>
                  <div className="tr">
                    <div className="td tast-content">Task 2</div>
                    <div className="td project-content">Xformation</div>
                    <div className="td project-content">2nd</div>
                    <div className="td project-content">Publish/Oprate</div>
                    <div className="td project-content">Completed  </div>
                    <div className="td project-content">25/02/2022</div>
                    <div className="td project-content">Xformation</div>
                  </div>
                  <div className="tr">
                    <div className="td tast-content">Task 3</div>
                    <div className="td project-content">Xformation</div>
                    <div className="td project-content">2nd</div>
                    <div className="td project-content">Publish/Oprate</div>
                    <div className="td project-content">Completed  </div>
                    <div className="td project-content">25/02/2022</div>
                    <div className="td project-content">Xformation</div>
                  </div>
                  <div className="tr">
                    <div className="td tast-content">Task 4</div>
                    <div className="td project-content">Xformation</div>
                    <div className="td project-content">2nd</div>
                    <div className="td project-content">Publish/Oprate</div>
                    <div className="td project-content">Completed  </div>
                    <div className="td project-content">25/02/2022</div>
                    <div className="td project-content">Xformation</div>
                  </div>
                  <div className="tr">
                    <div className="td tast-content">Task 5</div>
                    <div className="td project-content">Xformation</div>
                    <div className="td project-content">2nd</div>
                    <div className="td project-content">Publish/Oprate</div>
                    <div className="td project-content">Completed  </div>
                    <div className="td project-content">25/02/2022</div>
                    <div className="td project-content">Xformation</div>
                  </div>
                  <div className="tr">
                    <div className="td tast-content">Task 6</div>
                    <div className="td project-content">Xformation</div>
                    <div className="td project-content">2nd</div>
                    <div className="td project-content">Publish/Oprate</div>
                    <div className="td project-content">Completed  </div>
                    <div className="td project-content">25/02/2022</div>
                    <div className="td project-content">Xformation</div>
                  </div>
                  <div className="tr">
                    <div className="td tast-content">Task 7</div>
                    <div className="td project-content">Xformation</div>
                    <div className="td project-content">2nd</div>
                    <div className="td project-content">Publish/Oprate</div>
                    <div className="td project-content">Completed  </div>
                    <div className="td project-content">25/02/2022</div>
                    <div className="td project-content">Xformation</div>
                  </div>
                  <div className="tr">
                    <div className="td tast-content">Task 8</div>
                    <div className="td project-content">Xformation</div>
                    <div className="td project-content">2nd</div>
                    <div className="td project-content">Publish/Oprate</div>
                    <div className="td project-content">Completed  </div>
                    <div className="td project-content">25/02/2022</div>
                    <div className="td project-content">Xformation</div>
                  </div>
                  <div className="tr">
                    <div className="td tast-content">Task 9</div>
                    <div className="td project-content">Xformation</div>
                    <div className="td project-content">2nd</div>
                    <div className="td project-content">Publish/Oprate</div>
                    <div className="td project-content">Completed  </div>
                    <div className="td project-content">25/02/2022</div>
                    <div className="td project-content">Xformation</div>
                  </div>
                  <div className="tr">
                    <div className="td tast-content">Task 10</div>
                    <div className="td project-content">Xformation</div>
                    <div className="td project-content">2nd</div>
                    <div className="td project-content">Publish/Oprate</div>
                    <div className="td project-content">Completed  </div>
                    <div className="td project-content">25/02/2022</div>
                    <div className="td project-content">Xformation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="average-section">
            <div className="row">
              <div className="col-md-12">
                <div className="statistics-graph">
                  <div className="requistions-heading">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <h5 className="d-block">{'Project Overview'}</h5>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="requistions-dropdown">
                          <div className="opensens-dropdown">
                            <select className="opensens-content">
                              <option value="">Monthly</option>
                              <option value={10}>abc</option>
                              <option value={20}>def</option>
                              <option value={30}>abc</option>
                            </select>
                            <div className="meore-menu-icon">
                              <i className="fa fa-ellipsis-v"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="totalpaid">
                      <div className="paid-content">
                        <span>{"Completed Task"}</span>
                      </div>
                      <div className="paid-content unpaid">
                        <span>{"Pending Task"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="chart">
                    <Bar data={humanResources} options={barOptions} height={70} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
