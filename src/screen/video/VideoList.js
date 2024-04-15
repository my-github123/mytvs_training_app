import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  Dimensions,
  Platform,
  BackHandler,
  Alert,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import images from '../../components/images';
import Heart from '../../../assets/images/heart.svg';
import Comment from '../../../assets/images/comment.svg';
import User from '../../../assets/images/user.svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Notification from '../../../assets/images/notification.svg';
import Account from '../../../assets/images/account.svg';
import Total from '../../../assets/images/total.svg';
import Completed from '../../../assets/images/Completed.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Incompleted from '../../../assets/images/InCompleted.svg';
import {apiGetWithoutToken} from '../api/Api';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

// Define the base width and height
const baseWidth = 375; // For example, iPhone 11 width
const baseHeight = 812; // For example, iPhone 11 height

// Calculate the scaling factor
const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scaleFactor = Math.min(scaleWidth, scaleHeight);

// Calculate the dynamic width and height
const dynamicWidth = 157 * scaleFactor;
const dynamicHeight = 107 * scaleFactor;

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
});

console.log(formattedDate, 'formatted date in the ofifve');

// const DummyData = [
//   {
//     id: 1,
//     Title: 'Battery Jump Start',
//     date_created: formattedDate,
//     VideoUrl:
//       'https://ff669571ff247bce43ec33aa8d2f396bf942463cf9723801983d0a7-apidata.googleusercontent.com/download/storage/v1/b/bkt-gobumper-stag-01/o/RSATRG%2Ftraining%20portal%20videos%2FEV%20Gun%20Stuck.mp4?jk=AWNiL9L_dUVEAoNJW3kti7qKEqal8qUKUepzLvnzjsYxyyrZ6AvF6VmnyqwopbZpDVyxEofaODFAOPDS0LCKiv_J0zeaoHRBISjf0SZZS3z7MnZH7EX0u64sdfdNRCxM7UhgNbaxnE3Hi_tiMUfmYA5NG8Uh8WFErnVEupbROBJwvckP4DTWOhI_gWOiQRDGEnBNSswuFYjGpgoew67deCEgLNP3ZM6qzlaaZVkrus7jnQNWVzYCbwbbT3W9AjoWMQDkjsT3tsxAbeXOX1oL5K8quCHpzjwaebM0KT1fdHB-KN-2dcmxrvuQH3oFMI7x5Eus3nie5I0I6QLxkfcO7X_vwP4VCGI5G-Gsym0ZdIejeSi3WCdiBQWxMNQIietMI98k9BtDquj6f_2oMFav7276XTuPgVR8wAWeb5Fb2yQoGHKgofuQnCDQCaU90ucsxvdoVG3TTwVB4NlUYqDy2Oa9gZIUhAGamrCykLhDOASm-lPpdk6gOmZCjWL3u6OQ8FksJiVkJv9KktQopByPkLOBTmM0hVManfu6Zx_fQm9KDgUouGD8eG640GR79vMoYsFDpzK3pX-5g0i1J5KTD4913kkO5ftoQaumYc2aGoegkdvxkQjk6palzU4tUsyIXUUDwHEXcRViUf434iKkx3KcJcNQbfRHvtdjpHZREeV6YQ2w1rCsRzjJpn8QD5JrFDbKMLCMWH2b-GJkctU3J35vgMofWD7ZFf2ptP_RsL0H5bSEJFiAzz1RFDMYOd9yDLQbPrBPMIq5U9rnmhlFr0N9HWe_eXc8ZFlqA1p2HRlTyILSe0q8-KHZ-pFipO9B4jLBqQ4iwJcBq7S6IoWzrBn9v-QOlrcIBmcrFNB_j3OD6-ozxUc4ga9D8m5a5OBeD9r8p-54sEI5MH-NLDthRBqIMSMpf6LV1Xedduat0H8KvuPaumIw9V_8LoQTkdgz7kOyxGLKVTIH7TZIcDFPJVf5KG2BsYPa_Yc47Wpl-BPwambF0rPzRkkeDYFVBKqpJ2jSic7SmQuovZ4W1JWaWN2ENHzIrKasuMAhHBeFW-zFgwIG6U-s-8FB2Qd7B9mFYHMvYqjgEim4n5X75_L2VFSz0v3xZHTIKsCyrwditnVa5NT1kgRuX1y88Ur5kWgxT80JM6_xB-NJQrM970KiuOiCipvFQmkaUekJs6k&isca=1',
//     TumbNailImage:
//       'https://media.istockphoto.com/id/1131515213/photo/a-mechanic-is-repairing-motor-bike.jpg?s=1024x1024&w=is&k=20&c=vK6U429PRx1wCeXxQki0dy7H4LaoQRPd2luhkpefDzM=',
//     description:
//       'Perform basic care and maintenance, including changing oil, checking fluid levels, and rotating tires.',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
//   {
//     id: 2,
//     Title: 'Incredible drone footage',
//     date_created: formattedDate,
//     VideoUrl:
//       'https://ff69a0c068daccbf72127cae55865f8962f43e7f7b72c5c83dcdc6d-apidata.googleusercontent.com/download/storage/v1/b/bkt-gobumper-stag-01/o/RSATRG%2Ftraining%20portal%20videos%2FEV%20Jump%20Start.mp4?jk=AWNiL9JSvOseFH2lpXgXy5qPTr0qCogXepab9hPfOcBNRSUN8SMb4lRUWZEN8Q20aluH7qPxkAP2Q-unn1PHWx-Yj8kPbneLQO-uJt_h3J0QCanOgnzIlpCUAncGbKAh2L5P37FirmlAhFRDrQNfd8E1NuONiDlxsUEkeFcCOLMgOox9AKxUl0Y9xHB5m0j7MnTToM6B-U_AQcWeLNni-aHPCSyYt5yiIi3S35IUPkQo3s_aDNFPqL9otQtQg8eoV5arqKXPAEUlhZVRlCktoMqSTnLJYsQoD8gN38Tqiw-F44gTOnl0J3GTJnATnfBJnlIuhfk6omZ1HBoqUYiNXLWVDdGPtB9edvP-BhMcu8jV0isLYX9wGhBSbFWDUTR7kU2b03RayhOenkmWKZwvUUh70f-5uGCZ9Yx8ADfOMPSVrXK1-4fId2Zq2CheJt50UrxxUyGF-v3MbOIc2eTKgbZRNVWLdT2tKGmYZHtyC9VjtHfRi0SoYTnWB0c7-RFm2yZp3UwKlCjNvAZvrcWlCw95j6Zmr-tfWLH2CvEIIN0Dtdw3SJ0y3G5OHNXSovM5ScQtKSgC7_Ugr4-HdrQpeYg9NVtYwXWHFiBvb1c2O7xOyNCVRA6rlu7O7PDltStMJ1iUDA03Tb7a5v7wkTCy3EuSNPxT50vdSZO316JoTehYaL_j_SZd0qxdtX7Y-3DSI1BzAtJjhqnSflYPBhGvK957c4F7hdyyyQRmlRuL5aSS7yWNGWmJbeAhcX_HSIz83uyqApst2foJvnAE6k5o7unMwEWyrp72gDwmp6PVDNPzv5DufPUkIeTQAWzCG7tj5es_iLuu7ncpJKBqkQ_m2kvqHDv-9b6CxJ0FmMSvhHNgFlhYMDE42SprQfPDRXQYbqc1cjMQHgG5mXVJvtSZqdledpyv6Ts3nrvPWPBEbeuLJIAAtNZw-GWeYsYKlnoeu9cYYWxTtVTBfZm_5jHlSftfJ-h1dDveZj_MNrHhb-Qk_Ws6cULoy7QI624b2hfZZz06jW-dmkI_nIWMzzMEr9cJGhl_ujsPkPhLYSfMNcYTw34i81Ctzr-tWta6FQklEG_IYF5KanowXmfKTC08ZyCrdD1VRv6zhz_mu7jZOxXHh-wVqrt8AcqAjexepO_CCy9Fyr7RMskIJb5Gp2rH762V92oX_kLjBtj9r23y&isca=1',
//     TumbNailImage:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0rmkZZQpUPvOxklgtTUnabtcrcp_NHxWlAb2zfsZ2Ag&s',
//     description:
//       'Perform basic care and maintenance, including changing oil, checking fluid levels, and rotating tires.',
//     like_count: 50,
//     comment_count: 10,
//     viewers_count: 250,
//   },
//   {
//     id: 3,
//     Title: 'Battery Jump Start',
//     date_created: formattedDate,
//     VideoUrl:
//       'https://ffd84ea9766dd1b879aaee869588ebbd21aeddf217e6acb367e0e4a-apidata.googleusercontent.com/download/storage/v1/b/bkt-gobumper-stag-01/o/RSATRG%2Ftraining%20portal%20videos%2FKey%20lock%20inside%20or%20key%20lost.mp4?jk=AWNiL9IRB4BjqZ8OjbcuHXpHVK_7CNUaCQLbP6GRkrmxWuOT1vCGV7kT3LUJRLUeWZuT69EiUZkJn2HZXzpudYXme4HUnZ2Vm9iAC1wZEHqvHBrQlcL3HWTUwtEykUkR6DfMDdnlkjDYvOYp3jHB2CRUn56dqfqeZD7GpvAf9TGN4rpGUaYZNKogrzB02yUMezKPAs_ZinZoUpkR7_LD8CspJPgw28O34zpfr7ieAaEw4pz3sIgBJojm8QKTVSyUgc8zjVoStlO9fQHOu1YaDzBjQBpKmJ9dSNfOTWaX2VxYTpn2IwyM9MXRddb4FLcjYSujW0pyOuwUP0djBgRu4jlbuT0mw07SapELIQJOES-bRdpjm32g3dy1RJZ-tNbwH4-n7-_Kvhif3c-uQhYa7JArbrnxcCQud4HtUO9ueTzaGDHp2TbPPg_RMhHdzopV1CFiRptyoDX3TODPmxd-E_jt8r0uHiY8gkHPWDIe0P-c3sQOpMgfoztOPzlcO7maAIFcuYbiZ0Pa9vZd0Tu6NhXFBFZKse8lZslZK2Ge5R1KMjzZA_tIVWhRjMMx6-tKrSLZcjJCGI5ZlB5rNeR-UZ3OrY1pkogkzv3C9Qoiv13EoY8BE0Oad3DcnS-X0e10zOqSaDfTMyxHQ1OefLZluhS2Wje-8T_dOPQHlG07XbXiE3g_WHqMrOkyOjqgytpKT3SQU4TJQz2-5kp1PHSjhnbkppADX0MI49aeFaoFI4KuiN3PvohU4foRFqhgJzyLuKdYKdLmBoiqXE-S2OR2pVnT2beKmJSaKjui9W41pZ3VT3FVR1dB22yGEdMdHn5UcKQD4KaWkkpsSdcgAA7htcFvMFSYxm9vlq2-ah63YkwEXeYQavz767VkRZCR3-RDkLx7xd_zBG2ABKHaW3EHoiH2he7Zxqw9f8fkZ4xS_ckwiH8puME2H6d9X7HOKhDY8ZTxs-LBIjnlGnXRupEt-gJdCqtppaXoMC2RNJdsF6w9GKljPVvR0QpqbCFdk1yfSnJau7rhtyFzPwDu31DJ38sfwhnIJaUnBZXQffntmQk_Kjlx8BuQe4SN5bTi_jlkOsx04T2JwKHH6sZC60tpaRgTtFwpu5sdnEB8A7aGyse0uSfh6oGJ1GeFjlCzugiP9SAkJVlRfApZR33Fch84b9rjCjUgS4osMGGTBnRmtCDYoKOvH8zGhD84f6ACZaO6NH0&isca=1',
//     TumbNailImage:
//       'https://c0.wallpaperflare.com/preview/980/505/305/car-mechanic-automobile-mechanical-thumbnail.jpg',
//     description:
//       'Perform basic care and maintenance, including changing oil, checking fluid levels, and rotating tires.',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
//   {
//     id: 4,
//     Title: 'Battery Jump Start',
//     date_created: formattedDate,
//     VideoUrl:
//       'https://ff31b90dd25bf5839d404f3ab95ab8e831e1c518ee6989a76a14c88-apidata.googleusercontent.com/download/storage/v1/b/bkt-gobumper-stag-01/o/RSATRG%2Ftraining%20portal%20videos%2FSmart%20Key%20out%20of%20range%20cell%20replacement.mp4?jk=AWNiL9KWnUYTWovcR800P_0FwAyPPWqlWxpAc2a8xPL7kZYwVpUMhj1HtYVfDmhJtEUy1L5sM5FpK-vw5WHBBZ5-tCJwaskvdALaTZB2u8qaNvhv523b-4WdbRvXtJjQxQCZbNc2iiQPw9WrD89EA24GbKTRimBqNx-bg6TxxrRwnC3W0Be0Cl-EU6gGa1PrwHAPsuoRgGoxOI-Tmn0D_yzghPuShRjWz84XBOHLSHBCuC9xsHElJvIGtfRGFSD-9rDILnrRBkdcmJ8jSqia7LtMTndelAHBSP2aQn0PGPrtxZzUNR4HQwt3I3w0iQ0qP1YznGUKlQXvPLDKGl_G5ifE-aiXpQAd6kfzZhfZ_mcpdU1CAkZZP7-UqIU3Csmoqjc5v0Jb0pp6KxaW6pnfMO69IDhPUDPYTZbVu88wfn54jV_XZ0thpT9uNQ6pA9LSSG0chufzv42gZXNyeeRyutdjY6cA9JvRQrin1YJ2Zk5llJg3ODr9hyCD99jEHDQpKW7AF7DRFQpWeoEkFRTkvkhQiXTfRZ8s_9YY3VMgC6lhXi216V4M5qBgjd8l81Kf-DnX2bYMvaXnBWbPXmS67tG3fNFhdo4RGRzyiRopP_zAcVzVlFqHhBTEdxLGLUhcrZiyJEhnearD9cVlOwblXG3_cxr5RohY-vyjNinFb4aFncnocKLfbWBzPWsLLJEwk1gbAgT9mHDoaYDQw4qBk1O3Jtc3Wxdkvs0HMn_9CNQy6L35csyGjDqYBNWnTNSH26rzcovU-TNB6AOjtVG9ABfMBYltPAyGt_S1gxjLn8lk1IDD7HiZbCyK2V2QOZywgwuSXXWAd7GQUeuGuv45OmxtwxVQ4IP42alR_7nmmXYnNlx_WemQkVlcQplizVm7IjD7be4rzx2icv5SXqrwJ-bd_esUJL_ggcSdLlCtxaRwmPHGNOFNhK6GJqCc_fnGE9ChVk1LFcC644hzyR3Orx1oWQ7-NTBLgOd0GTrSXXGSg8tFJ3cZJlhnMw_V8Klcd9nAXWswg_HfRtqJWHNGKOx6hItShn-9I_9cJkorACh0dEIT4fI89lYZHTBu4900aiPLB_sa6T_JEj6pWWk8UrBDZm0HxQOcHTRAfD_HRQ3qHZvHr97OQZMK6fwm5hMUVYOqT_bjRT6GIeqgxCDtNgXGUClD8HIVbsdxueOm42Kjl_XCerwWSoiqdB4hY1ugkI2_NnRP5fRjQpl65JoEjQ&isca=1',
//     TumbNailImage:
//       'https://media.gettyimages.com/id/944047118/video/dolly-shot-to-close-up-asian-senior-car-mechanic-move-to-under-vehicle-from-working.jpg?s=640x640&k=20&c=-5-2gotfKf_uP0xbttZBLP9YCRYlQZxJjVidqQt3iOY=',
//     description:
//       'Perform basic care and maintenance, including changing oil, checking fluid levels, and rotating tires.',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
//   {
//     id: 5,
//     Title: 'Battery Jump Start',
//     date_created: formattedDate,
//     VideoUrl:
//       'https://ff31b90dd25bf5839d404f3ab95ab8e831e1c518ee6989a76a14c88-apidata.googleusercontent.com/download/storage/v1/b/bkt-gobumper-stag-01/o/RSATRG%2Ftraining%20portal%20videos%2FSmart%20Key%20out%20of%20range%20cell%20replacement.mp4?jk=AWNiL9KWnUYTWovcR800P_0FwAyPPWqlWxpAc2a8xPL7kZYwVpUMhj1HtYVfDmhJtEUy1L5sM5FpK-vw5WHBBZ5-tCJwaskvdALaTZB2u8qaNvhv523b-4WdbRvXtJjQxQCZbNc2iiQPw9WrD89EA24GbKTRimBqNx-bg6TxxrRwnC3W0Be0Cl-EU6gGa1PrwHAPsuoRgGoxOI-Tmn0D_yzghPuShRjWz84XBOHLSHBCuC9xsHElJvIGtfRGFSD-9rDILnrRBkdcmJ8jSqia7LtMTndelAHBSP2aQn0PGPrtxZzUNR4HQwt3I3w0iQ0qP1YznGUKlQXvPLDKGl_G5ifE-aiXpQAd6kfzZhfZ_mcpdU1CAkZZP7-UqIU3Csmoqjc5v0Jb0pp6KxaW6pnfMO69IDhPUDPYTZbVu88wfn54jV_XZ0thpT9uNQ6pA9LSSG0chufzv42gZXNyeeRyutdjY6cA9JvRQrin1YJ2Zk5llJg3ODr9hyCD99jEHDQpKW7AF7DRFQpWeoEkFRTkvkhQiXTfRZ8s_9YY3VMgC6lhXi216V4M5qBgjd8l81Kf-DnX2bYMvaXnBWbPXmS67tG3fNFhdo4RGRzyiRopP_zAcVzVlFqHhBTEdxLGLUhcrZiyJEhnearD9cVlOwblXG3_cxr5RohY-vyjNinFb4aFncnocKLfbWBzPWsLLJEwk1gbAgT9mHDoaYDQw4qBk1O3Jtc3Wxdkvs0HMn_9CNQy6L35csyGjDqYBNWnTNSH26rzcovU-TNB6AOjtVG9ABfMBYltPAyGt_S1gxjLn8lk1IDD7HiZbCyK2V2QOZywgwuSXXWAd7GQUeuGuv45OmxtwxVQ4IP42alR_7nmmXYnNlx_WemQkVlcQplizVm7IjD7be4rzx2icv5SXqrwJ-bd_esUJL_ggcSdLlCtxaRwmPHGNOFNhK6GJqCc_fnGE9ChVk1LFcC644hzyR3Orx1oWQ7-NTBLgOd0GTrSXXGSg8tFJ3cZJlhnMw_V8Klcd9nAXWswg_HfRtqJWHNGKOx6hItShn-9I_9cJkorACh0dEIT4fI89lYZHTBu4900aiPLB_sa6T_JEj6pWWk8UrBDZm0HxQOcHTRAfD_HRQ3qHZvHr97OQZMK6fwm5hMUVYOqT_bjRT6GIeqgxCDtNgXGUClD8HIVbsdxueOm42Kjl_XCerwWSoiqdB4hY1ugkI2_NnRP5fRjQpl65JoEjQ&isca=1',
//     TumbNailImage:
//       'https://www.shutterstock.com/image-photo/mechanic-using-wrench-while-working-600nw-2184125681.jpg',
//     description:
//       'Perform basic care and maintenance, including changing oil, checking fluid levels, and rotating tires.',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
//   {
//     id: 6,
//     Title: 'Battery Jump Start',
//     date_created: formattedDate,
//     VideoUrl:
//       'https://ff31b90dd25bf5839d404f3ab95ab8e831e1c518ee6989a76a14c88-apidata.googleusercontent.com/download/storage/v1/b/bkt-gobumper-stag-01/o/RSATRG%2Ftraining%20portal%20videos%2FSmart%20Key%20out%20of%20range%20cell%20replacement.mp4?jk=AWNiL9KWnUYTWovcR800P_0FwAyPPWqlWxpAc2a8xPL7kZYwVpUMhj1HtYVfDmhJtEUy1L5sM5FpK-vw5WHBBZ5-tCJwaskvdALaTZB2u8qaNvhv523b-4WdbRvXtJjQxQCZbNc2iiQPw9WrD89EA24GbKTRimBqNx-bg6TxxrRwnC3W0Be0Cl-EU6gGa1PrwHAPsuoRgGoxOI-Tmn0D_yzghPuShRjWz84XBOHLSHBCuC9xsHElJvIGtfRGFSD-9rDILnrRBkdcmJ8jSqia7LtMTndelAHBSP2aQn0PGPrtxZzUNR4HQwt3I3w0iQ0qP1YznGUKlQXvPLDKGl_G5ifE-aiXpQAd6kfzZhfZ_mcpdU1CAkZZP7-UqIU3Csmoqjc5v0Jb0pp6KxaW6pnfMO69IDhPUDPYTZbVu88wfn54jV_XZ0thpT9uNQ6pA9LSSG0chufzv42gZXNyeeRyutdjY6cA9JvRQrin1YJ2Zk5llJg3ODr9hyCD99jEHDQpKW7AF7DRFQpWeoEkFRTkvkhQiXTfRZ8s_9YY3VMgC6lhXi216V4M5qBgjd8l81Kf-DnX2bYMvaXnBWbPXmS67tG3fNFhdo4RGRzyiRopP_zAcVzVlFqHhBTEdxLGLUhcrZiyJEhnearD9cVlOwblXG3_cxr5RohY-vyjNinFb4aFncnocKLfbWBzPWsLLJEwk1gbAgT9mHDoaYDQw4qBk1O3Jtc3Wxdkvs0HMn_9CNQy6L35csyGjDqYBNWnTNSH26rzcovU-TNB6AOjtVG9ABfMBYltPAyGt_S1gxjLn8lk1IDD7HiZbCyK2V2QOZywgwuSXXWAd7GQUeuGuv45OmxtwxVQ4IP42alR_7nmmXYnNlx_WemQkVlcQplizVm7IjD7be4rzx2icv5SXqrwJ-bd_esUJL_ggcSdLlCtxaRwmPHGNOFNhK6GJqCc_fnGE9ChVk1LFcC644hzyR3Orx1oWQ7-NTBLgOd0GTrSXXGSg8tFJ3cZJlhnMw_V8Klcd9nAXWswg_HfRtqJWHNGKOx6hItShn-9I_9cJkorACh0dEIT4fI89lYZHTBu4900aiPLB_sa6T_JEj6pWWk8UrBDZm0HxQOcHTRAfD_HRQ3qHZvHr97OQZMK6fwm5hMUVYOqT_bjRT6GIeqgxCDtNgXGUClD8HIVbsdxueOm42Kjl_XCerwWSoiqdB4hY1ugkI2_NnRP5fRjQpl65JoEjQ&isca=1',
//     TumbNailImage:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzlea4uoEipXxcEzI8tccUgHQFyJMCetzsnFAaA0LG3Q&s',
//     description:
//       'Perform basic care and maintenance, including changing oil, checking fluid levels, and rotating tires.',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
// ];

