const appKey = "campdisco";

export default {
    Session: App.createSession(appKey),
    Settings: App.createSettings(appKey),
    GlobalSettings: App.createSettings(""),
    appKey
};
