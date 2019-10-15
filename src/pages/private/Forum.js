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
                            <ul className="list-group">
                                {this.state.recentTopics.map(t => this.renderRecentTopic(t))}
                            </ul>
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                            <h2 className="text-center my-3">Catégories</h2>
                            <div className="row">
                                {this.state.categories.map(c => this.renderCategory(c))}
                            </div>
                        </div>
                    </div>
                </div>
            </PrivateLayout>
        );
    }

    renderRecentTopic(t) {
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
    }

    renderCategory(c) {
        return (
            <div className="col-6 pb-2" key={c.id}>
                <Link type="button" to={"/intranet/forum/" + c.id}
                      className="btn btn-light w-100 h-100 d-flex align-items-center justify-content-center">
                    {!c.read && <span className="mr-2"><UnreadBadge read={c.read}/></span>}
                    <span className="display-4 small-caps">{c.label}</span>
                </Link>
            </div>
        );
    }
}
