import cn from "classnames";
import IconText from "components/IconText";
import React from "react";
import PropTypes from 'prop-types';

export default class SubmitButton extends React.Component {
    render() {
        let content = "";
        switch (this.props.status) {
            case "loading":
                content = <IconText icon="spinner" spin text={this.props.text}/>;
                break;
            case "done":
                content = <IconText icon="check" text={this.props.text}/>;
                break;
            case "error":
                content = <IconText icon="exclamation-triangle" text={this.props.text}/>;
                break;
            default:
                content = this.props.text;
        }

        return (
            <button type="button" disabled={this.props.disabled} onClick={this.props.onClick}
                    className={cn("btn btn-info w-100", this.props.disabled && " disabled")}>
                {content}
            </button>
        );
    }
}

SubmitButton.propTypes = {
    status: PropTypes.string,
    text: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};