import * as React from 'react';
// import { v4 } from 'uuid';

export class SelectCloudFilter extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            codeEditorValue: "",
            displayJsonData: [
            ],
            showTagFilter: false,
            searchKey: [],
        };
    }

    componentDidMount() {
        if (this.props.filterJsonData && this.props.filterJsonData.length > 0) {
            this.setState({ displayJsonData: this.props.filterJsonData })
        }
    }

    displaySelectedTags = () => {
        const { displayJsonData } = this.state;
        let retData = [];
        if (displayJsonData && displayJsonData.length > 0) {
            for (let i = 0; i < displayJsonData.length; i++) {
                let filter = displayJsonData[i].filter;
                for (let j = 0; j < filter.length; j++) {
                    let label = displayJsonData[i].filter[j];
                    if (label.isChecked) {
                        retData.push(
                            <div className="fliter-selected" key={label.id}>
                                <span
                                >{label.label}</span>
                                <i className="fa fa-times"
                                    onClick={() => this.removeSelectedTag(i, j)}
                                ></i>
                            </div>
                        );

                    }
                }
            }
        }
        return retData;
    }

    onChangeFilters = (filterData: any) => {
        const retData: any = {};
        if (filterData && filterData.length > 0) {
            for (let i = 0; i < filterData.length; i++) {
                let filter = filterData[i].filter;
                for (let j = 0; j < filter.length; j++) {
                    const label = filterData[i].filter[j];
                    if (label.isChecked) {
                        retData[filterData[i].name] = retData[filterData[i].name] || [];
                        retData[filterData[i].name].push(label.value);
                    }
                }
            }
        }
        if (this.props.onChangeFilter) {
            this.props.onChangeFilter(retData);
        }
    };

    setChildData = (data: any) => {
        if (data.subdata.length > 0) {
            this.setState({
                showTagFilter: true,
                displayJsonData: data.subdata,
            })
        } else {
            this.setState({
                showTagFilter: false,
            })
        }
    }

    removeSelectedTag = (filterIndex: any, index: any) => {
        let { displayJsonData } = this.state
        displayJsonData[filterIndex].filter[index].isChecked = false
        this.setState({ displayJsonData })
        this.onChangeFilters(displayJsonData);
    }

    displayTagList = (filterData: any, filterIndex: any) => {
        let retData = [];
        for (let i = 0; i < filterData.length; i++) {
            if (!filterData[i].isHide) {
                retData.push(
                    <div className="form-check"
                        onClick={() => this.changeHandleState(filterIndex, i)}
                        title={filterData[i].label}
                        key={i}
                    >
                        <input type="checkbox" checked={filterData[i].isChecked} className="checkbox" />
                        <label htmlFor={filterData[i].value}>{filterData[i].label}</label>
                    </div>
                );
            }
        }
        return retData;
    }

    changeHandleState = (filterIndex: any, index: any) => {
        let { displayJsonData } = this.state;
        displayJsonData[filterIndex].filter[index].isChecked = !displayJsonData[filterIndex].filter[index].isChecked;
        this.setState({ displayJsonData });
        this.onChangeFilters(displayJsonData);
    }

    displaymainTagData = () => {
        this.setState({
            showTagFilter: !this.state.showTagFilter
        })
    }

    clearAllTagFilter = (index: any) => {
        const { searchKey, displayJsonData } = this.state;
        searchKey[index] = "";
        for (let k = 0; k < displayJsonData[index].filter.length; k++) {
            displayJsonData[index].filter[k].isHide = false;
        }
        this.setState({
            displayJsonData,
            searchKey
        })
    }

    searchTag = (e: any, index: any) => {
        let { displayJsonData, searchKey } = this.state;
        const { value } = e.target;
        searchKey[index] = value
        this.setState({ searchKey })
        if (value === "") {
            for (let k = 0; k < displayJsonData[index].filter.length; k++) {
                displayJsonData[index].filter[k].isHide = false;
            }
        }
        else {
            for (let k = 0; k < displayJsonData[index].filter.length; k++) {
                if (displayJsonData[index].filter[k].label.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                    displayJsonData[index].filter[k].isHide = false
                }
                else {
                    displayJsonData[index].filter[k].isHide = true;
                }
            }
        }
        this.setState({
            displayJsonData,
            searchKey
        })
    }

    render() {
        const { showTagFilter, displayJsonData, searchKey } = this.state;
        return (
            <div className="fliters-container">
                <div className="select-fliters">
                    {this.displaySelectedTags()}
                    <div className="add-fliters" onClick={() => this.displaymainTagData()}>
                        <i className="fa fa-plus"></i>
                    </div>
                    <div className="fliter-toggel" onClick={() => this.setState({ showTagFilter: !showTagFilter })}></div>
                    <i className="fa fa-angle-down" onClick={() => this.setState({ showTagFilter: !showTagFilter })}></i>
                </div>
                {displayJsonData && displayJsonData.length > 0 ? (
                    <div className={showTagFilter === true ? "fliters-collapse active" : "fliters-collapse"}>
                        {displayJsonData.map((filterData: any, index: any) => {
                            return (
                                <div className="fliters" key={filterData.id}>
                                    <div className="fliter-box">
                                        <div className='heading'>{filterData.name}</div>
                                        <div className="form-group search-control">
                                            <button className="btn btn-search">
                                                <i className="fa fa-search"></i>
                                            </button>
                                            <input type="text" className="input-group-text" value={searchKey[index]} onChange={(e) => this.searchTag(e, index)} placeholder="Search" />
                                            <button className="btn btn-clear" onClick={() => this.clearAllTagFilter(index)}>
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </div>
                                        <div className="fliters-links">
                                            {filterData.filter && filterData.filter.length > 0 && this.displayTagList(filterData.filter, index)}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : <></>}
                <div className={showTagFilter === true ? "fliters-collapse-bg active" : "fliters-collapse-bg"} onClick={() => this.setState({ showTagFilter: !showTagFilter })}></div>
            </div>
        );
    }
}