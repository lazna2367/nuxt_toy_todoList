<template>
  <div class="home-container">
    <div class="todo-card-list">
        <div class="todo-card yellow" v-for="i in 1" :key="i">
          <div class="todo-top">                          
                <!-- 줌인 -->
                <!-- <a-icon type="fullscreen" /> -->
                <!-- 텍스트 -->
                <!-- <a-icon type="edit" /> -->
                <!-- 사진 -->
                <!-- <a-icon type="picture" /> -->
                <!-- 날짜 -->
                <!-- computer-icons-map-symbol-map-icon.jpg -->
                <!-- 지도 -->
                <!-- computer-icons-map-symbol-map-icon.jpg -->

                <!-- 수정 아이콘 -->
                <!-- <a-icon type="form" /> -->
                <div class="zoom-in-btn">
                    <a-icon type="fullscreen" />
                </div>
                <div class="write-list">
                    <a-icon type="edit" />
                    <a-icon type="edit" />
                    <a-icon type="picture" />
                    <a-icon type="picture" />
                </div>
                <div class="wrtie-btn">
                    <a-icon type="form" />
                </div>              
          </div>
          <div class="todo-body">

          </div>
        </div>
        <!-- <div class="todo-card-void" v-show="htmlWidth < 1800 && htmlWidth > 1384"/> -->
    </div>    
    <div class="side-btn">      
        <!-- <a-icon type="plus-square" />             -->
        <!-- <a-icon type="minus-square" />       -->
        <!-- <a-icon type="plus-square" theme="twoTone" />
        <a-icon type="minus-square" theme="twoTone" two-tone-color="red"/> -->
        <a-icon type="plus-square" theme="filled" />
        <a-icon type="minus-square" theme="filled" />
    </div>
    <!-- <transition name="modal">
    </transition> -->
  </div>
</template>

<script>

export default {
  data(){
    return {
      htmlWidth: 0,
    }
  },  
    
  components: {},
  mounted() {
    this.htmlWidth = window.innerWidth
    window.addEventListener('resize',() => {
      this.htmlWidth = window.innerWidth
    })       
  },
  methods: {
  },
  
}
</script>

<style lang="scss">
.home-container{
  width: 85%;
  height: calc(100vh - 64px);
  margin: 0 auto;  
  display: flex;
  flex-wrap: wrap;
  padding: 30px 50px 0px 50px;
  overflow-y: auto;
  >.todo-card-list{
    background: white;
    padding: 50px;
    border-radius: 30px;
    width: 93%;
    display: flex;
    flex-flow: wrap;
    box-shadow: 3px 0 15px 2px rgba(0, 0, 0, 0.16);
    margin-bottom: 30px;
    >.todo-card-void{
      width: 300px;
      height: 300px;
      margin: 14px;
    }
    >.todo-card{    
      width: 300px;
      height: 300px;
      margin: 15px;
      display: flex;
      flex-flow: column;
      box-shadow: 2px 0px 6px 1px rgba(0, 0, 0, 0.16);
      >.todo-top{
        width: 100%;
        height: 15%;
      }
      >.todo-body{
        width: 100%;
        height: 85%;
      }
    }
    
    >.todo-card.yellow{
      border: 1px solid #ffbf54;
      >.todo-top{
        background: #ffed89;
      }
      >.todo-body{
        background: #fff7d1;
      }
    }
    >.todo-card.red{
      border: 1px solid #ff5954;
      >.todo-top{
        background: #ffb7ab;
      }
      >.todo-body{
        background: #ffded1;
      }
    }
    >.todo-card.blue{
      border: 1px solid #548cff;
      >.todo-top{
        background: #abb9ff;
      }
      >.todo-body{
        background: #d1dbff;
      }
    }
    >.todo-card.green{
      border: 1px solid #3bc73c;
      >.todo-top{
        background: #8aff99;
      }
      >.todo-body{
        background: #d2ffd1;
      }
    }
    >.todo-card.purple{
      border: 1px solid #ba54ff;
      >.todo-top{
        background: #dbabff;
      }
      >.todo-body{
        background: #e9d1ff;
      }
    }
  }
  
  >.side-btn{    
    position: absolute;
    right: 2%;
    height: 100px;
    width: 100px;
    display: flex;
    flex-direction: column;
    >.anticon-plus-square{
      font-size: 40px;
      color: #0089ff;
    }
    >.anticon-minus-square{
      font-size: 40px;
      color: red;
    }
  }
  
}
.modal-enter, .modal-leave-to {
    opacity: 0;
}
.modal-leave-active , .modal-enter-active{
    // opacity: 0;
    transition: opacity .5s;
}
// .modal-enter .modal-container,
// .modal-leave-active .modal-container {
//     -webkit-transform: scale(1.1);
//     transform: scale(1.1);
// }
</style>
