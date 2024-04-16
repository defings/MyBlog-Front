<template>
    <Header></Header>
    <!-- 主内容区域 -->
    <main class="container max-w-screen-xl mx-auto p-4">
        <div class="grid grid-cols-1 gap-7 mt-24 md:ml-24">
            <Timeline theme="lightblue">
                <div v-for="(archive, index) in archives" :key="index">
                    <TimelineTitle bg-color="#22d3ee" font-color="#22d3ee"><span style="font-size: 25px;">{{
                    archive.month }}</span>
                    </TimelineTitle>
                    <TimelineItem bg-color="#9dd8e0" font-color="#e166ab" v-for="(a, i) in archive.articles" :key="i">
                        <div class="md:flex items-center mt-8 bg-[#FAFAFA] dark:bg-[#3A3A3A] rounded-xl cursor-pointer"
                        @click="goArticleDetailPage(a.id)"
                            style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">
                            <div class="p-[32px] md:w-[660px]">
                                <div class="text-[24px] dark:text-white text-[#1D1D1D]">{{ a.title }}</div>
                                <div
                                    class="mt-[12px] leading-8 text-sm dark:text-[#D8D8D8] text-[#7E7E7E] ellipsis line-clamp-2">
                                    {{ a.summary }}</div>
                                <div class="mt-[16px] text-[12px] text-[#7E7E7E]">发布于 {{ a.createDate }}</div>
                            </div>
                            <div class="ml-auto px-4 pb-4 md:py-4 md:w-[280px] w-full bg-cover"><img class="rounded-xl"
                                    :src="a.cover" alt="封面"></div>
                        </div>
                    </TimelineItem>
                </div>
            </Timeline>
        </div>
        <div v-if="current > pages" class="md:mb-20 flex justify-center text-cyan-400 cursor-pointer" style="font-size: 15px;"
            @click="getArchives(current + 1)"> 点击加载更多... </div>
    </main>
    <Footer class=" mt-5"></Footer>

</template>

<script setup>
import Header from '@/layouts/frontend/components/Header.vue'
import Footer from '@/layouts/frontend/components/Footer.vue'
import { Timeline, TimelineTitle, TimelineItem } from 'vue3-cute-component'
import { getArchivePageList } from '@/api/front/archive'
import { ref } from 'vue'
import { useBlogSettingsStore } from '@/stores/blogsettings'
import { showMessage } from '@/composables/util'
import { useRouter } from 'vue-router'
const blogSettingsStore = useBlogSettingsStore();
// 文章归档
const archives = ref([])
// 当前页码
const current = ref(1)
// 每页显示的文章数
const size = ref(10)
// 总文章数
const total = ref(0)
// 总共多少页
const pages = ref(0)

function getArchives(currentNo) {
    // 上下页是否能点击判断，当要跳转上一页且页码小于 1 时，则不允许跳转；当要跳转下一页且页码大于总页数时，则不允许跳转
    if (currentNo < 1 || (pages.value > 0 && currentNo > pages.value)) {
        showMessage("后面的内容，等博主更新后再来吧", "info")
        return;
    }
    // 调用分页接口渲染数据
    getArchivePageList({ current: currentNo, size: size.value }).then((res) => {
        if (res.success) {
            archives.value = archives.value.concat(res.data)
            current.value = res.current
            size.value = res.size
            total.value = res.total
            pages.value = res.pages
        }
    })
}
getArchives(current.value)
// 引入路由
const router = useRouter()
// 跳转文章详情页
const goArticleDetailPage = (articleId) => {
    router.push('/article/' + articleId)
}
</script>