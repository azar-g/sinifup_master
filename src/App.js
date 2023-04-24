import React from 'react';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
// import ModalWindow from '../src/components/popup_components/modal/Modal';
import ModalWindow from './components/popup_components/modal/Modal';
React.PropTypes = undefined;

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <ThemeCustomization>
        <ScrollTop>
            <Routes />
            <ModalWindow />
        </ScrollTop>
    </ThemeCustomization>
);

export default App;
