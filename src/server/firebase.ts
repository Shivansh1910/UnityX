import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { child, get, getDatabase, push, ref, set } from "firebase/database";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

type TAction = "child" | "push";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY ?? "", // Add API Key
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_REALTIME_DB ?? "", // Add databaseURL
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "", // Add authDomain
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "", // Add projectId
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "", // Add storageBucket
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "", // Add messagingSenderId
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "", // Add appId
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "", // Add measurementId
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export let dbRef = ref(db);

export const checkRoomId = async (roomId: string) => {
  const roomRef = ref(db);
  const r = await get(roomRef);
  const temp = r.toJSON();
  if (temp) {
    return Object.values(temp).includes(roomId);
  }
};

export const addRoom = async (roomId: string, email: string | null, name: string | null) => {
  const roomRef = ref(db, "rooms/" + roomId);
  if (email && name) {
    const p = await set(roomRef, {
      createdOn: Date.now(),
      partipants: {
        [btoa(email)]: {
          name,
          email,
        }
      },
    });
  }
  return roomRef;
};

export const firebaseRef = (roomId: string, action: TAction) => {
  if (roomId) {
    return child(dbRef, roomId);
  } else {
    return push(dbRef, roomId);
  }
};

export default db;

const provider = new GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
provider.addScope("https://www.googleapis.com/auth/userinfo.email");

const auth = getAuth();

export const signin = async () => {
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;
  const user = result.user;
  return user;
};

export const logOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
