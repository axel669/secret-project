import GameState from 'gamestate';
import Container from 'component/container';
import Subscribable from 'component/subscribable';
import {Settings} from 'settings';

const animationTime = 250;

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

const collision = (a, b) => (a.left < b.left + b.width &&
    a.left + a.width > b.left &&
    a.top < b.top + b.height &&
    a.height + a.top > b.top);
class CDCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: this.props.x0,
            y: this.props.y0,
            animating: false,
            selected: false,
            fill: 0,
            active: false
        };
        this.touchID = null;
        this.fillToken = null;
        if (this.props.movable === true) {
            this.answerToken = PubSub.subscribe(
                "campdisco.game.forceAnswer",
                (t, data) => {
                    // console.log(t, send);
                    this.finish(data);
                }
            );
        } else {
            this.answerToken = null;
        }
    }

    rect = () => this.refs.wrapper.getBoundingClientRect()

    signal = (selected, filler) => {
        // console.log(active, filler);
        this.setState({selected, fill: 0});
        if (filler === true && selected === true) {
            this.fillToken = PubSub.subscribe(
                'system.framedraw',
                () => {
                    let {fill} = this.state;
                    fill += 1;
                    this.setState({fill});
                    if (fill === 60) {
                        PubSub.unsubscribe(this.fillToken);
                        this.fillToken = null;
                        PubSub.publish("campdisco.game.forceAnswer", [null, null]);
                    }
                }
            );
        } else {
            if (this.fillToken !== null) {
                PubSub.unsubscribe(this.fillToken);
                this.fillToken = null;
            }
        }
    }

    setupMove = (evt) => {
        if (this.touchID !== null) {
            return;
        }
        const {target} = evt;
        const [touch] = evt.changedTouches;
        const {clientX: x, clientY: y} = touch;
        const rect = this.rect();

        this.touchID = touch.identifier;
        this.offset = {x: x - (rect.left + rect.width / 2), y: y - (rect.top + rect.height / 2)};
        this.prevCollision = this.props.others.map(() => false);
        this.prevFill = false;
        this.prevCount = 0;
        this.setState({active: true});
    }
    onTouchMove = (evt) => {
        evt.preventDefault();
        if (this.state.active === false) {
            return;
        }

        // const [touch] = evt.changedTouches;
        const touch = Array.prototype.find.call(evt.changedTouches, touch => touch.identifier === this.touchID);
        if (touch === undefined) {
            return;
        }
        let {clientX: x, clientY: y} = touch;

        x -= this.offset.x;
        y -= this.offset.y;

        x = (x / App.viewport.width) * 100;
        y = (y / App.viewport.height) * 100;

        this.setState({x, y});
    }
    finish = ([evt, forced = null]) => {
        if (this.state.active === false && forced === null) {
            return;
        }
        if (evt !== null) {
            const touch = Array.prototype.find.call(evt.changedTouches, touch => touch.identifier === this.touchID);
            if (touch === undefined) {
                return;
            }
        }

        let answer = false;
        let newPos = {};

        if (this.prevCount === 1) {
            answer = this.props.others[this.prevCollision.indexOf(true)].props.correct;
        }
        if (forced !== null) {
            answer = forced;
        }

        PubSub.publish("campdisco.game.answer", answer);

        this.setState({
            x: this.props.x0,
            y: this.props.y0,
            animating: true,
            active: false
        });
        this.touchID = null;
        this.prevFill = false;
        this.prevCount = 0;
        this.prevCollision = this.props.others.map(() => false);
        for (const other of this.props.others) {
            other.signal(false, false);
        }
        chrono.trigger(
            animationTime,
            () => this.setState({animating: false})
        );
        // console.log('done!');
    }
    touchEnd = (evt) => PubSub.publishSync("campdisco.game.forceAnswer", [evt, null])

    componentDidUpdate = () => {
        if (this.props.movable === false || this.state.animating === true) {
            return;
        }

        const {prevFill, prevCount, prevCollision} = this;
        const rect = this.rect();
        const newCollisions = this.props.others.map(other => collision(rect, other.rect()));
        const newCount = newCollisions.filter(i => i === true).length;
        const shouldFill = newCount === 1;

        newCollisions.forEach(
            (current, index) => {
                const prev = prevCollision[index];
                if (prevFill !== shouldFill || newCount !== prevCount || current !== prev) {
                    this.props.others[index].signal(current, shouldFill);
                }
            }
        );
        this.prevCollision = newCollisions;
        this.prevFill = shouldFill;
        this.prevCount = newCount;
    }

    componentWillUnmount = () => {
        if (this.answerToken !== null) {
            PubSub.unsubscribe(this.answerToken);
        }
        if (this.fillToken !== null) {
            PubSub.unsubscribe(this.fillToken);
        }
    }

    render = () => {
        const {children, style, width, onDrag, onDragStart, onDragEnd, top, movable, size} = this.props;
        const {x, y, animating, fill} = this.state;
        const cardStyle = {
            width: `${width * size}vh`,
            top: `${y}%`,
            left: `${x}%`,
            transition: animating === true ? `top ${animationTime}ms linear, left ${animationTime}ms linear, width ${animationTime}ms linear` : null,
            zIndex: top === true ? '+100' : null
        };
        const listeners = movable === true ?
            {
                onTouchStart: this.setupMove,
                onTouchMove: this.onTouchMove,
                onTouchEnd: this.touchEnd,
                onTouchCancel: this.touchEnd
            } :
            {};

        if (this.state.selected === true) {
            cardStyle.borderColor = 'cyan';
        }

        return (
            <div className={Style.getClassName('game:card')} style={cardStyle} {...listeners} ref="wrapper">
                <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: `${fill * 1.66666}%`, backgroundColor: 'cyan'}} />
                <div className={Style.getClassName("game:cardInner")} style={style}>
                {children}
                </div>
            </div>
        );
    }
}

