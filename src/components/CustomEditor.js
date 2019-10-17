import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import CKEditor from "@ckeditor/ckeditor5-react";
import PropTypes from "prop-types";
import React from "react";

export default class CustomEditor extends React.Component {
    render() {
        return (
        <CKEditor
            editor={InlineEditor}
            data={this.props.content}
            config={{
                //plugins: [/*SimpleUploadAdapter*/],
                placeholder: this.props.placeholder
                /*simpleUpload: {
                    uploadUrl: apiUrl + "/file",
                    headers: {
                        //'X-CSRF-TOKEN': 'CSFR-Token',
                        Authorization: 'Bearer ' + localStorage.authKey
                    }
                }*/
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