class Subscribable extends React.Component {
    constructor() {
        super();
        this.__tokens = [];
    }

    pubListen = (evtType, listener) => {
        this.__tokens.push(PubSub.subscribe(evtType, listener));
    }
    clearSubs = () => {
        for (const token of this.__tokens) {
            PubSub.unsubscribe(token);
        }
        this.__tokens = [];
    }

    componentWillUnmount = () => {
        this.clearSubs();
    }
}

export default Subscribable;
