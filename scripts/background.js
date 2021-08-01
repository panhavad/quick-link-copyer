// chrome.browserAction.onClicked.addListener(function(tab) { alert('icon clicked')});
chrome.browserAction.onClicked.addListener(sendfunc);
function sendfunc(tab){
    msg={flag:true};
    chrome.tabs.sendMessage(tab.id,msg);
}