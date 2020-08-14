import { Profile } from './profile';

export class User {
  id?: string;
  username: string;
  password?: string;
  token?: string;
  profile?: Profile;
}
