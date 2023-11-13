const initialState = {
    globalNotificationQueue: [],
    currentNotification: null,
};

export default {
    namespaced: true,
    state: () => ({
        ...initialState,
    }),
    getters: {
        queueIsEmpty: state => state.globalNotificationQueue.length === 0,
    },
    mutations: {
        ADD_TO_QUEUE(state, payload) {
            state.globalNotificationQueue.push(payload);
        },
        CLEAR_QUEUE(state) {
            state.globalNotificationQueue.splice(0, state.globalNotificationQueue.length);
            state.currentNotification = initialState.currentNotification;
        },
    },
    actions: {
        /**
         * Add a notification to queue
         * @param {*} context Vuex context
         * @param {Object|String} notification notification object, if it's a string, then
         * is only the text of the notification
         * @param {String} notification.text snackbar's text
         * @param {String} notification.type snackbar's type, there are predefined types that
         * change the snackbar style
         * @param {String} notification.bodyColor snackbar's body color
         * @param {String} notification.dismissColor snackbar's dismiss button's color
         * @param {String} notification.textColor snackbar's text color
         * @param {String} notification.icon snackbar's Material Design code icon
         */
        addToQueue({ commit }, notification) {
            let payload = notification;

            if (typeof notification === 'string') {
                payload = {
                    text: notification,
                };
            }

            switch (payload?.type) {
                case 'success':
                    payload.bodyColor = 'green darken-1';
                    payload.dismissColor = 'white';
                    payload.textColor = 'white';
                    payload.icon = 'mdi-check';
                    break;

                case 'error':
                    payload.bodyColor = 'red darken-2';
                    payload.dismissColor = 'white';
                    payload.textColor = 'white';
                    payload.icon = 'mdi-alert-decagram';
                    break;

                default:
                    payload.bodyColor = 'black';
                    payload.dismissColor = 'pink';
                    payload.textColor = 'white';
                    payload.icon = '';
            }

            console.log(payload);

            commit('ADD_TO_QUEUE', payload);
        },
        dequeueNotification({ state }) {
            return state.globalNotificationQueue.shift();
        },
        clearQueue({ commit }) {
            commit('CLEAR_QUEUE');
        },
    },
};
