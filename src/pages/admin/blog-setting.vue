<template>
    <div>
        <!-- 卡片组件， shadow="never" 指定 card 卡片组件没有阴影 -->
        <el-card style="background: rgb(255, 255, 255, 0.8); width: 80%">
            <el-form ref="formRef" :model="form" label-width="160px" :rules="rules">
                <el-form-item label="博客名称" prop="name">
                    <el-input v-model="form.name" clearable style="width: 15%" />
                </el-form-item>
                <el-form-item label="博客 LOGO" prop="logo">
                    <el-upload class="avatar-uploader" action="#" :on-change="handleLogoChange" :auto-upload="false"
                        :show-file-list="false">
                        <img v-if="form.logo" :src="form.logo" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="作者名" prop="author">
                    <el-input v-model="form.author" clearable style="width: 15%" />
                </el-form-item>
                <el-form-item label="作者头像" prop="avatar">
                    <el-upload class="avatar-uploader" action="#" :on-change="handleAvatarChange" :auto-upload="false"
                        :show-file-list="false">
                        <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="介绍语" prop="introduction">
                    <el-input v-model="form.introduction" type="textarea" style="width: 75%" />
                </el-form-item>
                <el-form-item label="导航栏背景色" prop="menuColor">
                    <el-input v-model="form.menuColor" clearable style="width: 15%" />
                </el-form-item>
                <el-form-item label="博客背景" prop="backgroundImage">
                    <el-upload class="avatar-uploader" action="#" :on-change="handleBackgroundImage"
                        :auto-upload="false" :show-file-list="false">
                        <img v-if="form.backgroundImage" :src="form.backgroundImage" class="image" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="网站备案号" prop="caseNumber">
                    <el-input v-model="form.caseNumber" clearable style="width: 25%" />
                </el-form-item>
                <!-- 开启 Github 访问 -->
                <el-form-item label="开启 GihHub 访问">
                    <el-switch v-model="isGithubChecked" inline-prompt :active-icon="Check" :inactive-icon="Close"
                        @change="githubSwitchChange" />
                </el-form-item>
                <el-form-item label="GitHub 主页访问地址" v-if="isGithubChecked">
                    <el-input v-model="form.githubHomepage" clearable placeholder="请输入 GitHub 主页访问的 URL" />
                </el-form-item>

                <!-- 开启 Gitee 访问 -->
                <el-form-item label="开启 QQ 信息复制">
                    <el-switch v-model="isQQChecked" inline-prompt :active-icon="Check" :inactive-icon="Close"
                        @change="QQSwitchChange" />
                </el-form-item>
                <el-form-item label="QQ 号" v-if="isQQChecked">
                    <el-input v-model="form.qq" clearable placeholder="请输入 Gitee 主页访问的 URL" />
                </el-form-item>

                <!-- 开启知乎访问 -->
                <el-form-item label="开启 微信 信息复制">
                    <el-switch v-model="isWeiXingChecked" inline-prompt :active-icon="Check" :inactive-icon="Close"
                        @change="WeiXingSwitchChange" />
                </el-form-item>
                <el-form-item label="微信号" v-if="isWeiXingChecked">
                    <el-input v-model="form.weixing" clearable placeholder="请输入知乎主页访问的 URL" />
                </el-form-item>

                <!-- 开启 CSDN 访问 -->
                <el-form-item label="开启 邮箱 信息复制">
                    <el-switch v-model="isEmailChecked" inline-prompt :active-icon="Check" :inactive-icon="Close"
                        @change="EmailSwitchChange" />
                </el-form-item>
                <el-form-item label="CSDN 主页访问地址" v-if="isEmailChecked">
                    <el-input v-model="form.email" clearable placeholder="请输入 CSDN 主页访问的 URL" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="btnLoading" @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { getBlogSettingsDetail, updateBlogSettings } from "@/api/admin/blogsettings";
import { Check, Close } from "@element-plus/icons-vue";
import { uploadFile } from "@/api/admin/file";
import { showMessage } from "@/composables/util";

// 是否显示保存按钮的 loading 状态，默认为 false
const btnLoading = ref(false)

// 表单引用
const formRef = ref(null)

// 表单对象
const form = reactive({
    name: "",
    author: "",
    logo: "",
    avatar: "",
    introduction: "",
    githubHomepage: "",
    qq: "",
    weixing: "",
    email: "",
    menuColor: "",
    backgroundImage: "",
    caseNumber:""
});

