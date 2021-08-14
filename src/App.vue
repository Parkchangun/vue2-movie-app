<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer'
import chan from 'npm-test';

export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    const arr = chan(['A', 'B', 'C', 'A', 'B']);
    console.log(arr);
  }
};
</script>

<style lang="scss">
@import "./scss/main";
</style>