<template>
    <!-- 博主信息 -->
    <div
        class="w-full py-5 px-2 shadow-lg mb-7 shadow-cyan-400/30 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
        style="background-color: rgb(255, 255, 255, 0.5); backdrop-filter: blur(10px);"
        >
        <div class="flex flex-col items-center">
            <!-- 博主头像 -->
            <img class=" mb-4 w-24 h-24 rounded-full shadow" :src="blogSettingsStore.blogSettings.avatar"
                alt="Bonnie image" />
            <!-- 博主昵称 -->
            <h5 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">{{ blogSettingsStore.blogSettings.author
                }}</h5>
            <!-- 介绍语 -->
            <span class=" mb-4 text-sm text-gray-500 dark:text-gray-400">{{ blogSettingsStore.blogSettings.introduction
                }}</span>
        </div>
        <!-- 文章数量、分类数量、标签数量、总访问量 -->
        <!-- flex 布局，justify-center 水平居中，gap-5 设置 flex 内子元素的间距 -->
        <div class="flex justify-center gap-5 mb-2">
            <!-- flex 布局，items-center 垂直居中，flex-col 设置子元素上下排列，hover: 用于设置鼠标移动到上面的样式，字体颜色、scale-110 放大效果，cursor-pointer 指定鼠标移动到上面为小手指样式 -->
            <div  @click="router.push('/archive/list')" class="flex items-center flex-col gap-1 hover:text-pink-600 hover:scale-110 cursor-pointer">
                <!-- 字体大小为 text-lg , font-bold 字体加粗 -->
                <CountTo :value="statisticsInfo.articleTotalCount" customClass="text-lg font-bold"></CountTo>
                <!-- 字体大小为 text-sm -->
                <div class="text-sm">文章</div>
            </div>
            <div @click="router.push('/category/list')" class="flex items-center flex-col gap-1 hover:text-pink-600 hover:scale-110 cursor-pointer">
                <CountTo :value="statisticsInfo.categoryTotalCount" customClass="text-lg font-bold"></CountTo>
                <div class="text-sm">分类</div>
            </div>
            <div @click="router.push('/tag/list')" class="flex items-center flex-col gap-1 hover:text-pink-600 hover:scale-110 cursor-pointer">
                <CountTo :value="statisticsInfo.tagTotalCount" customClass="text-lg font-bold"></CountTo>
                <div class="text-sm">标签</div>
            </div>
            <div class="flex items-center flex-col gap-1 hover:text-pink-600 hover:scale-110 cursor-pointer">
                <CountTo :value="statisticsInfo.pvTotalCount" customClass="text-lg font-bold"></CountTo>
                <div class="text-sm">总访问量</div>
            </div>
        </div>
        <!-- 第三方平台主页跳转（如 GitHub 等） -->
        <div class="flex justify-center mt-5 gap-2">
            <!-- GitHub -->
            <svg v-if="blogSettingsStore.blogSettings.githubHomepage"
                @click="copyText(blogSettingsStore.blogSettings.githubHomepage, '链接已复制，快打开浏览器访问吧')" t="1698029949662"
                class="icon w-7 h-7" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="1447" width="200" height="200">
                <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#4186F5" p-id="1448"></path>
                <path
                    d="M611.944 302.056c0-15.701 2.75-30.802 7.816-44.917a384.238 384.238 0 0 0-186.11 2.956c-74.501-50.063-93.407-71.902-107.975-39.618a136.243 136.243 0 0 0-3.961 102.287 149.515 149.515 0 0 0-39.949 104.806c0 148.743 92.139 181.875 179.961 191.61a83.898 83.898 0 0 0-25.192 51.863c-40.708 22.518-91.94 8.261-115.181-32.058a83.117 83.117 0 0 0-60.466-39.98s-38.871-0.361-2.879 23.408a102.97 102.97 0 0 1 43.912 56.906s23.398 75.279 133.531 51.863v65.913c0 10.443 13.548 42.63 102.328 42.63 71.275 0 94.913-30.385 94.913-42.987V690.485a90.052 90.052 0 0 0-26.996-72.03c83.996-9.381 173.328-40.204 179.6-176.098a164.706 164.706 0 0 1-21.129 1.365c-84.07 0-152.223-63.426-152.223-141.666z"
                    fill="#FFFFFF" p-id="1449"></path>
                <path
                    d="M743.554 322.765a136.267 136.267 0 0 0-3.961-102.289s-32.396-10.445-107.979 39.618a385.536 385.536 0 0 0-11.853-2.956 132.623 132.623 0 0 0-7.816 44.917c0 78.24 68.152 141.667 152.222 141.667 7.171 0 14.222-0.472 21.129-1.365 0.231-5.03 0.363-10.187 0.363-15.509a149.534 149.534 0 0 0-42.105-104.083z"
                    fill="#FFFFFF" opacity=".4" p-id="1450"></path>
            </svg>
            <svg v-if="blogSettingsStore.blogSettings.qq"
                @click="copyText(blogSettingsStore.blogSettings.qq, '已复制QQ号，快来加我好友吧！')" t="1712995109757"
                class="icon w-7 h-7 ml-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="2614" width="200" height="200">
                <path
                    d="M116.435 593.714c-33.54 78.964-38.985 154.297-12.059 168.37 18.572 9.696 47.686-12.382 74.936-52.909 10.791 44.157 37.493 84.137 75.633 116.21-40.004 14.768-66.135 38.886-66.135 66.232 0 44.954 70.709 81.302 157.978 81.302 78.716 0 143.907-29.538 155.94-68.371 3.232-0.049 15.663-0.049 18.796 0 12.083 38.784 77.324 68.371 155.989 68.371 87.267 0 157.978-36.398 157.978-81.302 0-27.297-26.105-51.464-66.135-66.232 38.089-32.123 64.889-72.053 75.631-116.21 27.251 40.527 56.29 62.605 74.887 52.909 26.95-14.073 21.631-89.456-12.032-168.37-26.355-62.058-62.11-107.754-89.457-117.848 0.398-3.929 0.596-7.958 0.596-11.935 0-23.968-6.661-46.146-18.049-64.196 0.199-1.393 0.199-2.834 0.199-4.227 0-11.038-2.636-21.381-7.114-30.332-6.909-161.309-111.93-289.402-281.866-289.402-170.036 0-275.106 128.093-281.943 289.402-4.525 9.001-7.135 19.343-7.135 30.332 0 1.393 0.099 2.835 0.15 4.227-11.288 18.05-17.951 40.178-17.951 64.196 0 3.978 0.15 7.955 0.498 11.935-27.151 10.094-63.028 55.841-89.333 117.848z"
                    fill="#272636" p-id="2615"></path>
            </svg>
            <svg v-if="blogSettingsStore.blogSettings.weixing"
                @click="copyText(blogSettingsStore.blogSettings.weixing, '你已经复制微信号，虽然但是我不想你加微信')" t="1712995581653"
                class="icon w-7 h-7 ml-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="3803" width="200" height="200">
                <path
                    d="M693.12 347.264c11.776 0 23.36 0.896 35.008 2.176-31.36-146.048-187.456-254.528-365.696-254.528C163.2 94.912 0 230.656 0 403.136c0 99.52 54.272 181.248 145.024 244.736L108.8 756.864l126.72-63.488c45.312 8.896 81.664 18.112 126.912 18.112 11.392 0 22.656-0.512 33.792-1.344-7.04-24.256-11.2-49.6-11.2-76.032C385.088 475.776 521.024 347.264 693.12 347.264zM498.304 249.024c27.392 0 45.376 17.984 45.376 45.248 0 27.136-17.984 45.312-45.376 45.312-27.072 0-54.336-18.176-54.336-45.312C443.968 266.944 471.168 249.024 498.304 249.024zM244.672 339.584c-27.2 0-54.592-18.176-54.592-45.312 0-27.264 27.392-45.248 54.592-45.248S289.92 266.944 289.92 294.272C289.92 321.408 271.872 339.584 244.672 339.584zM1024 629.76c0-144.896-145.024-262.976-307.904-262.976-172.48 0-308.224 118.144-308.224 262.976 0 145.28 135.808 262.976 308.224 262.976 36.096 0 72.512-9.024 108.736-18.112l99.392 54.528-27.264-90.624C969.728 783.872 1024 711.488 1024 629.76zM616.128 584.384c-17.984 0-36.224-17.92-36.224-36.224 0-18.048 18.24-36.224 36.224-36.224 27.52 0 45.376 18.176 45.376 36.224C661.504 566.464 643.648 584.384 616.128 584.384zM815.488 584.384c-17.856 0-36.032-17.92-36.032-36.224 0-18.048 18.112-36.224 36.032-36.224 27.264 0 45.376 18.176 45.376 36.224C860.864 566.464 842.752 584.384 815.488 584.384z"
                    fill="#2c2c2c" p-id="3804"></path>
            </svg>
            <svg v-if="blogSettingsStore.blogSettings.email"
                @click="copyText(blogSettingsStore.blogSettings.email, '你已经复制邮箱，快来联系我吧')" t="1712995780510"
                class="icon w-7 h-7 ml-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="7452" width="200" height="200">
                <path
                    d="M873.472 0H150.528C67.584 0 0 67.584 0 150.528v722.944C0 956.416 67.584 1024 150.528 1024h722.944c82.944 0 150.528-67.584 150.528-150.528V150.528C1024 67.584 956.416 0 873.472 0z m-61.952 656.896c0 41.472-33.792 74.752-74.752 74.752H287.232c-41.472 0-74.752-33.28-74.752-74.752V367.104c0-41.472 33.28-74.752 74.752-74.752h449.024c41.472 0 74.752 33.28 74.752 74.752v289.792z"
                    fill="#4873ED" p-id="7453"></path>
                <path
                    d="M712.192 427.008L512 556.032 311.808 427.008c-9.216-6.144-21.504-3.072-27.648 6.144-6.144 9.216-3.072 21.504 6.144 27.648l210.944 135.68c3.072 2.048 7.168 3.072 10.752 3.072 3.584 0 7.68-1.024 10.752-3.072L733.696 460.8a20.48 20.48 0 0 0 6.144-27.648 20.48 20.48 0 0 0-27.648-6.144z"
                    fill="#4873ED" p-id="7454"></path>
            </svg>
        </div>
    </div>

