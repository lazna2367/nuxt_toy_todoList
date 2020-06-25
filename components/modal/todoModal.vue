<template>
    <div class="template">
        <div class="todo-modal">
            <div class="top-box">
                <a-input-search placeholder="이미지를 검색해주세요." enter-button @search="searchImg" v-model="imgKeyword" />
                <a-icon type="close" @click="setIsTodoModal(false)" />
            </div>
            <div class="body-box">
                <!-- :style="v ? `background: url('${v}') no-repeat center` : ''" -->
                <div v-for="(v,i) in imgDataList" :key="i" class="img-card" >
                    <img :src="v" :alt="'img_'+i" class="img">
                </div>
            </div>
            <div class="page" v-if="imgDataList">
                {{pickPage}}
                <div class="left-arrow" @click="pickPage -= 1">
                    <a-icon type="left" />
                </div>
                <div v-for="i in 5" :key="i" class="page-number" :class="pickPage === i ? 'on' : ''">
                    <span @click="pickPage = i">{{i}}</span>
                </div>
                <div class="right-arrow" @click="pickPage += 1">
                    <a-icon type="right" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState , mapMutations , mapActions} from 'vuex'
const {GOOGLE_API_KEY , GOOGLE_ENGINE_KEY} = process.env.envData;
export default {
    data(){
        return{
            imgKeyword: '',
            imgDataList: null,
            pickPage: 1,
        }
    },
    watch:{
        pickPage(){
            this.searchImg()
        },
    },
    methods:{
        ...mapMutations(['setIsTodoModal']),
        searchImg(){
            this.$axios.get(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}-4&cx=${GOOGLE_ENGINE_KEY}&searchType=image&q=${this.imgKeyword}&start=${this.pickPage === 1 ? '' : this.pickPage-1 }1`).then(res => {
                console.log('res : ' , res)
                // this.imgDataList = res.data.items.map(v => {return v.link})
                this.imgDataList = res.data.items.map(v => {return v.image.thumbnailLink})
            }).catch(e => {
                console.error(e)
            })
        }
    },
}
</script>
<style lang="scss">
.template{
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: fixed;    
    // transition: opacity 0.3s ease;
    z-index: 10; 
    display: flex;
    justify-content: center;
    align-items: center;
    >.todo-modal{
        background: white;
        width: 50%;
        height: 575px;
        border-radius: 20px;
        padding-top: 14px;
        padding-right: 14px;
        padding-left: 14px;
        >.top-box{
            display: flex;
            justify-content: center;
            position: relative;
            height: 24px;
            margin-bottom: 14px;
            >span{
                width: 270px;
                .ant-input{
                    height: 24px;
                    font-size: 12px;
                }
                .ant-btn{
                    height: 24px;
                }
            }
            >i{
                cursor: pointer;
                font-size: 24px;
                position: absolute;
                right: 0;
            }
        }
        >.body-box{
            width: 100%;
            height: 450px;
            margin-bottom: 14px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            overflow-y: auto;
            -ms-overflow-style: none;
            &::-webkit-scrollbar {
                display:none;
            }
            >.img-card{
                // border: 1px solid;
                width: 140px;
                height: 140px;
                margin-left: 15px;
                margin-right: 15px;
                // margin-bottom: 10px;
                // background: url('../assets/img/space-image.jpg') no-repeat center;
                // background-size: cover;
                >.img{
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        >.page{
            width: 100%;
            height: 30px;
            // border: 1px solid;
            display: flex;
            justify-content: center;
            align-items: center;
            >div{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 30px;
                height: 30px;
            }
            >.left-arrow{
                cursor: pointer;
                background: #1890ff;
                color: white;
                border-radius: 50px;  
                margin-right: 5px;
            }
            >.right-arrow{
                cursor: pointer;
                background: #1890ff;
                color: white;
                border-radius: 50px;  
                margin-left: 5px;
            }
            >.page-number{
                >span{
                    cursor: pointer;
                }
                font-size: 18px;
            }
            >.page-number.on{
                color: #1890ff;
                font-weight: bold;
            }
        }
    }
}
</style>