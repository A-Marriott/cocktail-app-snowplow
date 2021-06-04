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

  const options = {
    forms: {
      allowlist: ['cocktail_upload', 'combination_upload']
    }
  };

  const trackedForm = function(formName, categoryName) {
    if(formName) {
      formName.addEventListener('input', (event) => {
        if (deleteEvents.includes(event.inputType)) {
          trackStructEvent({
            category: categoryName,
            action: 'delete form input'
          });
        }
      });
    }
  };

  const cocktailForm = document.getElementById('new_cocktail');
  const combinationForm = document.getElementById('new_dose');
  trackedForm(cocktailForm, 'cocktails');
  trackedForm(combinationForm, 'combinations');

  enableFormTracking({options});
};

export default formTracker;
