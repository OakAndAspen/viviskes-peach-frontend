export default {
    getShortName(user) {
        return user.firstName + " " + user.lastName.slice(0, 1) + ".";
    }
};