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
        
          <div class="text-value">{{autoText}}</div>
            <!-- <span class="text-value">{{autoText}}</span> -->
            <!-- <span></span> -->
          <transition name="modal">
          <div class="text-value-btn" v-if="isButtonOpen">
              <a-button type="primary" @click="nextEvent" > 
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
      <a-icon type="plus-circle" class="plus-btn" theme="twoTone" two-tone-color="#004eff" @click="isCreateModal = true"/>
      <a-icon type="minus-circle" class="minuss-btn" theme="twoTone" two-tone-color="#ff4242"/>
    </div>
    <!-- topMoveBtn -->
    <div class="up-btn-area">
      <a-icon type="up-square" class="up-btn" theme="twoTone" two-tone-color="#848484"/>
      <!-- theme="twoTone" two-tone-color="#848484" -->
    </div>
    <transition name="modal">
    <create-card-modal v-if="isCreateModal" @close="isCreateModal = false"/>
    </transition>
  </div>
</template>

<script>
import CreateCardModal from '@/components/modal/CreateCardModal'

export default {
  data(){
    return {
      isCreateModal: false,
      isMainStatus: 0,
      autoText: '',
      startValue: '안녕하세요.',
      statusValueDatas:[
        '안녕하세요!',        
        '혹시 하려 했던 걸 잊어버린 적 한 번쯤 있으시지 않나요?',
        'Todo-List 한번 작성해보세요!'
      ],
      // '혹시 하려고 했던 걸 까먹는 일이 있지 않으신가요?',
      isButtonOpen : false,
    }
  },  
    
  components: {
    CreateCardModal
  },
  mounted() {
    setTimeout(_ => {
      this.autoTexts()        
    },1000)    
    
  },
  methods: {
    nextEvent(){
      if(this.isMainStatus === 0){
        this.isMainStatus = 1;
        this.isButtonOpen = false;
      }else if(this.isMainStatus === 1){
        this.isMainStatus = 2;
        this.isButtonOpen = false;
      }else if(this.isMainStatus === 2){
        this.isCreateModal = true;
        return false;
      }
      this.removeTexts();
      
    },
    removeTexts(){
      if(this.autoText.length > 0){        
        setTimeout(_ => {
          this.autoText = this.autoText.slice(0, -1)
          this.removeTexts()
        },50)
      }else {
        setTimeout(_ => {
          this.autoTexts();          
        },500)
        return false;
      }
    },
    autoTexts(){
      if(this.isMainStatus === 0){
        if(this.autoText.length < this.statusValueDatas[this.isMainStatus].length){
          setTimeout(_ => {
            this.autoText += this.statusValueDatas[this.isMainStatus][this.autoText.length]
            this.autoTexts()
          },100)
        }else {
          setTimeout(_ => {
            this.isButtonOpen = true;  
          },300)        
          return false
        }        
      }else if(this.isMainStatus === 1){
        if(this.autoText.length < this.statusValueDatas[this.isMainStatus].length){
          setTimeout(_ => {
            this.autoText += this.statusValueDatas[this.isMainStatus][this.autoText.length]
            this.autoTexts()
          },50)
        }else {
          setTimeout(_ => {
            this.isButtonOpen = true;  
          },500)
        }
      }else if(this.isMainStatus === 2){
        if(this.autoText.length < this.statusValueDatas[this.isMainStatus].length){
          setTimeout(_ => {
            this.autoText += this.statusValueDatas[this.isMainStatus][this.autoText.length]
            this.autoTexts()
          },100)
        }else {
          setTimeout(_ => {
            this.isButtonOpen = true;  
          },500)
        }
      }
    }
  },
  
}
</script>

<style lang="scss">
// background: rgb(34, 55, 220);
.text-box-area{
  // position: absolute;
  position: relative;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  >.text-value{
    // margin: 0 auto;
    color: white;
    font-size: 50px;        
    font-weight: bold;
    // font-family: monospace;
    position: absolute;
    left: 50%;
    width: 800px;
    /* top: 77%; */
    transform: translate(-50%, -110%);
  }
  >.text-value-btn{
    // position: fixed;
    // left: 46%;
    // top: 50%;
    position: absolute;
    left: 50%;
    /* top: 77%; */
    transform: translateX(-50%);
    >button{
      background: #6073ff;
      border: 0;
      width: 250px;
      height: 50px;
      font-size: 20px;
      font-weight: bold;
      // margin-top: 20px;
    }
  }
}
.home-container{
  width: 100%;
  height: calc(100vh - 64px);
  background: rgba(0,0,0,0.7);
  margin: 0 auto;
  margin-top: 64px;
  position: relative;
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
