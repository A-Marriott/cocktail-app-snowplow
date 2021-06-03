// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
import 'bootstrap';

import { newTracker, trackPageView } from '@snowplow/browser-tracker';
import { FormTrackingPlugin } from '@snowplow/browser-plugin-form-tracking';

// import { LinkClickTrackingPlugin, enableLinkClickTracking } from '@snowplow/browser-plugin-link-click-tracking';

import formTracker from '../plugins/init_form_tracking.js'

document.addEventListener('turbolinks:load', () => {
  newTracker('sp1', 'http://localhost:9090', {
    appId: 'cocktail creator',
    plugins: [ FormTrackingPlugin() ]
  });

  // enableLinkClickTracking();
  // trackPageView();
});


// submit