</template>

<script setup>
import { useBlogSettingsStore } from '@/stores/blogsettings'
import { initTooltips } from 'flowbite'
import { showMessage } from '@/composables/util';
import { onMounted, ref } from 'vue'
import { getStatisticsInfo } from '@/api/front/statistics'
import { useRouter } from 'vue-router'
// 引入路由
const router = useRouter()
// 初始化 Flowbit 组件
onMounted(() => {
    initTooltips();
})

// 引入博客设置信息 store
const blogSettingsStore = useBlogSettingsStore()

const copyText = (text, d) => {
    if (navigator.clipboard) {
        // clipboard api 复制
        navigator.clipboard.writeText(text);
    } else {
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        // 隐藏此输入框
        textarea.style.position = 'fixed';
        textarea.style.clip = 'rect(0 0 0 0)';
        textarea.style.top = '10px';
        // 赋值
        textarea.value = text;
        // 选中
        textarea.select();
        // 复制
        document.execCommand('copy', true);
        // 移除输入框
        document.body.removeChild(textarea);
    }
    showMessage(d, 'success');
}
// 统计信息(文章、分类、标签数量、总访问量)
const statisticsInfo = ref({})
getStatisticsInfo().then(res => {
    if (res.success) {
        statisticsInfo.value = res.data
    }
})
</script>

<style></style>