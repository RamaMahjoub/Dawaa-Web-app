export interface InvoiceSchema {
    id: string;
    from: string;
    bills: Array<Bill>;
  }
  
  export interface Bill {
    payDate: Date;
    payment: number;
  }
  export const InvoicesData: Array<InvoiceSchema> = [
    {
      id: "ID123120",
      from: "صيدلية القاسم",
      bills: [
        { payDate: new Date(2021, 1, 12), payment: 50000 },
        { payDate: new Date(2021, 2, 12), payment: 225000 },
      ],
    },
    {
      id: "ID123120",
      from: "صيدلية المنصور",
      bills: [
        { payDate: new Date(2021, 1, 12), payment: 50000 },
        { payDate: new Date(2021, 2, 12), payment: 225000 },
        { payDate: new Date(2021, 8, 4), payment: 925000 },
        { payDate: new Date(2021, 11, 9), payment: 205000 },
      ],
    },
  ];
  
  export const data = Array.from({ length: 5 }, (_, index) => {
    const randomSelection = InvoicesData[Math.floor(Math.random() * 2)];
    return randomSelection;
  });