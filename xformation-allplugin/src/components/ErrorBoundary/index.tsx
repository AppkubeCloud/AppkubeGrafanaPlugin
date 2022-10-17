import React from "react";
import ErrorImg from '../../img/error-img.png'

class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false,
        useCaseState:"" };
    }

    //  getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.

    // if (error.componentStack){
    //     this.setState({hasError:false})
    // return {hasError:true};
    // }else{
    //     this.setState({hasError:false})
    //     return{hasError:false};
    // }
    // }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        let { activeUseCaseIndex, useCaseListLength } = this.props;
        if (error) {
            if (useCaseListLength-1 === activeUseCaseIndex){
                this.setState({useCaseState:"prev"})
            }
            else {
                this.setState({useCaseState:"next"})   
            }
            this.setState({ hasError: true })
            this.props.toggleDisabledNavList()
        }
    }
    changeUseCase = () => {
        let { activeUseCaseIndex, setUseCaseData, useCaseListLength, toggleDisabledNavList } = this.props;
        if (useCaseListLength-1 === activeUseCaseIndex) {
            toggleDisabledNavList()
            setUseCaseData(activeUseCaseIndex - 1)
            this.setState({ hasError: false, useCaseState:"prev"})
        } else {
            setUseCaseData(activeUseCaseIndex + 1)
            toggleDisabledNavList()
            this.setState({ hasError: false , useCaseState:"next"})
        }
    }


    render() {
        const { hasError, useCaseState } = this.state;
        return (
            <React.Fragment>
                {
                    hasError  ?  <>
                        <div className="project-over-view-right-content">
                            <div className="errorboundary-content">
                                <div className="error-image text-center"><img src={ErrorImg} alt="" /></div>
                                <div className="d-block text-right relode-btn">
                                    <button onClick={this.changeUseCase} className="btn btn-primary use-case-btn">
                                        {useCaseState==="prev" ?<i className="fas fa-angle-left arrow-left">
                                        </i>:<></>}{useCaseState==="prev"? `Previous UseCase` : `Next UseCase`}{useCaseState==="next" ? <i className="fas fa-angle-right arrow-right"></i>:<></>}</button>
                                </div>
                            </div>
                        </div>
                    </> :
                        <> {this.props.children} </>}
            </React.Fragment>
        )
    }
}
export default ErrorBoundary
