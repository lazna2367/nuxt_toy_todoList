<template>
  <div class="home-container">        
    <!-- 텍스트박스 -->
    <!-- <transition name="modal" class="text-box-area">
      <span class="text-value">안녕하세요</span>
      <div>
          <a-button type="primary"> 
            Primary
          </a-button>
      </div>
    </transition> -->
        <div class="text-box-area">
          <transition name="modal">
            <span class="text-value" v-if="value">안녕하세요</span>
          </transition>
          <div>
              <a-button type="primary" @click="value = !value"> 
                Primary
              </a-button>
          </div>
      </div>
      

    <!-- 카테고리탭 -->    
    <div>      
    </div>
    <!-- 검색탭 -->
    <div>

    </div>
    <!-- 카드 리스트 탭 -->
    <div>

    </div>
    <!-- 생성 삭제 버튼 -->
    <div class="plus-minus-btn-area">
      <a-icon type="plus-circle" class="plus-btn" theme="twoTone" two-tone-color="#004eff"/>
      <a-icon type="minus-circle" class="minuss-btn" theme="twoTone" two-tone-color="#ff4242"/>
    </div>
    <!-- topMoveBtn -->
    <div class="up-btn-area">
      <a-icon type="up-square" class="up-btn" theme="twoTone" two-tone-color="#848484"/>
      <!-- theme="twoTone" two-tone-color="#848484" -->
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      value : false
    }
  },
  components: {
    
  }
}
</script>

<style lang="scss">
.text-box-area{
  // transition: opacity 0.3s ease;
  transition: all 0.3s ease;
  >.text-value{
    color: white;
    font-size: 60px;        
    font-weight: bold;
    font-family: monospace;
  }
}
.home-container{
  width: 90%;
  height: 100vh;
  // height: 100%;
  // background: white;
  background: rgba(0,0,0,0.7);
  margin: 0 auto;
  margin-top: 64px;
}
.plus-minus-btn-area{
  position: fixed;
  top: 90px;
  right: 18px;
  width: 60px;
  height: 130px;
    .plus-btn{
      font-size: 60px;
    }
    .minuss-btn{
      font-size: 60px;
      margin-top: 10px;
    }
}
.up-btn-area{
    position: fixed;
    right: 18px;
    bottom: 100px;
    .up-btn{
      font-size: 60px;
      // color: #848484;
      // background: white;
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