const correct = [
    "amazeen.mp3",
    "awesome.mp3",
    "excellent.mp3",
    "fantastic.mp3",
    "files.txt",
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
    static get startingPos() {
        return [
            {x0: 20, y0: 25, correct: false, size: 1},
            {x0: 50, y0: 25, correct: false, size: 1.15},
            {x0: 80, y0: 25, correct: true, size: 1.3},
            // {x0: 50, y0: 80, fill: 0}
        ];
    }

    constructor(props) {
        super(props);
        // const url = "https://res.cloudinary.com/dsjiwbe0q/image/upload/v1466295085/f7e57b7ccc7fcb3297c45d6a1af9787b_sh2spa.png";
        const url = "https://res.cloudinary.com/dsjiwbe0q/image/upload/v1466365486/8bit_mega_man_1_20276_6496_thumb_9812_xpu8wi.png";
        this.index = -1;
        this.state = {
            paused: false,
            scale: 1
        };
        this.choices = GameScreen.startingPos.map(
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
        this.movable = <CDCard width={30} size={1} x0={50} y0={75} size={1.3} others={allThings} movable />;
        // this.token = PubSub.subscribe(
        this.pubListen(
            'campdisco.game.answer',
            async (evt, answer) => {
                // console.log(answer);
                this.setState({scale: 0});
                await chrono.wait(310);
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

const Arc = ({cx, cy, radius, start, end}) => {
    const circ = Math.PI * 2 * radius;
    const first = start / 360;
    const second = end / 360 - first;

    return <circle cx={cx} cy={cy} r={radius} strokeWidth={3} strokeDasharray={`0 ${first * circ} ${second * circ} ${circ}`} stroke="black" fill="transparent" transform={`rotate(-90 ${cx} ${cy})`} />;
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

    render = () => {
        const s = 50;
        return (
            <svg width={s} height={s}>
                <Arc cx={s / 2} cy={s / 2} radius={s / 2 - 3} start={0} end={360 * (this.left / this.max)} />
            </svg>
        );
    }
}

class RealScreen extends Subscribable {
    constructor() {
        super();
        this.state = {current: null};
    }

    componentDidMount = () => {
        // this.token = PubSub.subscribe(
        // window.nope = new Howl({urls: ['audio/Not quite.mp3'], onend: () => PubSub.publish('campdisco.response.finished')});
        this.pubListen(
            "campdisco.response.finished",
            () => {
                // console.log(prevAnswer);
                if (GameState.currentLevel.finished === true) {
                    App.navigation.replace("/");
                } else {
                    this.setState({
                        current: Date.now()
                    });
                }
            }
        );
        GameState.initLevel();
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
