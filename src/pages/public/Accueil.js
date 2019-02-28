import React from 'react';

export default class Accueil extends React.Component {

    render() {
        return (
            <div>
                <img src="/images/divers/groupPhoto.png" alt="Viviskes aux Celtiques de Vivisco 2013"
                     className="img-fluid"/>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-lg-8">
                            <p>Si nous devions résumer en une seule question tout ce qui motive les quelques quarante
                                membres de l’association Viviskes, cela serait : comment vivaient les Celtes ?</p>

                            <p>Cette question, l’association d’anthropologie guerrière Viviskes essaie d’y répondre en
                                adoptant une approche pratique basée sur l’expérimentation, tout en profitant des
                                lumières
                                des archéologues et artisans intégrés à l’association. Dans ce cadre, nous proposons de
                                nombreuses animations d'histoire vivante.</p>

                            <h3>Nos prochains évènements</h3>
                        </div>
                        <div className="col-lg-4">
                            <h3>Nos partenaires!</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
