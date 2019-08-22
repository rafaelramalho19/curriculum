import { technologies } from './technologies';

class TechnologiesList extends HTMLElement {
  constructor() {
    super();

    const template = this.getRenderTemplate();

    this.appendChild(template.content.cloneNode(true));
  }

  getRenderTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
    <ul class="technology__container">
      ${technologies
        .map(
          technology => `
            <li class="technology technology--${technology.type.toLowerCase()}">
              <h3>${technology.name}</h3>
            </li>`
        )
        .join('')}
    </ul>`;

    return template;
  }
}

window.customElements.define('technologies-list', TechnologiesList);
