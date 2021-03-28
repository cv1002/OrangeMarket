/* 引入Ant的组件 */
import Antd, { message } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Vue from 'vue';
/* ****END**** */

/* Vue中引入Ant的组件 */
Vue.use(Antd);

Vue.prototype.antMessage = message;
/* ******END****** */
