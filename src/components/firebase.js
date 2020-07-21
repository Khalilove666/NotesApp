import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAwEV4CqB4VgcbMiiK3qTBAT5PcokYOU8U",
  	authDomain: "notesapp-f14c0.firebaseapp.com",
  	databaseURL: "https://notesapp-f14c0.firebaseio.com",
  	projectId: "notesapp-f14c0",
  	storageBucket: "notesapp-f14c0.appspot.com",
  	messagingSenderId: "445573759972",
  	appId: "1:445573759972:web:637db9b67ab3daf3497df1",
  	measurementId: "G-K5RLE3YQ1M"

  };

  // Initialize Firebase
  //   firebase.analytics();
  
  class Firebase {
      constructor() {
        app.initializeApp(firebaseConfig);
		this.auth = app.auth()
		this.db = app.firestore()
		this.myDB = firebase.database();
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addPost(post) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.myDB.ref(`user_data/${this.auth.currentUser.uid}/notes`).push(post)
	}
	getAllNotes () {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}
		return this.myDB.ref(`user_data/${this.auth.currentUser.uid}/notes/`).once('value');
	}
	deleteNote (removableId) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}
		return this.myDB.ref(`user_data/${this.auth.currentUser.uid}/notes/${removableId}`).remove();
	}

	updatePost(data, updateId, row) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.myDB.ref(`user_data/${this.auth.currentUser.uid}/notes/${updateId}`).update({
			[row]: data
		});
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}
}

export default new Firebase()