const VideoList = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [dashboardDetails, setDashboardDetails] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
    getDashboard();
    getVideos();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // const getData = async () => {
  //   try {
  //     const username = await AsyncStorage.getItem('username');

  //     if (username !== null) {
  //       setUsername(username);
  //     }
  //   } catch (e) {
  //     console.log(e, 'fyy');
  //   }
  // };
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userID = await AsyncStorage.getItem('userID');
      const username = await AsyncStorage.getItem('username');

      if (token !== null && userID !== null && username !== null) {
        console.log('Token:', token);
        console.log('UserID:', userID);
        setUsername(username);
      } else {
        console.log('Token or userID is null');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const getDashboard = async () => {
    const userID = await AsyncStorage.getItem('userID');
    try {
      const data = await apiGetWithoutToken(`getDashboard/${userID}`);
      console.log(data, 'data is there......');
      setDashboardDetails(data);
    } catch (error) {
      console.error('POST error:', error);
    }
  };

  const getVideos = async () => {
    const userID = await AsyncStorage.getItem('userID');
    try {
      const data = await apiGetWithoutToken(`getVideos/${userID}`);
      setVideos(data);
      setLoading(false);
      console.log(data, 'data is there......');
    } catch (error) {
      console.error('POST error:', error);
    }
  };

  const renderItem = ({item}) => {
    const formattedDate = moment(item.Date).format('MMM D, YYYY');

    const currentTime = moment();
    const difference = moment(currentTime).diff(moment(item.Date));

    const duration = moment.duration(difference);
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(214, 214, 214, 0.5)',
          borderRadius: 8,
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <TouchableWithoutFeedback onPress={() => handleVideoPress(item)}>
          <View style={[styles.itemContainer]}>
            <Image source={{uri: item.TumbNailImage}} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.description}>{item.Title}</Text>
              <Text style={styles.content}>{item.Description}</Text>
              {/* <Text style={styles.date}>{item.date_created}</Text> */}
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginLeft: 7,
            marginBottom: 10,
          }}>
          <Heart
            // source={images.heart}
            width={16.7}
            height={14.7}
            // tintColor={'#f45b69'}
            style={{marginTop: 1, marginLeft: 5}}
          />

          <Text style={styles.wrapperLike}>Like</Text>
          <Comment
            // source={images.comment}
            // tintColor={'#f45b69'}
            style={{marginTop: 1, marginLeft: 5}}
            width={16.7}
            height={16.7}
          />
          <Text style={styles.wrapperLike}>Comment</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '55%',
            }}>
            <Text style={styles.date}>
              {formattedDate} {duration.hours()} hours {duration.minutes()} min{' '}
              {duration.seconds()} sec
            </Text>
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text style={styles.wrapperCommentCount}>{item.comment_count}</Text>
            <Text style={styles.wrapperComment}>Comment</Text>
          </View> */}
        </View>
      </View>
    );
  };

  const handleVideoPress = item => {
    navigation.navigate('VideoPlay', {
      videoData: item,
      username: username,
      videos: videos,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.profileContainer, {height: 55}]}>
        <User
          // source={images.profile}
          style={{width: 30, height: 33, marginTop: 8}}
        />
        <View style={styles.userProfile}>
          <Text style={styles.wrapperText}>Welcome</Text>
          <Text style={styles.wrapperTextforUser}>{username}</Text>
        </View>
        <View style={styles.notificationContainer}>
          <Notification
            onPress={() => navigation.navigate('Notification')}
            width={30}
            height={29}
            //  source={images.notification}
            style={{marginRight: '8%'}}
          />
          <Account
            width={30}
            height={29}
            onPress={() => navigation.navigate('Account')}
          />
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.subContainer}>
          <View style={styles.statusSubContainer}>
            <Total
            //source={images.total}
            // style={{marginTop: 10, marginLeft: 6}}
            />
            <Text style={styles.statusText}>Total</Text>

            <Text style={styles.statusCount}>
              {dashboardDetails.length > 0
                ? dashboardDetails[0]?.total_count
                : 0}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.statusSubContainer}>
            <Completed
            //  source={images.total}
            // style={{marginTop: 10, marginLeft: 6}}
            />
            <Text style={styles.statusText}>Completed</Text>

            <Text style={styles.statusCountForCompleted}>
              {dashboardDetails.length > 0
                ? dashboardDetails[0]?.completed_count
                : 0}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.subContainer}>
          <View style={styles.statusSubContainer}>
            <Incompleted
            //   source={images.total}
            // style={{marginTop: 10, marginLeft: 6}}
            />
            <Text style={styles.statusText}>Unwatched</Text>

            <Text style={styles.statusCountForUnwatched}>
              {dashboardDetails.length > 0
                ? dashboardDetails[0]?.unwatched_count
                : 0}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.statusSubContainer}>
            <Completed
            //source={images.total}
            // style={{marginTop: 10, marginLeft: 6}}
            />
            <Text style={styles.statusText}>In Complete</Text>

            <Text style={styles.statusCountForInCompleted}>
              {dashboardDetails.length > 0
                ? dashboardDetails[0]?.complete_count
                : 0}
            </Text>
          </View>
        </View>
      </View>

      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : videos.length > 0 ? (
        <FlatList
          style={{marginTop: 20}}
          data={videos}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{fontSize: 26, fontFamily: 'DMSans-Bold', color: 'black'}}>
            No videos available
          </Text>
        </View>
      )}
      {/* <FlatList
        style={{marginTop: 20}}
        data={DummyData}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      /> */}
    </View>
  );
};

