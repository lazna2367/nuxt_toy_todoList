import { Slider } from "ant-design-vue"

export const state = () => ({
    todoDataList: [
        {
            categoryName: 'All',
            isPick: true,
            color: null,
            idx: 0,
        }
    ],
})

export const mutations = {
    setTodoDataList(state, payload){
        if(payload.type === 'add'){
            state.todoDataList = payload.value
        }else if(payload.type === 'push'){
            payload.value.idx = state.todoDataList.length
            state.todoDataList.push(payload.value)
        }else if(payload.type === 'mod'){
            state.todoDataList.splice(payload.idx, 1 , payload.value)
        }else if(payload.type === 'del'){
            state.todoDataList.splice(payload.idx, 1)
        }else if(payload.type === 'categoryPick'){
            state.todoDataList[state.todoDataList.findIndex(v => {return v.isPick === true})].isPick = false
            state.todoDataList[payload.idx].isPick = true
        }else if(payload.type === 'pushTodoList'){
            state.todoDataList[payload.idx].todoList.push(payload.value)
        }else if(payload.type === 'isTab'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].isTab = !state.todoDataList[payload.idx].todoList[payload.childIdx].isTab
        }else if(payload.type === 'pushTodoText'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].isTab = !state.todoDataList[payload.idx].todoList[payload.childIdx].isTab
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData.push(payload.value)
        }else if(payload.type === 'changeInputText'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].inputText = payload.value
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].bodyText = payload.value.replace(/\n/g , '<br/>')
        }else if(payload.type === 'isInput'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].isInput = !state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx].isInput
        }else if(payload.type === 'delText'){
            // ate.todoDataList[payload.idx].todoList[payload.childIdx].bodyData[payload.bodyIdx]
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData.splice(payload.bodyIdx , 1)
        }else if(payload.type === 'addMap'){
            state.todoDataList[payload.idx].todoList[payload.childIdx].isTab = !state.todoDataList[payload.idx].todoList[payload.childIdx].isTab
            state.todoDataList[payload.idx].todoList[payload.childIdx].bodyData.push(payload.value)
        }
    }
}

export const actions = {
}