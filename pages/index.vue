<template>
  <div class="home-container">
    <div class="todo-card-list">
      <!-- <transition-group name="modal" tag="div" class="todo-card-list"> -->
        <div class="todo-card yellow" v-for="i in list" :key="i">                      
          <div class="todo-top">                          
                <!-- 줌인 -->
                <!-- <a-icon type="fullscreen" /> -->
                <!-- 텍스트 -->
                <!-- <a-icon type="edit" /> -->
                <!-- 사진 -->
                <!-- <a-icon type="picture" /> -->
                <!-- 날짜 -->
                <!-- computer-icons-agenda-diary-calendar-date-others.jpg -->
                <!-- 지도 -->
                <!-- computer-icons-map-symbol-map-icon.jpg -->

                <!-- 수정 아이콘 -->
                <!-- <a-icon type="form" /> -->
                <!-- <div class="zoom-in-btn">
                    <a-icon type="fullscreen" />
                </div> -->
                <div class="write-list">
                  <div class="arrow">
                    <a-icon type="caret-left" v-if="!isModTodo" @click="isModTodo = !isModTodo"/>
                    <a-icon type="caret-right" v-if="isModTodo" @click="isModTodo = !isModTodo"/>
                  </div>
                  <div class="icons" v-show="isModTodo">
                    <!-- <a-icon type="edit" /> -->
                    <div class="text">
                      <img src="../assets/img/mod-text-icon.png" alt>
                    </div>
                    <a-icon type="picture" />
                    <div class="date">
                      <img src="../assets/img/mod-date-icon.png" alt>
                    </div>
                    <div class="map">
                      <img src="../assets/img/mod-map-icon.png" alt>
                    </div>
                  </div>
                </div>
                <div class="wrtie-btn" @click="isModTodo = !isModTodo">
                    <a-icon type="form" />                    
                </div>              
          </div>
          <div class="todo-body">
            <div class="text-input" v-if="!isTextForm">
              <textarea name="" id="" cols="30" rows="10" v-model="testValue"/>
              <div class="edit-box">
                    <a-icon type="check-circle" @click="isTextForm = true" />
                    <a-icon type="close-circle" />
              </div>
            </div>
            <!-- word-break: break-all; -->
            <div class="text-box" v-else-if="isTextForm">
              <template v-for="(v,i) in value">
                {{v}}<br :key="i">
              </template>
              <div class="mod-icon" @click="isTextForm = false">
                  <a-icon type="edit"/>
              </div>
            </div>
          </div>
        </div>
        <!-- </transition-group> -->
        <!-- <div class="todo-card-void" v-show="htmlWidth < 1800 && htmlWidth > 1384"/> -->
    </div>    
    <div class="side-btn">
        <a-icon type="plus-square" theme="filled" @click="list +=1 "/>
        <a-icon type="minus-square" theme="filled" @click="list === 0 ? '' : list -=1" />
    </div>
    <!-- <transition name="modal">
    </transition> -->          
  </div>
</template>

<script>

