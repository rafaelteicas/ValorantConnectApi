import {
  doc,
  getDoc,
  getFirestore,
  arrayUnion,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import {type FirestoreServiceUseCase} from '../../../domain/use-cases/database/firestore-service-use-case';
import {app} from '../config/firebaseConfig';

export class FirebaseFirestoreDatabaseService
  implements FirestoreServiceUseCase
{
  async send(data: string, pathId: string): Promise<void> {
    const database = getFirestore(app);
    const conversationRef = doc(database, 'conversation', pathId);
    const docSnap = await getDoc(conversationRef);
    if (!docSnap.data()) {
      await setDoc(conversationRef, {
        data,
      });
    }
    await updateDoc(conversationRef, {
      data: arrayUnion({data, timestamp: new Date()}),
    });
  }

  async read(pathId: string): Promise<any> {
    const database = getFirestore(app);
    const dataRef = doc(database, 'conversation', pathId);
    const docSnap = await getDoc(dataRef);
    return docSnap.data();
  }
}
