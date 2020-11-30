// import Vue from 'vue';
import FBS from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
import "firebase/analytics";
const config = {
    apiKey: "AIzaSyDMtT4OGsmHUPIslRodutswYoHdK7n7ht4",
    authDomain: "service-test-df351.firebaseapp.com",
    databaseURL: "https://service-test-df351.firebaseio.com",
    projectId: "service-test-df351",
    storageBucket: "service-test-df351.appspot.com",
    messagingSenderId: "603558669005",
    appId: "1:603558669005:web:6a3d99bda53159e7c85784",
    measurementId: "G-TTP5TPS658"
}

const fb = {
    chat: null,
    dbms: null,
    auth: null
}

function getTimestamp() {
    return FBS.firestore.FieldValue.serverTimestamp();
}
const messages = []

console.log('FBS : ',FBS)

//함수 세팅
// const fb_func_map = {
//     chat_init: (setting, payload) => {
//         console.log('ee')
//         if(FBS.apps.length === 0){
//             fb.chat = FBS.initializeApp(config);
//             fb.dbms = FBS.firestore();
//             fb.auth = FBS.auth();
//             console.log('fb : ' ,fb)
//         }
//     },
//     //임의 로그인
//     signInAnonymously: () => {
//         FBS.auth().signInAnonymously().catch((e) => {
//             console.log('login error: ' , e.code);
//             console.log('login error message: ' , e.message);
//         });
//     },
//     //임의 로그인값
//     onAuthStateChanged: () => {
//         FBS.auth().onAuthStateChanged((user) => {
//             if(user) {
//                 console.log('isAnonymous : ' , user.isAnonymous);
//                 console.log('uid : ' , user.uid);
//             }else {
//                 console.log('user is signed out');
//             }
//         })
//     },
//     //체팅 저장
//     setMessage: (text) => {
//         return fb.dbms.collection('messages').add({
//             name: '익명사용자',
//             text: text,
//             timestamp: FBS.firestore.FieldValue.serverTimestamp()
//         }).catch((e) => {
//             console.log('error database : ' ,e)
//         })
//     },
//     //채팅 읽기
//     loadMessage: () => {
//         const query = fb.dbms.collection('messages').orderBy('timestamp', 'desc')
//         console.log('query : ' , query)
//         query.onSnapshot((s) => {
//             s.docChanges().forEach((change) => {
//                 let message = change.doc.data();
//                 console.log('message : ' ,message)
//             })
//         })
//     }
// }
//세팅
// Vue.prototype.fb_func_map = fb_func_map

// export default ({store }) => {
//     console.log('store : ' , store)
//     return {
//         chat_init: (setting, payload) => {
//             console.log('ee')
//             if(FBS.apps.length === 0){
//                 fb.chat = FBS.initializeApp(config);
//                 fb.dbms = FBS.firestore();
//                 fb.auth = FBS.auth();
//                 console.log('fb : ' ,fb)
//             }
//         },
//         //임의 로그인
//         signInAnonymously: () => {
//             FBS.auth().signInAnonymously().catch((e) => {
//                 console.log('login error: ' , e.code);
//                 console.log('login error message: ' , e.message);
//             });
//         },
//         //임의 로그인값
//         onAuthStateChanged: () => {
//             FBS.auth().onAuthStateChanged((user) => {
//                 if(user) {
//                     console.log('isAnonymous : ' , user.isAnonymous);
//                     console.log('uid : ' , user.uid);
//                 }else {
//                     console.log('user is signed out');
//                 }
//             })
//         },
//         //체팅 저장
//         setMessage: (text) => {
//             return fb.dbms.collection('messages').add({
//                 name: '익명사용자',
//                 text: text,
//                 timestamp: FBS.firestore.FieldValue.serverTimestamp()
//             }).catch((e) => {
//                 console.log('error database : ' ,e)
//             })
//         },
//         //채팅 읽기
//         loadMessage: () => {
//             const query = fb.dbms.collection('messages').orderBy('timestamp', 'desc')
//             console.log('query : ' , query)
//             query.onSnapshot((s) => {
//                 s.docChanges().forEach((change) => {
//                     let message = change.doc.data();
//                     console.log('message : ' ,message)
//                 })
//             })
//         }
//     }
// }