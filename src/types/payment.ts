export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  status: "pending" | "success" | "failed";
  method: string;
  timestamp: string;
}
