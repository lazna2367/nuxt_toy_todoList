<template>
  <div class="home-container">    
    <div class="todo-card-list">
      <!-- <transition-group name="modal" tag="div" class="todo-card-list"> -->    
        {{isTodoList}}    
        <div class="todo-card" v-for="( val, idx ) in isTodoList.todoList" :key="idx" :class="isTodoList.color ? isTodoList.color : ''">
          <div class="todo-top">            
                <div class="write-list">
                  <div class="arrow" @click="setTodoDataList({type: 'isTab', idx: isTodoList.idx , childIdx: idx})">
                    <a-icon type="caret-left" v-if="!val.isTab" />
                    <a-icon type="caret-right" v-if="val.isTab" />
                  </div>
                  <div class="icons" v-show="val.isTab">
                    <div class="text" @click="setTodoDataList({type: 'pushTodoText', idx: isTodoList.idx , childIdx: idx , value : {type:'text' , isInput: true , inputText: '', bodyText : ''}})">
                      <img src="../assets/img/mod-text-icon.png" alt>
                    </div>
                    <a-icon type="picture" />
                    <div class="date">
                      <img src="../assets/img/mod-date-icon.png" alt>
                    </div>
                    <div class="map" @click="clickAddress(idx)">
                      <img src="../assets/img/mod-map-icon.png" alt>
                    </div>
                  </div>
                </div>
                <div class="wrtie-btn" @click="setTodoDataList({type: 'isTab', idx: isTodoList.idx , childIdx: idx})">
                    <a-icon type="form" />                    
                </div>              
          </div>
          <div class="todo-body">
            <template v-for="(v, i) in val.bodyData">
              <!-- 텍스트창 -->
              <template v-if="v.type === 'text'">
                <div class="text-input" v-if="v.isInput" :key="i">
                  <textarea cols="30" rows="10" :value="v.inputText" @keyup="changeInputEvent($event , idx , i)" />
                  <div class="edit-box">
                        <a-icon type="check-circle" @click="setTodoDataList({type:'isInput', idx: isTodoList.idx , childIdx: idx ,bodyIdx : i})" />
                        <a-icon type="close-circle" @click="setTodoDataList({type:'delText', idx: isTodoList.idx , childIdx: idx ,bodyIdx : i})"/>
                  </div>
                </div>
                <div class="text-box" v-else-if="!v.isInput" :key="i">
                  <!-- <template v-for="(value, index) in v.bodyText">
                    {{value}}<br :key="index">
                  </template> -->
                  <span v-html="v.bodyText"></span>
                  <div class="mod-icon" @click="setTodoDataList({type:'isInput', idx: isTodoList.idx , childIdx: idx ,bodyIdx : i})">
                      <a-icon type="edit"/>
                  </div>
                </div>
              </template>
              <!-- 지도 -->
              <template v-else-if="v.type === 'map'">
                <div class="map" :id="`addMap_${idx}_${i}`" :key="i">
                
                </div>
              </template>
            </template>            
          </div>
        </div>
        <!-- </transition-group> -->
        <!-- <div class="todo-card-void" v-show="htmlWidth < 1800 && htmlWidth > 1384"/> -->
    </div>    
    <div class="side-btn" v-if="isTodoList.color">
        <a-icon type="plus-square" theme="filled" 
              @click="setTodoDataList({
                type:'pushTodoList',
                idx: isTodoList.idx,
                value: {
                  idx: isTodoList.todoList.length,
                  isTab: false,
                  bodyData:[],
                }
              })"
        />
        <a-icon type="minus-square" theme="filled" />
    </div>
    <!-- <transition name="modal">
    </transition> -->          
  </div>
</template>

