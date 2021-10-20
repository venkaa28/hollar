
import {LinkedAccountsModel} from './linkedAccounts.model';

export class UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  connections: [];
  inviteRequests: [];
  company?: string;
  industry?: string;
  job?: string;
  documents?: [];
  linkedAccounts?: LinkedAccountsModel;
}
