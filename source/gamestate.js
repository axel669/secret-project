let currentState;
let currentLevel;

currentState = {
    game: {
        level: 1
    }
};

PubSub.subscribe("campdisco.game.answer", (t, answer) => currentLevel.processAnswer(answer));

export default {
    get current() {
        return currentState;
    },
    get currentLevel() {
        return currentLevel;
    },
    initLevel() {
        let level = 1;
        currentLevel = {
            processAnswer(answer) {
                if (answer === true) {
                    level += 1;
                }
            },
            get finished() {
                return level >= 4;
            }
        };

        PubSub.publish("campdisco.game.nextgame", null);
    }
};
