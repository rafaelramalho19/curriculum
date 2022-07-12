const e=[{name:"OLX",url:"https://olx.pt/",startDate:new Date(2022,3),endDate:null},{name:"Moxy & Uphold",url:"https://moxy.studio/",startDate:new Date(2019,9),endDate:new Date(2022,2)},{name:"Blip",url:"https://blip.pt/",startDate:new Date(2018,0),endDate:new Date(2019,8)},{name:"Pixelmatters",url:"https://www.pixelmatters.com/",startDate:new Date(2016,11),endDate:new Date(2017,11)},{name:"FYI",url:"https://www.fyi.pt",startDate:new Date(2016,3),endDate:new Date(2016,10)}];class t extends HTMLElement{constructor(){super();const e=this.getRenderTemplate();this.appendChild(e.content.cloneNode(!0))}getDateWithLeadingZeros(e){return("0"+e).slice(-2)}formatDateToMonthAndYear(e){const t=e.getMonth()+1;return`${this.getDateWithLeadingZeros(t)}/${e.getFullYear()}`}getRenderTemplate(){const t=document.createElement("template");return t.innerHTML=`\n    <ul class="company__container">\n      ${e.map((e=>`<li class="company" vocab="https://schema.org/" typeof="Corporation">\n              <h3>\n                <a class="company__name" href="${e.url}" rel="noopener" target="_blank" property="name">\n                  ${e.name}\n                </a>\n              </h3>\n              <p class="company__info">\n                <span class="company__time">\n                <time>${this.formatDateToMonthAndYear(e.startDate)}</time>\n                <span class="company__arrow"></span>\n                <span class="company__arrow company__arrow--2"></span>\n                <time>${e.endDate?this.formatDateToMonthAndYear(e.endDate):"Current day"}</time>\n                </span>\n              </p>\n          </li>`)).join("")}\n    </ul>`,t}}window.customElements.define("companies-list",t);
//# sourceMappingURL=index.c9c50b35.js.map
