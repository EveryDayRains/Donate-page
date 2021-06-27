<template>
  <div class="footer">
    <div class="footer-main">
      <div class="footer-link">
        <div class="footer-text">У вас проблема?</div>
        <a class="footer-sublink" href="tg://resolve?domain=livixx"><svg viewBox="0 0 448 512" class="svg-inline--fa fa-telegram-plane fa-w-14 fa-3x"><path fill="currentColor" d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path></svg> Telegram</a>
      </div>
      <div class="footer-link-last">
        <div class="footer-text">Проект: </div>
        <a class="footer-sublink" href="https://github.com/mrlivixx/donate-page"><svg viewBox="0 0 496 512" class="svg-inline--fa fa-github fa-w-16 fa-3x"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" class=""></path></svg> GitHub</a>
      </div>
      <div class="author">Designed by</div>
      <img class="aem_logo" src="/aem_logo.svg">
      <div class="text-right">2021</div>
    </div>
  </div>
</template>
<style scoped>
.footer {
  color: #5e5e5e;
  margin-top: 40px;
  font-weight: 600;
  user-select: none;
  animation: fade-in 0.7s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation-delay: 2.5s;
}

.footer-link, .footer-link-last{
  display: flex;
  gap: 25px;
  margin-bottom: 5px;
}

.footer-sublink{
  display: flex;
  gap: 15px;
  text-decoration: none;
  color: white;
  transition: .2s;
}

.footer-link-last{
  margin-bottom: 30px;
}

.footer-sublink svg{
  width: 18px;
}

.footer-sublink:hover{
  color: #bbbbbb;
  ransition: .2s;
}

.text-right {
  float: right;
  text-align: right;
  margin-top: 8px;
}

.aem_logo {
  margin-top: 10px;
  width: 110px;
  border-radius: 5px;
  font-weight: 400;
}

.footer-main {
  margin-top: 20px;
  margin-bottom: 30px;
}

@media screen and (max-width: 508px) {
  .footer-link, .footer-link-last{
    display: flex;
    gap: 5px;
    margin-bottom: 15px;
    flex-direction: column;
  }

  .footer-link-last{
    margin-bottom: 30px;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<script>
export default {}
</script>
