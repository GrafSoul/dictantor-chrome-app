import React from 'react';

import classes from './ControlContent.module.scss';

const ControlContent = ({
    text,
    isRecord,
    toggleRecord,
    copyLink,
    isCopied,
    eraseText,
    settingsModal,
}) => {
    return (
        <div className={classes.controlButtons}>
            <button
                className={[
                    classes.button,
                    isRecord ? classes.blink : null,
                ].join(' ')}
                onClick={toggleRecord}
                title="Record On/Off"
            >
                {isRecord ? (
                    <i className="fas fa-microphone"></i>
                ) : (
                    <i className="fal fa-microphone"></i>
                )}
            </button>

            <button
                disabled={!text ? true : false}
                className={[
                    classes.button,
                    isRecord || !text ? classes.disabled : null,
                    isCopied ? classes.copy : null,
                ].join(' ')}
                onClick={copyLink}
                title="Copy text"
            >
                {isCopied ? (
                    <i className="fas fa-copy"></i>
                ) : (
                    <i className="fal fa-copy"></i>
                )}
            </button>

            <button
                disabled={!text ? true : false}
                className={[
                    classes.button,
                    isRecord || !text ? classes.disabled : null,
                ].join(' ')}
                onClick={(e) => eraseText(e)}
                title="Erase text"
            >
                <i className="fal fa-eraser"></i>
            </button>

            <button
                className={classes.button}
                onClick={(e) => settingsModal(e)}
                title="Settings"
            >
                {/* <i className="fal fa-cog"></i> */}
                <i className="fal fa-language"></i>
            </button>
        </div>
    );
};

export default ControlContent;
