<template>
    <div class="template">
        <div class="card-modal-template">
            <div class="flex-template-body">
                <div>                    
                    
                </div>
                <div></div>
            </div>
            <a-icon type="close" @click="close()"/>
        </div>
    </div>      
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted(){
        
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }   
}
</script>
<style lang="scss">
.template{
    
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: fixed;    
    // transition: opacity 0.3s ease;
    z-index: 10;
    >.card-modal-template{
        position: relative;
        background: white;
        width: 80%;
        height: 80%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 29px;
        >.flex-template-body{
            display: flex;
            width: 100%;
            height: 100%;
            background: white;
        }
    }
}

</style>