

export class LinkedAccountsModel {
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
    personalWebsite: string;
    additionalURLs: [];

    constructor() {
      this.twitter = '';
      this.linkedin = '';
      this.github = '';
      this.instagram = '';
      this.personalWebsite = '';
      this.additionalURLs = [];
    }
}
