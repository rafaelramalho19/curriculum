const SELECTORS = {
  container: ".location",
  pin: ".location__pin",
  visibleModifier: "location--visible",
};

export const startLocationSection = () => {
  const container = document.querySelector(SELECTORS.container);
  container?.classList.add(SELECTORS.visibleModifier);
};
