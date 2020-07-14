<template>
  <a-layout style="background:none;">
    <a-layout-header class="container-header">
      <div class="top-nav-logo">
          <div class="logo">
            <span>Amatda</span>
          </div>
          <div class="tab">
            <a-icon type="menu" />
          </div>
      </div>
      <div class="top-nav-category">
          <a href="#" :class="$route.path === '/todo' ? 'on' : ''" @click.prevent="$router.push('/todo')"><p><a-icon type="login" /></p></a>
          <a href="#" :class="$route.path === '/profile' ? 'on' : ''" @click.prevent="$router.push('/')"><p><a-icon type="bell" /></p></a>
          <a href="#" :class="$route.path === '/' ? 'on' : ''" @click.prevent="$router.push('/')"><p><a-icon type="user" /></p></a>
      </div>
    </a-layout-header>
    <a-layout-content class="body-contents">
      <div class="side-nav">
        <!-- <div class="logo">
          
        </div> -->
        <template v-if="todoDataList.length > 1">
          <div v-for="(v,i) in todoDataList" :key="i"
            class="category-contents"
            :class="categoryClass(v,i)"
          >
            <div class="category-title" @click="setTodoDataList({type:'categoryPick' , idx: i})" >
                <span>{{v.categoryName}}</span>
            </div>
            <div class="category-mod">
              <a-icon type="unordered-list" v-if="i === 0" />
              <a-icon type="dash" v-else />
            </div>
          </div>
        </template>

        <!-- 카테고리 추가 -->
        <div class="category-plus" 
            :class="categoryPlusStatus === 1 ? 'color-pick' 
            :categoryPlusStatus === 2 ? 'category-title'
            : ''">
            <a-icon type="plus-circle" class="category-plus-icon" v-if="categoryPlusStatus === 0" @click="categoryPlusStatus = 1"/>
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
                  <a-icon type="close" @click="categoryPlusStatus = 0"/>
              </div>
            </div>
            <!-- 타이틀 작성 -->
            <div class="title-input" v-if="categoryPlusStatus === 2">
                <div class="title">
                    <a-input-search placeholder="카테고리명" size="large" @search="submitCategory" v-model="categoryCreateData.name">
                    <a-button slot="enterButton" type="primary">
                      저장
                    </a-button>
                  </a-input-search>
                </div>
                <div class="close" >
                  <a-icon type="close" @click="categoryPlusStatus = 0"/>
              </div>
            </div>            
        </div>
      </div>
      <nuxt />
    </a-layout-content>
    <todoModal v-if="isTodoModal"/>
  </a-layout>
</template>
<script>
import { mapState , mapMutations , mapActions } from 'vuex';
import todoModal from '../components/modal/todoModal'
export default {
  data() {
    return {
      isCategoryOnOff: true,
      categoryCreateData:{
        color: '',
        name: ''
      },
      categoryPlusStatus: 0,
    }
  },    
  computed: {
    ...mapState(['todoDataList','isTodoModal']),    
  },
  components: {
    todoModal,
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
    ...mapMutations(['setTodoDataList']),
    submitCategory(){
      this.setTodoDataList(
        {
          type:'push', 
          value: {
            categoryName: this.categoryCreateData.name,
            isPick: false,
            color: this.categoryCreateData.color,
            todoList:[],
          }
        }
      )
      this.categoryPlusStatus = 0        
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
  padding:0 !important;
  height: 42px !important;
  background: white !important;
  // box-shadow: 3px 0 15px 6px rgba(0, 0, 0, 0.16);
  position: fixed;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #0000001c;
  >.top-nav-logo{
    width: 230px;
    display: flex;
    >.logo{
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80%;
      font-weight:bold;
    }
    >.tab{
      border-left: 2px solid #0000001c;
      border-right: 2px solid #0000001c;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20%;
    }
  }
  >.top-nav-category{
      display: flex;
      font-size: 16px;
    a{
      height: 100%;
      width: 62px;
      color: #6073ff;
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
  >.side-nav{
    z-index: 1;
    
    width: 231px;
    flex-shrink: 0;
    height: calc(100vh - 42px);   
    overflow: auto;  
    -ms-overflow-style: none;
    border-right: 2px solid #0000001c;;
    &::-webkit-scrollbar {
        display:none;
    }
    // -webkit-box-shadow: rgba(0,0,0,.16) 3px 0 15px;
    // box-shadow: 3px 0 15px rgba(0,0,0,.16);

    >div{
      width: 100%;
      // height: 50px;
      height: 32px;
    }
    >.category-contents{
      cursor: pointer;
      display: flex;
      height: 42px;
      // margin-bottom: 5px;
      >.category-title{
        display: flex;        
        justify-content: center;
        align-items: center;
        // width: 80%;
        width: 196px;
        >span{
          // font-weight: bold;
        }
      }
      >.category-mod{
        display: flex;        
        justify-content: center;
        align-items: center;        
        width: 20%; 
        >i{
            color: black;
        }
      }
    }
    >.category-contents.all{
      border: 1px solid #5d5d5d;
        // border: 1px solid #ffa40d;
        >.category-title{
          background: #d8d8d8;
        }
        >.category-mod{
          // background: #fff2ab;
          background: #a0a0a0;
        }
    }
    .category-contents.all.on{
        >.category-title{
          background: #5d5d5d;
          >span{
            color: white;
          }
        }
        >.category-mod{
          background: white;
        }
    }
    >.category-contents.yellow{
        border: 1px solid #ffbf54;
        // border: 1px solid #ffa40d;
        >.category-title{
          background: #fff7d1;
        }
        >.category-mod{
          // background: #fff2ab;
          background: #ffed89;
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
          background: white;
        }
    }
    >.category-contents.red{
        border: 1px solid #ff5954;
        >.category-title{
          background: #ffded1;
        }
        >.category-mod{
          background: #ffb7ab;
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
          background: white;
        }
    }
    >.category-contents.blue{
        border: 1px solid #548cff;
        >.category-title{
          background: #d1dbff;
        }
        >.category-mod{
          background: #abb9ff;
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
          background: white;
        }
    }
    >.category-contents.green{
        // border: 1px solid #54ff56;
        border: 1px solid #3bc73c;
        >.category-title{
          background: #d2ffd1;
        }
        >.category-mod{
          // background: #acffab;
          background: #8aff99;
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
          background: white;
        }
    }
    >.category-contents.purple{
        border: 1px solid #ba54ff;
        >.category-title{
          background: #e9d1ff;
        }
        >.category-mod{
          background: #dbabff;
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
          background: white;
        }
    }

    >.category-plus{
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
  // margin-top: 64px;
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

