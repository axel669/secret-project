import GameState from 'gamestate';
import Container from 'component/container';
import Subscribable from 'component/subscribable';
import {Settings} from 'settings';

import CDCard from 'screen/gamescreen/cdcard';

Style.create(
    'game',
    {
        ".card": {
            position: 'absolute',
            transform: 'translate3d(-50%, -50%, 0)',
            backgroundColor: 'white',
            borderWidth: 3,
            borderStyle: 'solid',
            borderColor: 'transparent',
            boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.35)',
            borderRadius: 5,
            ": before": {
                content: '""',
                display: 'block',
                paddingTop: '100%'
            }
        },
        ".cardInner": {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: 2
        }
    }
);

const correct = [
    "amazeen.mp3",
    "awesome.mp3",
    "excellent.mp3",
    "fantastic.mp3",
    "Good Job.mp3",
    "Good Work.mp3",
    "Great.mp3",
    "perfect.mp3",
    "Way to Go.mp3",
    "wonderful.mp3",
    "Woohoo.mp3",
    "Yippee.mp3",
    "You Did It.mp3"
];
const wrong = [
    "no.mp3",
    "nope.mp3",
    "Not quite.mp3",
    "Thats Not it.mp3",
    "Try Again.mp3"
];
class GameScreen extends Subscribable {
    // static get startingPos() {
    //     return [
    //         {x0: 20, y0: 25, correct: false, size: 1},
    //         {x0: 50, y0: 25, correct: false, size: 1.15},
    //         {x0: 80, y0: 25, correct: true, size: 1.3},
    //         // {x0: 50, y0: 80, fill: 0}
    //     ];
    // }

    constructor(props) {
        super(props);
        const url = "https://res.cloudinary.com/dsjiwbe0q/image/upload/v1466295085/f7e57b7ccc7fcb3297c45d6a1af9787b_sh2spa.png";
        // const url = "https://res.cloudinary.com/dsjiwbe0q/image/upload/v1466365486/8bit_mega_man_1_20276_6496_thumb_9812_xpu8wi.png";
        this.index = -1;
        this.state = {
            paused: false,
            scale: 1
        };
        this.choices = GameState.currentLevel.getTargets().map(
            (pos, key) => {
                const props = {
                    width: 30,
                    ref: `target${key}`,
                    movable: false,
                    key,
                    ...pos
                };
                return <CDCard {...props}><UI.Image source={url} width="100%" height="100%" /></CDCard>;
            }
        );
    }

    componentDidMount = () => {
        const allThings = Object.keys(this.refs).filter(key => key.startsWith('target')).map(key => this.refs[key]);
        this.movable = GameState.currentLevel.getMovables().map(
            (movable, key) => (
                <CDCard width={30} size={1} x0={movable.x} y0={movable.y} others={allThings} movable={movable.movable} key={key}>
                    <UI.Image width="100%" height="100%" source={movable.img} />
                </CDCard>
            )
        );
        // this.movable = <CDCard width={30} size={1} x0={50} y0={75} size={1.3} others={allThings} movable />;
        // this.token = PubSub.subscribe(
        this.pubListen(
            'campdisco.game.answer',
            async (evt, answer) => {
                // console.log(answer);
                GameState.currentLevel.processAnswer(answer);
                if (GameState.currentLevel.shouldClearBoard() === true) {
                    this.setState({scale: 0});
                    await chrono.wait(310);
                }
                if (answer === true) {
                    const caudio = correct[Math.floor(Math.random() * correct.length)];
                    new Howl({urls: [`audio/correct/${caudio}`], onend: () => PubSub.publish('campdisco.response.finished')}).play();
                } else {
                    new Howl({urls: [`audio/wrong/${wrong[Math.floor(Math.random() * wrong.length)]}`], onend: () => PubSub.publish('campdisco.response.finished')}).play();
                    // nope.play();
                    // this.refs.timer.reset();
                }
            }
        );
        this.pubListen(
            'campdisco.response.finished',
            () => this.refs.timer.reset()
        );

        this.forceUpdate();
    }
    // componentWillUnmount = () => {
    //     PubSub.unsubscribe(this.token);
    // }

