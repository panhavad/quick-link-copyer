function getLinks() {
  var links = document.links;
  for (var i = 0; i < links.length; i++) {
    links[i].outerHTML += '<sub class="myAction clickable-sub" payload="' + links[i].href + '"><i class="far fa-clipboard"></i></sub>'
  }
}

chrome.runtime.onMessage.addListener(function receivefunc(
  mssg,
  sender,
  sendResponse
) {
  if (mssg.flag) {
    getLinks();
    var counter = 1

    $(".myAction").click(function (e) {
      $("#hint-word").remove();
      $(".theclipedlinkbox").append('<p class="no-margin">' + counter + ". " + e.currentTarget.attributes[1].nodeValue + "</p>");
      counter ++
    });

    $("body").append(`
    <div id="floater" class="floating-static theclipedlinkbox">
      <div id="floating-header">Clipboard</div>
      <p class="no-margin" id="hint-word">Nothing yet...</p>
    </div>
    `);
    //Make the DIV element draggagle:
    dragElement(document.getElementById("floater"));
  }
});

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById("floating-header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById("floating-header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
