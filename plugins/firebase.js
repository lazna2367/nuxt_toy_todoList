// import Vue from 'vue';
import FBS from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
import "firebase/analytics";
import moment from 'moment'
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
console.log('FBS : ',FBS)


export default ({ store }, inject) => {
    console.log('store : ' , store)
    inject('fbs',param => {
        if(param.type === 'init'){ //init
            console.log('ee')
            if(FBS.apps.length === 0){
                fb.chat = FBS.initializeApp(config); //db init 세팅
                fb.dbms = FBS.firestore(); // fb 연결
                fb.auth = FBS.auth(); //fb 계정 연결
                console.log('fb : ' ,fb)
            }
        }else if(param.type === 'setMessage'){//체팅 저장
            // fb.dbms.collection('messages').doc(store.state.userId).set({
            //     name: store.state.userId,
            //     text: param.text,
            //     timestamp: moment().format('YYYY-MM-DD HH:mm:ss')    
            // }).then(() => {
            //     console.log('document success written')
            // }).catch(e => {
            //     console.log('error writing document', e)
            // })
            fb.dbms.collection('messages').add({
                name: store.state.userId,
                text: param.text,
                // timestamp: getTimestamp()
                deleted: false,
                timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
            }).catch((e) => {
                console.log('error database : ' ,e)
            })
        }else if(param.type === 'loadMessage'){//채팅 읽기
            const query = fb.dbms.collection('messages').orderBy('timestamp', 'asc')
            console.log('query : ' , query)
            query.onSnapshot((list) => {
                list.docChanges().forEach((change) => {
                    console.log('change : ' , change)
                    console.log('change.doc.data() : ' , change.doc.data())
                    if(change.type === 'added'){
                        store.commit('setChattingDataList',{type: 'push',param: change.doc.data()})
                    }else if(change.type === 'modified'){
                        let idx = store.state.chattingDataList.findIndex(v => change.doc.data().text === v.text && change.doc.data().timestamp === v.timestamp)
                        console.log('idx : ' , idx)
                        if(idx !== -1){
                            store.commit('setChattingDataList',{type: 'deleted',idx: idx ,deleted : change.doc.data().deleted})
                        }
                    }else if(change.type === 'removed'){
                        let idx = store.state.chattingDataList.findIndex(v => change.doc.data().text === v.text && change.doc.data().timestamp === v.timestamp)
                        console.log('idx : ' , idx)
                        if(idx !== -1){
                            store.commit('setChattingDataList',{type: 'remove',idx: idx})
                        }
                    }
                })
            })
        }else if(param.type === 'signInAnonymously'){
            fb.auth.signInAnonymously().catch((e) => { //임의 로그인
                console.log('login error: ' , e.code);
                console.log('login error message: ' , e.message);
            });
        }else if(param.type === 'onAuthStateChanged'){ //임의 로그인값
            fb.auth.onAuthStateChanged((user) => {
                if(user) {
                    console.log('isAnonymous : ' , user.isAnonymous);
                    console.log('uid : ' , user.uid);
                    store.commit('setUserId', user.uid)
                }else {
                    console.log('user is signed out');
                }
            })
        }else if(param.type === 'all'){
            fb.dbms.collection("messages").get().then(query => {
                if(query){
                    query.forEach(v => {
                        console.log('v : ' , v.id)
                        console.log('v : ' , v.data())
                    })
                }else {
                    console.log('no such document')
                }
            }).catch(e => {
                console.error(e)
            })
        }else if(param.type === 'delMessage'){
            let messageId = '';
            fb.dbms.collection("messages").where("text","==",param.text , "&&").where("timestamp","==",param.timestamp).get().then(query => {
                fb.dbms.collection("messages").doc(query.docs[0].id).update({
                    deleted: true
                }).then(_ => {
                    console.log('success')
                }).catch(e => {
                    console.error(e)
                })
            })
            console.log('messageId : ' ,messageId)
            
        }

    })
}