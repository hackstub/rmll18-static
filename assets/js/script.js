var menubar;
var phone;
function initMenuBar () {
  menubar = new Menubar(document.getElementById("main-menu"));
  if (window.innerWidth < 730) setupPhoneMenu();
  else menubar.init();
  window.onresize = function () {
    if (window.innerWidth < 730 && !phone) setupPhoneMenu();
    else if (window.innerWidth >= 730 && phone) removePhoneMenu();
  }
}
window.onload = initMenuBar;

function setupPhoneMenu() {
  var link = document.createElement("a");
  link.appendChild(document.createTextNode("Menu"));
  link.setAttribute("role", "menuitem");
  link.setAttribute("aria-haspopup", "true");
  link.setAttribute("aria-expanded", "false");
  link.setAttribute("tabindex", "-1");
  var subMenu = document.createElement("ul");
  subMenu.setAttribute("role", "menu");
  subMenu.setAttribute("aria-label", "Event information");

  var currentMenu = document.getElementById("main-menu");
  while (currentMenu.children.length > 4) {
    currentMenu.children[1].setAttribute("role", "none")
    subMenu.appendChild(currentMenu.children[1]);
  }

  var menu = document.createElement("li");
  menu.appendChild(link);
  menu.appendChild(subMenu);
  currentMenu.insertBefore(menu, currentMenu.children[1]);

  menubar = new Menubar(document.getElementById("main-menu"));
  menubar.init();
  phone = true;
}

function removePhoneMenu() {
  var currentMenu = document.getElementById("main-menu");
  var menu = currentMenu.children[1];
  var submenus = menu.children[1].children;
  var rightMenu = currentMenu.children[2];
  var lenSub = submenus.length;
  for (var i = 0; i < lenSub; i++) {
    submenus[0].removeAttribute("role");
    currentMenu.insertBefore(submenus[0], rightMenu);
  }
  currentMenu.removeChild(menu);

  //FIXME need this ?
  menubar = new Menubar(document.getElementById("main-menu"));
  menubar.init();
  phone = false;
}

// UTILS
function readJSONFile(url, callbackParsing, callbackBuilding, callbackSetup) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", url);
  rawFile.onload = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callbackParsing(JSON.parse(rawFile.responseText), callbackBuilding, callbackSetup);
    }
  }
  rawFile.onerror = function () {
    console.log("Couldn't find '" + url +"'");
  }
  rawFile.send();
}

function domElem(nodeName, cls, attr) {
  var elem = document.createElement(nodeName);
  if (cls) {
    if (Array.isArray(cls)) {
      for (var i = cls.length - 1; i >= 0; --i) elem.classList.add(cls[i]);
    } else elem.classList.add(cls);
  }
  if (attr) {
    for (var i in attr) elem.setAttribute(i, attr[i]);
  }
  return elem;
}

function domElement(nodeName, attr) {
  var elem = document.createElement(nodeName);
  if (attr) {
    for (var i in attr) elem.setAttribute(i, attr[i]);
  }
  return elem;
}

function appendChildren(elem, children) {
  var len = children.length;
  for (var child = 0; child < len; child++) {
    elem.appendChild(children[child]);
  }
}