<script>
import { mapState , mapMutations , mapActions } from 'vuex';
export default {
  data(){
    return {
      htmlWidth: 0, 
    }
  },  
  computed:{
    ...mapState(['todoDataList']),
    isTodoList(){
      return this.todoDataList.find(v => {return v.isPick === true})
    },    
  },
    
  components: {},
  mounted() {
    this.htmlWidth = window.innerWidth
    window.addEventListener('resize',() => {
      this.htmlWidth = window.innerWidth
    })       
  },
  watch: {
    isTodoList(){
      console.log('돈다')
      // this.isTodoList.todoList
      console.log('this.isTodoList : ', this.isTodoList)
      if(this.isTodoList.todoList){
        this.isTodoList.todoList.forEach(val => {
          val.bodyData.forEach((v,i) => {
            if(v.type === 'map'){
                setTimeout(_ => {                
                let mapContainer = document.getElementById(`addMap_${val.idx}_${i}`)
                  let mapOption = {
                    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                  }                
                  
                  // 주소-좌표 변환 객체를 생성합니다
                  var geocoder = new kakao.maps.services.Geocoder();

                  //지도 생성
                  var map = new kakao.maps.Map(mapContainer, mapOption);

                  // 마우스 드래그로 지도 이동 가능여부를 설정합니다
                  map.setDraggable(false); 

                  // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
                  map.setZoomable(false); 

                  // 주소로 좌표를 검색합니다
                  geocoder.addressSearch(v.roadAddress, function(result, status) {
                      // 정상적으로 검색이 완료됐으면 
                      if (status === kakao.maps.services.Status.OK) {
                          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                          // 결과값으로 받은 위치를 마커로 표시합니다
                          var marker = new kakao.maps.Marker({
                              map: map,
                              position: coords
                          });

                          // 인포윈도우로 장소에 대한 설명을 표시합니다
                          // var infowindow = new kakao.maps.InfoWindow({
                          //     content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                          // });
                          // infowindow.open(map, marker);

                          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                          map.setCenter(coords);
                      } 
                  }); 
                }, 100)
            }
          })
        })
      }
      
    }
  },
  methods: {
    ...mapMutations(['setTodoDataList']),
    changeInputEvent(e, childIdx , bodyIdx){
      this.setTodoDataList({
        type: 'changeInputText',
        idx: this.isTodoList.idx,
        childIdx: childIdx,
        bodyIdx: bodyIdx,
        value: e.srcElement.value
      })
    },
    clickAddress(idx){      
      daum.postcode.load(() => {
          new daum.Postcode({
              oncomplete: data => {    
                let mapIdx = this.isTodoList.todoList[idx].bodyData.length            
                this.setTodoDataList({
                  type: 'pushTodoText', 
                  idx: this.isTodoList.idx , 
                  childIdx: idx , 
                  value : {
                    idx: mapIdx,
                    type:'map',
                    roadAddress: data.roadAddress
                  }
                })
                setTimeout(_ => {
                  let mapContainer = document.getElementById(`addMap_${idx}_${mapIdx}`)
                  console.log('mapContainer : ' , mapContainer)
                  let mapOption = {
                    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                  }                
                  
                  // 주소-좌표 변환 객체를 생성합니다
                  var geocoder = new kakao.maps.services.Geocoder();

                  //지도 생성
                  var map = new kakao.maps.Map(mapContainer, mapOption);

                  // 마우스 드래그로 지도 이동 가능여부를 설정합니다
                  map.setDraggable(false); 

                  // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
                  map.setZoomable(false); 

                  // 주소로 좌표를 검색합니다
                  geocoder.addressSearch(data.roadAddress, function(result, status) {
                      // 정상적으로 검색이 완료됐으면 
                      if (status === kakao.maps.services.Status.OK) {
                          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                          // 결과값으로 받은 위치를 마커로 표시합니다
                          var marker = new kakao.maps.Marker({
                              map: map,
                              position: coords
                          });

                          // 인포윈도우로 장소에 대한 설명을 표시합니다
                          // var infowindow = new kakao.maps.InfoWindow({
                          //     content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                          // });
                          // infowindow.open(map, marker);

                          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                          map.setCenter(coords);
                      } 
                  }); 
                }, 100)                
              }
          }).open();
      })
    }
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
        overflow: auto;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display:none;
        }
        >.text-input{
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
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
          margin-bottom: 10px;
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
          font-weight:bold;
          >.mod-icon{
            cursor: pointer;
            display: flex;
          }
        }
        >.map{
          border: 2px solid #abb9ff;
          width: 100%;
          height: 150px;
          margin-bottom: 10px;
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
