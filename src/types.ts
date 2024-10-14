export type RechargeType = 'direct' | 'exchange' | 'prepaid' | 'credit';

export interface Player {
  id: string;
  name: string;
  contact: string;
  discount: number;
}

export interface RechargeRecord {
  id: string;
  playerId: string;
  amount: number;
  type: RechargeType;
  date: string;
}

export interface CoinTransaction {
  id: string;
  playerId: string;
  amount: number;
  balance: number;
  type: 'exchange' | 'consume';
  date: string;
}