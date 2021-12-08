# Hollar

## What are we?

Hollar is an all-in-one social media and networking application available on both iOS and Android. We allow our users to create a condensed personal profile that combines both social (i.e. Instagram, Twitter, etc.) and professional (i.e. LinkedIn, GitHub, etc.) profiles. These profiles can be written to NFC (Near-Field Communication) tags, allowing users to seamlessely connect with each other with a tap of their phone to one of these tags. Users' connections will appear in their searchable "Rolodex". 

## Tech Stack
  
The tools used for the development of Hollar included the <strong>Ionic</strong> framework along with <strong>Angular.js</strong> for building out our front-end UI. <strong>Firebase</strong> was used to store all of our user data, and the AngularFire package to communicate between front-end and database for authentication and fetching data from the database.

## Running our Code 
### <i>Note: We do not provide the Firebase config files. Therefore all code will fail when trying to interact with backend.</i>
  
Once the code has been cloned into your local machine use: <br/><br/>
  ``` npm ci ``` 
<br/><br/>to install all required package dependencies. After successfully installing package dependencies you can serve our app to a browser using the command:<br/><br/>
  ``` ionic serve ```
<br/><br/>
  
## Additional Plug-ins

We utilized a few different plug-ins for various functionality within our app. We used the phone-gap-nfc plug-in to integrate NFC functionality including reading and writing to an NFC tag using a devices built-in NFC capabilities. The Cordova Camera plugin plug-in allowed accessing the devices photos to select a profile picture as well as the device's camera for real-time picture taking and uploading to a user's profile. Lastly, we utilized PhoneGap's iOS File Picker to upload documents from the device's storage to a user profile (stored on Firebase backend). 
