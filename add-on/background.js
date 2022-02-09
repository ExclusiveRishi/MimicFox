function onError(error) {
    console.log(`MimicFox Error: ${error}`);
}

function MimicFox(text) {

    var port = browser.runtime.connectNative("mimicfox");

    browser.tabs.executeScript({
        // get selected text from page
        code: `text = document.getSelection().toString();`
    });
    browser.runtime.sendNativeMessage("mimicfox", { text : text }).catch(onError);
}

var title = "Read Text Aloud";

browser.contextMenus.create({
    id: "MimicFox",
    title: title,
    contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "MimicFox":
            text = info.selectionText;
            if (text) MimicFox(text);
            break;
    }
});