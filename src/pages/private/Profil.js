import React from 'react';
import PrivateLayout from "../../components/PrivateLayout";

export default class Forum extends React.Component {

    render() {
        return (
            <PrivateLayout>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-md-7">
                            {this.renderBasics()}
                            {this.renderAddress()}
                        </div>
                        <div className="col-12 col-md-5">
                            {this.renderAvatar()}
                        </div>
                    </div>
                </div>
            </PrivateLayout>
        );
    }

    renderBasics() {
        return (
            <div className="row">
                <div className="col-12">
                    <h2>Informations de base</h2>
                </div>
                <div className="col-6 mb-2">
                    <input type="text" className="form-control" placeholder="Prénom"/>
                </div>
                <div className="col-6 mb-2">
                    <input type="text" className="form-control" placeholder="Nom"/>
                </div>
                <div className="col-12 mb-2">
                    <input type="text" className="form-control" placeholder="Email"/>
                </div>
                <div className="col-6 mb-2">
                    <input type="text" className="form-control" placeholder="N° téléphone"/>
                </div>
                <div className="col-6 mb-2">
                    <input type="text" className="form-control" placeholder="Nom celte"/>
                </div>
            </div>
        );
    }

    renderAddress() {
        return (
            <div className="row my-2">
                <div className="col-12 mb-2">
                    <h2>Adresse</h2>
                </div>
                <div className="col-12 mb-2">
                    <input type="text" className="form-control" placeholder="Adresse"/>
                </div>
                <div className="col-5 mb-2">
                    <input type="text" className="form-control" placeholder="NPA"/>
                </div>
                <div className="col-7 mb-2">
                    <input type="text" className="form-control" placeholder="Localité"/>
                </div>
            </div>
        );
    }

    renderAvatar() {
        return (
            <div className="row">
                <div className="col-12">
                    <h2>Image de profil</h2>
                    <div className="alert alert-warning">Attention! Cette image apparaît sur la page publique des
                        membres.
                        Choisis une photo présentable en costume, pas trop pixellisée et si possible carrée.
                    </div>
                    <div className="custom-file mb-2">
                        <input type="file" className="custom-file-input" id="customFile"/>
                        <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                    </div>
                    <img src="/images/membres/1.jpg" alt="Avatar" className="img-fluid rounded"/>
                </div>
            </div>
        );
    }
}
