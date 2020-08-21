<template>
  <div class="toast" v-show="isshow">
    {{message}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      message:'',
      isshow:false
    }
  },
  methods: {
    show(message, duration =2000){
      this.isshow = true
      this.message = message
      setTimeout(()=>{
        this.isshow = false
      this.message = ''
      },duration)
    }
  }

}
</script>

<style scoped>
.toast{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 7px;
  z-index: 100;
}
</style>