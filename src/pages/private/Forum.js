import React from 'react';
import PrivateLayout from "../../layouts/PrivateLayout";
import Config from "../../Config";
import $ from "jquery";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Forum extends React.Component {

    state = {
        recentTopics: [
            {
                read: false,
                id: 1,
                title: "Fleurs des bois",
                lastPost: {
                    by: "Benjamin W.",
                    timestamp: "04.03.2019 20:45"
                },
                category: {
                    id: 4,
                    title: "Costume"
                }
            },
            {
                read: true,
                id: 2,
                title: "Fleurs des villes",
                lastPost: {
                    by: "Benjamin W.",
                    timestamp: "04.03.2019 20:45"
                },
                category: {
                    id: 6,
                    title: "Habits"
                }
            }
        ],
        categories: [],
    };

    componentDidMount() {
        $.ajax({
            url: Config.apiUrl + "/category",
            method: "GET",
            success: res => {
                this.setState({categories: res});
            }
        });
    }

    render() {
        return (
            <PrivateLayout>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-md-6 mb-2">
                            <h2>Sujets récents</h2>
                            <ul className="list-group">
                                {this.state.recentTopics.map(t => this.renderRecentTopic(t))}
                            </ul>
                        </div>
                        <div className="col-12 col-md-6 mb-2">
                            <h2>Catégories</h2>
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
            <Link className="list-group-item list-group-item-action" key={t.id}
                  to={"/intranet/forum/" + t.category.id + "/" + t.id}>
                <table>
                    <tbody>
                    <tr>
                        <td rowSpan="2">
                            <span className="badge badge-info mr-4">Non lu</span>
                        </td>
                        <td className="small-caps">
                            {t.category.title}
                            <FontAwesomeIcon icon="angle-double-right" className="mx-2"/>
                            {t.title}
                        </td>
                    </tr>
                    <tr>
                        <td>{t.lastPost.by} a posté le {t.lastPost.timestamp}</td>
                    </tr>
                    </tbody>
                </table>
            </Link>
        );
    }

    renderCategory(c) {
        return (
            <div className="col-6 col-md-4 pb-2" key={c.id}>
                <Link type="button" className="btn btn-light w-100" to={"/intranet/forum/" + c.id}>
                    {!c.read && <FontAwesomeIcon icon={["fas", "dot-circle"]} className="text-info mr-2"/>}
                    {c.label}
                </Link>
            </div>
        );
    }
}
