import { defineStore } from 'pinia';
import { useCollection } from 'vuefire';
import { booksRef } from '@/firebase/firebase';
import { useAddDoc, useDeleteDoc, useUpdateDoc } from '@/composables/firestore';
import type { IBook } from '@/types';
import { computed } from 'vue';

export const useBookStore = defineStore('books', () => {
  const books = useCollection<IBook>(booksRef);

  const booksWithIDs = computed(() => {
    return books.value.map((book) => ({ ...book, id: book.id }));
  });

  const add = (book: object) => {
    useAddDoc(booksRef, book);
  };

  const del = (id: string) => {
    useDeleteDoc(booksRef, id);
  };
  const update = (id: string, book: object) => {
    useUpdateDoc(booksRef, id, book);
  };

  return { books, booksWithIDs, add, del, update };
});
