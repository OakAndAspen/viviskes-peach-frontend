import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import CKEditor from "@ckeditor/ckeditor5-react";
import {apiUrl} from "config";
import PropTypes from "prop-types";
import React from "react";

export default class CustomEditor extends React.Component {
    render() {
        return (
            <CKEditor
                editor={InlineEditor}
                data={this.props.content}
                config={
                    {
                        ckfinder: {
                            uploadUrl: apiUrl + '/file',
                            headers: {
                                Authorization: 'Bearer ' + localStorage.authKey
                            }
                        },
                        placeholder: this.props.placeholder
                    }}
                onChange={(event, editor) => {
                    this.props.onChange(editor.getData());
                }}
            />
        );
    }
}

CustomEditor.propTypes = {
    content: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
};