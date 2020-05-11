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
      <nuxt />
    </a-layout-content>
      
  </a-layout>
</template>
<script>
import { mapState , mapMutations } from 'vuex';
export default {
  data() {
    return {      
    }
  },    
  computed: {
    ...mapState(['fullPath']),
  },
  methods: {
    ...mapMutations(['setFullPath'])
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
  background: url('../assets/img/space-image.jpg') no-repeat center;
  background-size: cover;
  // height: calc(100vh - 64px);    
  height: 100%;  
  width: 100%;
  min-height: 1000px;
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

