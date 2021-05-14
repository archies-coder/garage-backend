import * as firebase from 'firebase-admin'
import * as serviceAccount from '../keys/garage-4b71d-firebase-adminsdk-9jh2t-ddd11cfd84.json'

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
}

const firebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert(params),
  storageBucket: 'gs://garage-4b71d.appspot.com/',
})

export default firebaseApp

export const vehicleImageBucket = firebaseApp.storage().bucket()
