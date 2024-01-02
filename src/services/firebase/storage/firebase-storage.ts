import {
  type UploadMetadata,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import {app} from '../config/firebase-config';
import {type StorageService} from '../../../domain/use-cases/storage/storage-service';

export class FirebaseStorageService implements StorageService {
  async uploadFile(
    file: Buffer,
    fileName: string,
    metadata?: UploadMetadata,
  ): Promise<string> {
    const storage = getStorage(app);
    const storageRef = ref(storage, `profileImage/${fileName}`);
    await uploadBytes(storageRef, file, metadata)
      .then(async () => {
        console.log('Upload com sucesso!');
      })
      .catch(e => console.log('ERRO: ', e));
    return await getDownloadURL(storageRef);
  }
}
