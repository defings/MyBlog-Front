<template>
    <div class=" fixed overflow-y-auto h-screen text-white transition-all" :style="{ width: menuStore.menuWidth, 'background-color': menuColor }">
        <!-- 顶部 Logo, 指定高度为 64px, 和右边的 Header 头保持一样高 -->
        <div class="flex items-center justify-center h-[64px]">
            <span v-if="menuStore.menuWidth == '250px'" class="textFont">瞳井的博客小站</span>
            <span v-else class="textFont">blog</span>
        </div>
        <!-- 下方菜单 -->
        <el-menu :default-active="defaultActive" @select="handleSelect" :collapse="isCollapse"
            :collapse-transition="false" style="background-color: #9f1239;border-right: 0;">
            <template v-for="(item, index) in menus" :key="index">
                <el-menu-item :index="item.path">
                    <el-icon>
                        <!-- 动态图标 -->
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import { getBlogSettingsDetail } from "@/api/admin/blogsettings";
// 引入 useMenuStore
const menuStore = useMenuStore()
const menus = [
    {
        'name': '仪表盘',
        'icon': 'Monitor',
        'path': '/admin/index'
    },
    {
        'name': '文章管理',
        'icon': 'Document',
        'path': '/admin/article/list',
    },
    {
        'name': '分类管理',
        'icon': 'FolderOpened',
        'path': '/admin/category/list',
    },
    {
        'name': '标签管理',
        'icon': 'PriceTag',
        'path': '/admin/tag/list',
    },
    {
        'name': '用户管理',
        'icon': "User",
        path: "/admin/user/list"
    },
    {
        'name': '博客设置',
        'icon': 'Setting',
        'path': '/admin/blog/setting',
    },
]
const route = useRoute()
const isCollapse = computed(() => !(menuStore.menuWidth == '250px'))
// 根据路由地址判断哪个菜单被选中
const defaultActive = ref(route.path)
const router = useRouter()
// 菜单选择事件
const handleSelect = (path) => {
    router.push(path)
}

const menuColor = ref('#9f1239')

// 初始化博客设置数据，并渲染到页面上
function initBlogSettings() {
    // 请求后台接口
    getBlogSettingsDetail().then((e) => {
        if (e.success == true) {
            menuColor.value = e.data.menuColor;
        }
    });
}
// 手动调用一下初始化方法
initBlogSettings();
</script>

<style>
.el-sub-menu__title {
    color: #fff;
}

.el-sub-menu__title:hover {
    background-color: #ffffff10;
}

.el-menu-item.is-active {
    background-color: var(--el-color-primary);
    color: #fff;
}

.el-menu-item.is-active:hover {
    background-color: var(--el-color-primary);
}

.el-menu-item {
    color: #fff;
}

.el-menu-item:hover {
    background-color: #ffffff10;
}
.textFont{
    font-size: 25px;
    font-family: 'hanyifengbomili';
}
</style>