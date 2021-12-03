
import {LinkedAccountsModel} from './linkedAccounts.model';

export class UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  connections: [];
  inviteRequests: [];
  company: string;
  industry: string;
  job: string;
  documents: string[];
  linkedAccounts: LinkedAccountsModel;
  profilePicture: string;

  constructor() {
    this.uid = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phoneNumber = '';
    this.company = '';
    this.industry = '';
    this.linkedAccounts = new LinkedAccountsModel();
    this.profilePicture = '';
    this.documents = [];
    this.connections = [];
    this.inviteRequests = [];
  }
}
