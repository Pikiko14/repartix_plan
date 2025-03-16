export class PlanEntity {
  _id?: string;
  name: string;
  price: number;
  price_year: number;
  description: string;
  usabilities: UsabilitiesEntity[];
}


export class UsabilitiesEntity {
  name: string;
  count: number;
  model: Models;
  status: boolean
}

export enum Models {
  users = 'USERS',
  orders = 'ORDERS',
  whatsapp = 'whatsaap',
}
