var Menubar=function(t){var s="Menubar constructor argument menubarNode ";if(!t instanceof Element)throw new TypeError(s+"is not a DOM Element.");if(0===t.childElementCount)throw new Error(s+"has no element children.");for(e=t.firstElementChild;e;){var o=e.firstElementChild;if(e&&o&&"A"!==o.tagName)throw new Error(s+"has child elements are not A elements.");e=e.nextElementSibling}this.isMenubar=!0,this.domNode=t,this.menubarItems=[],this.firstChars=[],this.firstItem=null,this.lastItem=null,this.hasFocus=!1,this.hasHover=!1};Menubar.prototype.init=function(){var e,t,s,o;for(elem=this.domNode.firstElementChild;elem;){var t=elem.firstElementChild;elem&&t&&"A"===t.tagName&&(e=new MenubarItem(t,this),e.init(),this.menubarItems.push(e),s=t.textContent.trim(),this.firstChars.push(s.substring(0,1).toLowerCase())),elem=elem.nextElementSibling}o=this.menubarItems.length,o>0&&(this.firstItem=this.menubarItems[0],this.lastItem=this.menubarItems[o-1]),this.firstItem.domNode.tabIndex=0},Menubar.prototype.setFocusToItem=function(e){for(var t=!1,s=0;s<this.menubarItems.length;s++){var o=this.menubarItems[s];0==o.domNode.tabIndex&&(t="true"===o.domNode.getAttribute("aria-expanded")),o.domNode.tabIndex=-1,o.popupMenu&&o.popupMenu.close()}e.domNode.focus(),e.domNode.tabIndex=0,t&&e.popupMenu&&e.popupMenu.open()},Menubar.prototype.setFocusToFirstItem=function(){this.setFocusToItem(this.firstItem)},Menubar.prototype.setFocusToLastItem=function(){this.setFocusToItem(this.lastItem)},Menubar.prototype.setFocusToPreviousItem=function(e){var t;e===this.firstItem?newItem=this.lastItem:(t=this.menubarItems.indexOf(e),newItem=this.menubarItems[t-1]),this.setFocusToItem(newItem)},Menubar.prototype.setFocusToNextItem=function(e){var t;e===this.lastItem?newItem=this.firstItem:(t=this.menubarItems.indexOf(e),newItem=this.menubarItems[t+1]),this.setFocusToItem(newItem)},Menubar.prototype.setFocusByFirstCharacter=function(e,t){var s,o,t=t.toLowerCase();"true"===e.domNode.getAttribute("aria-expanded");s=this.menubarItems.indexOf(e)+1,s===this.menubarItems.length&&(s=0),o=this.getIndexFirstChars(s,t),-1===o&&(o=this.getIndexFirstChars(0,t)),o>-1&&this.setFocusToItem(this.menubarItems[o])},Menubar.prototype.getIndexFirstChars=function(e,t){for(var s=e;s<this.firstChars.length;s++)if(t===this.firstChars[s])return s;return-1};var MenubarItem=function(e,t){this.menu=t,this.domNode=e,this.popupMenu=!1,this.hasFocus=!1,this.hasHover=!1,this.isMenubarItem=!0,this.keyCode=Object.freeze({TAB:9,RETURN:13,ESC:27,SPACE:32,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40})};MenubarItem.prototype.init=function(){this.domNode.tabIndex=-1,this.domNode.addEventListener("touchstart",this.handleTouch.bind(this)),this.domNode.addEventListener("keydown",this.handleKeydown.bind(this)),this.domNode.addEventListener("focus",this.handleFocus.bind(this)),this.domNode.addEventListener("blur",this.handleBlur.bind(this)),this.domNode.addEventListener("mouseover",this.handleMouseover.bind(this)),this.domNode.addEventListener("mouseout",this.handleMouseout.bind(this));var e=this.domNode.nextElementSibling;e&&"UL"===e.tagName&&(this.popupMenu=new PopupMenu(e,this),this.popupMenu.init())},MenubarItem.prototype.handleTouch=function(e){if(this.popupMenu){for(var t=0;t<this.menu.menubarItems.length;t++)this.menu.menubarItems[t].popupMenu&&this.menu.menubarItems[t].popupMenu.close();this.popupMenu.open(),this.hasFocus=!0,this.popupMenu.setFocusToSelf(),e.preventDefault(),e.stopPropagation()}},MenubarItem.prototype.handleKeydown=function(e){function t(e){return 1===e.length&&e.match(/\S/)}var s=(e.currentTarget,e.key),o=!1;switch(e.keyCode){case this.keyCode.SPACE:case this.keyCode.RETURN:case this.keyCode.DOWN:this.popupMenu&&(this.popupMenu.open(),this.popupMenu.setFocusToFirstItem(),o=!0);break;case this.keyCode.LEFT:this.menu.setFocusToPreviousItem(this),o=!0;break;case this.keyCode.RIGHT:this.menu.setFocusToNextItem(this),o=!0;break;case this.keyCode.UP:this.popupMenu&&(this.popupMenu.open(),this.popupMenu.setFocusToLastItem(),o=!0);break;case this.keyCode.HOME:case this.keyCode.PAGEUP:this.menu.setFocusToFirstItem(),o=!0;break;case this.keyCode.END:case this.keyCode.PAGEDOWN:this.menu.setFocusToLastItem(),o=!0;break;case this.keyCode.TAB:if(!this.domNode.classList.contains("not-item")){this.popupMenu.close(!0);break}default:t(s)&&(this.menu.setFocusByFirstCharacter(this,s),o=!0)}o&&(e.stopPropagation(),e.preventDefault())},MenubarItem.prototype.setExpanded=function(e){e?this.domNode.setAttribute("aria-expanded","true"):this.domNode.setAttribute("aria-expanded","false")},MenubarItem.prototype.handleFocus=function(){this.menu.hasFocus=!0},MenubarItem.prototype.handleBlur=function(){this.menu.hasFocus=!1},MenubarItem.prototype.handleMouseover=function(){this.domNode.classList.contains("not-item")||(this.hasHover=!0,this.popupMenu.open())},MenubarItem.prototype.handleMouseout=function(){this.domNode.classList.contains("not-item")||(this.hasHover=!1,setTimeout(this.popupMenu.close.bind(this.popupMenu,!1),300))};var PopupMenu=function(e,t){var s="PopupMenu constructor argument domNode ";if(!e instanceof Element)throw new TypeError(s+"is not a DOM Element.");if(0===e.childElementCount)throw new Error(s+"has no element children.");for(var o=e.firstElementChild;o;){var n=o.firstElementChild;if(n&&"A"===n)throw new Error(s+"has descendant elements that are not A elements.");o=o.nextElementSibling}this.isMenubar=!1,this.domNode=e,this.controller=t,this.menuitems=[],this.firstChars=[],this.firstItem=null,this.lastItem=null,this.hasFocus=!1,this.hasHover=!1};PopupMenu.prototype.init=function(){var e,t,s,o,n;for(this.domNode.addEventListener("mouseover",this.handleMouseover.bind(this)),this.domNode.addEventListener("mouseout",this.handleMouseout.bind(this)),e=this.domNode.firstElementChild;e;)t=e.firstElementChild,t&&"A"===t.tagName&&(s=new MenuItem(t,this),s.init(),this.menuitems.push(s),o=t.textContent.trim(),this.firstChars.push(o.substring(0,1).toLowerCase())),e=e.nextElementSibling;n=this.menuitems.length,n>0&&(this.firstItem=this.menuitems[0],this.lastItem=this.menuitems[n-1])},PopupMenu.prototype.handleMouseover=function(){this.hasHover=!0},PopupMenu.prototype.handleMouseout=function(){this.hasHover=!1,setTimeout(this.close.bind(this,!1),1)},PopupMenu.prototype.setFocusToController=function(e,t){function s(e,t){for(;e;){if(e.isMenubarItem)return e.domNode.focus(),e;t&&e.menu.close(!0),e.hasFocus=!1,e=e.menu.controller}return!1}if("string"!=typeof e&&(e=""),""===e)return void s(this.controller,!0);if(this.controller.isMenubarItem)"previous"===e?this.controller.menu.setFocusToPreviousItem(this.controller,t):"next"===e&&this.controller.menu.setFocusToNextItem(this.controller,t);else if(this.controller.domNode.focus(),this.close(),"next"===e){var o=s(this.controller,!1);o&&o.menu.setFocusToNextItem(o,t)}},PopupMenu.prototype.setFocusToSelf=function(){this.domNode.previousElementSibling.focus()},PopupMenu.prototype.setFocusToFirstItem=function(){this.firstItem.domNode.focus()},PopupMenu.prototype.setFocusToLastItem=function(){this.lastItem.domNode.focus()},PopupMenu.prototype.setFocusToPreviousItem=function(e){var t;e===this.firstItem?this.lastItem.domNode.focus():(t=this.menuitems.indexOf(e),this.menuitems[t-1].domNode.focus())},PopupMenu.prototype.setFocusToNextItem=function(e){var t;e===this.lastItem?this.firstItem.domNode.focus():(t=this.menuitems.indexOf(e),this.menuitems[t+1].domNode.focus())},PopupMenu.prototype.setFocusByFirstCharacter=function(e,t){var s,o,t=t.toLowerCase();s=this.menuitems.indexOf(e)+1,s===this.menuitems.length&&(s=0),o=this.getIndexFirstChars(s,t),-1===o&&(o=this.getIndexFirstChars(0,t)),o>-1&&this.menuitems[o].domNode.focus()},PopupMenu.prototype.getIndexFirstChars=function(e,t){for(var s=e;s<this.firstChars.length;s++)if(t===this.firstChars[s])return s;return-1},PopupMenu.prototype.open=function(){this.domNode.classList.add("show"),this.controller.setExpanded(!0)},PopupMenu.prototype.close=function(e){for(var t=this.controller.hasHover,s=this.hasFocus,o=0;o<this.menuitems.length;o++){var n=this.menuitems[o];n.popupMenu&&(s|=n.popupMenu.hasFocus)}this.controller.isMenubarItem||(t=!1),!e&&(s||this.hasHover||t)||(this.domNode.classList.remove("show"),this.controller.setExpanded(!1))};var MenuItem=function(e,t){"object"!=typeof popupObj&&(popupObj=!1),this.domNode=e,this.menu=t,this.popupMenu=!1,this.isMenubarItem=!1,this.keyCode=Object.freeze({TAB:9,RETURN:13,ESC:27,SPACE:32,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40})};MenuItem.prototype.init=function(){this.domNode.tabIndex=-1,this.domNode.addEventListener("touchstart",this.handleTouch.bind(this)),this.domNode.addEventListener("keydown",this.handleKeydown.bind(this)),this.domNode.addEventListener("click",this.handleClick.bind(this)),this.domNode.addEventListener("focus",this.handleFocus.bind(this)),this.domNode.addEventListener("blur",this.handleBlur.bind(this)),this.domNode.addEventListener("mouseover",this.handleMouseover.bind(this)),this.domNode.addEventListener("mouseout",this.handleMouseout.bind(this));var e=this.domNode.nextElementSibling;e&&"UL"===e.tagName&&(this.popupMenu=new PopupMenu(e,this),this.popupMenu.init())},MenuItem.prototype.isExpanded=function(){return"true"===this.domNode.getAttribute("aria-expanded")},MenuItem.prototype.handleTouch=function(e){if(this.popupMenu){for(var t=0;t<this.menu.menuitems.length;t++)this.menu.menuitems[t].popupMenu.close();this.popupMenu.open(),this.hasFocus=!0,this.popupMenu.setFocusToSelf(),e.preventDefault(),e.stopPropagation()}},MenuItem.prototype.handleKeydown=function(e){function t(e){return 1===e.length&&e.match(/\S/)}var s,o=e.currentTarget,n=e.key,i=!1;switch(e.keyCode){case this.keyCode.SPACE:case this.keyCode.RETURN:if(this.popupMenu)this.popupMenu.open(),this.popupMenu.setFocusToFirstItem();else{try{s=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0})}catch(u){document.createEvent&&(s=document.createEvent("MouseEvents"),s.initEvent("click",!0,!0))}o.dispatchEvent(s)}i=!0;break;case this.keyCode.UP:this.menu.setFocusToPreviousItem(this),i=!0;break;case this.keyCode.DOWN:this.menu.setFocusToNextItem(this),i=!0;break;case this.keyCode.LEFT:this.menu.setFocusToController("previous",!0),this.menu.close(!0),i=!0;break;case this.keyCode.RIGHT:this.popupMenu?(this.popupMenu.open(),this.popupMenu.setFocusToFirstItem()):(this.menu.setFocusToController("next",!0),this.menu.close(!0)),i=!0;break;case this.keyCode.HOME:case this.keyCode.PAGEUP:this.menu.setFocusToFirstItem(),i=!0;break;case this.keyCode.END:case this.keyCode.PAGEDOWN:this.menu.setFocusToLastItem(),i=!0;break;case this.keyCode.ESC:this.menu.setFocusToController(),this.menu.close(!0),i=!0;break;case this.keyCode.TAB:this.menu.setFocusToController();break;default:t(n)&&(this.menu.setFocusByFirstCharacter(this,n),i=!0)}i&&(e.stopPropagation(),e.preventDefault())},MenuItem.prototype.setExpanded=function(e){e?this.domNode.setAttribute("aria-expanded","true"):this.domNode.setAttribute("aria-expanded","false")},MenuItem.prototype.handleClick=function(){this.menu.setFocusToController(),this.menu.close(!0)},MenuItem.prototype.handleFocus=function(){this.menu.hasFocus=!0},MenuItem.prototype.handleBlur=function(){this.menu.hasFocus=!1,setTimeout(this.menu.close.bind(this.menu,!1),300)},MenuItem.prototype.handleMouseover=function(){this.menu.hasHover=!0,this.menu.open(),this.popupMenu&&(this.popupMenu.hasHover=!0,this.popupMenu.open())},MenuItem.prototype.handleMouseout=function(){this.popupMenu&&(this.popupMenu.hasHover=!1,this.popupMenu.close(!0)),this.menu.hasHover=!1,setTimeout(this.menu.close.bind(this.menu,!1),300)};