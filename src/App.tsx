import React from 'react';
import {MainPage} from './pages/MainPage';

type AppProps = {
	offersCount?: number;
}

const App: React.FC<AppProps> = ({offersCount = 312}) => <MainPage offersCount={offersCount}/>;

export default App;
