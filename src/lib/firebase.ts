/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Simulated Firebase/Google Auth and Firestore Module
// This handles the user declining Firebase setup by running fully client-side and locally.

interface MockUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

type AuthCallback = (user: MockUser | null) => void;

class MockAuth {
  private listeners: Set<AuthCallback> = new Set();
  private currentUserObj: MockUser | null = null;

  constructor() {
    // Attempt to recover user session from LocalStorage
    try {
      const persistedUser = localStorage.getItem('suggesta_user');
      if (persistedUser) {
        this.currentUserObj = JSON.parse(persistedUser);
      }
    } catch (e) {
      console.warn("Could not load persisted user", e);
    }
  }

  get currentUser(): MockUser | null {
    return this.currentUserObj;
  }

  onAuthStateChanged(callback: AuthCallback): () => void {
    this.listeners.add(callback);
    // Fire immediately with current state
    callback(this.currentUser);

    return () => {
      this.listeners.delete(callback);
    };
  }

  setCurrentUser(user: MockUser | null) {
    this.currentUserObj = user;
    if (user) {
      localStorage.setItem('suggesta_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('suggesta_user');
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.currentUser);
      } catch (err) {
        console.error("Error in onAuthStateChanged listener:", err);
      }
    });
  }
}

export const auth = new MockAuth();

// Simulated Firestore DB interface - we mock this so typescript compiles but the storage goes to local storage
export const db = {
  simulated: true
};

export const onAuthStateChanged = (
  authInstance: MockAuth,
  callback: AuthCallback
) => {
  return authInstance.onAuthStateChanged(callback);
};

export const loginWithGoogle = async (): Promise<MockUser> => {
  const dummyUser: MockUser = {
    uid: 'curator_user_id_77',
    displayName: 'Culture Curator',
    email: 'curator@suggesta.app',
    photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
  };
  auth.setCurrentUser(dummyUser);
  return dummyUser;
};

export const logout = async (): Promise<void> => {
  auth.setCurrentUser(null);
};
