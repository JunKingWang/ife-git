 var EventUtil = {
    addHandlers: function (element, type, handlers) {
       if (element.addEventListener) {
          element.addEventListener(type, handlers, false);
       } else if (element.attachEvent) {
          element.attachEvent(on + type, handlers);
       } else {
          element['on' + type] = handlers;
       }
    },
    removeHandlers: function (element, type, handlers) {
       if (element.removeEventListener) {
          element.removeEventListener(type, handlers, false);
       } else if (element.detachEvent) {
          element.detachEvent(on + type, handlers);
      } else {
          element['on' + type] = null;
      }
    }
 };
