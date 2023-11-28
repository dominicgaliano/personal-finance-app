import { User } from "firebase/auth";

export type authStoreState = {
    isLoggedIn: boolean;
    user?: User;
    firebaseControlled?: boolean;
};
