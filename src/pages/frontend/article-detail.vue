<template>
    <Header></Header>
    <div class="p-10 md:bg-cover bg-contain bgImg md:h-[75vh] z-0"
        :style="{ backgroundImage: `url(${article.cover})`, backgroundSize: 'cover' }">
        <div class=" mt-[55vh] text-white md:ml-40" style="font-size: 50px; font-family: 'beiming';">{{ article.title }}
        </div>
        <div class="mt-5 md:ml-40">
            <span @click="goTagArticleListPage(tag.id, tag.name)" v-for="(tag, index) in article.tags" :key="index"
                class="inline-block mb-1 cursor-pointer bg-pink-100 text-pink-700 text-xs font-medium mr-2 px-3 py-1 rounded-full hover:bg-pink-200 hover:text-pink-900 dark:bg-green-900 dark:text-green-300">
                # {{ tag.name }}
            </span>
            <span
                class="inline-block mb-1 cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-3 py-1 rounded-full hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300">
                发布于：{{ article.createTime }}
            </span>
            <span @click="goCategoryArticleListPage(article.categoryId, article.categoryName)"
                class="inline-block mb-1 cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-3 py-1 rounded-full hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300">
                所属分类：{{ article.categoryName }}
            </span>
            <span
                class="inline-block mb-1 cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-3 py-1 rounded-full hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300">
                阅读量：{{ article.readNum }}
            </span>
            <span
                class="inline-block mb-1 cursor-pointer bg-sky-200 text-sky-800 text-xs font-medium mr-2 px-3 py-1 rounded-full hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300">
                字数：{{ article.totalWords  }}
            </span>
            <span
                class="inline-block mb-1 cursor-pointer bg-sky-200 text-sky-800 text-xs font-medium mr-2 px-3 py-1 rounded-full hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300">
                阅读时间：{{ article.readTime   }}
            </span>
        </div>
    </div>

    <!-- 主内容区域 -->
    <main class="container max-w-screen-xl mx-auto p-4 px-6">
        <!-- grid 表格布局，分为 4 列 -->
        <div class="grid grid-cols-4 gap-7">
            <!-- 左边栏，占用 3 列 -->
            <div class="col-span-4 md:col-span-3 mb-3">
                <!-- 文章卡片父容器 -->
                <div
                    class="w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-md">
                    <!-- 正文 -->
                    <div v-viewer ref="articleContentRef" class="mt-5 article-content" v-html="article.content"></div>
                    <!-- 标签集合 -->

                    <!-- 上下篇 -->
                    <nav class="flex flex-row mt-7">
                        <!-- basis-1/2 用于占用 flex 布局的一半空间 -->
                        <div class="basis-1/2">
                            <!-- h-full 指定高度占满 -->
                            <a v-if="article.preArticle"
                                @click="router.push('/article/' + article.preArticle.articleId)"
                                class="flex flex-col h-full p-4 mr-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-pink-300 hover:bg-pink-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <div>
                                    <svg class="inline w-3.5 h-3.5 mr-2 mb-1" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"></path>
                                    </svg>
                                    上一篇
                                </div>
                                <div>{{ article.preArticle.articleTitle }}</div>
                            </a>
                        </div>

                        <div class="basis-1/2">
                            <!-- text-right 指定文字居右显示 -->
                            <a v-if="article.nextArticle"
                                @click="router.push('/article/' + article.nextArticle.articleId)"
                                class="flex flex-col h-full text-right p-4 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-pink-300 hover:bg-pink-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <div>
                                    下一篇
                                    <svg class="inline w-3.5 h-3.5 ml-2 mb-1" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"></path>
                                    </svg>
                                </div>
                                <div>{{ article.nextArticle.articleTitle }}</div>
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
            <aside class="col-span-4 md:col-span-1">
                <!-- 文章目录 -->
                <Toc></Toc>
            </aside>
        </div>

    </main>
    <!-- 返回顶部 -->
    <ScrollToTopButton></ScrollToTopButton>
    <Footer></Footer>
</template>

<script setup>
import Header from '@/layouts/frontend/components/Header.vue'
import Footer from '@/layouts/frontend/components/Footer.vue'
import ScrollToTopButton from '@/layouts/frontend/components/ScrollToTopButton.vue'
import Toc from '@/layouts/frontend/components/Toc.vue'
import { getArticleDetail } from '@/api/front/article'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, onMounted, nextTick } from 'vue'
import hljs from 'highlight.js'
// 代码高亮样式
import 'highlight.js/styles/tokyo-night-dark.css'
const route = useRoute()
const router = useRouter()
// 文章数据
const article = ref({})

// 获取文章详情
function refreshArticleDetail(articleId) {
    getArticleDetail(route.params.articleId).then((res) => {
        // 该文章不存在(错误码为 20010)
        if (!res.success && res.errorCode == '20010') {
            // 手动跳转 404 页面
            router.push({ name: 'NotFound' })
            return
        }

        article.value = res.data

        nextTick(() => {
            // 获取所有 pre code 节点
            let highlight = document.querySelectorAll('pre code')
            // 循环高亮
            highlight.forEach((block) => {
                hljs.highlightElement(block)
            })
        })
    })
}
refreshArticleDetail(route.params.articleId)

