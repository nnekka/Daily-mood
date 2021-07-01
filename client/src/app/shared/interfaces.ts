export interface User {
  _id?: string;
  name?: string;
  email: string;
  avatar?: string;
  password?: string;
  token?: string;
}

export interface Calendar {
  id?: string;
  days?: Day[];
  year: number;
  title: string;
  description?: string;
  legendType: LegendType;
  user?: string;
  legends?: Legend[];
  createdAt?: Date;
}

export enum LegendType {
  image = 'image',
  color = 'color',
}

export interface Day {
  day: number;
  month: number;
  calendar: string;
  legend: Legend;
}

export interface Legend {
  _id?: string;
  src: string;
  text: string;
}