export default {
  data(){
    return {
      isModTodo: false,
      testValue:'',
      value:'',
      isTextForm: false,
      htmlWidth: 0,
      list: 0,      
    }
  },  
    
  components: {},
  mounted() {
    this.htmlWidth = window.innerWidth
    window.addEventListener('resize',() => {
      this.htmlWidth = window.innerWidth
    })       
  },
  watch: {
    testValue(){
      // this.value = this.testValue.replace(/\n/g ,'<br>')
      this.value = this.testValue.split('\n');
    }
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
        display: flex;
        justify-content: flex-end;
        align-items: center;
        >.zoom-in-btn{
            display: flex;
            flex: auto;
            font-size: 25px;            
            margin-left: 15px;
        }
        >.write-list{              
            display: flex;            
            >.arrow{
              cursor: pointer;
              font-size: 20px;
            }
            >.icons{
              font-size: 20px;
              display: flex;
              align-items: center;
              >i{
                cursor: pointer;
                width: 32px;
                color: #4c4c4c;;
              }
              >.text{
                cursor: pointer;
                display: flex;
                width: 32px;
                justify-content: center;
                align-items: center;
                padding-left: 4px;
                padding-top: -3px;
                padding-bottom: 1px;
                >img{
                  width: 24px;
                }
              }
              >.date{
                cursor: pointer;
                display: flex;
                width: 32px;
                justify-content: center;
                align-items: center;
                padding-left: 3px;
                padding-top: 2px;
                >img{
                  width: 18px;
                }
              }
              >.map{
                cursor: pointer;
                display: flex;
                width: 32px;
                justify-content: center;
                align-items: center;
                padding-right: 3px;
                >img{
                  width: 18px;
                }
              }
            }
        }        
        >.wrtie-btn{          
            cursor: pointer;
            width: 32px;
            text-align: center;
            font-size: 20px;
            border-left: 0;
            margin-right: 10px;
        }
      }
      >.todo-body{
        width: 100%;
        height: 85%;
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        >.text-input{
            display: flex;
            flex-wrap: wrap;
            >textarea{
              width: 100%;
              height: 100px;
              // border-top: 1px solid #ffbf54;            
              // border-bottom: 1px solid #ffbf54;
              // border-right: 0;
              // border-left: 0;
              outline: none;
            }
            >.edit-box{
              width: 100%;
              display: flex;
              justify-content: flex-end;
              margin-top: 6px;
              .anticon-check-circle{
                cursor: pointer;
                font-size: 24px;
                color: #0089ff;
                margin-right: 10px;
                background: white;
                border-radius: 50px;
              }
              .anticon-close-circle{
                cursor: pointer;
                font-size: 24px;
                color: red;
                margin-right: 10px;
                background: white;
                border-radius: 50px;
              }
            }
        }
        
        >.text-box{
          word-break: break-all;
          position: relative;
          min-height: 42px;
          >.mod-icon{
              position: absolute;
              top: 0;
              right: 0;
              background: white;
              border-radius: 50px;
              width: 32px;
              height: 32px;
              display: none;
              justify-content: center;
              align-items: center;
              border: 2px solid #ffbf54;
              >i{
                font-size: 19px;
              }
          }
        }
        >.text-box:hover{
          >.mod-icon{
            cursor: pointer;
            display: flex;
          }
        }
      }      
    }
    
    >.todo-card.yellow{
      border: 1px solid #ffbf54;
      >.todo-top{
        background: #ffed89;
        .arrow{
          background: #ffed89;
          border: 1px solid #ffbf54;
        }
        .icons{
          background: #fff7d1;  
          border: 1px solid #ffbf54;
          border-left: 0;
        }
        .wrtie-btn{
          background: #ffed89; 
          border: 1px solid #ffbf54;
          border-left: 0;
        }
      }
      >.todo-body{
        background: #fff7d1;       
        .text-input{
          >textarea{
            border: 1px solid #ffbf54;
          }
        }
        .mod-icon{
          border: 2px solid #ffbf54;
        }
      }
    }
    >.todo-card.red{
      border: 1px solid #ff5954;
      >.todo-top{
        background: #ffb7ab;
        .arrow{
          background: #ffb7ab;
          border: 1px solid #ff5954;
        }
        .icons{
          background: #ffded1;  
          border: 1px solid #ff5954;
          border-left: 0;
        }
        .wrtie-btn{
          background: #ffb7ab; 
          border: 1px solid #ff5954;
          border-left: 0;
        }
      }
      >.todo-body{
        background: #ffded1;
        .text-input{
          >textarea{
            border: 1px solid #ff5954;
          }
        }
        .mod-icon{
          border: 2px solid #ff5954;
        }
      }
    }
    >.todo-card.blue{
      border: 1px solid #548cff;
      >.todo-top{
        background: #abb9ff;
        .arrow{
          background: #abb9ff;
          border: 1px solid #548cff;
        }
        .icons{
          background: #d1dbff;  
          border: 1px solid #548cff;
          border-left: 0;
        }
        .wrtie-btn{
          background: #abb9ff; 
          border: 1px solid #548cff;
          border-left: 0;
        }
      }
      >.todo-body{
        background: #d1dbff;
        .text-input{
          >textarea{
            border: 1px solid #548cff;
          }
        }
        .mod-icon{
          border: 2px solid #548cff;
        }
      }
    }
    >.todo-card.green{
      border: 1px solid #3bc73c;
      >.todo-top{
        background: #8aff99;
        .arrow{
          background: #8aff99;
          border: 1px solid #3bc73c;
        }
        .icons{
          background: #d2ffd1;  
          border: 1px solid #3bc73c;
          border-left: 0;
        }
        .wrtie-btn{
          background: #8aff99; 
          border: 1px solid #3bc73c;
          border-left: 0;
        }
      }
      >.todo-body{
        background: #d2ffd1;
        .text-input{
          >textarea{
            border: 1px solid #3bc73c;
          }
        }
        .mod-icon{
          border: 2px solid #3bc73c;
        }
      }
    }
    >.todo-card.purple{
      border: 1px solid #ba54ff;
      >.todo-top{
        background: #dbabff;
        .arrow{
          background: #dbabff;
          border: 1px solid #ba54ff;
        }
        .icons{
          background: #e9d1ff;  
          border: 1px solid #ba54ff;
          border-left: 0;
        }
        .wrtie-btn{
          background: #dbabff; 
          border: 1px solid #ba54ff;
          border-left: 0;
        }
      }
      >.todo-body{
        background: #e9d1ff;
        .text-input{
          >textarea{
            border: 1px solid #ba54ff;
          }
        }
        .mod-icon{
          border: 2px solid #ba54ff;
        }
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
// .modal-enter, .modal-leave-to {
//     transition: all .4s;
//     transform: translateY(100px);
// }
.modal-enter {


}
.modal-enter-active{
    animation: fade 0.4s ;

}
.modal-leave-active{
    transform: translateY(30px);
    animation: fade 0.4s  reverse;

}
.modal-fade-enter, .modal-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  
}
.modal-move {
  transition: transform 1s;
}
@keyframes fade {
  0% {
    transform: translateY(30px);
  }
  100% {
    transform: translateY(0);
  }
}
// .modal-enter .modal-container,
// .modal-leave-active .modal-container {
//     -webkit-transform: scale(1.1);
//     transform: scale(1.1);
// }
</style>
