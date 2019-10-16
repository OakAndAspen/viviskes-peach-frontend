import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import Breadcrumbs from "components/Breadcrumbs";
import UnreadBadge from "components/UnreadBadge";
import PrivateLayout from "layouts/PrivateLayout";
import React from "react";
import {Link} from "react-router-dom";
import {api, fromNow, getName} from "utils";

export default class Forum extends React.Component {

    state = {
        recentTopics: [],
        categories: [],
    };

    componentDidMount() {
        this.getCategories();
        this.getTopics();
    }

    getCategories() {
        api("GET", "/category", {}, ({status, data}) => {
            if (data) this.setState({categories: data});
        });
    }

    getTopics() {
        api("GET", "/topic", {mode: "recent"}, ({status, data}) => {
            if (data) {
                this.setState({recentTopics: data});
            }
        });
    }

    render() {
        return (
            <PrivateLayout>
                <Breadcrumbs levels={[{label: "Forum"}]}/>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-md-8 mb-2">
                            <h2 className="text-center my-3">Sujets récents</h2>
                            {this.renderRecentTopics()}
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                            <h2 className="text-center my-3">Catégories</h2>
                            {this.renderCategories()}
                        </div>
                    </div>
                </div>
            </PrivateLayout>
        );
    }

    renderRecentTopics() {
        return (
            <ul className="list-group">
                {this.state.recentTopics.map(t => {
                    return (
                        <Link className="list-group-item list-group-item-action d-flex align-items-center" key={t.id}
                              to={"/intranet/forum/topic/" + t.id}>
                            <div className="pr-3">
                                <UnreadBadge read={t.read}/>
                            </div>
                            <div>
                                <span className="small-caps">
                                    {t.category ? t.category.label : t.event.title}
                                    <FAI icon={["fal", "angle-double-right"]} className="mx-2"/>
                                    {t.title}
                                </span>
                                <span className="d-block">
                                {getName(t.lastMessage.author, true)} a posté {fromNow(t.lastMessage.created)}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </ul>
        );
    }

    renderCategories() {
        return (
            <ul className="list-group">
                {this.state.categories.map(c => {
                    return (
                        <Link to={"/intranet/forum/" + c.id} key={c.id}
                              className="list-group-item list-group-item-action">
                            <span className="mr-2"><UnreadBadge read={c.read}/></span>
                            <span className="small-caps">{c.label}</span>
                        </Link>
                    );
                })}
            </ul>
        );
    }
}
