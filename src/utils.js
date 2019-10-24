import {apiUrl} from "config";
import $ from "jquery";
import moment from "moment";

export function getName(user, short = false, withCeltic = false) {
    let name = user.firstName + " ";
    name += short ? (user.lastName.slice(0, 1) + ".") : user.lastName;
    if (user.celticName && withCeltic) {
        name += " (" + user.celticName + ")";
    }
    return name;
}

export function getDate(date) {
    if (!date) return "";
    return moment(date).format("DD.MM.YYYY");
}

export function fromNow(date) {
    if (!date) return "";
    return moment(date).fromNow();
}

export function toNow(date) {
    if (!date) return "";
    return moment(date).toNow();
}

export function isFuture(date) {
    if (!date) return null;
    return moment(date).isAfter(moment());
}

export function getDatesBetween(start, end) {
    start = moment(start);
    end = moment(end);
    let dates = [start.format("YYYY-MM-DD")];
    if (end.isValid() && end.isAfter(start)) {
        let currentDay = start;
        while (!currentDay.isSame(end, "day")) {
            currentDay.add(1, "d");
            dates.push(currentDay.format("YYYY-MM-DD"));
        }
    }
    return dates;
}

export function objectToArray(object) {
    let array = [];
    for (let prop in object) {
        let elem = object[prop];
        array.push(elem);
    }
    return array;
}

export function api(method, url, data = [], callback) {
    $.ajax({
        method: method,
        url: apiUrl + url,
        data: data
    })
        .done((data, textStatus, jqXHR) => {
            callback({
                status: jqXHR.status,
                data: data
            });
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            if (jqXHR.status === 401) {
                localStorage.removeItem("authKey");
                window.location.reload();
            }
            callback({
                status: jqXHR.status,
                data: null
            });
        });
}

export default {getName, getDate, fromNow, toNow, isFuture, getDatesBetween, objectToArray}