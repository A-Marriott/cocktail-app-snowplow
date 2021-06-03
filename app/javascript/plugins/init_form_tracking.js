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
      allowlist: ['cocktail_upload', 'combination_upload']
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

  const combinationForm = document.getElementById('new_dose');
  if (combinationForm) {
    combinationForm.addEventListener('input', (event) => {
      if (deleteEvents.includes(event.inputType)) {
        trackStructEvent({
          category: 'combinations',
          action: 'delete form input'
        });
      }
    });
  }

  enableFormTracking({options});

  // derived_tstamp - compare against derived_tstamp of trackPageView to find out how long it took to complete the form
  //
  // Maybe use activity tracking here too? - to check how long given that they stayed on the page
  // Check elements to see what type of name (explicit?) and if used alcoholic vs non alcohlic ingredient
};



export default formTracker;
