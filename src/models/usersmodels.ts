import { RowDataPacket } from "mysql"

export default interface User extends RowDataPacket {
  id?: number;
  username?: string;
  pw?: string;
}