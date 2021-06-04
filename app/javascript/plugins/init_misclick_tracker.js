import { trackSelfDescribingEvent } from '@snowplow/browser-tracker';

const misclickTracker = () => {
  const misclickAreas = document.querySelectorAll('.btn-misclick-zone');
  if (misclickAreas) {
    misclickAreas.forEach((misclickArea) => {
      misclickArea.addEventListener('click', (event) => {
        // console.log(event.srcElement.localName)
        // timestamp
        console.log(event)
      });
    });
  }
};

trackSelfDescribingEvent({
  event: {
    schema: 'iglu:com.amazonaws/clickschema/jsonschema/1-0-0',
    data: {
        myIntProperty: 1
    }
  }
});


export default misclickTracker;
