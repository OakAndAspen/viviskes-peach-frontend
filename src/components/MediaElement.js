import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import CF from "../CustomFunctions";

export default class MediaElement extends React.Component {

    render() {
        let media = this.props.media;
        let icon = this.props.type === "folder" ? "folder" : "file";

        return (
            <tr key={media.id}>
                <td className="text-center">
                    <FontAwesomeIcon icon={["fal", icon]}
                                     title={this.props.type === "folder" ? "Dossier" : "Document"}/>
                </td>
                <td className="text-left">
                    {this.props.type === "folder" ?
                        <Link to={"/intranet/mediatheque/" + media.id}>{media.name}</Link>
                        : media.name
                    }
                </td>
                <td className="text-center d-none d-md-block">{CF.getDate(media.created)}</td>
                <td className="text-right">
                    {this.props.type === "document" &&
                    <FontAwesomeIcon icon={["fal", "eye"]} className="mx-2 pointer" title="Aperçu"
                                     onClick={this.props.onPreview}/>
                    }
                    <FontAwesomeIcon icon={["fal", "pencil"]} className="mx-2 pointer" title="Renommer"
                                     onClick={this.props.onRename}/>
                    <FontAwesomeIcon icon={["fal", "download"]} className="mx-2 pointer" title="Télécharger"
                                     onClick={this.props.onDownload}/>
                </td>
            </tr>
        );
    }
}