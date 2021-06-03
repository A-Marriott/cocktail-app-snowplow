import { trackStructEvent } from '@snowplow/browser-tracker';
import { enableFormTracking } from '@snowplow/browser-plugin-form-tracking';

const formTracker = () => {
  const deleteEvents = [
    "deleteByComposition",
    "deleteCompositionText",
    "deleteWordBackward",
    "deleteWordForward",
    "deleteSoftLineBackward",
    "deleteSoftLineForward",
    "deleteEntireSoftLine",
    "deleteHardLineBackward",
    "deleteHardLineForward",
    "deleteByDrag",
    "deleteByCut",
    "deleteByContent",
    "deleteContentBackward",
    "deleteContentForward"
  ]

  // To avoid tracking unnecessary amounts of data, we only track form submission by using an empty array for the tracked field list

  const options = {
    forms: {
      allowlist: ['cocktail_upload']
    },
    fields: {
      allowlist: []
    }
  };

  const cocktailForm = document.getElementById('new_cocktail');
  if (cocktailForm) {
    cocktailForm.addEventListener('input', (event) => {
      if (deleteEvents.includes(event.inputType)) {
        trackStructEvent({
          category: 'cocktails',
          action: 'delete form input'
        });
      }
    });
  }

  enableFormTracking({options});
};



export default formTracker;
