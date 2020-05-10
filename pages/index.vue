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
            <span class="text-value">{{autoText}}</span>
            <!-- <span></span> -->
          <transition name="modal">
          <div v-if="isButtonOpen">
              <a-button type="primary" @click="nextEvent"> 
                다음
              </a-button>
          </div>
          </transition>
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
      isMainStatus: 0,
      autoText: '',
      startValue: '안녕하세요.',
      isButtonOpen : false
    }
  },
  components: {
    
  },
  mounted() {
    setTimeout(_ => {
      this.autoTexts()        
    },1000)    
    
  },
  methods: {
    nextEvent(){
      if(this.isMainStatus === 0 ){
        this.isMainStatus = 1;
        this.isButtonOpen = false;
      }
      if(this.autoText.length > 0){        
        setTimeout(_ => {
          this.autoText = this.autoText.slice(0, -1)
          this.nextEvent()
        },100)
      }else {
        return false;
      }
    },
    removeTexts(){
      
    },
    autoTexts(){
      if(this.autoText.length < 6){
        setTimeout(_ => {
          this.autoText += this.startValue[this.autoText.length]
          this.autoTexts()
        },100)
      }else {
        setTimeout(_ => {
          this.isButtonOpen = true;  
        },500)        
        return false
      }
    }
  },
  
}
</script>

<style lang="scss">
.text-box-area{
  // transition: opacity 0.3s ease;
  // transition: all 0.3s ease;
  position: fixed;
  left: 44%;
  top: 40%;
  >.text-value{
    color: white;
    font-size: 60px;        
    font-weight: bold;
    font-family: monospace;
  }
  >div{
    position: fixed;
    left: 46%;
    top: 50%;
    >button{
      width: 250px;
      height: 50px;
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
    }
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
