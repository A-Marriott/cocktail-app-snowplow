import { trackSelfDescribingEvent } from '@snowplow/browser-tracker';

const misclickTracker = () => {
  const misclickAreas = document.querySelectorAll('.btn-misclick-zone');
  if (misclickAreas) {
    misclickAreas.forEach((misclickArea) => {
      misclickArea.addEventListener('click', (event) => {
        trackSelfDescribingEvent({
          event: {
            schema: 'iglu:com.amazonaws/misclickschema/jsonschema/1-0-0',
            data: {
              "misclick?": event.srcElement.localName === "div",
              "timestamp": parseFloat((event.timeStamp / 1000).toFixed(3))
            }
          }
        });
      });
    });
  }
};

export default misclickTracker;
