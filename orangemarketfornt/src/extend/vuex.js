import vuex from 'vuex';
import Vue from './vueFactory';

Vue.use(vuex);

const state = new vuex.Store({
    state: {
        title: '',
        loginstate: false,
        user: {
            uid: 2,
            selfie: "/download?fileName=default_selfie.jpg",
            tel: 15770742170,
            password: 114514
        },
        order: {
            shopName: String,
            subIcon: String,
            commodityName: String,
            subName: String,
            price: Number,
            countCommodity: Number,
            subId: Number,
            cid: Number,
            shopId: Number,
            stock: Number
        },
        orderId: Number,
    },
    getters: {},
    actions: {
        async doLogin() {
            const { $ } = await import("@/util/ajax");
            const params = new FormData();
            params.append("username", Vue.$cookies.get("username"));
            params.append("password", Vue.$cookies.get("password"));
            this.state.loginstate = true;
            return await $.post('/login', params);
        }
    },
    mutations: {
        changeTitle(state, payload) {
            this.title = payload;
        }
    }
});

Vue.prototype.$store = state;

export default state;
