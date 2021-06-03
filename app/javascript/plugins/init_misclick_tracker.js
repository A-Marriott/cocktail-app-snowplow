const misclickTracker = () => {
  const misclickAreas = document.querySelectorAll('.btn-misclick-zone');
  if (misclickAreas) {
    misclickAreas.forEach((misclickArea) => {
      misclickArea.addEventListener('click', (event) => {
        console.log('hey')
      });
    });
  }
};

export default misclickTracker;
