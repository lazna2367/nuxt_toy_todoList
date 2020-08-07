<template>
  <a-layout style="background:none;">
    <header class="container-header">
      <div class="top-nav-logo">
          <div class="logo">
            <img src="../assets/img/post-icon_w.png" alt="">
            <span>Amatda</span>
          </div>
          <div class="tab" @click="setIsCategoryTab(!isCategoryTab)" :class="isCategoryTab ? 'on' : ''" :style="tutorialStep.status ? 'pointer-events:none;':''">
            <a-icon type="menu" />
          </div>
          <div class="mobile-tab">

          </div>
      </div>
      <div class="top-nav-category">
          <!-- <a href="#" @click.prevent="$router.push('/todo')"><p><a-icon type="login" /></p></a>
          <a href="#" @click.prevent="$router.push('/')"><p><a-icon type="bell" /></p></a>
          <a href="#" @click.prevent="$router.push('/')"><p><a-icon type="user" /></p></a> -->
      </div>
    </header>
    <a-layout-content class="body-contents">
      <div class="side-nav" v-if="isCategoryTab">
          <div v-for="(v,i) in todoDataList" :key="i"
            class="category-contents"
            :class="categoryClass(v,i)"
          >
            <div class="category-title" @click="setTodoDataList({type:'categoryPick' , idx: i})" >
                <span v-if="!categoryTitleMod[i]">{{v.categoryName}}</span>
                <div class="mod-input" v-else>
                  <input type="text" :id="`mod_input_${i}`" :value="v.categoryName" @input="editInputText(i,$event)" @keyup.enter="categoryTitleMod.splice(i,1,!categoryTitleMod[i])"/>
                  <div class="mod-btn" @click="categoryTitleMod.splice(i,1,!categoryTitleMod[i])">수정</div>
                </div>
                
            </div>
            <div class="category-mod" :class="v.isMod ? 'on' : ''" :style="categoryTitleMod[i] ? 'display:none' : ''">
              <a-icon type="setting" theme="filled" @click="setTodoDataList({type:'isMod' , idx: i})" :style="tutorialStep.status && todoDataList.length === 1 ? 'pointer-events:none;' : ''" />
              <div class="mod-template" v-if="v.isMod">
                <a-icon type="edit" theme="twoTone" two-tone-color="#3bc73c" @click="clickCategoryShowMod(i)"/>
                <a-icon type="delete" theme="twoTone" two-tone-color="red" @click="setTodoDataList({type:'del' , idx: i})"/>
              </div>
            </div>
            
          </div>
        <!-- </template> -->

        <!-- 카테고리 추가 -->
        <div class="category-plus" 
            :class="categoryPlusStatus === 1 ? 'color-pick' 
            :categoryPlusStatus === 2 ? 'category-title'
            : ''"
            :style="tutorialStep.status && todoDataList.length === 1 ? 'pointer-events:none;' : ''"
        >
            <a-icon type="plus-circle" class="category-plus-icon" v-if="categoryPlusStatus === 0" @click="categoryPlusStatus = 1 , (tutorialStep.status ? isTutorialStep({type:'val',param:2}) : '')"/>
            <!-- 컬러선택 -->
            <div class="colors" v-if="categoryPlusStatus === 1">
              <div class="colors-list" >
                  <div class="yellow" @click="(categoryPlusStatus = 2 , categoryCreateData.color = 'yellow')" ></div>
                  <div class="red" @click="(categoryPlusStatus = 2 , categoryCreateData.color = 'red')"></div>
                  <div class="blue" @click="(categoryPlusStatus = 2 , categoryCreateData.color = 'blue')"></div>
                  <div class="green" @click="(categoryPlusStatus = 2 , categoryCreateData.color = 'green')"></div>
                  <div class="purple" @click="(categoryPlusStatus = 2 , categoryCreateData.color = 'purple')"></div>
              </div>
              <div class="close" >
                  <a-icon type="close" @click="categoryPlusStatus = 0 , (tutorialStep.status ? isTutorialStep({type:'val',param:1}) : '')"/>
              </div>
            </div>
            <!-- 타이틀 작성 -->
            <div class="title-input" v-if="categoryPlusStatus === 2">
                <div class="title">
                    <a-input-search placeholder="카테고리" size="large" @search="submitCategory($event)" v-model="categoryCreateData.name">
                    <a-button slot="enterButton" type="primary">
                      저장
                    </a-button>
                  </a-input-search>
                </div>
                <div class="close" >
                  <a-icon type="close" @click="categoryPlusStatus = 0 , (tutorialStep.status ? isTutorialStep({type:'val',param:1}) : '')"/>
              </div>
            </div>            
        </div>
      </div>
      <transition name="body-transition">
        <nuxt />
        <!-- <div v-show="todoDataList.length === 0" class="empty"> -->
        <!-- <div v-else class="empty">
            <div class="main-template" v-if="!tutorialStep.status">
              <div class="main-img">
                <img src="../assets/img/post-icon_m.png" alt="logo">
              </div>
              <span class="title">Amatda</span>
              <span class="sub">일정을 기록하고 메모하세요!</span>
              <button @click="isTutorialStep({type:'status',param:true}) , isCategoryTab = true , isTutorialStep({type:'val', param:1})">Tutorial</button>
            </div>
        </div> -->
      </transition>
    </a-layout-content>
    <!-- <todoModal v-if="isTodoModal"/> -->
    <ZoomTodoModal v-if="isZoomTodoModal" :categoryData="categoryCreateData"/>
    <div class="tutorial" 
        :class="tutorialStep.val === 1 ? 'step1' 
               :tutorialStep.val === 2 ? 'step2'
               : ''"
        v-if="tutorialStep.status"
      >
      <a-icon type="caret-left" theme="filled" />
      <span>Click!</span>
    </div>
  </a-layout>
