import "theme/default";
import "lib/howler.min";
import {Settings, GlobalSettings} from "settings";
import DataCenter from "datacenter";

import MainScreen from 'screen/mainscreen';
import GameScreen from 'screen/gamescreen';

const {Route} = ReactRouter;

if (Settings.has("version") === false) {
    Settings.write("version", 0);
    Settings.write("timerDuration", 5000);
}
// Settings.write("timerDuration", 4000);

App.start(
    <Route>
        <Route path="/" component={MainScreen} />
        <Route path="/game" component={GameScreen} />
    </Route>,
    {
        initialPath: '/game'
    }
);
