import { codeInTheDark } from './interests';
import { showSection } from './section';

const backgroundElement = document.querySelector('.background');

const onSectionIntersected = section => {
  const parent = section.parentNode;

  if (!parent) {
    return console.error('Something went wrong with the section', section);
  }

  const sectionIndex = [...parent.children].indexOf(section);

  backgroundElement.className = `background background--${sectionIndex}`;

  const modifier = section.getAttribute('data-modifier');

  showSection(section);

  switch (modifier) {
    case 'cid':
      codeInTheDark.start();
      break;
  }
};

if ('IntersectionObserver' in window) {
  const intersectionOptions = {
    root: null, // use the viewport
    rootMargin: '0px',
    threshold: 1.0
  };

  const intersectionCallback = entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio >= 1 && entry.target) {
        onSectionIntersected(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(intersectionCallback, intersectionOptions);

  const sections = document.querySelectorAll('.section');
  sections.forEach(section => observer.observe(section));
}
