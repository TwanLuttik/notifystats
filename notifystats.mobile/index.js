/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings(["Require cycle:", "Remote debugger"]);


AppRegistry.registerComponent(appName, () => App);
