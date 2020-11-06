chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('index.html', {
        id: 'root',
        innerBounds: {
            width: 600,
            height: 450,
            minWidth: 340,
            minHeight: 230,
        },
    });
});
