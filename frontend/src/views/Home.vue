<template>
  <div class="home">
    <div class="header-container">
      <div class="page-title">{{title}}</div>
      <div class="page-subheading">Поддержите меня и получите "спасибо" на этом сайте! <img class="heart-emoji"
                                                                                            src="heart.png"
                                                                                            alt="Heart Emoji"></div>
    </div>
    <div class="donate-container">
      <div class="buttons" v-if="!logined">
        <button class="login discord" @click="login('discord')">
          <svg width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
              <path
                  d="M32.1686 2.58266C29.7466 1.48783 27.1494 0.681209 24.4338 0.219223C24.3844 0.210307 24.335 0.232589 24.3095 0.277154C23.9755 0.862433 23.6055 1.62598 23.3464 2.22612C20.4256 1.79534 17.5199 1.79534 14.659 2.22612C14.3999 1.61264 14.0164 0.862433 13.6809 0.277154C13.6554 0.234076 13.606 0.211794 13.5566 0.219223C10.8425 0.679733 8.2453 1.48635 5.82181 2.58266C5.80083 2.59157 5.78285 2.60644 5.77092 2.62574C0.844537 9.87648 -0.505005 16.949 0.157035 23.9338C0.160031 23.968 0.179502 24.0007 0.206464 24.0215C3.45675 26.373 6.6052 27.8006 9.69519 28.7468C9.74465 28.7617 9.79704 28.7439 9.82851 28.7038C10.5595 27.7204 11.211 26.6835 11.7697 25.5931C11.8026 25.5293 11.7712 25.4535 11.7038 25.4282C10.6703 25.042 9.6862 24.5711 8.73957 24.0363C8.6647 23.9933 8.6587 23.8878 8.72758 23.8372C8.92679 23.6902 9.12605 23.5372 9.31626 23.3827C9.35068 23.3545 9.39863 23.3485 9.43909 23.3663C15.658 26.1636 22.3908 26.1636 28.5363 23.3663C28.5768 23.347 28.6248 23.353 28.6607 23.3812C28.8509 23.5357 29.0501 23.6902 29.2508 23.8372C29.3197 23.8878 29.3152 23.9933 29.2404 24.0363C28.2937 24.5815 27.3096 25.042 26.2746 25.4268C26.2073 25.452 26.1773 25.5293 26.2103 25.5931C26.7809 26.682 27.4325 27.7189 28.1499 28.7023C28.1799 28.7439 28.2338 28.7617 28.2832 28.7468C31.3882 27.8006 34.5366 26.373 37.7869 24.0215C37.8154 24.0007 37.8334 23.9695 37.8364 23.9353C38.6287 15.8601 36.5093 8.84555 32.218 2.62721C32.2075 2.60644 32.1896 2.59157 32.1686 2.58266ZM12.6984 19.6808C10.826 19.6808 9.28329 17.9874 9.28329 15.9076C9.28329 13.8279 10.7961 12.1345 12.6984 12.1345C14.6155 12.1345 16.1434 13.8428 16.1134 15.9076C16.1134 17.9874 14.6006 19.6808 12.6984 19.6808ZM25.325 19.6808C23.4527 19.6808 21.91 17.9874 21.91 15.9076C21.91 13.8279 23.4228 12.1345 25.325 12.1345C27.2423 12.1345 28.77 13.8428 28.7401 15.9076C28.7401 17.9874 27.2423 19.6808 25.325 19.6808Z"
                  fill="#FDFDFD"/>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="38" height="29" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span>Войти через Discord</span>
        </button>
        <button class="login vk" @click="login('vk')">
          <svg width="33" height="19" viewBox="0 0 33 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M5.00091 0H1.5001C0.499865 0 0.299805 0.4708 0.299805 0.9898C0.299805 1.9169 1.48666 6.5148 5.826 12.5959C8.7189 16.7488 12.7947 19 16.5036 19C18.7289 19 19.0042 18.5 19.0042 17.6388V14.5C19.0042 13.5 19.215 13.3004 19.9196 13.3004C20.4389 13.3004 21.329 13.56 23.406 15.5623C25.7797 17.9354 26.171 19 27.5061 19H31.0069C32.0072 19 32.5073 18.5 32.2188 17.5133C31.9031 16.5299 30.7698 15.103 29.266 13.4117C28.45 12.4476 27.2261 11.4094 26.8552 10.8902C26.336 10.2228 26.4843 9.9261 26.8552 9.3329C26.8552 9.3329 31.1204 3.3259 31.5655 1.2866C31.788 0.5449 31.5655 0 30.5068 0H27.006C26.1159 0 25.7055 0.4708 25.4829 0.9898C25.4829 0.9898 23.7027 5.3282 21.1807 8.1463C20.3647 8.962 19.9938 9.2216 19.5487 9.2216C19.3262 9.2216 19.0041 8.962 19.0041 8.2205V1.2866C19.0041 0.3966 18.7458 0 18.0039 0H12.5026C11.9464 0 11.6118 0.413 11.6118 0.8045C11.6118 1.6481 12.8728 1.8427 13.0028 4.2158V9.37C13.0028 10.5 12.7986 10.7049 12.3536 10.7049C11.1668 10.7049 8.27991 6.3471 6.56771 1.3607C6.23221 0.391501 5.89561 0 5.00091 0Z"
                  fill="white"/>
          </svg>
          <span>Войти через VK</span>
        </button>
      </div>
      <div class="donate-form" v-if="logined">
        <div class="donate-top">
          <div class="form-loggined-as">
            <div class="form-heading">Вы вошли как</div>
            <div class="form-username flex-20">
              <img class="user-avatar" :src="image">
              <div class="user-username">{{ user.username }}<span style="color: #6e6e6e" v-if="user.discriminator">#{{
                  user.discriminator
                }}</span></div>
            </div>
          </div>
          <div class="input-flex">
            <div class="form-amount">
              <div class="form-heading">Сумма <span class="small">(мин. 10р)</span></div>
              <div class="flex-20">
                <input type="number" v-model="sum" class="form-input" min="10" max="15000" placeholder="100" required>
                <p class="form-currency">RUB</p>
              </div>
            </div>
            <div class="form-comment">
              <div class="form-heading">Комментарий <span class="small">(макс. 150 симв.)</span></div>
              <div class="flex-20">
                <input v-model="comment" maxlength="150" type="text" class="form-input comment" placeholder="Привет!" required>
              </div>
            </div>
          </div>
        </div>
        <div class="donate-bottom">
          <div class="donate-select">
            <div class="form-heading">Способ оплаты:</div>
          </div>
          <div class="donate-buttons">
            <button @click="CreateBill()" class="form-checkout qiwi"><span class="full">Оплатить с помощью </span>Qiwi</button>
            <div class="or">или...</div>
            <button type="submit" @click="CreateBillDA()" class="form-checkout da"><span class="full">Оплатить с помощью </span>DA</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loading">
      <div class="loader">
        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
              <stop stop-color="#fff" stop-opacity="0" offset="0%"/>
              <stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/>
              <stop stop-color="#fff" offset="100%"/>
            </linearGradient>
          </defs>
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)">
              <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="0.9s"
                    repeatCount="indefinite"/>
              </path>
              <circle fill="#fff" cx="36" cy="18" r="1">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="0.9s"
                    repeatCount="indefinite"/>
              </circle>
            </g>
          </g>
        </svg>
      </div>
      <div class="loader-text">
        Идёт загрузка......
      </div>
    </div>
    <div class="loading" v-if="!loading && Object.keys(this.donations).length < 1">
      Похоже, здесь пусто.....
    </div>
    <div class="donate-table" v-if="!loading && !Object.keys(this.donations).length < 1">
      <table id="table" class="main-table">
        <thead>
        <tr>
          <th>Никнейм</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Комментарий</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="donate in donations" :key="donate.id">
          <td data-label="Никнейм">{{ donate.username || "Неизвестный" }}</td>
          <td data-label="Сумма">{{ donate.money }}</td>
          <td data-label="Дата">{{ getDate(donate.time) }}</td>
          <td data-label="Комментарий">{{ donate.comment || "Не указано" }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <Footer v-if="!loading && !Object.keys(this.donations).length < 1"/>
  </div>
</template>
<script lang="js">
import socket from 'socket.io-client';
import Footer from '../components/Footer';
import {url, dalink, page_title} from '../../config.json';
import moment from 'moment';
export default {
  components: {
    Footer
  },
  data: () => ({
    title: String,
    donations: [],
    loading: true,
    logined: false,
    window: Object,
    user: Object,
    image: String,
    sum: 100,
    comment: 'Привет!',
    typebill: ' '
  }),
  async mounted() {
    this.title = page_title;
    document.title = page_title;
    if (!localStorage.getItem('token')) window.addEventListener('message', this.receiveMessage, false);
    if (localStorage.getItem('token')) await this.getUserData();
    const io = socket('wss://'+url)

    io.on('connect', () => {
      console.log('connected');

      io.emit('donations');

      setInterval(() => {
        io.emit('donations')
      }, 15000);
    })
    io.on('donations', async (x) => {
      this.donations = x;
      this.loading = false;

    })
  },
  methods: {
    getDate(date) {
     return moment(date).format('DD.MM.YYYY HH:mm');
    },
    async CreateBill() {
      if (!this.sum) return alert('Вы не указали сумму!');
      if (!this.comment) return alert('Вы не указали комментарий!');
      if (this.sum < 10) return alert('Минимальная сумма пополнения 10 руб.');
      if (this.sum >= 15000) return alert('Максимальная сумма пополнения 10 руб.');
      if (this.comment.length >= 150) return alert('Максимальная длина коментария 150 символов.');
      const data = await (await fetch(`https://${url}/qiwi/create`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
          amount: this.sum,
          comment: this.comment
        })
      })).json()
      if (!data.payUrl) return;
       document.location.href = data.payUrl
    },
    async CreateBillDA() {
      const data = await (await fetch(`https://${url}/da/createhash`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })).json();
      prompt('После нажатия на "ОК" вы будете перенаправлены на страницу оплаты, пожалуйста обязательно скопируйте код из поля, это нам нужно для того чтобы система смогла отследить что отправили донат именно вы, вы должны в поле "ИМЯ" указать это:', data.hash)
      document.location.href = dalink;
    },
    authorizate(type) {
      let d = document.documentElement, h = 700, w = 500;
      const params = `height=${Math.min(h, screen.availHeight)}, width=${Math.min(w, screen.availWidth)}, left=${Math.max(0, ((d.clientWidth - w) / 2 + window.screenX))},top=${Math.max(0, ((d.clientHeight - h) / 2 + window.screenY))}`
      this.window = window.open(`${encodeURI(`https://${url}/oauth2/${type}/authorize`)}`, '', params);
      let checkwindow = setInterval(() => {
        if (!this.window.window && !localStorage.getItem('token')) {
          clearInterval(checkwindow);
        }
      }, 1000)
      let logincheck = setInterval(async () => {
        if (localStorage.getItem('token')) {
          await this.getUserData()
        }
        if (this.user?.username || this.user?.first_name) {
          clearInterval(logincheck);
        } else {
          localStorage.removeItem('token');
        }
      }, 2000);
    },
    login(type) {
      switch (type) {
        case 'vk' : {
          this.authorizate('vk');
        }
        break;
        case 'discord' : {
          this.authorizate('discord');
        }
      }
    },
    async receiveMessage(message) {
      if (typeof message !== 'object') return;
      if (!message['data']) return;
      if (!message.data['token']) return;
      if (JSON.parse(message.data.token)) localStorage.setItem('token', JSON.parse(message.data.token));
      else return;
    },
    async getUserData() {
      const info = await fetch('https://'+ url + '/oauth2/user', {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      const { data, type } = await info?.json();
      if (!type) return;
      this.user = data;
      switch (type) {
        case 'discord': {
          if (data?.avatar) this.image = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.${data.avatar.startsWith('a_') ? 'gif' : 'png'}?size=512`
          else this.image = `https://cdn.discordapp.com/embed/avatars/${data.discriminator % 5}.png`;
        } break;
        case 'vk': {
        this.image = data.photo_400_orig;
        this.user.username = data.first_name + " " + data.last_name;
      } break;
      }
      this.logined = true;
    }
  }
}
</script>
