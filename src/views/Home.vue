<script setup>
import axios from "axios";
import { onMounted, reactive, ref, toRef, toRefs } from "vue";

var action = ref(13366);
var page = ref(1);
var flag = ref(true);
// var tabsLeft = reactive([]);
var tabContent = reactive({
    dataLeft: [],
    dataContent: [],
});

onMounted(() => {
    getTabLeft();
    getTabContent(action.value, page.value);
    window.addEventListener("scroll", onScroll);
});

function scrollTop() {
    document.documentElement.scrollTop = 0;
}
async function getTabLeft() {
    let url = `https://api.sunofbeaches.com/shop/discovery/categories`;
    let result = await axios.get(url);
    // console.log(result);
    tabContent.dataLeft = result.data.data;
}
async function getTabContent(id, page) {
    let url = `https://api.sunofbeaches.com/shop/discovery/${id}/${page}`;
    let result = await axios.get(url);
    // console.log(result.data.data);

    // for (var i = 0; i < result.data.data.length; i++) {
    //     tabContent.dataContent.push(result.data.data[i]);
    //     flag.value = true;
    // }

    for (const sb of result.data.data) {
        // console.log(sb);
        tabContent.dataContent.push(sb);
        flag.value = true;
    }
}
function onScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollTop + windowHeight + 5 >= scrollHeight) {
        // console.log("bottom")
        if (flag.value) {
            flag.value = false;
            page.value++;
            getTabContent(action.value, page.value);
        }
    }
}
</script>

<template>
    <div class="home">
        <div class="content">
            <div class="tab_left">
                <div
                    :class="{ action: action == item.id }"
                    class="tab_left_chi"
                    @click="
                        action = item.id;
                        page = 1;
                        tabContent.dataContent = [];
                        getTabContent(action, page);
                    "
                    v-for="item in tabContent.dataLeft"
                    :key="item.id"
                >
                    {{ item.title }}
                </div>
                <div
                    style="
                        text-align: center;
                        margin-top: 10px;
                        cursor: pointer;
                    "
                >
                    <img
                        src="@/assets/img/返回顶部.png"
                        alt=""
                        @click="scrollTop"
                    />
                </div>
            </div>
            <div class="tab_cont">
                <template v-if="tabContent.dataContent.length != 0">
                    <div
                        class="tab_cont_chi"
                        v-for="(p, i) in tabContent.dataContent"
                        :key="i"
                    >
                        <div class="cover">
                            <img :src="p.pict_url" alt="" />
                        </div>
                        <div class="message">
                            <a :href="p.coupon_click_url" target="_blank">
                                <p class="p_title">{{ p.title }}</p>
                            </a>
                            <p class="p_price">
                                <span
                                    style="
                                        color: #999;
                                        text-decoration: line-through;
                                    "
                                    >原价:{{ p.zk_final_price }}</span
                                >&nbsp;
                                <span style="color: #ff4500"
                                    >券后价{{
                                        (
                                            p.zk_final_price - p.coupon_amount
                                        ).toFixed(2)
                                    }}</span
                                >
                            </p>
                            <p class="p_volume">{{ p.volume }} · 人已购买</p>
                        </div>
                        <a :href="p.coupon_click_url" target="_blank">
                            <div class="discovery-buy-btn">领券购买</div>
                        </a>
                    </div>
                </template>
                <div
                    v-else
                    style="
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                    "
                >
                    <img src="@/assets/img/22.gif" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.content {
    display: flex;
    justify-content: space-between;
    width: 1140px;
    // border: 1px solid red;
    margin: 0 auto;

    .tab_left {
        position: sticky;
        top: 10px;
        width: 105px;
        height: 440px;
        // border: 1px solid red;
        box-shadow: 0 5px 10px #d4d4d4;

        .tab_left_chi {
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;

            &:hover {
                cursor: pointer;
                color: #fff;
                background-color: #ff4500;
            }
        }
    }

    .tab_cont {
        width: 1010px;

        .tab_cont_chi {
            display: flex;
            width: 100%;
            height: 204px;
            // border: 1px solid red;
            padding: 10px;
            margin-bottom: 10px;
            box-shadow: 0 5px 10px #d4d4d4;
            position: relative;

            .cover {
                width: 180px;
                height: 180px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                }
            }

            .message {
                line-height: 35px;
                margin-left: 10px;

                .p_title {
                    cursor: pointer;
                    font-size: 22px;
                    color: #47494e;
                    font-weight: bold;
                }

                .p_price {
                    font-weight: bold;
                }

                .p_volume {
                    color: #47494e;
                }
            }

            .discovery-buy-btn {
                padding: 8px 20px;
                border-radius: 5px;
                position: absolute;
                bottom: 20px;
                right: 20px;
                background-color: #f56c6c;
                color: #fff;

                &:hover {
                    background-color: #ff4500;
                    cursor: pointer;
                }
            }
        }
    }
}

.action {
    color: #fff;
    background-color: #ff4500;
}
</style>