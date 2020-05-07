<template>
    <nav class="todo-card">
        <a-card title="Todo List" class="card-body">
            <!-- input -->
            <a-card-grid style="width:100%; text-align: left;" >
                <a-input-search placeholder='할 일을 입력해주세요.' enter-button="추가" size="large" v-model="inputValue" @search="addTodo"/>
                <div class="card-line" v-if="todoListData.length !== 0"></div>
                <div v-for="(val,idx) in todoListData" :key="idx" class="todo-list" :id="`check_${idx}`">
                    <!-- <a-checkbox :checked="checkList[idx]" @change="checkTodoList(idx)" class="card-checkbox">{{val}}</a-checkbox> -->
                    <a-checkbox :checked="checkList[idx]" @change="checkTodoList(idx)" class="card-checkbox" />
                    <span class="check-text">{{val}}</span>
                    <a-icon type="close" @click="delTodo(idx)" class="close-icon"/>                    
                </div>
            </a-card-grid>
            <!-- <a-card-grid style="width:50%">
            </a-card-grid> -->
        </a-card>
    </nav>
</template>
<script>
export default {
    data() {
        return {
            inputValue: '',
            todoListData: [],
            checkList: [],
        }
    },
    methods:{
        delTodo(idx){
            this.todoListData.splice(idx,1)
            this.checkList.splice(idx,1)
            
            this.checkList.forEach((v,i) => {
                let check = document.querySelector(`#check_${i} .card-checkbox > span:last-child`)
                if(check){
                    if(this.checkList[i]){                    
                        check.style.textDecoration = 'none'
                    }else {
                        check.style.textDecoration = 'line-through'
                    }
                }
            })
            
        },
        checkTodoList(idx){
            this.checkList.splice(idx,1,!this.checkList[idx])            
            let check = document.querySelector(`#check_${idx} .card-checkbox > span:last-child`)
            if(check){
                if(this.checkList[idx]){
                    console.log('동작1')
                    check.style.textDecoration = 'none'
                }else {
                    console.log('동작2')
                    check.style.textDecoration = 'line-through'
                }
                
            }
        },
        addTodo(){
            if(this.inputValue === ''){
                alert('내용을 입력 해주세요.')
                return false;
            }
            this.todoListData.push(this.inputValue)
            this.checkList.push(true)
            this.inputValue = '';        
        }
    },
}
</script>
<style lang="scss">
// text-decoration: line-through;
    .todo-card{
        width: 100%;
        text-align: center;            
        >.card-body{
            width: 800px;            
            display: inline-block;
            margin-top: 50px;
            >.ant-card-head{
                color: white;
                background: #1890ff ;
            }                
            .card-line{
                margin-top: 30px;
                border-bottom: 1px solid #a0a0a0;
            }
            .todo-list{
                margin-top: 30px;
                .ant-checkbox-inner{
                    width: 30px;
                    height: 30px;
                }
                .ant-checkbox-inner::after{
                    left: 32%;
                    width: 9px;
                    height: 14px;
                }
                .check-text {
                    font-size: 30px;
                }
                >.close-icon{
                    float: right;
                    font-size: 30px;
                }
            }
        }
    }
</style>