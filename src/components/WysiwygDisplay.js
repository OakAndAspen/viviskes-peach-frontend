import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import CKEditor from "@ckeditor/ckeditor5-react";
import PropTypes from "prop-types";
import React from "react";

export default class WysiwygDisplay extends React.Component {
    render() {
        return (
            <CKEditor
                editor={InlineEditor}
                data={this.props.content}
                disabled={true}
            />
        );
    }
}

WysiwygDisplay.propTypes = {
    content: PropTypes.string
};