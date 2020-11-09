import React, { useRef } from 'react';

import classes from './TextContent.module.scss';

const TextContent = ({ text, setText, isSpeak, setIsSpeak }) => {
    const textRef = useRef('');

    const handlerText = (e) => {
        setText(e.target.value);
        if (text === '') {
            setIsSpeak(true);
        }
    };

    return (
        <div className={classes.textContent}>
            <p className={classes.inputTextWrap}>
                <textarea
                    type="textarea"
                    id="text"
                    disabled={isSpeak ? false : true}
                    ref={textRef}
                    className={classes.inputText}
                    value={text}
                    placeholder="Click on the Record button and start talking, the text you said will appear here"
                    onChange={(e) => handlerText(e)}
                ></textarea>
            </p>
        </div>
    );
};

export default TextContent;
