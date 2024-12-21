export interface Dorm {
    id: string;
    name: string;
    totalCapacity: number;
    numberRegistered: number;
    roomCapacity: number;
    communication: {
      city: string;
      email: string;
      phone: string;
    };
  }
  