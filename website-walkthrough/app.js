document.addEventListener("DOMContentLoaded", () => {
  const steps = [
    { element: "#step1", text: "Welcome to the tour!" },
    { element: "#step2", text: "Here's an important feature." },
    { element: "#step3", text: "Another important feature." },
  ];

  let currentStep = 0;
  const overlay = document.getElementById("tour-overlay");
  const tooltip = document.getElementById("tour-tooltip");

  function showStep(step) {
    const targetElement = document.querySelector(step.element);
    const rect = targetElement.getBoundingClientRect();

    overlay.style.display = "block";
    tooltip.style.display = "block";
    tooltip.innerHTML = `<p>${step.text}</p><button id="next-button">Next</button>`;

    tooltip.style.top = `${rect.top + rect.height}px`;
    tooltip.style.left = `${rect.left}px`;

    document.getElementById("next-button").addEventListener("click", nextStep);
  }

  function nextStep() {
    currentStep++;
    if (currentStep < steps.length) {
      showStep(steps[currentStep]);
    } else {
      endTour();
    }
  }

  function startTour() {
    currentStep = 0;
    showStep(steps[currentStep]);
  }

  function endTour() {
    overlay.style.display = "none";
    tooltip.style.display = "none";
  }

  startTour();
});
