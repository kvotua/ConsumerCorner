/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App'; // Используем App.tsx, который рендерит навигацию
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
