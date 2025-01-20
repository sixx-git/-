<template>
  <n-config-provider :theme="currentTheme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <router-view></router-view>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'

const currentTheme = ref(null)

// 提供主题切换函数给子组件
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === null ? darkTheme : null
}

provide('toggleTheme', toggleTheme)
provide('isDarkTheme', currentTheme)
</script>

<style>
html {
  font-size: 16px;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

#app {
  width: 100vw;
  height: 100vh;
}
</style> 