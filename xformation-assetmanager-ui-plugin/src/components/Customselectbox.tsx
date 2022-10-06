import * as React from 'react';
export class Customselectbox extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    onChange = (e: any) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };

    displayOptions = (optionData: any) => {
        let retData: any = [];
        Object.keys(optionData).map((key, index) => {
            retData.push(
                <option value={optionData[index].id}>{optionData[index].name}</option>
            )
        });
        return retData;
    }
    render() {
        const { containerClass, labelClass, inputClass, label, htmlFor, id, name, placeholder, value, icon, isValid, message, arrayData } = this.props;
        return (
            <div className={containerClass}>
                <label className={labelClass} htmlFor={htmlFor}>{label}</label>
                {icon}
                <select className={`${inputClass} ${isValid ? '' : 'is-invalid'}`} id={id} name={name} value={value} placeholder={placeholder} onChange={this.onChange} >
                    {this.displayOptions(arrayData)}
                </select>
                {
                    !isValid &&
                    <div className="invalid-feedback">
                        {message}
                    </div>
                }
            </div>
        );
    }
}