</template>
<script>
import { mapState , mapMutations , mapActions } from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
// import todoModal from '../components/modal/todoModal'
import ZoomTodoModal from '../components/modal/ZoomTodoModal'
export default {
  data() {
    return {
      categoryCreateData:{
        color: '',
        name: ''
      },
      categoryPlusStatus: 0,
      categoryTitleMod:[],
    }
  },    
  computed: {
    ...mapState(['tutorialStep','todoDataList','isTodoModal' , 'isZoomTodoModal','isCategoryTab']),
  },
  mounted(){
  },
  components: {
    ZoomTodoModal,
    swiper,
    swiperSlide,
  },
  watch:{
    categoryPlusStatus(){
      if(this.categoryPlusStatus === 0){
        this.categoryCreateData = {
          color: '',
          name: ''
        }
      }
    },
  },
  methods: {
    ...mapMutations(['isTutorialStep','setTodoDataList','setIsZoomTodoModal','setIsCategoryTab']),
    // setTodoDataList({type:'isMod' , idx: i}) , categoryTitleMod.splice(i,1,!categoryTitleMod[i]) , document.getElementById(`mod_input_${i}`).focus()
    clickCategoryShowMod(idx){
      this.setTodoDataList({type:'isMod' , idx: idx})
      this.categoryTitleMod.splice(idx,1,!this.categoryTitleMod[idx])
      setTimeout(_ => {
        document.getElementById(`mod_input_${idx}`).focus()
      },100)
    },
    editInputText(i,e){
      this.setTodoDataList({type:'setCategoryName' , idx: i , value: e.target.value})
    },
    submitCategory(val){
      console.log('e : ',val)
      if(val === ''){
        alert('카테고리 이름을 입력해주세요.')
        return false
      }else{
        this.setTodoDataList(
          {
            type:'push', 
            value: {
              categoryName: this.categoryCreateData.name,
              isPick: true,
              isMod: false,
              color: this.categoryCreateData.color,
              todoList:[],
            }
          }
        )
        this.categoryTitleMod.push(false)
        this.categoryPlusStatus = 0
        if(this.tutorialStep){
          this.isTutorialStep({type:'val',param: 3})
        } 
      }
    },
    categoryClass(val,idx){
      let result = '';
      if(val.color){
        result = val.color;
      }else {
        result = 'all'
      }
      if(val.isPick){
        result += ' on'
      }
      return result
    },
  },
}
</script>
<style lang="scss">
@media screen and (max-width: 766px) {
  .container-header{
      grid-template-rows: 1fr 1fr !important;
        grid-template-columns: none !important;
        height: 84px !important;
      >.top-nav-logo{
        width: 100% !important;
        >.logo{
          width: 100% !important;
        }
        >.tab{
          display: none !important;  
        }
      }
      >.top-nav-category{
        // display: none !important;
      }
  }
  .body-contents{
    height: calc(100vh - 84px) !important;
    margin-top: 84px !important;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display:none;
    }
  }
}
.body-transition-enter-active{
    transition: opacity 1s ease;
}
.body-transition-enter,
.body-transition-leave-active{
    transition: opacity 1s ease;
    opacity: 0;
}
.tutorial{
  position: fixed;
  left: 155px;
  top: 55px;
  width: 119px;
  height: 37px;
  z-index: 1;
  display: none;
  justify-content: center;
  align-items: center;
  
  >i{
    font-size: 32px;
  }
  >span{
    font-size: 32px;
    font-weight: bold;
  }
  
}
.tutorial.step1{
  display: flex;
  -webkit-animation: move .5s infinite;
  animation: move .5s infinite;
  @keyframes move {
    0%{left: 155px;}
    50%{left: 165px;}
    100%{left: 155px;}

    // 0%{top: 55px;}
    // 50%{top: 45px;}
    // 100%{top: 55px;}

    // from{
    //   top:0;
    // }
    // to{
    //   top:50px;
    // }
  }
}
.tutorial.step2{
  display: flex;
  -webkit-animation: move2 .5s infinite;
  animation: move2 .5s infinite;
  @keyframes move2 {
    0%{left: 230px;}
    50%{left: 240px;}
    100%{left: 230px;}
  }
}
.tutorial.step3{
  position: absolute;
  left: -150px;
  top: 0;
  display: flex;
  -webkit-animation: move3 .5s infinite;
  animation: move3 .5s infinite;
  @keyframes move3 {
    0%{left: -150px;}
    50%{left: -140px;}
    100%{left: -150px;}
  }
}
.tutorial.step4{
  position: absolute;
  left: 320px;
  top: 0;
  display: flex;
  -webkit-animation: move4 .5s infinite;
  animation: move4 .5s infinite;
  @keyframes move4 {
    0%{left: 320px;}
    50%{left: 330px;}
    100%{left: 320px;}
  }
}
.ant-layout{
  background: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.container-header{
  // background: white !important; 
  // box-shadow: 0px 0px 5px 1px gray;  
  line-height:0 ;
  padding:0 ;
  height: 42px ;
  background: white ;
  // box-shadow: 3px 0 15px 6px rgba(0, 0, 0, 0.16);
  position: fixed;
  width: 100%;
  z-index: 1;
  // display: flex;
  // justify-content: space-between;
  // border-bottom: 2px solid #0000001c;
  // box-shadow: 18px 0 10px 0 rgba(0,0,0,.16);
  display: grid;
  grid-template-columns: 230px 1fr;

  >.top-nav-logo{
    width: 230px;
    display: flex;
    z-index: 1;
    // box-shadow: 14px 0px 20px 8px rgba(0, 0, 0, 0.16);
    box-shadow: 9px 0px 34px 2px rgba(0, 0, 0, 0.50);
    >.logo{
      background: #4b5f82;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80%;
      font-weight:bold;
      // border-bottom: 2px solid #0000001c;
      >img{
        cursor: pointer;
        width: 30px;
        margin-right: 10px;
      }
      >span{
        cursor: pointer;
        display: flex;
        height: 100%;
        align-items: center;
        color: white;
      }
    }
    >.tab{
      cursor: pointer;
      // border: 2px solid #0000001c;
      background: #4b5f82;
      color: white;
      font-size: 18px;
      border-top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20%;
    }
    >.tab.on{
      // border-bottom: 0;
      background: #f1f2f6;
      color: #4b5f82;
    }
  }
  >.top-nav-category{
    z-index: 0;
    background: #3e536e;
    display: flex;
    font-size: 16px;
    justify-content: flex-end;
    // border-bottom: 2px solid rgba(0,0,0,0.1098);
    a{
      height: 100%;
      width: 62px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      >p{
        margin: 0;
      }
    }
    a.on{
      color: white;
      background: #6073ff;
    }
  }
}
.body-contents{
  // background: #14193a;
  // background: url('../assets/img/space-image.jpg') no-repeat center;
  // background-size: cover;
  height: calc(100vh - 42px);    
  // height: 100vh;
  display: flex;
  margin-top: 42px;
  width: 100%;
  min-height: 1000px;
  z-index: 1;
  >.side-nav{
    background: #f1f2f6;
    width: 230px;
    flex-shrink: 0;
    height: calc(100vh - 42px);   
    overflow: auto;  
    -ms-overflow-style: none;
    // border-right: 2px solid #0000001c;;
    &::-webkit-scrollbar {
        display:none;
    }
    padding: 5px;
    box-shadow: 0px 27px 19px 0px rgba(0, 0, 0, 0.4);
    z-index: 1;
    // -webkit-box-shadow: rgba(0,0,0,.16) 3px 0 15px;
    // box-shadow: 3px 0 15px rgba(0,0,0,.16);

    >div{
      width: 100%;
      // height: 50px;
      height: 32px;
    }
    >.category-contents{
      display: flex;
      height: 42px;
      margin-bottom: 5px;
      >.category-title{
        z-index: 0;
        cursor: pointer;
        display: flex;        
        justify-content: center;
        align-items: center;
        width: 100%;
        >.mod-input{
          display: grid;
          grid-template-columns: 70% 30%;
          width: 80%;
          >input{
            text-align: center;
            border: 0;
          }
          >input:focus{
            outline: none;
          }
          >.mod-btn{
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #4b5f82;
            font-weight: bold;
            font-size: 12px;
            border-left: 1px solid;
            color: white;
          }
        }
      }
      >.category-mod{
        z-index: 1;
        display: flex;
        width: 0;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: all 0.5s ease;
        background: white;
        >i{
            cursor: pointer;
            font-size: 18px;
        }
        >.mod-template{
          position: absolute;
          left: 225px;
          height: 42px;
          width: 84px;
          // top: 47px;
          background: white;
          // border: 1px solid #548cff;
          border-left: 0px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          font-size: 24px;
          >.anticon-edit{
            cursor: pointer;
            color: #3bc73c;
          }
          >.anticon-delete{
            cursor: pointer;
            color: red;
          }
        }
      }
    }
    >.category-contents:hover{
      >.category-mod{
        width: 50px;
        opacity: 1;
      }
    }
    // >.category-contents.all{
    //   border: 1px solid #5d5d5d;
    //     // border: 1px solid #ffa40d;
    //     >.category-title{
    //       background: #d8d8d8;
    //     }
    //     >.category-mod{
    //       // background: #fff2ab;
    //       background: #a0a0a0;
    //     }
    // }
    // .category-contents.all.on{
    //     >.category-title{
    //       background: #5d5d5d;
    //       >span{
    //         color: white;
    //       }
    //     }
    //     >.category-mod{
    //       background: white;
    //     }
    // }
    >.category-contents.yellow{
        border: 1px solid #ffbf54;
        // border: 1px solid #ffa40d;
        >.category-title{
          background: #fff7d1;
        }
        >.category-mod{
          >i{
            color: #ffbf54;
          }
        }
        >.category-mod.on{
          background: #ffbf54;
          >i{
            color: white;
          }
          >.mod-template{
            border: 1px solid #ffbf54;
          }
        }
    }
    .category-contents.yellow.on{
        >.category-title{
          background: #ffbf54;
          >span{
            color: white;
          }
        }
        >.category-mod{
        }
    }
    >.category-contents.red{
        border: 1px solid #ff5954;
        >.category-title{
          background: #ffded1;
        }
        >.category-mod{
          >i{
            color: #ff5954;
          }
        }
        >.category-mod.on{
          background: #ff5954;
          >i{
            color: white;
          }
          >.mod-template{
            border: 1px solid #ff5954;
          }
        }
    }
    .category-contents.red.on{
        >.category-title{
          background: #ff5954;
          >span{
            color: white;
          }
        }
        >.category-mod{
        }
    }
    >.category-contents.blue{
        border: 1px solid #548cff;
        >.category-title{
          background: #d1dbff;
        }
        >.category-mod{
          >i{
            color: #548cff;
          }
        }
        >.category-mod.on{
          background: #548cff;
          >i{
            color: white;
          }
          >.mod-template{
            border: 1px solid #548cff;
          }
        }
    }
    .category-contents.blue.on{
        >.category-title{
          background: #548cff;
          >span{
            color: white;
          }
        }
        >.category-mod{
        }
    }
    >.category-contents.green{
        // border: 1px solid #54ff56;
        border: 1px solid #3bc73c;
        >.category-title{
          background: #d2ffd1;
        }
        >.category-mod{
          >i{
            color: #3bc73c;
          }
        }
        >.category-mod.on{
          background: #3bc73c;
          >i{
            color: white;
          }
          >.mod-template{
            border: 1px solid #3bc73c;
          }
        }
    }
    .category-contents.green.on{
        >.category-title{
          background: #3bc73c;
          >span{
            color: white;
          }
        }
        >.category-mod{
        }
    }
    >.category-contents.purple{
        border: 1px solid #ba54ff;
        >.category-title{
          background: #e9d1ff;
        }
        >.category-mod{
          >i{
            color: #ba54ff;
          }
        }
        >.category-mod.on{
          background: #ba54ff;
          >i{
            color: white;
          }
          >.mod-template{
            border: 1px solid #ba54ff;
          }
        }
    }
    .category-contents.purple.on{
        >.category-title{
          background: #ba54ff;
          >span{
            color: white;
          }
        }
        >.category-mod{
        }
    }

    >.category-plus{
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      >.category-plus-icon{
        font-size: 28px;
        cursor: pointer;
      }
    }
    >.category-plus.color-pick{
      >.colors{
        display: flex;
        width: 100%;
        height: 100%;
        >.colors-list{          
          height: 100%;
          width: 85%;          
          display: flex;
          justify-content: space-around;
          align-items: center;
          >div{
            width: 30px;
            height: 30px;
            border-radius: 20px;            
            display: flex;            
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          >.yellow{
            border: 2px solid #ffbf54;
          }          
          >.yellow:hover{
            border: 0px;
          }
          >.yellow::after{
            content: '';
            width: 85%;
            height: 85%;
            background: #ffed89;
            border-radius: 20px;
            border: 2px solid #ffbf54;
          }
          .yellow::after:hover{
            background: #ffbf54;
          }          
          >.red{
            border: 2px solid #ff5954;
          }
          >.red:hover{
            border: 0px;
          }
          >.red::after{
            content: '';
            width: 85%;
            height: 85%;
            background: #ffb7ab;
            border-radius: 20px;
            border: 2px solid #ff5954;
          }
          >.blue{
            border: 2px solid #548cff;
          }
          >.blue:hover{
            border: 0px;
          }
          >.blue::after{
            content: '';
            width: 85%;
            height: 85%;
            background: #abb9ff;
            border-radius: 20px;
            border: 2px solid #548cff;
          }
          >.green{
            border: 2px solid #3bc73c;
          }
          >.green:hover{
            border: 0px;
          }
          >.green::after{
            content: '';
            width: 85%;
            height: 85%;
            background: #8aff99;
            border-radius: 20px;
            border: 2px solid #3bc73c;
          }
          >.purple{
            border: 2px solid #ba54ff;
          }
          >.purple:hover{
            border: 0px;
          }
          >.purple::after{
            content: '';
            width: 85%;
            height: 85%;
            background: #dbabff;
            border-radius: 20px;
            border: 2px solid #ba54ff;
          }
          
        }
        >.close{                    
          height: 100%;
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;          
          >.anticon-close{
            cursor: pointer;
            font-size: 20px;
          }
        }
      }      
    }
    >.category-title{      
      >.title-input{
        display: flex;
        width: 100%;
        height: 100%;
        >.title{
          height: 100%;
          width: 85%;
          display: flex;
          justify-content: center;
          align-items: center;
          .ant-input-search{
            width: 85%;
            .ant-input{
              font-size: 12px;
              height: 30px;
            }
            .ant-btn{
              height: 30px;
              font-size: 12px;
            }
          }
        }
        >.close{                    
          height: 100%;
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;          
          >.anticon-close{
            cursor: pointer;
            font-size: 20px;
          }
        }
      }
    }
  }
}
// .body-contents:after {
//   content: '';
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100vw;
//   height: 100vh;
//   background: url('../assets/img/space-image.jpg') no-repeat center;
//   background-size: cover;
//   z-index: -1;
// }
</style>

