import React from 'react';
import PrivateLayout from "../../layouts/PrivateLayout";
import $ from "jquery";
import Config from "../../Config";
import TableLayout from "../../layouts/TableLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import Loader from "../../components/Loader";
import MediaElement from "../../components/MediaElement";
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import ModalLayout from "../../layouts/ModalLayout";

export default class Mediatheque extends React.Component {

    state = {
        folder: null,
        loading: false,
        filename: "Importer un document...",
        creatingFolder: false,
        renameModal: false,
        currentMedia: null,
        currentMediaType: null,
        downloadLink: ""
    };

    constructor(props) {
        super(props);
        this.onCreateFolder = this.onCreateFolder.bind(this);
        this.onSendRename = this.onSendRename.bind(this);
    }

    componentDidMount() {
        this.getFolder(this.props.match.params.folder);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let folder = nextProps.match.params.folder;
        this.getFolder(folder || null);
    }

    getFolder(id) {
        this.setState({loading: true});
        if (id) {
            $.ajax({
                url: Config.apiUrl + "/folders/" + id,
                method: "GET",
                success: res => {
                    res.documents.sort((a, b) => a.name.localeCompare(b.name));
                    res.folders.sort((a, b) => a.name.localeCompare(b.name));
                    this.setState({folder: res, loading: false});
                }
            });
        } else {
            $.ajax({
                url: Config.apiUrl + "/folders",
                method: "GET",
                success: res => {
                    this.setState({
                        folder: {
                            name: "Médiathèque",
                            folders: res.filter(f => !f.parent).sort((a, b) => a.name.localeCompare(b.name)),
                            documents: []
                        },
                        loading: false
                    });
                }
            });
        }
    }

    onCreateFolder() {
        let name = $("#NewFolderName").val();
        if (name) {
            this.setState({creatingFolder: true});
            let data = {
                name: name
            };
            if (this.state.folder.id) data.parent = this.state.folder.id;

            $.ajax({
                url: Config.apiUrl + "/folders",
                method: "POST",
                data: data,
                success: res => {
                    this.getFolder(this.state.folder.id);
                    this.setState({creatingFolder: false});
                    $("#NewFolderName").val("");
                }
            });
        }
    }

    onFileUpload(e) {
        let files = e.target.files;
        if (!files.length) return null;
        let file = files[0];
        this.setState({filename: file.name});

        let formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name);
        formData.append("folder", this.state.folder.id);

        $.ajax({
            url: Config.apiUrl + "/documents",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: res => {
                this.getFolder(this.state.folder.id);
            }
        });
    }

    onPreview(document) {

    }

    onRename(media, type) {
        this.setState({
            renameModal: true,
            currentMedia: media,
            currentMediaType: type
        });
    }

    onSendRename() {
        let newName = $("#NewName").val();
        if (!newName) return null;

        $.ajax({
            url: Config.apiUrl + "/" + this.state.currentMediaType + "s/" + this.state.currentMedia.id,
            method: "PATCH",
            data: {
                name: newName
            },
            success: res => {
                this.setState({renameModal: false});
                this.getFolder(this.state.folder.id || null);
            }
        });
    }

    onDownload(media, type) {
        $.ajax({
            url: Config.apiUrl + "/" + type + "s/download/" + media.id,
            method: "GET",
            success: res => {
                this.setState({downloadLink: Config.apiUrl + "/" + res.url}, () => {
                    console.log(this.state.downloadLink);
                    console.log($('#DownloadLink').attr("href"));
                    //$('#DownloadLink').click();
                });
            }
        });
    }

    render() {
        return (
            <PrivateLayout>
                {this.renderBreadcrumbs()}
                <div className="container py-4">
                    {this.renderTools()}
                    {this.renderTable()}
                </div>
                {this.renderRenameModal()}
                <a href={this.state.downloadLink} download id="DownloadLink" className="d-block">Download</a>
            </PrivateLayout>
        );
    }

    renderBreadcrumbs() {
        if (!this.state.folder) return null;
        let baseUrl = "/intranet/mediatheque";
        let levels = [];

        let curFolder = this.state.folder;
        while (curFolder) {
            levels.push({label: curFolder.name, url: baseUrl + "/" + curFolder.id});
            curFolder = curFolder.parent;
        }

        if (this.state.folder.id) levels.push({label: "Médiathèque", url: baseUrl});
        levels = levels.reverse();

        return <Breadcrumbs levels={levels}/>;
    }

    renderTools() {
        if (!this.state.folder) return null;
        return (
            <div className="row mb-2">
                <div className="col-12 col-md-2 mb-2">
                    <button className="btn btn-info w-100"
                            title="Télécharger le contenu du dossier en un fichier ZIP">
                        <FAI icon={["fal", "download"]}/>
                    </button>
                </div>

                <div className="col-12 col-md-5 mb-2">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Nouveau dossier" id="NewFolderName"/>
                        <div className="input-group-append">
                            <button className="btn btn-info" onClick={this.onCreateFolder}>
                                {!this.state.creatingFolder ? "Créer" :
                                    <FAI icon={["fal", "spinner"]} className="fa-spin"/>}
                            </button>
                        </div>
                    </div>
                </div>

                {(this.state.folder && this.state.folder.id) &&
                <div className="col-12 col-md-5 mb-2">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile"
                               onChange={e => this.onFileUpload(e)}/>
                        <label className="custom-file-label" htmlFor="customFile">{this.state.filename}</label>
                    </div>
                </div>
                }
            </div>
        );
    }

    renderTable() {
        let folder = this.state.folder;
        if (this.state.loading || !folder) return <Loader/>;

        return (
            <TableLayout>
                <tr className="text-muted border-bottom">
                    <th className="px-3 py-2 text-center">Type</th>
                    <th className="px-3 py-2 text-left">Nom</th>
                    <th className="px-3 py-2 text-center d-none d-md-block">Créé</th>
                    <th className="px-3 py-2 text-right">Actions</th>
                </tr>
                {folder.folders.map(f =>
                    <MediaElement media={f} type="folder" key={f.id}
                                  onRename={() => this.onRename(f, "folder")}
                                  onDownload={() => this.onDownload(f, "folder")}/>
                )}
                {folder.documents.map(d =>
                    <MediaElement media={d} type="document" key={d.id}
                                  onPreview={() => this.onPreview(d)}
                                  onRename={() => this.onRename(d, "document")}
                                  onDownload={() => this.onDownload(d, "document")}/>
                )}
                {(!folder.folders.length && !folder.documents.length) &&
                <tr>
                    <td colSpan={4} className="p-4 text-center text-muted">Ce dossier est vide.</td>
                </tr>
                }
            </TableLayout>
        );
    }

    renderRenameModal() {
        if (!this.state.renameModal) return null;
        return (
            <ModalLayout onClose={() => this.setState({renameModal: false})}
                         title={"Renommer le " + (this.state.currentMediaType === "folder" ? "dossier" : "document")}>
                <input type="text" className="form-control my-2" placeholder="Nouveau nom" id="NewName"
                       defaultValue={this.state.currentMedia.name}/>
                <button className="btn btn-info w-100" onClick={this.onSendRename}>Renommer</button>
            </ModalLayout>
        );
    }
}
