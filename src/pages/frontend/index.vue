<template>
    <div
        :style="{ 'background-image': `url(${blogSettingsStore.blogSettings.backgroundImage})`, 'height': '100vh', 'background-size': 'cover' }">
        <Header></Header>
        <!-- 主内容区域 -->
        <main class="container max-w-screen-xl mx-auto p-4 relative z-10">
            <!-- grid 表格布局，分为 4 列，元素间隔为 gap-4  -->
            <div class="grid grid-cols-1" style="height: 100vh;text-align: center;">
                <span class=" cursor-pointer" style="margin-top: 30%; font-size: 70px; color: whitesmoke; font-family: 'beiming';"
                    @click="getVerse">
                    {{ verseObj.content }} <br> <span style="font-size: 35px;"> ———— {{ verseObj.author }}</span>
                </span>
            </div>
            <div class="grid grid-cols-4 gap-7">
                <!-- 左侧边侧边栏，占用一列 -->
                <aside class=" col-span-4 md:col-span-1">
                    <UserInfoCard></UserInfoCard>
                    <!-- 分类 -->
                    <CategoryListCard></CategoryListCard>
                    <!-- 标签 -->
                    <TagListCard></TagListCard>
                    <!-- <CalendarCard></CalendarCard> -->
                </aside>
                <!-- 右边栏，占用 3 列 -->
                <div class="col-span-4 md:col-span-3">
                    <!-- 文章列表，grid 表格布局，分为 2 列 -->
                    <div class="grid grid-cols-3 gap-4">
                        <span class=" col-span-3 text-[20px] text-[#1D1D1D] dark:text-white px-1" style="font-family: 'hanyixiangsuruqin';">全部文章</span>
                        <div v-for="(article, index) in articles" :key="index" class="col-span-3 md:col-span-1">
                            <div
                                class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 h-full shadow-md">
                                <!-- 文章封面 -->
                                <a @click="goArticleDetailPage(article.id)" class=" cursor-pointer">
                                    <img class="rounded-t-lg h-48 w-full" :src="article.cover" />
                                </a>
                                <div class="pt-1 pl-3">
                                    <!-- 标签 -->
                                    <div class="mb-1">
                                        <span v-for="(tag, tagIndex) in article.tags" :key="tagIndex"
                                            class="cursor-pointer bg-pink-100 text-pink-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-pink-200 hover:text-pink-800 dark:bg-green-900 dark:text-green-300">
                                            # {{ tag.name }}
                                        </span>
                                    </div>
                                    <!-- 文章标题 -->
                                    <a @click="goArticleDetailPage(article.id)" class=" cursor-pointer">
                                        <span class="mb-2 mr-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:border-gray-600 hover:border-b-2" style="font-family: 'aameiguizhuangyuanti';">
                                            {{ article.title }}</span>
                                    </a>
                                    <!-- 文章摘要 -->
                                    <p v-if="article.summary"
                                        class="dark:text-[#D8D8D8] text-[#7E7E7E] text-[15px] leading-6 ellipsis line-clamp-2 mr-3">
                                        {{ article.summary }}</p>
                                    <!-- 文章发布时间、所属分类 -->
                                    <p class="flex items-center font-normal text-gray-400 text-sm dark:text-gray-400 pb-3">
                                        <!-- 发布时间 -->
                                        <svg class="inline w-3 h-3 mr-2 text-gray-400 dark:text-white"
                                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                                        </svg>
                                        {{ article.createTime }}

                                        <!-- 所属分类 -->
                                        <svg class="inline w-3 h-3 ml-5 mr-2 text-gray-400 dark:text-white"
                                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 18 18">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M1 5v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H1Zm0 0V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H1Z" />
                                        </svg>
                                        <a @click="goCategoryArticleListPage(article.category.id, article.category.name)"
                                            class="text-gray-400 hover:underline cursor-pointer">{{ article.category.name }}</a>
                                        <svg t="1713075472847"
                                            class="inline w-5 h-5 ml-5 mr-2 text-gray-400 dark:text-white"
                                            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                            p-id="4301" width="200" height="200">
                                            <path
                                                d="M957.971679 501.685074c-6.928806-9.940396-172.653245-243.818051-441.060321-243.818051-268.409123 0-434.131515 233.877655-441.061344 243.818051-10.730389 15.408945-10.730389 35.877115 0 51.284013 6.928806 9.94142 172.652222 243.819075 441.061344 243.819075 268.407076 0 434.130492-233.877655 441.060321-243.819075C968.701045 537.561166 968.701045 517.092995 957.971679 501.685074zM516.911358 751.877299c-248.028956 0-404.191622-224.550219-404.191622-224.550219s156.161642-224.551242 404.191622-224.551242c248.028956 0 404.190599 224.551242 404.190599 224.551242S764.940314 751.877299 516.911358 751.877299z"
                                                fill="#AAAAAA" p-id="4302"></path>
                                            <path
                                                d="M516.911358 347.687724c-99.206466 0-179.641403 80.434937-179.641403 179.64038s80.434937 179.64038 179.641403 179.64038c99.205443 0 179.639357-80.434937 179.639357-179.64038S616.116801 347.687724 516.911358 347.687724zM516.911358 662.057621c-74.2951 0-134.730541-60.435441-134.730541-134.729517s60.435441-134.730541 134.730541-134.730541c74.294077 0 134.728494 60.435441 134.728494 134.730541S591.205435 662.057621 516.911358 662.057621z"
                                                fill="#AAAAAA" p-id="4303"></path>
                                        </svg>
                                        {{ article.readNum }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 分页 -->
                    <nav aria-label="Page navigation example" class="mt-10 flex justify-center">
                        <ul class="flex items-center -space-x-px h-10 text-base">
                            <!-- 上一页 -->
                            <li>
                                <a @click="getArticles(current - 1)"
                                    class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    :class="[current > 1 ? '' : 'cursor-not-allowed']">

                                    <span class="sr-only">上一页</span>
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M5 1 1 5l4 4" />
                                    </svg>
                                </a>
                            </li>
                            <!-- 页码 -->
                            <li v-for="(pageNo, index) in pages" :key="index">
                                <a @click="getArticles(pageNo)"
                                    class="flex items-center justify-center px-4 h-10 leading-tight bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    :class="[pageNo == current ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500  hover:bg-gray-100 hover:text-gray-700']">
                                    {{ index + 1 }}
                                </a>
                            </li>
                            <!-- 下一页 -->
                            <li>
                                <a @click="getArticles(current + 1)"
                                    class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    :class="[current < pages ? '' : 'cursor-not-allowed']">
                                    <span class="sr-only">下一页</span>
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </main>

        <Footer></Footer>
    </div>

</template>

<script setup>
import { getIndexVerse } from '@/api/front/blogsettings'
import Header from '@/layouts/frontend/components/Header.vue'
import Footer from '@/layouts/frontend/components/Footer.vue'
import UserInfoCard from '@/layouts/frontend/components/UserInfoCard.vue'
import CategoryListCard from '@/layouts/frontend/components/CategoryListCard.vue'
import TagListCard from '@/layouts/frontend/components/TagListCard.vue'
// import  CalendarCard  from '@/layouts/frontend/components/CalendarCard.vue'
import { initTooltips } from 'flowbite'
import { onMounted, ref, reactive } from 'vue'
import { getArticlePageList } from '@/api/front/article'
import { useBlogSettingsStore } from '@/stores/blogsettings'
import { useRouter } from 'vue-router'
// 引入路由
const router = useRouter()
const blogSettingsStore = useBlogSettingsStore();
onMounted(() => {
    initTooltips();
})
const verseObj = reactive({
    content: "欢迎来到瞳井的博客小站",
    author: "瞳井"
})
const getVerse = () => {
    getIndexVerse().then((result) => {
        verseObj.content = result['hitokoto']
        verseObj.author = result['from_who'] === null ? result['from'] : result['from_who'];
    }).catch((err) => {
        // console.log(err);
    });
}
getVerse();

// 文章集合
const articles = ref([])
// 当前页码
const current = ref(1)
// 每页显示的文章数
const size = ref(10)
// 总文章数
const total = ref(0)
// 总共多少页
const pages = ref(0)
// 获取指定页的文章数据
function getArticles(currentNo) {
    if (currentNo < 1 || (pages.value > 0 && currentNo > pages.value)) return;
    // 调用分页接口渲染数据
    getArticlePageList({ current: currentNo, size: size.value }).then((res) => {
        if (res.success) {
            articles.value = res.data
            current.value = res.current
            size.value = res.size
            total.value = res.total
            pages.value = res.pages
        }
    })
}
getArticles(current.value)

// 跳转分类文章列表页
const goCategoryArticleListPage = (id, name) => {
    // 跳转时通过 query 携带参数（分类 ID、分类名称）
    router.push({ path: '/category/article/list', query: { id, name } })
}

// 跳转文章详情页
const goArticleDetailPage = (articleId) => {
    router.push('/article/' + articleId)
}
</script>