export interface Booking {
  id: string;
  clientId: string;
  providerId: string;
  providerName: string;
  serviceType: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}
