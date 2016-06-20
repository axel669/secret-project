export default class Subscribable extends React.Component {
    constructror(props) {
        super(props);
        console.log('work?');
        this.__tokens = [];
    }

    pubListen = (evtType, listener) => {
        this.__tokens.push(PubSub.subscribe(evtType, listener));
    }
    clearSubs = () => {
        for (const token of this.__tokens) {
            PubSub.unsubscribe(token);
        }
    }
}
