import React from 'react';
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import CF from "../CustomFunctions";

export default class MediaElement extends React.Component {

    static getIconFromFileExtension(ext) {
        switch (ext) {
            case "png":
            case "jpg":
                return "file-image";
            case "pdf":
                return "file-pdf";
            case "avi":
            case "mp4":
            case "mkw":
                return "file-video";
            default:
                return "file";
        }
    }

    render() {
        let media = this.props.media;
        let icon = this.props.type === "folder" ? "folder" : MediaElement.getIconFromFileExtension(media.extension);
        let title = this.props.type === "folder" ? "Dossier" : "Fichier " + media.extension.toUpperCase();

        return (
            <tr key={media.id}>
                <td className="text-center"><FAI icon={icon} title={title} className="text-secondary"/></td>
                <td className="text-left">
                    {this.props.type === "folder" ?
                        <Link to={"/intranet/mediatheque/" + media.id}>{media.name}</Link>
                        : media.name
                    }
                </td>
                <td className="text-center d-none d-md-block">{CF.getDate(media.created)}</td>
                <td className="text-right">
                    {this.props.type === "document" &&
                    <FAI icon={["fal", "eye"]} className="mx-2 pointer" title="Aperçu"
                         onClick={this.props.onPreview}/>
                    }
                    <FAI icon={["fal", "pencil"]} className="mx-2 pointer" title="Renommer"
                         onClick={this.props.onRename}/>
                    <FAI icon={["fal", "download"]} className="mx-2 pointer" title="Télécharger"
                         onClick={this.props.onDownload}/>
                </td>
            </tr>
        );
    }
}