import { addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useToast } from 'vue-toastification';

export async function useAddDoc(colRef, document: object) {
  try {
    await addDoc(colRef, document);
    useToast().success('Added');
  } catch (error) {
    useToast().error(error.message);
  }
}

export async function useDeleteDoc(colRef, id: string) {
  try {
    await deleteDoc(doc(colRef, id));
    useToast().success('Deleted');
  } catch (error) {
    useToast().error(error.message);
  }
}
export async function useUpdateDoc(colRef, id: string, document: object) {
  try {
    await updateDoc(doc(colRef, id), document);
    useToast().success('Updated');
  } catch (error) {
    useToast().error(error.message);
  }
}
