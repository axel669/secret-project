import GameState from 'gamestate';

const collision = (a, b) => (a.left < b.left + b.width &&
    a.left + a.width > b.left &&
    a.top < b.top + b.height &&
    a.height + a.top > b.top);
const animationTime = 250;

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

        const newState = {active: false};
        if (answer === false && GameState.currentLevel.resetPositionOnWrong() === true) {
            newState.x = this.props.x0;
            newState.y = this.props.y0;
            newState.animating = true;
        }
        this.setState(newState);
        // this.setState({
        //     // x: this.props.x0,
        //     // y: this.props.y0,
        //     // animating: true,
        //     active: false
        // });
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

export default CDCard;
