<template>
    <div class="signboard">
        <img 
            :src="imgSrc" 
            alt="图片加载中..."
            :style="{'object-position':'center'+ ' ' + (offset + '%'),cursor: cursorModel}"
            v-if="renderStatus"
            onerror="this.src='default.jpg'"
            draggable = "false"
            @mousedown="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="onMouseUp"
            @mouseout="onMouseOut"
        />
        <div class="btn-group" v-if="renderStatus">
            <div v-if="!adjustModel">
                <button class="btn btn-status" @click="change">修改</button>
                <button class="btn btn-status" @click="adjustOn">调整</button>
                <button class="btn btn-status" @click="hide">移除</button>
            </div>
            <!-- 调整模式状态下的按钮 -->
            <div v-if="adjustModel">
                <button class="btn btn-status" @click="save();adjustOff()">保存</button>
                <button class="btn btn-status" @click="cancel();adjustOff()">取消</button>
            </div>
        </div>
        <!-- 移除图片状态下显示的UI -->
        <div class="create-signboard" v-if="!renderStatus" @click="show">
            <span>插入图片</span>
        </div>
    </div>
    <Suspense>
        <template #default>
            <ImageSelectDialog
                :dialogVisible="dialogVisible"
                @dialog-close="dialogVisibleOff"
                @apply="applyToSignboard"
            />
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import ImageSelectDialog from './ImageSelectOption/ImageSelectDialog.vue'
export default defineComponent({
components:{
    ImageSelectDialog
},
emits:['offset-modify','image-modify','isHide'],
props: {
    /** 图片地址 */
    src: String,
    /** 偏移值 0~100 */
    offset: Number,
    /** 渲染状态 */
    renderStatus: Boolean
},
setup(props,{emit}){

    /** 图片选择对话框的开关控制 */
    let dialogVisible = ref(false)
    const dialogVisibleOn = () => {
        dialogVisible.value = true
    }
    const dialogVisibleOff = () => {
        dialogVisible.value = false
    }
    const applyToSignboard = (src:string) => {
        imgSrc.value = src
        emit('image-modify',src)
    }

    /** 设置图片 */
    const imgSrc = ref(props.src)
    
    let offset:Ref<number> = ref(props.offset ? props.offset : 50)
    let renderStatus:Ref<boolean> = ref(props.renderStatus)
    
    

    /** 动作 */
    let adjustModel:Ref<boolean> = ref(false)   //调整模式的开关
    let cursorModel:Ref<string> = ref('default')
    let preOffset:number = offset.value

    const methods = {
        change:() => {
            dialogVisibleOn()
        },
        adjustOn:() => {
            adjustModel.value = true
            cursorModel.value = "move"
        },
        adjustOff:() => {
            adjustModel.value = false
            cursorModel.value = "default"
        },
        hide:() => {
            renderStatus.value = false
            emit('isHide',false)
        },
        show:() => {
            renderStatus.value = true
            emit('isHide',true)
        },
        save:() => {
            emit('offset-modify',offset.value)
        },
        cancel:() => {
            offset.value = preOffset
        },
    }



    /** 图片的行为 */
    let adjustState:boolean = false
    let clientY: number
    const imgActions = {
        onMouseDown:(ev:any)=> {
            if(!adjustModel.value) return
            adjustState = true
            clientY = ev.clientY
            ev.preventDefault();    //取消事件，这样两个鼠标事件不会同时触发
        },
        onMouseUp:()=> {
            adjustState = false
        },
        onMouseMove:(ev:any) => {
            if(!adjustState) return
            if(clientY - ev.clientY > 0){
                if(offset.value <= 0) { offset.value = 0; return }
                offset.value -= 1
            }else if(clientY - ev.clientY < 0){
                if(offset.value >= 100) { offset.value = 100; return }
                offset.value += 1
            }
            clientY = ev.clientY
        },
        onMouseOut:() => {
            adjustState = false
        }
    }

    return {
        dialogVisible,
        imgSrc,
        offset,
        renderStatus,
        adjustModel,
        cursorModel,
        applyToSignboard,
        dialogVisibleOff,
        ...imgActions,
        ...methods
    }
}
})

</script>

<style lang="less" scoped>
.signboard {
    width: 100%;
    position: relative;
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    &:hover {
        .btn-status{
            display: inline;
        }
    }
}

img {
    inset: 0;
    pointer-events: auto;
    object-position: center;
    object-fit: cover;
    width: 100%;
    height: 300px;  //招牌高度
}

.btn-group {
    position: absolute;
    right: 100px;
    bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
        font-size: 14px;
        line-height: 20px;
        margin-right: 1px;
        border:none;
        color:#ffff;
        background-color: rgba(0, 0, 0, 0.26);

        &:hover {
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0.40);
        }
    }
    .btn-status {
        display: none;
    }
}

.create-signboard {
    width: 100%;
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    span {
        display: none;
        color: rgba(0, 0, 0, 0.226);
        &:hover {
            cursor: pointer;
            color: rgba(0, 0, 0, 0.712);
        }
    }

    &:hover {
        span {
            display: block;
        }
        border-bottom: 1px solid rgba(0, 0, 0, 0.082);
    }
}
</style>