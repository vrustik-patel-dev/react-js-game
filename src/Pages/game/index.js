import{Provider} from 'react-redux';

import GamePage from './gamePage';
import store from '../../Store/store';

const gameApp = () => {
    return <>
    <Provider store={store}>
        <GamePage />
    </Provider>
    </>
}

export default gameApp;