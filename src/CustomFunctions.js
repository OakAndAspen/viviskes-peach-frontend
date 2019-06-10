import moment from "moment";

export default {
    getName(user, short = false, withCeltic = false) {
        let name = user.firstName + " ";
        name += short ? (user.lastName.slice(0, 1) + ".") : user.lastName;
        if (user.celticName && withCeltic) {
            name += " (" + user.celticName + ")";
        }
        return name;
    },

    getDate(date) {
        if (!date) return "";
        return moment(date).format("DD.MM.YYYY");
    },

    fromNow(date) {
        if (!date) return "";
        return moment(date).fromNow();
    },

    toNow(date) {
        if (!date) return "";
        return moment(date).toNow();
    },

    isFuture(date) {
        if (!date) return null;
        return moment(date).isAfter(moment());
    },

    getDatesBetween(start, end) {
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
        console.log("Dates", dates);
        return dates;
    },

    objectToArray(object) {
        let array = [];
        for (let prop in object) {
            let elem = object[prop];
            array.push(elem);
        }
        return array;
    }
};