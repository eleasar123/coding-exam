import Vue from 'vue'
import Vuex from 'vuex'
//import { createStore } from 'vuex'
import axios from "axios";
import userLogin from "./modules/userLogin";
import pds from "./modules/pdsInfo";
import esat from "./modules/esat";
import ipcrf from "./modules/ipcrf";
import products from "./modules/products";
import user from "./modules/users"
Vue.use(Vuex);

const AUTH_TOKEN = sessionStorage.getItem('user_token')
axios.defaults.baseURL = "http://localhost:8000/api/";
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Create a new store instance.
export default new Vuex.Store({
    modules: {
        userLogin,
        pds,
        esat,
        ipcrf,
        products,
        user
    },
    state: {
        users: [],
        userProfile: [],
        // return {
        count: 0,
        // }
    },
    mutations: {
        increment() {
            this.state.count++;
        },
        setUser(data) {
            this.state.users = JSON.parse(data).data;
        },
    },
    // getters: {
    //   doneTodosCount(state, getters) {
    //     return getters.doneTodos.length;
    //   },
    // },
    actions: {

        //crud functionalities for articles

        getArticles(){
            return axios.get('articles/')
            .then((response) => {
                console.log(response)
                return response;
            }).catch((error) => {
                console.log(error)
            })
        },

        getArticlesById(props){
            return axios.get('articles/'+ props.id )
            .then((response) => {
                console.log(response)
                return response;
            }).catch((error) => {
                console.log(error)
            })
        },
        
        createArticle({commit},props) {
            return axios.post('articles/create', props) 
            .then((response) => {
             console.log(response)
             commit;
             return response;
         }).catch((error) => {
             console.log(error)
         })
         },

        editArticles(props) {
           return axios.post('articles/edit', props) 
           .then((response) => {
            console.log(response)
            return response;
        }).catch((error) => {
            console.log(error)
        })
        },

        deleteArticles({commit},id){
            return axios.delete('articles/delete/'+ id)
            .then((response) => {
                console.log(response)
                commit;
                return response;
            }).catch((error) => {
                console.log(error)
            })
            },


        uploadFile(context, file) {
            console.log([...file]);
            return axios
                .post("pds/handleImage", file, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    context;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        },

        downloadFile(filename) {
            return axios
                .get("employee/downloadAttachment?filename=" + filename)
                .response((response) => {
                    let blob = new Blob([response.data], {
                        type: "application/octet-stream",
                    });
                    let ref = this.state.ref;
                    ref.current.href = URL.createObjectURL(blob);
                    ref.current.download = filename;
                    ref.current.click();
                });
        },
        downloadAttachment(context, file) {
            console.log([...file]);
            return axios
                .get("employee/downloadAttachment?filename=", file, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    context;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        },

        getImageUrl() {
            console.log(JSON.parse(sessionStorage.getItem("user_session")).id)
            return axios
                .get("pds/getImage/" + JSON.parse(sessionStorage.getItem("user_session")).id)
                .then((res) => {
                    console.log(res)
                    return res;

                })
                .catch((err) => {
                    return err.response;
                });
        },
        // state: {
        //   users:[],
        //   userProfile: [],
        //   // return {
        //   count: 0
        //   // }
        // },
        // mutations: {
        //   increment () {
        //     this.state.count++
        //   },
        //   setUser(data){
        //     this.state.users = JSON.parse(data).data;
        //   }
        // },
        // getters:{
        //   doneTodosCount (state, getters) {
        //     return getters.doneTodos.length
        //   }
        // },
        // actions:{
        //   increment (context) {
        //     context.commit('increment')
        //   },
        //   getUsers(){
        //     return axios.get('user').then((response) => response.data)
        //     .catch((error) => {
        //       return error.response
        //     })
        //   },
        // login(data){
        //   return axios.post('login', data).then((response) => {
        //     this.setUser(data)
        //     return response} )
        //   .catch((error) => {
        //     console.log(error)
        //   })
        // }
    },
})

// const app = createApp({ /* your root component */ })

// // Install the store instance as a plugin
// app.use(store)