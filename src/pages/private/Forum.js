import React from 'react';
import PrivateLayout from "../../layouts/PrivateLayout";
import Config from "../../Config";
import $ from "jquery";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UnreadBadge from "../../components/UnreadBadge";
import CF from "../../CustomFunctions";
import Breadcrumbs from "../../components/Breadcrumbs";

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
        $.ajax({
            url: Config.apiUrl + "/category",
            method: "GET",
            success: res => {
                this.setState({categories: res});
            }
        });
    }

    getTopics() {
        $.ajax({
            url: Config.apiUrl + "/topic",
            method: "GET",
            success: res => {
                res = res.sort((a,b) => b.lastMessage.created.localeCompare(a.lastMessage.created));
                res = res.slice(0,5);
                this.setState({recentTopics: res});
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
                        <FontAwesomeIcon icon={["fal", "angle-double-right"]} className="mx-2"/>
                        {t.title}
                    </span>
                    <span className="d-block">
                    {CF.getName(t.lastMessage.author, true)} a posté {CF.fromNow(t.lastMessage.created)}
                    </span>
                </div>
            </Link>
        );
    }

    renderCategory(c) {
        return (
            <div className="col-6 pb-2" key={c.id}>
                <Link type="button" to={"/intranet/forum/" + c.id}
                      className="btn btn-light w-100 d-flex align-items-center justify-content-center">
                    {!c.read && <span className="mr-2"><UnreadBadge read={c.read}/></span>}
                    <span className="display-4 small-caps">{c.label}</span>
                </Link>
            </div>
        );
    }
}
