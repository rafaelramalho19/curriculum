import { companies } from './companies';

class CompaniesList extends HTMLElement {
  constructor() {
    super();

    const template = this.getRenderTemplate();

    this.appendChild(template.content.cloneNode(true));
  }

  /**
   * Adds a leading zero when needed
   * @example 1 should be formatted to 01.
   * @example 10 should be formatted to 10.
   * @param {string} date The day or month to add a leading zero if needed
   * @memberof CompaniesList
   */
  getDateWithLeadingZeros(dayOrMonth) {
    return ('0' + dayOrMonth).slice(-2);
  }

  /**
   *
   * @param {Date} date The date to format in a Month/Year format.
   * @returns {string} The formatted date
   */
  formatDateToMonthAndYear(date) {
    const month = date.getMonth() + 1;
    return `${this.getDateWithLeadingZeros(month)}/${date.getFullYear()}`;
  }

  getRenderTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
    <ul class="company__container">
      ${companies
        .map(
          company =>
            `<li class="company" vocab="https://schema.org/" typeof="Corporation">
              <h3>
                <a class="company__name" href="${company.url}" rel="noopener" target="_blank" property="name">
                  ${company.name}
                </a>
              </h3>
              <p class="company__info">
                <span class="company__time">
                <time>${this.formatDateToMonthAndYear(company.startDate)}</time>
                <span class="company__arrow"></span>
                <span class="company__arrow company__arrow--2"></span>
                <time>${company.endDate ? this.formatDateToMonthAndYear(company.endDate) : 'Current day'}</time>
                </span>
              </p>
          </li>`
        )
        .join('')}
    </ul>`;

    return template;
  }
}

window.customElements.define('companies-list', CompaniesList);
