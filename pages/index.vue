<template>
  <div class="home-container">
    <div class="top-title">
      <span>카테고리 명</span>
    </div>
    <div class="todo-card-list">
      <!-- <transition-group name="modal" tag="div" class="todo-card-list"> -->    
        <!-- all -->
        <template v-if="isCategoryAll">
        <!-- {{todoDataList}}<br/>
        {{isTodoList}}<br/> -->
          <template v-for="(value,index) in todoDataList">
            <div v-for="(val, idx) in value.todoList" class="todo-card" :key="idx" :class="value.color ? value.color : ''" @click="clickTodoIdx = idx">
              <div class="todo-top" :key="index">
                  <div class="write-list">
                    <div class="arrow" @click="setTodoDataList({type: 'isTab', idx: value.idx , childIdx: idx})">
                      <a-icon type="caret-left" v-if="!val.isTab" />
                      <a-icon type="caret-right" v-if="val.isTab" />
                    </div>
                    <div class="icons" v-show="val.isTab">
                      <!-- 텍스트 -->
                      <div class="text" @click="setTodoDataList({type: 'pushTodoBody', idx: value.idx , childIdx: idx , value : {type:'text' , isInput: true , inputText: '', bodyText : ''}})">
                        <img src="../assets/img/mod-text-icon.png" alt>
                      </div>
                      <!-- 이미지 -->
                      <!-- setIsTodoModal(true) -->
                      <label for="img-form">
                        <a-icon type="picture"/>
                      </label>
                      <input id="img-form" type="file" style="display:none" @change="changeImg({evt : $event , idx: idx , type: 'add'})">
                      <!-- 날짜 -->
                      <div class="date">
                        <datetime input-class="datetime" type="datetime" v-model="addDateTime"/>
                        <img src="../assets/img/mod-date-icon.png" alt>
                      </div>
                      <!-- 지도 -->
                      <div class="map" @click="clickAddress({type:'add', idx: idx})">
                        <img src="../assets/img/mod-map-icon.png" alt>
                      </div>
                    </div>
                  </div>
                  <div class="wrtie-btn" @click="setTodoDataList({type: 'isTab', idx: value.idx , childIdx: idx})">
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
                          <a-icon type="check-circle" @click="setTodoDataList({type:'isInput', idx: value.idx , childIdx: idx ,bodyIdx : i})" />
                          <a-icon type="close-circle" @click="delBodyContents({type:'delBody', idx: value.idx , childIdx: idx ,bodyIdx : i})"/>
                    </div>
                  </div>
                  <div class="text-box" v-else-if="!v.isInput" :key="i">
                    <!-- <template v-for="(value, index) in v.bodyText">
                      {{value}}<br :key="index">
                    </template> -->
                    <span v-html="v.bodyText"></span>
                    <div class="mod-icon" @click="setTodoDataList({type:'isInput', idx: value.idx , childIdx: idx ,bodyIdx : i})">
                        <a-icon type="edit"/>
                    </div>
                  </div>
                </template>
                <!-- 이미지 -->
                <template v-else-if="v.type === 'img'">
                  <div class="img-body" :key="i">
                    <img :src="v.url" :alt="`img_${i}`">
                    <div class="img-mod">
                      <label :for="`img-mod-form_${i}`">
                          <div class="edit"><a-icon type="edit" /></div>
                      </label>
                      <input :id="`img-mod-form_${i}`" type="file" style="display:none" @change="changeImg({evt: $event , idx: idx , bodyIdx: i , type: 'mod'})">
                      <div class="close"><a-icon type="close-circle" @click="delBodyContents({type:'delBody', idx: value.idx , childIdx: idx ,bodyIdx : i})" /></div>
                    </div>
                  </div>  
                </template>
                <!-- 날짜 -->
                <template v-else-if="v.type === 'date'">
                  <div class="date-body" :key="i">
                    <div class="calendar-top">
                      <!-- 왼쪽 -->
                      <!-- <a-icon type="caret-left" /> -->
                      <!-- 날짜 -->
                      <span>{{v.date}}</span>
                      <a-icon type="calendar" theme="filled" style="color:#0089ff;" v-if="v.isCalendar" @click="setTodoDataList({type:'isCalendar', idx: value.idx, childIdx: idx , bodyIdx: i})"/>
                      <a-icon type="calendar" theme="twoTone" two-tone-color="#0089ff" v-else @click="setTodoDataList({type:'isCalendar', idx: value.idx, childIdx: idx , bodyIdx: i})"/>
                      <!-- 오른쪽 -->
                      <!-- <a-icon type="caret-right" /> -->
                    </div>
                    <div class="calendar-body" v-if="v.isCalendar">
                      <!-- <div>
                        이번달 시작요일 : {{$moment(v.date).startOf('month').format('d')}} <br/>
                        이번달 종료요일 : {{$moment(v.date).endOf('month').format('d')}} <br/>
                        이번달 마지막 일 : {{$moment(v.date).daysInMonth()}} <br/>
                        <br/>
                        저번달 요일 : {{Number($moment(v.date).add(-1,'month').startOf('month').format('d')) -1}} <br/>
                        저번달 종료요일 : {{$moment(v.date).add(-1,'month').endOf('month').format('d')}} <br/>
                        저번달 마지막 일 : {{$moment(v.date).add(-1,'month').daysInMonth()}} <br/>
                        <br/>
                        다음달 요일 : {{$moment(v.date).add(+1,'month').startOf('month').format('d')}} <br/>
                        다음달 종료요일 : {{$moment(v.date).add(+1,'month').endOf('month').format('d')}} <br/>
                        다음달 마지막 일 : {{$moment(v.date).add(+1,'month').daysInMonth()}} <br/>
                      </div> -->
                        <!-- 요일 -->
                        <div v-for="index in 7" :key="`${index}_${index}`" class="day" :style="index === 1 || index === 7 ? 'color:red;' : ''">
                          {{weekValue(index-1)}}
                        </div>
                        <!-- 저번달 -->
                        <div class="last-month">
                          <div v-for="index in Number($moment(v.date).startOf('month').format('d'))" :key="`l_${index}`" class="days" style="background:#bdbdbd; color:white;">
                            {{
                              index === 1 ? $moment(v.date).add(-1,'month').daysInMonth() : $moment(v.date).add(-1,'month').daysInMonth() - index
                            }}
                          </div>
                        </div>
                        <!-- 이번달 -->
                        <div v-for="index in $moment(v.date).daysInMonth()" :key="`i_${index}`" class="days" :class="index === Number($moment(v.date).format('DD')) ? 'on' : ''">
                          {{index}}
                        </div>
                        <!-- 다음달 -->
                        <div v-for="index in (6 - $moment(v.date).endOf('month').format('d'))" :key="`n_${index}`" class="days" style="background:#bdbdbd; color:white;">
                          {{index}}
                        </div>
                        <!-- 수정/삭제 -->
                        <div class="mod">
                          <div class="edit" @click="clickTodoBodyIdx = i">
                            <datetime input-class="datetime" type="datetime" v-model="addDateTime"/>
                            <a-icon type="edit"/>
                          </div>
                          <div class="close"><a-icon type="close-circle" @click="delBodyContents({type:'delBody', idx: value.idx , childIdx: idx ,bodyIdx : i})"/></div>  
                        </div>
                    </div>
                    <div class="footer" v-if="v.isCalendar && $moment(v.date) > $moment()">
                      <div class="d-day" v-if="$moment(v.date) > $moment()">
                        <!-- <span>D-{{getDDay()}} 00:00:00</span> -->
                        <!-- <span>{{getDDay(v.date)}}</span> -->
                        <!-- <span></span> -->
                        <DateTimer :endDate="v.date" />
                      </div>
                    </div>
                    <!-- 
                    <div class="date">{{v.date}}</div>
                    <div class="time">{{v.time}}</div>
                    -->
                  </div>
                </template>
                <!-- 지도 -->
                <template v-else-if="v.type === 'map'">
                  <div class="map-body" :key="i">
                    <!-- 아이콘 -->
                    <div class="mod">
                      <div class="edit"><a-icon type="edit" @click="clickAddress({type:'mod', idx:idx , bodyIdx:i})" /></div>
                      <div class="close"><a-icon type="close-circle" @click="delBodyContents({type:'delBody', idx: value.idx , childIdx: idx ,bodyIdx : i})" /></div>
                    </div>
                    <!-- map -->
                    <div class="map" :id="`addMap_${index}_${idx}_${i}`"/>                  
                    <!-- 주소 -->
                    <div class="address">
                      <span>{{v.roadAddress}}</span>
                    </div>
                  </div>
                </template>
                
              </template>
            </div>

            </div>
          </template>
        </template>
        <!-- all -->
        <template v-else>
          <!-- {{isTodoList}}<br/>
          {{clickTodoIdx}}<br/> -->
          <div class="todo-card" v-for="( val, idx ) in isTodoList.todoList" :key="idx" :class="isTodoList.color ? isTodoList.color : ''" @click="clickTodoIdx = idx">
            <div class="todo-top">
                  <div class="del-btn" v-if="isDeleteTodo" @click="setTodoDataList({type: 'delTodo', idx: isTodoList.idx , childIdx: idx})">
                    <a-icon type="delete" theme="twoTone" two-tone-color="red"/>
                  </div>
                  <div class="write-list">
                    <div class="arrow" @click="setTodoDataList({type: 'isTab', idx: isTodoList.idx , childIdx: idx})">
                      <a-icon type="caret-left" v-if="!val.isTab" />
                      <a-icon type="caret-right" v-if="val.isTab" />
                    </div>
                    <div class="icons" v-show="val.isTab">
                      <!-- 텍스트 -->
                      <div class="text" @click="setTodoDataList({type: 'pushTodoBody', idx: isTodoList.idx , childIdx: idx , value : {type:'text' , isInput: true , inputText: '', bodyText : ''}})">
                        <img src="../assets/img/mod-text-icon.png" alt>
                      </div>
                      <!-- 이미지 -->
                      <!-- setIsTodoModal(true) -->
                      <label :for="`img-form_${idx}`">
                        <a-icon type="picture"/>
                      </label>
                      <input :id="`img-form_${idx}`" type="file" style="display:none" @change="changeImg({evt : $event , idx: idx , type: 'add'})">
                      <!-- 날짜 -->
                      <div class="date">
                        <datetime input-class="datetime" type="datetime" v-model="addDateTime"/>
                        <img src="../assets/img/mod-date-icon.png" alt>
                      </div>
                      <!-- 지도 -->
                      <div class="map" @click="clickAddress({type:'add', idx: idx})">
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
                          <a-icon type="close-circle" @click="delBodyContents({type:'delBody', idx: isTodoList.idx , childIdx: idx ,bodyIdx : i})"/>
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
                <!-- 이미지 -->
                <template v-else-if="v.type === 'img'">
                  <div class="img-body" :key="i">
                    <img :src="v.url" :alt="`img_${i}`">
                    <div class="img-mod">
                      <label :for="`img-mod-form_${i}`">
                          <div class="edit"><a-icon type="edit" /></div>
                      </label>
                      <input :id="`img-mod-form_${i}`" type="file" style="display:none" @change="changeImg({evt: $event , idx: idx , bodyIdx: i , type: 'mod'})">
                      <div class="close"><a-icon type="close-circle" @click="delBodyContents({type:'delBody', idx: isTodoList.idx , childIdx: idx ,bodyIdx : i})" /></div>
                    </div>
                  </div>  
                </template>
                <!-- 날짜 -->
                <template v-else-if="v.type === 'date'">
                  <div class="date-body" :key="i">
                    <div class="calendar-top">
                      <!-- 왼쪽 -->
                      <!-- <a-icon type="caret-left" /> -->
                      <!-- 날짜 -->
                      <span>{{v.date}}</span>
                      <a-icon type="calendar" theme="filled" style="color:#0089ff;" v-if="v.isCalendar" @click="setTodoDataList({type:'isCalendar', idx: isTodoList.idx, childIdx: idx , bodyIdx: i})"/>
                      <a-icon type="calendar" theme="twoTone" two-tone-color="#0089ff" v-else @click="setTodoDataList({type:'isCalendar', idx: isTodoList.idx, childIdx: idx , bodyIdx: i})"/>
                      <!-- 오른쪽 -->
                      <!-- <a-icon type="caret-right" /> -->
                    </div>
                    <div class="calendar-body" v-if="v.isCalendar">
                      <!-- <div>
                        이번달 시작요일 : {{$moment(v.date).startOf('month').format('d')}} <br/>
                        이번달 종료요일 : {{$moment(v.date).endOf('month').format('d')}} <br/>
                        이번달 마지막 일 : {{$moment(v.date).daysInMonth()}} <br/>
                        <br/>
                        저번달 요일 : {{Number($moment(v.date).add(-1,'month').startOf('month').format('d')) -1}} <br/>
                        저번달 종료요일 : {{$moment(v.date).add(-1,'month').endOf('month').format('d')}} <br/>
                        저번달 마지막 일 : {{$moment(v.date).add(-1,'month').daysInMonth()}} <br/>
                        <br/>
                        다음달 요일 : {{$moment(v.date).add(+1,'month').startOf('month').format('d')}} <br/>
                        다음달 종료요일 : {{$moment(v.date).add(+1,'month').endOf('month').format('d')}} <br/>
                        다음달 마지막 일 : {{$moment(v.date).add(+1,'month').daysInMonth()}} <br/>
                      </div> -->
                        <!-- 요일 -->
                        <div v-for="index in 7" :key="`${index}_${index}`" class="day" :style="index === 1 || index === 7 ? 'color:red;' : ''">
                          {{weekValue(index-1)}}
                        </div>
                        <!-- 저번달 -->
                        <div class="last-month">
                          <div v-for="index in Number($moment(v.date).startOf('month').format('d'))" :key="`l_${index}`" class="days" style="background:#bdbdbd; color:white;">
                            {{
                              index === 1 ? $moment(v.date).add(-1,'month').daysInMonth() : $moment(v.date).add(-1,'month').daysInMonth() - index
                            }}
                          </div>
                        </div>
                        <!-- 이번달 -->
                        <div v-for="index in $moment(v.date).daysInMonth()" :key="`i_${index}`" class="days" :class="index === Number($moment(v.date).format('DD')) ? 'on' : ''">
                          {{index}}
                        </div>
                        <!-- 다음달 -->
                        <div v-for="index in (6 - $moment(v.date).endOf('month').format('d'))" :key="`n_${index}`" class="days" style="background:#bdbdbd; color:white;">
                          {{index}}
                        </div>
                        <!-- 수정/삭제 -->
                        <div class="mod">
                          <div class="edit" @click="clickTodoBodyIdx = i">
                            <datetime input-class="datetime" type="datetime" v-model="addDateTime"/>
                            <a-icon type="edit"/>
                          </div>
                          <div class="close"><a-icon type="close-circle" @click="delBodyContents({type:'delBody', idx: isTodoList.idx , childIdx: idx ,bodyIdx : i})"/></div>  
                        </div>
                    </div>
                    <div class="footer" v-if="v.isCalendar && $moment(v.date) > $moment()">
                      <div class="d-day" v-if="$moment(v.date) > $moment()">
                        <!-- <span>D-{{getDDay()}} 00:00:00</span> -->
                        <!-- <span>{{getDDay(v.date)}}</span> -->
                        <!-- <span></span> -->
                        <DateTimer :endDate="v.date" />
                      </div>
                    </div>
                    <!-- 
                    <div class="date">{{v.date}}</div>
                    <div class="time">{{v.time}}</div>
                    -->
                  </div>
                </template>
                <!-- 지도 -->
                <template v-else-if="v.type === 'map'">
                  <div class="map-body" :key="i">
                    <!-- 아이콘 -->
                    <div class="mod">
                      <div class="edit"><a-icon type="edit" @click="clickAddress({type:'mod', idx:idx , bodyIdx:i})" /></div>
                      <div class="close"><a-icon type="close-circle" @click="delBodyContents({type:'delBody', idx: isTodoList.idx , childIdx: idx ,bodyIdx : i})" /></div>
                    </div>
                    <!-- map -->
                    <div class="map" :id="`addMap_${isTodoList.idx}_${idx}_${i}`"/>                  
                    <!-- 주소 -->
                    <div class="address">
                      <span>{{v.roadAddress}}</span>
                    </div>
                  </div>
                </template>
                
              </template>
            </div>
          </div>
        </template>
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
        <a-icon type="minus-square" :theme="isDeleteTodo ? '' : 'filled'"  @click="isDeleteTodo = !isDeleteTodo" />
    </div>
    <!-- <transition name="modal">
    </transition> -->
  </div>
