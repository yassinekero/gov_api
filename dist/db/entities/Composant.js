"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Composant = void 0;
class Composant {
    constructor() {
        this.nb_assigned_not_started = -1;
        this.nb_started_work = -1;
        this.nb_finished_work = -1;
        this.ids_assigned_users = [];
        this.ids_started_work = [];
        this.ids_finished_work = [];
        /*
        {
            "id": 488844,
            "name": "ZMC",
            "type": "M"
        },*/
    }
    static updateUsersStats(composant, userEngins) {
        composant.nb_assigned_not_started = 0;
        composant.nb_started_work = 0;
        composant.nb_finished_work = 0;
        for (let i = 0; i < userEngins.length; i++) {
            const userEngin = userEngins[i];
            if (userEngin.composition_id == composant.id) {
                if (userEngin.status == null) {
                    composant.nb_assigned_not_started += 1;
                    composant.ids_assigned_users.push(userEngin.user_id);
                }
                else if (!userEngin.status) {
                    composant.nb_started_work += 1;
                    composant.ids_started_work.push(userEngin.user_id);
                }
                else if (userEngin.status) {
                    composant.nb_finished_work += 1;
                    composant.ids_finished_work.push(userEngin.user_id);
                }
            }
        }
    }
    static updateUserEnginsList(composant, userEngins) {
        composant.userEngins =
            userEngins
                .filter((userEngin) => userEngin.composition_id == composant.id);
    }
}
exports.Composant = Composant;
//# sourceMappingURL=Composant.js.map