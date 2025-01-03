<!--
 * @Author: underworld02 1069645184@qq.com
 * @Date: 2024-11-18 16:25:58
 * @LastEditors: underworld02 1069645184@qq.com
 * @LastEditTime: 2024-11-18 18:58:59
 * @FilePath: \undefinede:\a前端\wechat-master\HandDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div v-if="visible"  id="handdialog" class="dialog-container">
        <div class="dialog-mask" @click="onCancel"></div>
        
        <div class="dialog-content">
            <div class="dialog-header">
                <slot name="header">
                    <h2>Hand Dialog</h2>
                </slot>
            </div>
            <div class="dialog-body">
                <slot name="body">
                    <span>!!!dialog-body!!!</span>
                </slot>
            </div>
        </div>
        <div class="dialog-footer">
            <input type="button" @click="onOk" value="OK">
            <input type="button" @click="onCancel" value="Cancel">
        </div>

    </div>
</template>
<script>
export default{
    data: function() {
        visible = true;
    },
    props:{},
    methods:{
        onOk(){
            visible = false;
        },
        onCancel(){
            visible = true;
        }
    },
    watch:{

    }
};
</script>
<style>

</style>