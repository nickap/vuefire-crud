<template>
  <div class="min-h-screen">
    <main class="max-w-5xl px-5 mx-auto pt-7 lg:px-0">
      <!-- Page title -->
      <h1 class="text-2xl font-medium">Authors</h1>
      <p class="mt-2 text-sm text-gray-500">Manage your authors here</p>

      <div
        class="flex flex-col items-center justify-between mt-5 space-y-3 md:space-y-0 md:flex-row"
      >
        <div class="relative w-full md:mr-10 grow">
          <span class="absolute -translate-y-1/2 top-1/2 left-3 z-10">
            <MagnifyingGlassIcon class="h-5 w-5" />
          </span>
          <input
            id="search"
            v-model="search"
            placeholder="Search author..."
            type="search"
            name="search"
            class="pl-11 input"
          />
        </div>
        <button
          class="w-full py-3.5 md:py-2.5 md:w-auto btn shrink-0"
          @click="authorModal.openModal()"
        >
          Add Author
        </button>
      </div>
      <div class="relative mt-5 border border-gray-100 rounded-lg">
        <EasyDataTable
          empty-message="No Author Found"
          :search-value="search"
          theme-color="#f97316"
          table-class-name="eztble"
          :headers="headers"
          :items="authorStore.authorsWithIds"
        >
          <!-- Show authors  -->
          <template #item-name="{ name }">
            <span class="font-semibold">{{ name }}</span>
          </template>
          <template #item-id="{ id }">
            <span class="font-semibold">{{ id }}</span>
          </template>
          <!-- Action items for table -->
          <template #item-actions="author">
            <div class="flex space-x-4 text-gray-500">
              <button @click="authorModal.openModal(author)">
                <PencilIcon class="h-5 w-5" />
              </button>
              <button @click="removeAuthor(author)">
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
          </template>
        </EasyDataTable>
      </div>
    </main>
    <!-- Author modal comp -->
    <AuthorModal ref="authorModal" />
  </div>
</template>

<script setup lang="ts">
import type { Header } from 'vue3-easy-data-table';
import { ref } from 'vue';

import { PencilIcon } from '@heroicons/vue/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { useAuthorStore } from '@/stores/authorStore';
import AuthorModal from '@/components/AuthorModal.vue';
const authorStore = useAuthorStore();

const authorModal = ref();
const search = ref('');
const removeAuthor = async (author) => {
  await authorStore.del(author.id);
};
const headers: Header[] = [
  { text: 'Author Name', value: 'name', sortable: true },
  { text: 'Author id', value: 'id', sortable: true },
  { text: 'Actions', value: 'actions', width: 100 },
];
</script>
