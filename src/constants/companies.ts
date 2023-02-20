export type Company = {
  name: string;
  startDate: Date;
  endDate?: Date;
};

export const currentCompany: Company = {
  name: "OLX",
  startDate: new Date(2022, 3),
};

const companies: Company[] = [
  currentCompany,
  {
    name: "Moxy & Uphold",
    startDate: new Date(2019, 9),
    endDate: new Date(2022, 2),
  },
  {
    name: "Blip",
    startDate: new Date(2018, 0),
    endDate: new Date(2019, 8),
  },
  {
    name: "Pixelmatters",
    startDate: new Date(2016, 11),
    endDate: new Date(2017, 11),
  },
  {
    name: "FYI",
    startDate: new Date(2016, 3),
    endDate: new Date(2016, 10),
  },
];

export { companies };
