import { Slider } from "ant-design-vue"

export const state = () => ({
    pickTodoData: null,
    todoDataList: [
        // {
        //     categoryName: 'All',
        //     isPick: true,
        //     color: null,
        //     idx: 0,
        // }
    ],
    isTodoModal: false,
    isZoomTodoModal: false,
    tutorialStep: {status:false, val:null},
    isCategoryTab: false,
    chattingDataList: [],
    userId: null,

    deleteIdx:{
        idx: null,
        count: 0,
    }
    
})

export const mutations = {
    setDeleteIdx(state, payload){
        if(payload.type === 'countUp'){
            state.deleteIdx.count += 1
        }else if(payload.type === 'countReset') {
            state.deleteIdx.count = 0
        }else if(payload.type === 'pickIdx') {
            deleteIdx.idx = payload.idx
        }
    },
    setUserId(state, payload){
        state.userId = payload
    },
    setChattingDataList(state, payload){
        if(payload.type === 'set'){
            state.chattingDataList = payload.param
        }else if(payload.type === 'concat'){
            state.chattingDataList = state.chattingDataList.concat(payload.param)
        }else if(payload.type === 'push'){
            state.chattingDataList.push(payload.param)
        }else if(payload.type === 'deleted'){
            console.log('payload.idx : ' , payload.idx)
            state.chattingDataList[payload.idx].deleted = payload.deleted
        }else if(payload.type ==='remove'){
            state.chattingDataList.splice(payload.idx,1)
        }
    },
    setIsCategoryTab(state, payload){
        state.isCategoryTab = payload
    },
    isTutorialStep(state, payload){
        if(payload.type === 'status'){
            state.tutorialStep.status = payload.param
        }else if(payload.type === 'val'){
            state.tutorialStep.val = payload.param
        }
        
    },
    isPickTodoData(state, payload){
        state.pickTodoData = payload
    },
    setIsZoomTodoModal(state, payload){
        state.isZoomTodoModal = payload
    },
    setTodoDataList(state, payload){
        if(payload.type === 'add'){
            state.todoDataList = payload.value
        }else if(payload.type === 'push'){
            payload.value.idx = state.todoDataList.length
            let idx = state.todoDataList.findIndex(v => v.isPick)
            console.log('idx : ', idx)
            state.todoDataList.push(payload.value)
            if(idx !== -1){
                state.todoDataList[idx].isPick = false
            }
        }else if(payload.type === 'mod'){
            state.todoDataList.splice(payload.idx, 1 , payload.value)
        }else if(payload.type === 'setCategoryName'){
            state.todoDataList[payload.idx].categoryName = payload.value
        }else if(payload.type === 'del'){
            state.todoDataList.splice(payload.idx, 1)
            console.log('del idx : ',payload.idx)
            console.log('length : ', state.todoDataList.length)
            if(state.todoDataList.length >= 1){
                if(!state.todoDataList.find(v => v.isPick === true)){
                    state.todoDataList[payload.idx === state.todoDataList.length ? payload.idx-1 : payload.idx].isPick = true
                }
            }
        }else if(payload.type === 'categoryPick'){
            state.todoDataList[state.todoDataList.findIndex(v => v.isPick === true)].isPick = false
            state.todoDataList[payload.idx].isPick = true
        }else if(payload.type === 'isMod'){
            state.todoDataList[payload.idx].isMod = !state.todoDataList[payload.idx].isMod
        }else if(payload.type === 'pushTodoList'){
            state.todoDataList[payload.idx].todoList.push(payload.value)
        }else if(payload.type === 'isTab'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].isTab = !state.todoDataList[payload.idx].todoList[payload.childIdx].isTab
        }else if(payload.type === 'pushTodoBody'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].isTab = !state.todoDataList[payload.idx].todoList[payload.childIdx].isTab
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData.push(payload.value)
        }else if(payload.type === 'changeInputText'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].inputText = payload.value
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].bodyText = payload.value.replace(/\n/g , '<br/>')
        }else if(payload.type === 'isInput'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].isInput = !state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].isInput
        }else if(payload.type === 'delBody'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData.splice(payload.bodyIdx , 1)
        }else if(payload.type === 'modMap'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].roadAddress = payload.value
        }else if(payload.type === 'modImg'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].url = payload.value
        }else if(payload.type === 'modMonth'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].date = payload.value
        }else if(payload.type === 'isCalendar'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].isCalendar = !state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].isCalendar
        }else if(payload.type === 'delTodo'){
            state.todoDataList[payload.idx].todoList.splice(payload.childIdx , 1)
        }else if(payload.type === 'isClose'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].isClose = !state.todoDataList[payload.idx].todoList[payload.childIdx].isClose
        }else if(payload.type === 'isSize'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].isSize.width = payload.width
            state.todoDataList[payload.idx].todoList[payload.childIdx].isSize.height = payload.height
        }
    },
    setIsTodoModal(state , payload){
        state.isTodoModal = payload
    }
}

export const actions = {
}