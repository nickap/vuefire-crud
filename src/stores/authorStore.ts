import { defineStore } from 'pinia';
import { useCollection } from 'vuefire';
import { authorsRef } from '@/firebase/firebase';
import { computed } from 'vue';
import { useAddDoc, useDeleteDoc, useUpdateDoc } from '@/composables/firestore';
import type { IAuthor } from '@/types';

export const useAuthorStore = defineStore('authors', () => {
  const authors = useCollection<IAuthor>(authorsRef);
  const authorsWithIds = computed(() => {
    return authors.value.map((author) => ({ ...author, id: author.id }));
  });

  const add = (author: object) => {
    useAddDoc(authorsRef, author);
  };

  const del = (id: string) => {
    useDeleteDoc(authorsRef, id);
  };
  const update = (id: string, author: object) => {
    useUpdateDoc(authorsRef, id, author);
  };

  return { authors, authorsWithIds, add, del, update };
});
