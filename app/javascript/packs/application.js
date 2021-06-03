require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
import 'bootstrap';

import { newTracker, trackPageView, trackSelfDescribingEvent } from '@snowplow/browser-tracker';
import { FormTrackingPlugin } from '@snowplow/browser-plugin-form-tracking';
import formTracker from '../plugins/init_form_tracker.js'
import misclickTracker from '../plugins/init_misclick_tracker.js'

document.addEventListener('turbolinks:load', () => {
  newTracker('sp1', 'http://localhost:9090', {
    appId: 'cocktail creator',
    plugins: [ FormTrackingPlugin() ]
  });

  formTracker();
  misclickTracker();
  // trackPageView();

  // trackSelfDescribingEvent({
  //   event: {
  //     schema: 'iglu:com.amazonaws/clickschema/jsonschema/1-0-0',
  //     data: {
  //         myIntProperty: 1
  //     }
  //   }
  // });

});


// submit
