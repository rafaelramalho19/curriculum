const allSections = document.querySelectorAll('.scroll-section__stop');

const showSection = section => {
  allSections.forEach(otherSection => otherSection.classList.remove('section--active'));
  section.classList.add('section--active');
};

export { showSection };