    render = () => {
        const {scale} = this.state;
        const {choices, movable} = this;

        return (
            <Container fill style={{backgroundColor: 'cyan'}}>
                <UI.Pinboard width="100%" height="100%">
                    <div style={{backgroundColor: 'rgba(0, 0, 0, 0.35)', width: '100%', height: '100%', display: this.state.paused === true ? '' : 'none', zIndex: '+1000', position: 'absolute'}} pinInfo={{width: '100%', height: '100%'}} />
                    <UI.IconButton pinInfo={{bottom: 5, left: 5, width: 40, height: 40}} icon="ion-pause" flush fill cornerRadius={20} raised iconSize={20} onTap={() => this.setState({paused: true})} />
                    <Timer pinInfo={{bottom: 5, right: 5, zIndex: '+100'}} ref="timer" />
                </UI.Pinboard>
                <div style={{transition: 'transform 300ms ease-in', transform: `scale(${scale}, ${scale})`, position: 'absolute', width: '100%', height: '100%', top: 0}}>
                    {choices}
                    {movable}
                </div>
            </Container>
        );
    }
}

const Arc = ({size, start, end, flip = false}) => {
    const radius = (size / 2) - 3;
    const circ = Math.PI * 2 * radius;
    const first = start / 360;
    const second = end / 360 - first;
    const transform = (flip === true) ? 'scale(-1 1) rotate(-90)' : 'rotate(-90)';

    const circleProps = {
        r: radius,
        cx: 0,
        cy: 0,
        strokeWidth: 4,
        stroke: 'black',
        fill: 'transparent',
        transform,
        strokeDasharray: `0 ${first * circ} ${second * circ} ${circ}`
    };

    return (
        <svg width={size} height={size} viewBox={`-${size / 2} -${size / 2} ${size} ${size}`}>
            <circle {...circleProps} />
        </svg>
    );
};

const Arc2 = ({cx, cy, radius, start, end}) => {
    const circ = Math.PI * 2 * radius;
    const first = start / 360;
    const second = end / 360 - first;

    return <circle cx={cx} cy={cy} r={radius} strokeWidth={3} strokeDasharray={`0 ${first * circ} ${second * circ} ${circ}`} stroke="black" fill="transparent" transform={`scale(-1, 1) translate(50, 0) rotate(-90 ${cx} ${cy})`} />;
};
class Timer extends Subscribable {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.reset();
    }

    reset = () => {
        this.max = Settings.read("timerDuration");
        this.left = this.max;
        this.pubListen(
            'campdisco.game.forceAnswer',
            () => {
                this.clearSubs();
            }
        )
        this.pubListen(
            "system.framedraw",
            (t, time) => {
                this.left -= time;
                // console.log(this.left);
                if (this.left <= 0) {
                    this.left = 0;
                    this.clearSubs();
                    PubSub.publish("campdisco.game.forceAnswer", [null, false]);
                }
                this.forceUpdate();
            }
        );
    }

    render = () => <Arc size={50} start={0} end={360 * (this.left / this.max)} />
}

class RealScreen extends Subscribable {
    constructor() {
        super();
        this.state = {current: null};
        GameState.initLevel();
    }

    componentDidMount = () => {
        // this.token = PubSub.subscribe(
        // window.nope = new Howl({urls: ['audio/Not quite.mp3'], onend: () => PubSub.publish('campdisco.response.finished')});
        this.pubListen(
            "campdisco.response.finished",
            () => {
                // console.log(prevAnswer);
                if (GameState.currentLevel.isFinished() === true) {
                    App.navigation.replace("/");
                } else {
                    this.setState({
                        current: Date.now()
                    });
                }
            }
        );
    }
    // componentWillUnmount = () => {
    //     PubSub.unsubscribe(this.token);
    // }

    render = () => {
        const {current} = this.state;

        return (
            <UI.Screen>
                <GameScreen key={current} />
            </UI.Screen>
        );
    }
}

export default RealScreen;
