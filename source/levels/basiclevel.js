export default class BasicLevel {
    constructor() {
        this.correct = 0;
    }

    getTargets = () => {
        return [
            {x0: 20, y0: 25, correct: false, size: 1},
            {x0: 50, y0: 25, correct: false, size: 1},
            {x0: 80, y0: 25, correct: true, size: 1.3},
        ];
    }
    getMovables = () => {
        return [
            {x: 40, y: 75, movable: false, img: "http://orig15.deviantart.net/bfd2/f/2014/175/a/9/bayonetta_icon_by_helryu-d7nsnaq.png"},
            {x: 50, y: 80, movable: true, img: "http://orig15.deviantart.net/bfd2/f/2014/175/a/9/bayonetta_icon_by_helryu-d7nsnaq.png"}
        ];
    }
    resetPositionOnWrong = () => {
        return false;
    }

    processAnswer = (answer) => {
        if (answer === true) {
            this.correct += 1;
        }
    }
    isFinished = () => {
        return this.correct >= 3;
    }
    shouldClearBoard = () => {
        return true;
    }
};
