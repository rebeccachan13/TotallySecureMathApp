/**
 * @format
 */

import './shim'; // Add this line at the top of your entry file
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
