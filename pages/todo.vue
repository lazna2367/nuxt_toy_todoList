<template>
    <nav class="todo-card">
        <a-card title="Todo List" class="card-body">
            <!-- input -->
            <a-card-grid style="width:100%; text-align: left;" >
                <a-input-search placeholder='할 일을 입력해주세요.' enter-button="추가" size="large" v-model="inputValue" @search="addTodo"/>
                <div class="card-line" v-if="todoListData.length !== 0"></div>
                <div v-for="(val,idx) in todoListData" :key="idx" class="todo-list clearfix" :id="`check_${idx}`">                    
                    <a-checkbox :checked="checkOnOff[idx]" @change="checkTodoList(idx)" class="card-checkbox" />
                    <span class="check-text" :style="checkOnOff[idx] ? '' : 'text-decoration: line-through'" v-if="!modOnOff[idx]">{{val}}</span>
                    <a-input-search 
                        placeholder='수정할 내용을 입력해주세요.' 
                        enter-button="수정" 
                        size="large" 
                        v-model="todoListData[idx]" 
                        @search="modOnOff.splice(idx,1,!modOnOff[idx])" 
                        class="mod-input"
                        v-show="modOnOff[idx]"
                        :id="`mod-input_${idx}`"
                    />
                    <a-icon type="close-square" @click="delTodo(idx)" class="close-icon" />
                    <a-icon type="form" @click="clickModTodo(idx)" class="mod-icon" v-if="!modOnOff[idx]" />
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
            checkOnOff: [],
            modOnOff: [],
        }
    },
    methods:{
        clickModTodo(idx){
            this.modOnOff.splice(idx,1,!this.modOnOff[idx])
            // setTimeout(() => {
            //     // console.log('ee')
            //     document.getElementById(`mod-input_${idx}`).click()
            // }, 1000); 
        },
        delTodo(idx){
            this.todoListData.splice(idx,1)
            this.checkOnOff.splice(idx,1)
            this.modOnOff.splice(idx,1)
        },
        checkTodoList(idx){
            this.checkOnOff.splice(idx,1,!this.checkOnOff[idx])
        },
        addTodo(){
            if(this.inputValue === ''){
                alert('내용을 입력 해주세요.')
                return false;
            }
            this.todoListData.push(this.inputValue)
            this.checkOnOff.push(true)
            this.modOnOff.push(false)
            this.inputValue = '';
        }
    },
}
</script>
<style lang="scss">
// text-decoration: line-through;
    span{
        line-height: 1;
    }

    .todo-card{
        width: 100%;
        text-align: center;
        >.card-body{
            width: 800px;            
            display: inline-block;
            margin-top: 100px;
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
                .card-checkbox {
                    float: left;
                }
                .check-text {
                    float: left;
                    font-size: 30px;            
                    margin-left: 15px;        
                }
                >.close-icon{
                    float: right;
                    font-size: 32px;
                    color: #ff4109;
                }
                >.mod-icon{
                    float: right;
                    font-size: 32px;                    
                    color: #00c718;
                    margin-right: 10px;
                }
                >.mod-input{
                    width: 89%;
                    margin-left: 15px;
                    .ant-input{
                        height: 31px;
                    }
                    .ant-btn{
                        height: 31px;
                        background-color: #00c718;
                        border: 1px solid #00c718;
                    }
                }
            }
        }
    }
</style>