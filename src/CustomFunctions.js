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
        if(!date) return "";
        return moment(date).format("DD.MM.YYYY");
    },

    fromNow(date) {
        if(!date) return "";
        return moment(date).fromNow();
    },

    toNow(date) {
        if(!date) return "";
        return moment(date).toNow();
    },

    isFuture(date) {
        if(!date) return null;
        return moment(date).isAfter(moment());
    }
};