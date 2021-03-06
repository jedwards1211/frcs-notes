'use strict';

import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';

var {addEndEventListener, removeEndEventListener} = ReactTransitionEvents;

export default {
  callOnTransitionEnd(element, callback, timeout) {
    var timeoutPromise;
    var transitionEndListener = () => {
      if (timeoutPromise) clearTimeout(timeoutPromise);
      removeEndEventListener(element, transitionEndListener);
      callback();
    };
    addEndEventListener(element, transitionEndListener);
    if (timeout) timeoutPromise = setTimeout(transitionEndListener, timeout);
  }  
};