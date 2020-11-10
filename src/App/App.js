import React, { useState, useEffect, useRef } from 'react';

import Header from './components/Header/Header';
import TextContent from './components/TextContent/TextContent';
import ControlContent from './components/ControlContent/ControlContent';
import SettingsModal from './components/SettingsModal/SettingsModal';

import classes from './App.module.scss';
import langs from './langs/langs';

const App = () => {
    const version = '0.1.0';
    const recognition = useRef(null);
    const selectLanguage = useRef(null);
    const selectDialect = useRef(null);

    const [text, setText] = useState('');
    const [isSpeak, setIsSpeak] = useState(true);
    const [isRecord, setIsRecord] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isSettings, setIsSettings] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line no-undef
        recognition.current = new webkitSpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
    }, [recognition]);

    const handlerToggleRecord = () => {
        if (!isRecord) {
            setIsRecord(true);
            setIsSettings(false);

            recognition.current.onresult = (event) => {
                let output = text === '' ? text : text + ' ';

                for (var i = 0; i < event.results.length; i++) {
                    output = output + event.results[i][0].transcript;
                }

                setText(output);
            };

            recognition.current.lang = selectDialect.current.value;
            recognition.current.start();
        } else {
            setIsRecord(false);
            recognition.current.stop();
        }
    };

    const handlerCopyLink = () => {
        setIsRecord(false);
        recognition.current.stop();
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            })
            .catch((err) => {
                console.log('Something went wrong', err);
            });
    };

    const handlerEraseText = (e) => {
        e.preventDefault();
        setIsRecord(false);
        recognition.current.stop();
        setText('');
    };

    const handlerSettingsModal = (e) => {
        e.preventDefault();
        setIsSettings(!isSettings);
    };

    return (
        <div className={classes.contentWrap}>
            <Header version={version} />

            <div className={classes.content}>
                <TextContent
                    text={text}
                    setText={setText}
                    isSpeak={isSpeak}
                    setIsSpeak={setIsSpeak}
                />
                <ControlContent
                    text={text}
                    isRecord={isRecord}
                    isCopied={isCopied}
                    toggleRecord={handlerToggleRecord}
                    copyLink={handlerCopyLink}
                    eraseText={handlerEraseText}
                    settingsModal={handlerSettingsModal}
                />
            </div>
            <SettingsModal
                langs={langs}
                selectLanguage={selectLanguage}
                selectDialect={selectDialect}
                isSettings={isSettings}
                setIsSettings={setIsSettings}
            />
        </div>
    );
};

export default App;
