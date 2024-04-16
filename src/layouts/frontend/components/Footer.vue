<template>
    <footer class="bg-white mt-5 dark:bg-gray-800">
        <div class="w-full mx-auto max-w-screen-xl py-6 md:flex md:items-center md:justify-between px-4">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2024 <a :href="blogSettingsStore.blogSettings.githubHomepage" class="hover:underline">{{ blogSettingsStore.blogSettings.author }}</a>. All Rights Reserved.
            </span>
            <div class="timer-container">
                <div id="timer" class="text-sm">已运行：{{ timer }}</div>
            </div>
            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    备案号：<a href="#" class="mr-4 hover:underline md:mr-6 ">{{ blogSettingsStore.blogSettings.caseNumber }}</a>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';
import { useBlogSettingsStore } from '@/stores/blogsettings'
const blogSettingsStore = useBlogSettingsStore();
const timer = ref("")
function updateTimer() {
  const now = new Date();
  const targetDate = new Date("2024-04-16");

  const diff = now - targetDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timer.value = `${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`;
}

// Update timer every second
setInterval(updateTimer, 1000);

// Initial call to update timer immediately
updateTimer();


</script>
