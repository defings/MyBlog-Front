<template>
        <div class="py-5 flex items-center justify-center text-sm text-gray-800 shadow-none" style="background: rgb(255, 255, 255, 0);">
        <!-- Copyright 版权信息 -->
        Copyright © 2024. All rights reserved. Provided by&nbsp; <a class="underline" :href="blogSettingsStore.blogSettings.githubHomepage" target="_blank">{{ blogSettingsStore.blogSettings.author }}</a>
    </div>
</template>
<script setup>
import { useBlogSettingsStore } from '@/stores/blogsettings'
const blogSettingsStore = useBlogSettingsStore();
</script>
<style>
</style>
