import React, { useState } from 'react';

import classes from './Header.module.scss';

const Header = ({ version }) => {
    const [status, setStatus] = useState(false);

    const handleMinimizeWindow = () => {
        chrome.app.window.current().minimize();
    };

    const handleMaximizeWindow = () => {
        if (status) {
            chrome.app.window.current().restore();
            setStatus(!status);
        } else {
            chrome.app.window.current().maximize();
            setStatus(!status);
        }
    };

    const handleCloseWindow = () => {
        window.close();
    };

    return (
        <div className={classes.header}>
            <div className={classes.topBar}>
                <div className={classes.title}>
                    <img className={classes.logo} src="/assets/16x16.png"></img>
                    Dictantor <span className={classes.version}>{version}</span>
                </div>
                <div>
                    <button
                        className={classes.btnWindow}
                        onClick={handleMinimizeWindow}
                    >
                        <i className="fal fa-window-minimize" />
                    </button>
                    {!status ? (
                        <button
                            className={classes.btnWindow}
                            onClick={handleMaximizeWindow}
                        >
                            <i className="fal fa-window-maximize" />
                        </button>
                    ) : (
                        <button
                            className={classes.btnWindow}
                            onClick={handleMaximizeWindow}
                        >
                            <i className="fal fa-window-restore"></i>
                        </button>
                    )}
                    <button
                        className={
                            classes.btnWindow + ' ' + classes.closeWindow
                        }
                        onClick={handleCloseWindow}
                    >
                        <i className="fal fa-window-close" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
