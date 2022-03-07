export default interface CreateGameDTO {
  secure_id: string;
  type: string;
  description: string;
  range: number;
  price: number;
  max_number: number;
  color: string;
}