// 规则校验
const rules = {
    name: [{ required: true, message: "请输入博客名称", trigger: "blur" }],
    author: [{ required: true, message: "请输入作者名", trigger: "blur" }],
    logo: [{ required: true, message: "请上传博客 LOGO", trigger: "blur" }],
    avatar: [{ required: true, message: "请上传作者头像", trigger: "blur" }],
    introduction: [{ required: true, message: "请输入介绍语", trigger: "blur" }],
    caseNumber: [{ required: true, message: "请输入介绍语", trigger: "blur" }],
};

// 是否开启 GitHub
const isGithubChecked = ref(false);
const isQQChecked = ref(false);
const isWeiXingChecked = ref(false);
const isEmailChecked = ref(false);
// 监听 Github Switch 改变事件
const githubSwitchChange = (checked) => {
    if (checked == false) {
        form.githubHomepage = "";
    }
};

const QQSwitchChange = (checked) => {
    if (checked == false) {
        form.qq = "";
    }
};

const WeiXingSwitchChange = (checked) => {
    if (checked == false) {
        form.weixing = "";
    }
};

const EmailSwitchChange = (checked) => {
    if (checked == false) {
        form.email = "";
    }
};
// 初始化博客设置数据，并渲染到页面上
function initBlogSettings() {
    // 请求后台接口
    getBlogSettingsDetail().then((e) => {
        if (e.success == true) {
            // 设置表单数据
            form.name = e.data.name;
            form.author = e.data.author;
            form.logo = e.data.logo;
            form.avatar = e.data.avatar;
            form.introduction = e.data.introduction;
            form.backgroundImage = e.data.backgroundImage;
            form.menuColor = e.data.menuColor;
            form.caseNumber = e.data.caseNumber;

            // 第三方平台信息设置，先判断后端返回平台链接是否为空，若不为空，则将 switch 组件置为选中状态，并设置表单对应数据
            if (e.data.githubHomepage) {
                isGithubChecked.value = true;
                form.githubHomepage = e.data.githubHomepage;
            }

            if (e.data.qq) {
                isQQChecked.value = true;
                form.qq = e.data.qq;
            }

            if (e.data.weixing) {
                isWeiXingChecked.value = true;
                form.weixing = e.data.weixing;
            }

            if (e.data.email) {
                isEmailChecked.value = true;
                form.email = e.data.email;
            }
        }
    });
}
// 手动调用一下初始化方法
initBlogSettings();

// 上传 logo 图片
const handleLogoChange = (file) => {
    // 表单对象
    let formData = new FormData();
    // 添加 file 字段，并将文件传入
    formData.append("file", file.raw);
    uploadFile(formData).then((e) => {
        // 响参失败，提示错误消息
        if (e.success == false) {
            let message = e.message;
            showMessage(message, "error");
            return;
        }

        // 成功则设置 logo 链接，并提示成功
        form.logo = e.data.url;
        showMessage("上传成功");
    });
};
const handleAvatarChange = (file) => {
    // 表单对象
    let formData = new FormData();
    // 添加 file 字段，并将文件传入
    formData.append("file", file.raw);
    uploadFile(formData).then((e) => {
        // 响参失败，提示错误消息
        if (e.success == false) {
            let message = e.message;
            showMessage(message, "error");
            return;
        }

        // 成功则设置作者头像链接，并提示成功
        form.avatar = e.data.url;
        showMessage("上传成功");
    });
};

const handleBackgroundImage = (file) => {
    // 表单对象
    let formData = new FormData();
    formData.append("file", file.raw);
    uploadFile(formData).then(
        (e) => {
            // 响参失败，提示错误消息
            if (e.success == false) {
                let message = e.message;
                showMessage(message, "error");
                return;
            }

            // 成功则设置作者头像链接，并提示成功
            form.backgroundImage = e.data.url;
            showMessage("上传成功");
        }
    )
}

// 保存当前博客设置
const onSubmit = () => {
    // 先验证 form 表单字段
    formRef.value.validate((valid) => {
        if (!valid) {
            // console.log('表单验证不通过')
            return false
        }

        // 显示保存按钮 loading
        btnLoading.value = true
        updateBlogSettings(form).then((res) => {
            if (res.success == false) {
                // 获取服务端返回的错误消息
                let message = res.message
                // 提示错误消息
                showMessage(message, 'error')
                return
            }

            // 重新渲染页面中的信息
            initBlogSettings()
            showMessage('保存成功')
        }).finally(() => btnLoading.value = false) // 隐藏保存按钮 loading
    })
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 100px;
    height: 100px;
    display: block;
}

.avatar-uploader .image {
    width: 250px;
    height: 150px;
    display: block;
}
</style>

<style>
/* 解决 textarea :focus 状态下，边框消失的问题 */
.el-textarea__inner:focus {
    outline: 0 !important;
    box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset !important;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    text-align: center;
}
</style>
