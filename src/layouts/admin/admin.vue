<template>
    <!-- 外层容器 -->
    <el-container :style="{'background-image':`url(${backgroundImageSrc})`,'height': '100vh', 'background-size': 'cover'}">

        <!-- 左边侧边栏 -->
        <el-aside :width="menuStore.menuWidth" class="transition-all">
            <AdminMenu></AdminMenu>
        </el-aside>

        <!-- 主容器 -->
        <el-container>
            <!-- 顶栏容器 -->
            <el-header>
                <AdminHeader></AdminHeader>
            </el-header>
            <el-main>
                <!-- 标签导航栏 -->
                <AdminTagList></AdminTagList>

                <!-- 主内容（根据路由动态展示不同页面） -->
                <router-view v-slot="{ Component }">
                    <Transition name="fade">
                        <!-- max 指定最多缓存 10 个组件 -->
                        <KeepAlive :max="10">
                            <component :is="Component"></component>
                        </KeepAlive>
                    </Transition>

                </router-view>
            </el-main>

            <!-- 底栏容器 -->
            <el-footer class="fixed-footer">
                <AdminFooter></AdminFooter>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script setup>
// 引入组件
import AdminFooter from './components/AdminFooter.vue';
import AdminHeader from './components/AdminHeader.vue';
import AdminMenu from './components/AdminMenu.vue';
import AdminTagList from './components/AdminTagList.vue';
import { useMenuStore } from '@/stores/menu'
import { ref } from 'vue';
import { getBlogSettingsDetail } from "@/api/admin/blogsettings";

const menuStore = useMenuStore()
const backgroundImageSrc = ref("http://sbly2w9p2.hd-bkt.clouddn.com/backgroundImage/blurredBackground.png")

// 初始化博客设置数据，并渲染到页面上
function initBlogSettings() {
    // 请求后台接口
    getBlogSettingsDetail().then((e) => {
        if (e.success == true) {
            backgroundImageSrc.value = e.data.backgroundImage;
        }
    });
}
// 手动调用一下初始化方法
initBlogSettings();

</script>

<style scoped>
.el-header {
    padding: 0 !important;
}

.el-footer {
    padding: 0 !important;
}
/* 内容区域过渡动画：淡入淡出效果 */
/* 刚开始进入时 */
.fade-enter-from {
    /* 透明度 */
    opacity: 0;
}

/* 刚开始结束 */
.fade-enter-to {
    opacity: 1;
}

/* 刚开始离开 */
.fade-leave-from {
  opacity: 1;
}

/* 离开已结束 */
.fade-leave-to {
  opacity: 0;
}

/* 离开进行中 */
.fade-leave-active {
    transition: all 0.3s;
}

/* 进入进行中 */
.fade-enter-active {
    transition: all 0.3s;
    transition-delay: 0.3s;
}
/* 底部固定 */
/* .fixed-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
} */
</style>