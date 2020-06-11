<template>
  <!-- <div>
    <nuxt />
  </div> -->
  <a-layout>
    <a-layout-header class="container-header">
      <div class="top-nav-logo clearfix">
          
      </div>
      <div class="top-nav-category clearfix">
          <a href="#" :class="$route.path === '/' ? 'on' : ''" @click.prevent="$router.push('/')"><p>Home</p></a>
          <a href="#" :class="$route.path === '/todo' ? 'on' : ''" @click.prevent="$router.push('/todo')"><p>Todo</p></a>
          <a href="#" :class="$route.path === '/profile' ? 'on' : ''" @click.prevent="$router.push('/')"><p>Profile</p></a>
      </div>
      <!-- <a-menu 
        theme="blue"
        mode="horizontal"        
        style="float: right; line-height: 64px;"
      >      
        <a-menu-item key="1" style="float: left;" @click="$router.push('/')">Home</a-menu-item>
        <a-menu-item key="2" style="float: left;" @click="$router.push('/todo')">Todo</a-menu-item>
        <a-menu-item key="3" style="float: left;" @click="$router.push('/profile')">Profile</a-menu-item>        
      </a-menu> -->
        <!-- :class="$route.path === '/' ? 'ant-menu-item-selected ' : ''" -->
        <!-- :class="$route.path === '/todo' ? 'ant-menu-item-selected' : ''" -->
        <!-- :class="$route.path === '/profile' ? 'ant-menu-item-selected' : ''" -->
    </a-layout-header>
    <a-layout-content class="body-contents">
      <div class="side-nav">        
        <div v-for="(v,i) in categoryData" :key="i" 
          class="category-contents"
          :class="categoryClass(v)"
        >
            <div class="category-title" @click="categoryData[i].OnOff = !categoryData[i].OnOff">
              <span>{{v.title}}</span>
            </div>
            <div class="category-mod">
              <a-icon type="dash" />
            </div>
        </div>
        <!-- <div  class="category-contents yellow">
            <div class="category-title">
              <span>내용 1</span>
            </div>
            <div class="category-mod">
              <a-icon type="dash" />
            </div>
        </div>
        <div class="category-contents red">
            <div class="category-title">
              <span>내용 2</span>
            </div>
            <div class="category-mod">
              <a-icon type="dash" />
            </div>
        </div>
        <div class="category-contents blue">
            <div class="category-title">
              <span>내용 3</span>
            </div>
            <div class="category-mod">
              <a-icon type="dash" />
            </div>
        </div>
        <div class="category-contents green">
            <div class="category-title">
              <span>내용 4</span>
            </div>
            <div class="category-mod">
              <a-icon type="dash" />
            </div>
        </div>
        <div class="category-contents purple">
            <div class="category-title">
              <span>내용 5</span>
            </div>
            <div class="category-mod">
              <a-icon type="dash" />
            </div>
        </div> -->


        <div class="category-plus">
            <a-icon type="plus-square" class="category-plus-icon"/>
        </div>
      </div>
      <nuxt />
    </a-layout-content>
      
  </a-layout>
</template>
<script>
import { mapState , mapMutations } from 'vuex';
export default {
  data() {
    return {
      categoryData:[
        {
          color : 'yellow',
          title : '내용 1',
          OnOff: false,
        },
        {
          color : 'red',
          title : '내용 2',
          OnOff: false,
        },
        {
          color : 'blue',
          title : '내용 3',
          OnOff: false,
        },
        {
          color : 'green',
          title : '내용 4',
          OnOff: false,
        },
        {
          color : 'purple',
          title : '내용 5',
          OnOff: false,
        },
      ]
    }
  },    
  computed: {
    ...mapState(['fullPath']),    
  },
  methods: {
    ...mapMutations(['setFullPath']),
    categoryClass(val){
      let result = val.color;
      if(val.OnOff){
        result += ' on'
      }
      return result
    },
  },
}
</script>
<style lang="scss">
.container-header{
  // background: white !important; 
  // box-shadow: 0px 0px 5px 1px gray;
  background: none !important;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  border-bottom: 5px solid #6073ff;
  // border-bottom: 1px solid #e8e8e8 !important;
  >.top-nav-logo{
    float: left;
    background: black;
    width: 150px;
    height: 100%;
  }
  >.top-nav-category{
    height: 100%;
    float: right;
    a{
      height: 100%;
      width: 100px;
      color: #6073ff;
      float: left;
      text-align: center;
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
  // height: calc(100vh - 64px);    
  display: flex;
  margin-top: 64px;
  height: calc(100vh - 64px);
  width: 100%;
  min-height: 1000px;
  >.side-nav{
    width: 15%;
    height: 100%;    
    border: 5px solid white;
    overflow: auto;  
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display:none;
    }

    >div{
      width: 100%;
      height: 50px;      
    }
    >.category-contents{
      cursor: pointer;
      display: flex;
      >.category-title{
        display: flex;        
        justify-content: center;
        align-items: center;
        width: 85%;
        >span{
          // font-weight: bold;
        }
      }
      >.category-mod{
        display: flex;        
        justify-content: center;
        align-items: center;        
        width: 15%; 
        >i{
            color: black;
        }
      }      
      margin-bottom: 5px;
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
        font-size: 32px;
        cursor: pointer;
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

