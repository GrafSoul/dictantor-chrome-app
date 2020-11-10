import React, { useRef, useEffect } from 'react';

import classes from './SettingsModal.module.scss';

const SettingsModal = ({
    langs,
    selectLanguage,
    selectDialect,
    isSettings,
    setIsSettings,
}) => {
    useEffect(() => {
        for (let i = 0; i < langs.length; i++) {
            selectLanguage.current.options[i] = new Option(langs[i][0], i);
        }
        selectLanguage.current.selectedIndex = 26;
        handlerUpdateCountry();
        selectDialect.current.selectedIndex = 26;
    }, [langs]);

    const handlerUpdateCountry = () => {
        for (let i = selectDialect.current.options.length - 1; i >= 0; i--) {
            selectDialect.current.remove(i);
        }
        let list = langs[selectLanguage.current.selectedIndex];
        for (let i = 1; i < list.length; i++) {
            selectDialect.current.options.add(
                new Option(list[i][1], list[i][0]),
            );
        }
        selectDialect.current.style.display =
            list[1].length == 1 ? 'none' : 'inline-block';
    };

    return (
        <div
            className={[
                classes.contentModal,
                isSettings ? classes.active : null,
            ].join(' ')}
        >
            <h2 className={classes.title}>Language setting</h2>

            <div className={classes.selectLang}>
                <select
                    ref={selectLanguage}
                    onChange={handlerUpdateCountry}
                ></select>

                <select ref={selectDialect}></select>
            </div>

            <button
                className={classes.button}
                onClick={() => setIsSettings(false)}
            >
                Close
            </button>
        </div>
    );
};

export default SettingsModal;
