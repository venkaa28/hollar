
import {LinkedAccountsModel} from './linkedAccounts.model';

export class UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  connections: [];
  inviteRequests: [];
  company = '';
  industry = '';
  job = '';
  documents: [];
  linkedAccounts: LinkedAccountsModel;
}
