import { type UploadMetadata, getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from './config/firebaseConfig'
import { type Storage } from '../../domain/storage'

export class FirebaseStorageService implements Storage {
  async uploadFile (
    file: Buffer,
    fileName: string,
    metadata?: UploadMetadata
  ): Promise<string | Error> {
    const storage = getStorage(app)
    const storageRef = ref(storage, `profileImage/${fileName}`)
    const url = await uploadBytes(storageRef, file, metadata).then(async () => {
      console.log('Upload com sucesso!')
      return await getDownloadURL(storageRef)
    }).catch((e) => console.log('ERRO: ', e))
    if (typeof url === 'string') return url
    throw new Error('Nao foi possivel fazer o upload')
  }
}
