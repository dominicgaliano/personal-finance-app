import admin from 'firebase-admin';
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

// TODO: make this an absolute path
// TODO: figure out how to use env variable
import serviceAccount from '../../../key.json';

const initializeFirebase = () => {
	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount)
		});
	}
};

export async function decodeToken(token: string): Promise<DecodedIdToken | null> {
	if (!token) {
		return null;
	}

	try {
		initializeFirebase();

		return await admin.auth().verifyIdToken(token);
	} catch (err) {
		console.error('An error occurred validating token', (err as Error).message);
		return null;
	}
}