// 跳转分类文章列表页
const goCategoryArticleListPage = (id, name) => {
    // 跳转时通过 query 携带参数（分类 ID、分类名称）
    router.push({ path: '/category/article/list', query: { id, name } })
}
// 跳转标签文章列表页
const goTagArticleListPage = (id, name) => {
    // 跳转时通过 query 携带参数（标签 ID、标签名称）
    router.push({ path: '/tag/article/list', query: { id, name } })
}
// 监听路由
watch(route, (newRoute, oldRoute) => {
    // 重新渲染文章详情
    refreshArticleDetail(newRoute.params.articleId)
})
</script>

<style scoped>
/* h1, h2, h3, h4, h5, h6 标题样式 */
::v-deep(.article-content h1,
    .article-content h2,
    .article-content h3,
    .article-content h4,
    .article-content h5,
    .article-content h6) {
    color: #292525;
    line-height: 150%;
    font-family: PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}

::v-deep(.article-content h2) {
    line-height: 1.5;
    font-weight: 700;
    font-synthesis: style;
    font-size: 24px;
    margin-top: 40px;
    margin-bottom: 26px;
    line-height: 140%;
    border-bottom: 1px solid rgb(241 245 249);
    padding-bottom: 15px;
}

::v-deep(.article-content h3) {
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: 16px;
    font-weight: 600;
}

::v-deep(.article-content h4) {
    font-size: 18px;
    margin-top: 30px;
    margin-bottom: 16px;
    font-weight: 600;
}

::v-deep(.article-content h5) {
    font-size: 16px;
    margin-top: 30px;
    margin-bottom: 14px;
    font-weight: 600;
}

::v-deep(.article-content h6) {
    font-size: 16px;
    margin-top: 30px;
    margin-bottom: 14px;
    font-weight: 600;
}

/* p 段落样式 */
::v-deep(.article-content p) {
    letter-spacing: .3px;
    margin: 0 0 20px;
    line-height: 30px;
    color: #4c4e4d;
    font-weight: 400;
    word-break: normal;
    word-wrap: break-word;
    font-family: -apple-system, BlinkMacSystemFont, PingFang SC, Hiragino Sans GB, Microsoft Yahei, Arial, sans-serif;
}

/* blockquote 引用样式 */
::v-deep(.article-content blockquote) {
    border-left: 2.3px solid rgb(52, 152, 219);
    quotes: none;
    background: rgb(236, 240, 241);
    color: #777;
    font-size: 16px;
    margin-bottom: 20px;
    padding: 24px;
}

/* 设置 blockquote 中最后一个 p 标签的 margin-bottom 为 0 */
::v-deep(.article-content blockquote p:last-child) {
    margin-bottom: 0;
}

/* 斜体样式 */
::v-deep(.article-content em) {
    color: #c849ff;
}

/* 超链接样式 */
::v-deep(.article-content a) {
    color: #167bc2;
}

::v-deep(.article-content a:hover) {
    text-decoration: underline;
}

/* ul 样式 */
::v-deep(.article-content ul) {
    padding-left: 2rem;
}

::v-deep(.article-content > ul) {
    margin-bottom: 20px;
}

::v-deep(.article-content ul li) {
    list-style-type: disc;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 16px;
}

::v-deep(.article-content ul li p) {
    margin-bottom: 0 !important;
}

::v-deep(.article-content ul ul li) {
    list-style-type: square;
}

/* ol 样式 */
::v-deep(.article-content ol) {
    list-style-type: decimal;
    padding-left: 2rem;
}

/* 图片样式 */
::v-deep(.article-content img) {
    max-width: 100%;
    overflow: hidden;
    display: block;
    margin: 0 auto;
    border-radius: 8px;
}

::v-deep(.article-content img:hover,
    img:focus) {
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, .15);
}

/* 图片描述文字 */
::v-deep(.image-caption) {
    min-width: 20%;
    max-width: 80%;
    min-height: 43px;
    display: block;
    padding: 10px;
    margin: 0 auto;
    font-size: 13px;
    color: #999;
    text-align: center;
}

/* code 样式 */
::v-deep(.article-content code:not(pre code)) {
    padding: 2px 4px;
    margin: 0 2px;
    font-size: 95% !important;
    border-radius: 4px;
    color: rgb(41, 128, 185);
    background-color: rgba(27, 31, 35, 0.05);
    font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
}

/* pre code 样式 */
::v-deep(code) {
    font-size: 98%;
}

::v-deep(pre) {
    margin-bottom: 20px;
}

::v-deep(pre code.hljs) {
    padding-top: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 0.7rem;
    border-radius: 6px;
}

::v-deep(pre:before) {
    background: #fc625d;
    border-radius: 50%;
    box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
    content: ' ';
    height: 10px;
    margin-top: 10px;
    margin-left: 10px;
    position: absolute;
    width: 10px;
}

/* 表格样式 */
::v-deep(table) {
    margin-bottom: 20px;
    width: 100%;
}

::v-deep(table tr) {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
}

::v-deep(table th) {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
}

::v-deep(table td) {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
}

::v-deep(table tr:nth-child(2n)) {
    background-color: #f6f8fa;
}

/* hr 横线 */
::v-deep(hr) {
    margin-bottom: 20px;
}

::v-deep(code) {
    font-size: 98%;
}

/* pre 样式 */
::v-deep(pre) {
    margin-bottom: 20px;
    padding-top: 30px;
    background: #21252b;
    border-radius: 6px;
    position: relative;
}

::v-deep(pre code.hljs) {
    padding: 0.7rem 1rem;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
}

::v-deep(pre:before) {
    background: #fc625d;
    border-radius: 50%;
    box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
    content: ' ';
    height: 10px;
    margin-top: -19px;
    margin-left: 10px;
    position: absolute;
    width: 10px;
}
</style>