const elevationStyle = Platform.select({
  ios: {
    // shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  android: {
    elevation: 3,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    // padding: 5,
    // height: 55,
    ...elevationStyle, // Apply elevation or shadow based on platform
  },
  userProfile: {
    flexDirection: 'column',
    marginTop: 4,
    marginRight: '17%',
  },
  wrapperText: {
    //paddingHorizontal: 15,
    fontSize: 12,
    marginRight: '30%',
    color: 'grey',
    fontWeight: 'normal',
    fontFamily: 'DMSans-Medium',
  },
  wrapperTextforUser: {
    // paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'DMSans-Medium',
    fontWeight: 'bold',

    color: 'black',
  },
  wrapperLike: {
    fontSize: 13,
    fontFamily: 'DMSans-Medium',
    color: '#22240f',
    fontWeight: '500',
    marginLeft: 3,
    letterSpacing: -0.03,
    //  marginRight: 16,
  },
  notificationContainer: {
    //  justifyContent: 'flex-end',
    // width: '60%',
    marginTop: 10,
    flexDirection: 'row',
  },
  statusContainer: {
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subContainer: {
    backgroundColor: '#f5faff',
    width: '45%',
    height: '75%',
    marginVertical: 20,
    flexDirection: 'row',
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#000000',
    marginLeft: 6,
    fontFamily: 'DMSans-Regular',
    //alignSelf: 'center',
  },
  statusSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  statusCount: {
    left: 70,
    fontSize: 12,
    color: '#000000',
    fontFamily: 'DMSans-Bold',
    fontWeight: 'bold',
  },
  statusCountForUnwatched: {
    left: 34,
    fontSize: 12,
    color: '#000000',
    fontFamily: 'DMSans-Bold',
    fontWeight: 'bold',
  },
  statusCountForInCompleted: {
    left: 26,
    fontSize: 12,
    color: '#000000',
    fontFamily: 'DMSans-Bold',
    fontWeight: 'bold',
  },
  statusCountForCompleted: {
    left: 39,
    fontSize: 12,
    color: '#000000',
    fontFamily: 'DMSans-Bold',
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    //   padding: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    //   borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    //  marginBottom: 20,
  },
  image: {
    width: dynamicWidth, // 30% of the screen width
    aspectRatio: 1, // Aspect ratio 1:1 for square images
    marginRight: 10,
    borderRadius: 8,
    height: dynamicHeight,
  },
  textContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  description: {
    fontSize: 14,
    //fontWeight: 'bold',
    fontFamily: 'DMSans-Bold',
    //  bottom: 57,
  },
  content: {
    fontSize: 12,
  },
  date: {
    fontSize: 12,
    color: '#22240f',
    // marginTop: 10,
    fontFamily: 'DMSans-Regular',
    fontWeight: 'bold',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  wrapperCommentCount: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'DMSans-Medium',
    fontWeight: 'normal',
  },
  wrapperComment: {
    color: '#999999',
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
  },
});

export default VideoList;
