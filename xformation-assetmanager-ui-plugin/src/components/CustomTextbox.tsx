import * as React from 'react';
export class CustomTextbox extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    onChange = (e: any) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };
    render() {
        const { containerClass, labelClass, inputClass, label, htmlFor, id, name, placeholder, value, icon, isValid, message, type, maxLength } = this.props;
        return (
            <div className={containerClass}>
                <label className={labelClass} htmlFor={htmlFor}>{label}</label>
                {icon}
                <input type={type ? type : "text"} className={`${inputClass} ${isValid ? '' : 'is-invalid'}`} id={id} name={name} value={value} placeholder={placeholder} maxLength={maxLength} onChange={this.onChange} />
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