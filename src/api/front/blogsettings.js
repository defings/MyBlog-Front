import axios from "@/axios";
// 获取博客设置详情
export function getBlogSettingsDetail() {
  return axios.post("/blog/settings/detail");
}
export function getIndexVerse(){
  return axios.post("https://v1.hitokoto.cn/?c=d&c=e&c=h&c=i&c=k");
}