export interface ConnectionData {
  id: string;
  connectionNumber: string;
  status: 'Active' | 'Inactive';
  balance: number;
  dataRemainingMB: number;
  dataTotalMB: number;
  startDate: string;
  dueDate: string;
  expiryDate: string;
}
