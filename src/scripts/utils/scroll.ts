export const allowScrolling = () => {
  document.body.classList.remove("stop-scrolling");
};

export const disableScrolling = () => {
  document.body.classList.add("stop-scrolling");
};

export const toggleScrolling = () => {
  document.body.classList.toggle("stop-scrolling");
};
