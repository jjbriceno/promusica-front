export default {
  state: {
    notifications: [],
  },
  getters: {
    getNotifications(state) {
      return state.notifications;
    },
  },
  mutations: {
    PUSH_NOTIFICATION(state, notification) {
      state.notifications.push({
        ...notification,
        id: Math.random().toString(36) + Date.now().toString(36).substring(2),
      });
    },
  },
  actions: {
    addNotification({ commit }, notification) {
      switch (notification?.type) {
        case "success":
          notification.bodyColor = "green darken-1";
          notification.dismissColor = "white";
          notification.textColor = "white";
          notification.icon = "mdi-check";
          break;

        case "error":
          notification.bodyColor = "red darken-2";
          notification.dismissColor = "white";
          notification.textColor = "white";
          notification.icon = "mdi-alert-decagram";
          break;

        default:
          notification.bodyColor = "black";
          notification.dismissColor = "pink";
          notification.textColor = "white";
          notification.icon = "";
      }
      notification.show = true;
      notification.timeout = 3000;

      commit("PUSH_NOTIFICATION", notification);
    },
  },
};
