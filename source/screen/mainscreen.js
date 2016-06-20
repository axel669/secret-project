class MainScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <UI.Screen title="Camp Disco V3?">
                <UI.Button block raised text="Play Game" onTap={() => App.navigation.push('/game')} />
            </UI.Screen>
        );
    }
}

export default MainScreen;
