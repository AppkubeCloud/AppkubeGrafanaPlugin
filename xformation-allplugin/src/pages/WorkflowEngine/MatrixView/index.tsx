import * as React from 'react';
import newUsecase from '../../../img/new-usecase.png';
import designSpecsImg from '../../../img/design-specs-img.png';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { prefixRoute } from '../../../utils/utils.routing';

export class MatrixView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeTab: "Usecase",
        };
    }

    setActiveTab = (val: any) => {
        this.setState({
            activeTab: val,
        })
    }

    render() {
        const { activeTab } = this.state;
        return (
            <div className="matrix-view-container">
                <div className="matrix-view-section">
                    <div className="matrix-view-content">
                        <div className="matrix-view-head">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-xl-7 col-lg-6 col-md-5 col-sm-12 col-xs-12">
                                    <div className="head-left">
                                        <img src={newUsecase} alt="" />
                                        <h5> Send RFQ &#62; Requirements</h5>
                                    </div>
                                </div>
                                <div className="col-xl-5 col-lg-6 col-md-7 col-sm-12 col-xs-12">
                                    <div className="head-right">
                                        <div className="input-group searchbar">
                                            <input type="text" className="form-control" placeholder="Search for..." />
                                        </div>
                                        <Link to={prefixRoute(ROUTES.Procurement)} className="btn-primary pro-overview-btn"><i className="fas fa-chevron-left"></i> Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tabs">
                            <ul className="tab">
                                <li className={activeTab === "Usecase" ? 'active' : ""} onClick={() => this.setActiveTab("Usecase")}>
                                    <span>Usecase Development</span>
                                </li>
                                <li className={activeTab === "Design" ? 'active' : ""} onClick={() => this.setActiveTab("Design")}>
                                    <span>Design Specs</span>
                                </li>
                            </ul>
                            <div className="tabs-content">
                                {activeTab === "Usecase" &&
                                    <div className="tabs-inner-content">
                                        <h5>Use Case Name &#8758; <span>Attendance of students</span></h5>
                                        <div className="requirements-content">
                                            <h6>Actors:</h6>
                                            <ul>
                                                <li>Admin</li>
                                                <li>Class teacher</li>
                                                <li>Parent</li>
                                            </ul>
                                        </div>
                                        <div className="requirements-content">
                                            <h6>Use Case Description:</h6>
                                            <p>This module will help to take attendance of Students in simple and east way.</p>
                                        </div>
                                        <div className="requirements-content">
                                            <h6>Triggers:</h6>
                                            <ul>
                                                <li>class teacher / Admin logs in to portal and takes attendance, seves it and automated notification is sent.</li>
                                            </ul>
                                        </div>
                                        <div className="requirements-content">
                                            <h6>Preconditions::</h6>
                                            <ul>
                                                <li>Attendanec is taken manually and not using Bio-metric, or Swipe card.</li>
                                                <li>Class teacher role is set, and class is allocated to teacher.</li>
                                                <li>Lecture is assigned to take attendance.</li>
                                                <li>List of students is enrolled that class and lecture</li>
                                            </ul>
                                        </div>
                                        <div className="requirements-content">
                                            <h6>Post condition:</h6>
                                            <ul>
                                                <li>Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                            </ul>
                                        </div>
                                        <div className="requirements-content">
                                            <h6>Normal Flow:</h6>
                                            <ol>
                                                <li>Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                            </ol>
                                        </div>
                                        <div className="requirements-content">
                                            <h6>Altermate Flow:</h6>
                                            <p>9A1: Teacher wrongly marks student as absent or student come tale to school.</p>
                                            <ol>
                                                <li>Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                                <li>Class teacher / Admin logs in to Class teacher / Admin logs in to Class teacher / Admin logs in to</li>
                                            </ol>
                                        </div>
                                    </div>
                                }
                                {activeTab === "Design" &&
                                    <div className="tabs-inner-content">
                                        <p><strong>Prototype Link:</strong> <a href="https://xd.adobe.com/view/a29133fd-8214-4aff-7293-b9a01174de5-d4a0/?fullscreen" target="_blank" >https://xd.adobe.com/view/a29133fd-8214-4aff-7293-b9a01174de5-d4a0/?fullscreen</a></p>
                                        <div className="design-specs-img"><img src={designSpecsImg} alt="" /></div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