</template>

<script>
import { mapState , mapMutations , mapActions } from 'vuex';
import DateTimer from '../components/modules/DateTimer.vue'
export default {
  data(){
    return {
      isDeleteTodo: false,
      dateTimeOut: null,
      htmlWidth: 0,
      clickTodoIdx: null,
      clickTodoBodyIdx: null,
      addDateTime: null,
    }
  },  
  computed:{
    ...mapState(['todoDataList']),
    isTodoList(){
      return this.todoDataList.find(v => {return v.isPick === true})
    },
    isCategoryAll(){
      let result = '';
      if(this.isTodoList?.categoryName.includes('All')){
        result = true
      }else {
        result = false
      }
      return result
    }
  },
    
  components: {
    DateTimer,
  },
  mounted() {
    this.reLoadMaps();
    this.htmlWidth = window.innerWidth
    window.addEventListener('resize',() => {
      this.htmlWidth = window.innerWidth
    })
  },
  created() {
  },
  watch: {
    isTodoList(){
      this.reLoadMaps();
    },
    addDateTime(){
      if(this.clickTodoBodyIdx === null){
        if(this.addDateTime){
          this.addDateTime = this.$moment(this.addDateTime).format('YYYY-MM-DD HH:mm:ss')
          this.setTodoDataList({
            type: 'pushTodoBody', 
            idx: this.isTodoList.idx , 
            childIdx: this.clickTodoIdx , 
            value : {
              idx: this.isTodoList.todoList[this.clickTodoIdx].bodyData.length,
              isCalendar: true,
              type:'date',
              date: this.addDateTime
            }
          })
        }
      }else{
        if(this.addDateTime){
          this.addDateTime = this.$moment(this.addDateTime).format('YYYY-MM-DD HH:mm:ss')
          this.setTodoDataList({
            type: 'modMonth', 
            idx: this.isTodoList.idx , 
            childIdx: this.clickTodoIdx , 
            bodyIdx: this.clickTodoBodyIdx ,
            value : this.addDateTime
          })
        }
      }
      this.addDateTime = null;
      this.clickTodoIdx = null;
      this.clickTodoBodyIdx = null;
    }
  },
  methods: {
    ...mapMutations(['setTodoDataList','setIsTodoModal']),
    weekValue(idx){
      let result = '';
      switch(idx){
        case 0:
          result = '일'
          break
        case 1:
          result = '월'
          break
        case 2:
          result = '화'
          break
        case 3:
          result = '수'
          break
        case 4:
          result = '목'
          break
        case 5:
          result = '금'
          break
        case 6:
          result = '토'
          break
      }
      return result;
    },
    changeImg(param){
      if(!param.evt.target.files[0].type.includes('image')){
         alert('이미지 파일을 첨부해주세요.')
         document.getElementById(`img-form_${this.clickTodoIdx}`).value = null
         return false
      }else {
        if(param.type === 'add'){
          console.log('this.isTodoList.idx : ' , this.isTodoList.idx)
          console.log('this.clickTodoIdx : ' , this.clickTodoIdx)
          console.log('this.isTodoList.todoList[param.idx].bodyData.length : ' , this.isTodoList.todoList[param.idx].bodyData.length)
          // state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData.push(payload.value)
          const file = param.evt.target.files[0];
          this.setTodoDataList({
            type: 'pushTodoBody', 
            idx: this.isTodoList.idx , 
            childIdx: param.idx , 
            value : {
              idx: this.isTodoList.todoList[param.idx].bodyData.length,
              type:'img',
              url: URL.createObjectURL(file),
            }
          })
          document.getElementById(`img-form_${this.clickTodoIdx}`).value = null
        }else if(param.type === 'mod'){
          const file = param.evt.target.files[0];
          this.setTodoDataList({
            type: 'modImg', 
            idx: this.isTodoList.idx , 
            childIdx: param.idx , 
            bodyIdx: param.bodyIdx,
            value : URL.createObjectURL(file)
          })
          document.getElementById(`img-mod-form_${param.bodyIdx}`).value = null
        }
      }
    },
    delBodyContents(param){
      this.setTodoDataList(param);
      this.reLoadMaps();
    },
    changeInputEvent(e, childIdx , bodyIdx){
      this.setTodoDataList({
        type: 'changeInputText',
        idx: this.isTodoList.idx,
        childIdx: this.clickTodoIdx,
        bodyIdx: bodyIdx,
        value: e.srcElement.value
      })
    },    
    clickAddress(param){
      daum.postcode.load(() => {
          new daum.Postcode({
              oncomplete: data => {   
                let mapIdx = null;
                if(param.type === 'add'){
                  mapIdx = this.isTodoList.todoList[param.idx].bodyData.length
                  this.setTodoDataList({
                    type: 'pushTodoBody', 
                    idx: this.isTodoList.idx , 
                    childIdx: param.idx , 
                    value : {
                      idx: mapIdx,
                      type:'map',
                      roadAddress: data.roadAddress
                    }
                  })
                }else if(param.type === 'mod'){
                  mapIdx = param.bodyIdx
                  this.setTodoDataList({
                    type : 'modMap',
                    idx: this.isTodoList.idx , 
                    childIdx: param.idx , 
                    bodyIdx: param.bodyIdx,
                    value : data.roadAddress
                  })
                  // state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].roadAddress = payload.value
                }
                
                setTimeout(_ => { 
                  this.loadMaps(data.roadAddress,param.idx,mapIdx , this.isTodoList.idx) 
                },100)
              }
          }).open();
      })
    },
    reLoadMaps(){
      this.todoDataList.forEach(value => {
        console.log('value' , value)
        if(value.todoList){
          value.todoList.forEach(val => {
              val.bodyData.forEach((v,i) => {
              if(v.type === 'map'){
                setTimeout(_ => {  
                  this.loadMaps(v.roadAddress,val.idx,i, value.idx)
                }, 100)
              }
            })
          })
        }
      })
      // if(this.isTodoList.todoList){
      //   this.isTodoList.todoList.forEach(val => {
      //     val.bodyData.forEach((v,i) => {
      //       if(v.type === 'map'){
      //         setTimeout(_ => {  
      //           this.loadMaps(v.roadAddress,val.idx,i)
      //         }, 100)
      //       }
      //     })
      //   })
      // }
    },
    loadMaps(address,idx,i ,categoryIdx){
        
        let mapContainer = document.getElementById(`addMap_${categoryIdx}_${idx}_${i}`)
        
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
        geocoder.addressSearch(address, function(result, status) {
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
    },
  },
  
}
</script>

<style lang="scss">
.home-container{
  // flex-shrink: 0;
  // width: 1306px;
  position: relative;
  background: #dfe1ed;
  width: 100%;
  height: calc(100vh - 42px);
  // height: 100vh;
  margin: 0 auto;  
  display: flex;
  flex-wrap: wrap;
  padding: 80px 100px 0px 30px;
  overflow-y: auto;
  >.top-title{
    position: absolute;
    top: 0;
    width: 100%;
    background: white;
    left: 0;
    border-bottom: 2px solid #c5c5c5;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
  }
  >.todo-card-list{
    display: grid;
    grid-template-columns: repeat(auto-fit , 300px);
    width: 100%;
    justify-content: space-around;
    row-gap: 30px;

    // background: white;
    // padding: 50px;
    // border-radius: 30px;
    // width: 93%;
    // display: flex;
    // flex-flow: wrap;
    // box-shadow: 3px 0 15px 2px rgba(0, 0, 0, 0.16);
    // margin-bottom: 30px;
    >.todo-card-void{
      width: 300px;
      height: 300px;
      margin: 14px;
    }
    >.todo-card{    
      width: 300px;
      height: 300px;
      // margin: 15px;
      // margin-bottom: 15px;
      display: flex;
      flex-flow: column;
      box-shadow: 2px 0px 6px 1px rgba(0, 0, 0, 0.16);

      >.todo-top{
        width: 100%;
        height: 15%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        >.del-btn{
          cursor: pointer;
          position: absolute;
          left: 11px;
          font-size: 20px;
          background: white;
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
          border: 2px solid red;
        }
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
              >label{
                >i{
                  cursor: pointer;
                  width: 32px;
                  color: #4c4c4c;;
                }  
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
                display: flex;
                width: 32px;
                justify-content: center;
                align-items: center;
                padding-left: 3px;
                padding-top: 2px;
                position: relative;
                >.vdatetime{
                  position: absolute;
                  width: 18px;
                  height: 18px;
                  >.vdatetime-input{
                    cursor: pointer;
                    opacity: 0;
                    width: 18px;
                    height: 18px;
                  }
                }
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
        >.img-body{
          width: 100%;
          height: 278px;
          margin-bottom: 10px;
          position: relative;
          >img{
            width: 100%;
            height: 100%;
          }
          >.img-mod{
            display: none;
            position: absolute;
            right: 5px;
            top: 5px;
            
            .edit{
              cursor: pointer;
              width: 20px;
              height: 20px;
              display: flex;
              justify-content: center;
              background: white;
              border-radius: 50px;
              margin-right: 5px;
              align-items: center;
              border: 1.5px solid #0089ff;
              >i{
                font-size: 13px;
                color: #0089ff;
              }
            }
            >.close{
              cursor: pointer;
              width: 20px;
              height: 20px;
              display: flex;
              justify-content: center;
              background: white;
              border-radius: 50px;
              >i{
                font-size: 20px;
                color: red;
              }
            }
          }
        }
        >.img-body:hover{
          >.img-mod{
            display: flex;
          }
        }
        >.date-body{
          width: 100%;
          // height: 260px;
          // height: 204px;
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          >.calendar-top{
            width: 192px;
            height: 31px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 8px;
            // >i{
            //   cursor: pointer;
            //   font-size: 20px;
            // }
            >.anticon-calendar{
              cursor: pointer;
              margin-left: 8px;
              font-size: 19px;
            }
            >span{
              font-size: 15px;
              font-weight: bold;
            }
            >.anticon-caret-left{
              margin-right: 5px;
            }
            >.anticon-caret-right{
              margin-left: 5px;
            }
          }
          >.calendar-body{
            background: white;
            width: 192px;
            // height: 165px;
            display: flex;
            flex-wrap: wrap;
            border-radius: 16px;
            padding: 12px;
            margin-bottom: 6px;
            position: relative;
            >.day{
              width: 24px;
              /* border: 1px solid; */
              height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 12px;
              border-bottom: 1px solid #80808085;
              margin-bottom: 4px;
              padding-bottom: 8px;
            }
            >.last-month{
              display: flex;
              flex-direction: row-reverse;
            }
            .days{
              width: 24px;
              /* border: 1px solid; */
              height: 24px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 12px;
            }
            .days.on{
              background: #0089fe;
              color: white;
              font-weight: bold;
              border-radius: 50px;
            }
            >.mod{
              // width: 76px;
              // height: 100%;
              position: absolute;
              right: -36px;
              top: 0;
              display: flex;
              flex-direction: column;
              >.edit{
                font-size: 18px;
                margin-right: 4px;
                font-size: 14px;
                background: white;
                border-radius: 50px;
                color: #0089ff;
                width: 24px;
                height: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 2px solid #0089ff;
                margin-bottom: 4px;
                position: relative;
                >.vdatetime{
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  >.vdatetime-input{
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    opacity: 0;
                  }
                }
              }
              >.close{
                cursor: pointer;
                font-size: 18px;
                background: white;
                border-radius: 50px;
                color: red;
                font-size: 24px;
                width: 24px;
                height: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
          >.footer{
            width: 192px;
            height: 24px;
            display: flex;
            position: relative;
            >.d-day{
              width: 100%;
              height: 100%;
              background: white;
              border-radius: 12px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: bold;
              font-size: 12px;
            }
            
          }
        }
        >.map-body{
          width: 100%;
          height: 200px;
          display: flex;
          position: relative;
          flex-wrap: wrap;
          /* border: 1px solid #548cff; */
          margin-bottom: 10px;
          >.mod{
            display: none;
            position: absolute;
            z-index: 10;
            right: 5px;
            top: 5px;
            >.edit{
              cursor: pointer;
              width: 20px;
              height: 20px;
              display: flex;
              justify-content: center;
              background: white;
              border-radius: 50px;
              margin-right: 5px;
              align-items: center;
              border: 1.5px solid #0089ff;
              >i{
                font-size: 13px;
                color: #0089ff;
              }
            }
            >.close{
              cursor: pointer;
              width: 20px;
              height: 20px;
              display: flex;
              justify-content: center;
              background: white;
              border-radius: 50px;
              >i{
                font-size: 20px;
                color: red;
              }
            }
          }
          >.map{
            width: 100%;
            height: 150px;
          }
          >.address{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: white;
          }
        }
        >.map-body:hover{
          >.mod{
            display: flex;            
          }
          >.address{
            font-weight: bold;
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
        .calendar-top{
          border-bottom: 1px solid #ffbf54;
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
        .calendar-top{
          border-bottom: 1px solid #ff5954;
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
        .calendar-top{
          border-bottom: 1px solid #548cff;
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
        .calendar-top{
          border-bottom: 1px solid #3bc73c;
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
        .calendar-top{
          border-bottom: 1px solid #ba54ff;
        }
      }
    }
  }
  
  >.side-btn{    
    position: absolute;
    right: 50px;
    height: 80px;
    width: 40px;
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
