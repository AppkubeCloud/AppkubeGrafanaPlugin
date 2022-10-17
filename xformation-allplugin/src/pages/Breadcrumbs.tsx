import * as React from 'react';
import { Link } from 'react-router-dom';

export class Breadcrumbs extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { breadcrumbs, pageTitle } = this.props;
        return (
            <div className="breadcrumbs-container">
                {   pageTitle &&
                    <div className="page-title">
                        {pageTitle}
                    </div>
                }
                <div className="breadcrumbs">
                    {
                        breadcrumbs.map((breadcrumb: any, index: any) => {
                            if (breadcrumb.isCurrentPage) {
                                return <span key={index} className="current-page">{breadcrumb.label}</span>
                            } else {
                                return (
                                <React.Fragment key={index}>
                                    <Link to={`${breadcrumb.route}`} className="breadcrumbs-link">{breadcrumb.label}</Link>
                                    <span className="separator"><i className="fa fa-chevron-right"></i></span>
                                </React.Fragment>);
                            }
                        })
                    }
                </div>
            </div>
        );
    }
};