<template>
    <div>
        <el-card style="background: rgb(255, 255, 255, 0.8);">
            <!-- 新增按钮 -->
            <div class="mb-5">
                <el-button type="primary" @click="addCategoryBtnClick">
                    <el-icon class="mr-1">
                        <Plus />
                    </el-icon>
                    新增</el-button>
            </div>

            <!-- 分页列表 -->
            <el-table :data="tableData" border stripe style="width: 100%" v-loading="tableLoading">
                <el-table-column prop="username" label="用户名" width="180" align="center" />
                <el-table-column prop="avatarPath" label="头像" width="180" align="center">
                    <template #default="scope">
                        <el-image style="width: 75px;" :src="scope.row.avatarPath" />
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="180" align="center" />
                <el-table-column prop="role" label="用户类型" width="180" align="center" />
                <el-table-column label="状态" width="100" align="center">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isDeleted"
                            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" inline-prompt
                            active-text="上线" inactive-text="下线" @click="deleteUserSubmit(scope.$index, scope.row)" />
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="showUserUpdateEditor(scope.row)">
                            修改信息
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <!-- <div class="mt-10 flex justify-center">
                <el-pagination v-model:current-page="current" v-model:page-size="size" :page-sizes="[10, 20, 50]"
                    :small="false" :background="true" layout="total, sizes, prev, pager, next, jumper" :total="total" />
            </div> -->
            <!-- 添加分类 -->
            <FormDialog ref="formDialogRef" title="添加用户" destroyOnClose @submit="onSubmit">
                <el-form ref="formRef" :rules="rules" :model="form">
                    <el-form-item label="用户名称" prop="username" label-width="80px" size="large">
                        <el-input v-model="form.username" placeholder="请输入用户名称" maxlength="20" show-word-limit
                            clearable />
                    </el-form-item>
                    <el-form-item label="用户权限" prop="role" label-width="80px" size="large">
                        <el-input v-model="form.role" placeholder="示例：ROLE_ADMIN or ROLE_VISITOR" clearable />
                    </el-form-item>
                </el-form>
            </FormDialog>



            <el-dialog v-model="dialogVisible" title="修改用户信息" width="40%" :draggable="true"
                :close-on-click-modal="false" :close-on-press-escape="false">
                <el-form ref="formUpdataRef" :rules="rules" :model="formUpdata">
                    <el-form-item label="用户名" prop="username" label-width="120px">
                        <!-- 输入框组件 -->
                        <el-input size="large" v-model="formUpdata.username" placeholder="请输入用户名" clearable />
                    </el-form-item>
                    <el-form-item label="用户头像" prop="avator" label-width="120px">
                        <el-upload class="avatar-uploader" action="#" :on-change="handleAvatarChange"
                            :auto-upload="false" :show-file-list="false">
                            <img v-if="formUpdata.avatarPath" :src="formUpdata.avatarPath" class=" h-15 w-15" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="用户权限" prop="rePassword" label-width="120px">
                        <el-input v-model="formUpdata.role" placeholder="示例：ROLE_ADMIN or ROLE_VISITOR" clearable />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="onSumbitUserUpdata">
                            提交
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup>
// 引入所需图标
import { Search, RefreshRight } from '@element-plus/icons-vue'
import { showMessage, showModel } from '@/composables/util'
import { ref, reactive } from 'vue'
import FormDialog from '@/components/FormDialog.vue'
import { findUserList, updataUserInfo, upDataUserState, insertUser } from "@/api/admin/user"
import { uploadFile } from "@/api/admin/file";

// 对话框是否显示
const dialogVisible = ref(false)


// 对话框是否显示
const formDialogRef = ref(null)

// 表单引用
const formRef = ref(null)
const formUpdataRef = ref(null)
const form = reactive({
    username: '',
    role: ''
})
// 规则校验
const rules = {
    name: [
        {
            required: true,
            message: '用户名称不能为空',
            trigger: 'blur',
        },
    ],
    avatarPath: [
        {
            required: true,
            message: '头像不能为空',
            trigger: 'blur',
        },
    ],
    role: [
        {
            required: true,
            message: '权限不能为空',
            trigger: 'blur',
        },
    ]
}

const tableData = ref([])
// 当前页码，给了一个默认值 1
// const current = ref(1)
// // 总数据量，给了个默认值 0
// const total = ref(0)
// // 每页显示的数据量，给了个默认值 10
// const size = ref(10)
// 查询条件：开始结束时间
// const startDate = reactive({})
// const endDate = reactive({})
// 表格加载 Loading
const tableLoading = ref(false)

// 获取分页数据
function getTableData() {
    // 显示表格 loading
    tableLoading.value = true
    // 调用后台分页接口，并传入所需参数
    findUserList().then((result) => {
        tableData.value = result.data
    }).catch((err) => {
        console.log(err);
    }).finally(() => { tableLoading.value = false });
}
// 新增分类按钮点击事件
const addCategoryBtnClick = () => {
    formDialogRef.value.open()
}

// 每页展示数量变更事件
// const handleSizeChange = (chooseSize) => {
//     size.value = chooseSize
//     getTableData()
// }

const onSubmit = () => {
    insertUser(form).then((res) => {
        if (res.success == true) {
            showMessage('添加成功')
            // 将表单中分类名称置空
            form.name = ''
            // 隐藏对话框
            formDialogRef.value.close()
            // 重新请求分页接口，渲染数据
            getTableData()
        } else {
            // 获取服务端返回的错误消息
            let message = res.message
            // 提示错误消息
            showMessage(message, 'error')
        }
    }).finally(() => formDialogRef.value.closeBtnLoading())
}

getTableData()


const deleteUserSubmit = (index, row) => {
    //   console.log(index, row)
    let id = row.id;
    let state = row.isDeleted ? 1 : 0;
    upDataUserState({ id: id, state: state }).then((result) => {
        showMessage("账号状态已修改", "error");
    }).catch((err) => {
        console.log(err);
    });
}



const formUpdata = reactive({
    id: '',
    username: '',
    name: '',
    avatarPath: '',
    role: ''
})

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
        formUpdata.avatarPath = e.data.url;
        showMessage("上传成功");
    });
};
const showUserUpdateEditor = (row) => {
    // console.log(row);
    // 显示编辑文章对话框
    dialogVisible.value = true
    console.log(row.id);
    formUpdata.id = row.id;
    formUpdata.role = row.role;
    formUpdata.username = row.username;
    formUpdata.name = row.username;
    formUpdata.avatarPath = row.avatarPath;
}


const onSumbitUserUpdata = () => {
    updataUserInfo(formUpdata).then((result) => {
        showMessage("修改成功")
        dialogVisible.value = false;
        getTableData()
    }).catch((err) => {
        console.log(err);
    });
}
</script>

<style scoped>
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