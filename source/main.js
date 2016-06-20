import "theme/default";
import {Settings, GlobalSettings} from "settings";
import DataCenter from "datacenter";

import MainScreen from 'screen/mainscreen';
import GameScreen from 'screen/gamescreen';

const {Route} = ReactRouter;

App.start(
    <Route>
        <Route path="/" component={MainScreen} />
        <Route path="/game" component={GameScreen} />
    </Route>,
    {
        initialPath: '/game'
    }
);
