export default interface Address {
  id: string;
  user_id: string;
  country: string;
  state?: string;
  city: string;
  phone: string;
  postal_code?: string;
  address: string;
  created_at?: string;
  updated_at?: string;
}
