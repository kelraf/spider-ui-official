
import Vue from "vue"

class Auth { 

    localAuthLogin(token) {        
        
        let setIt = localStorage.setItem("token", token);

        if(setIt == undefined || setIt) {
            return true
        } else {
            return false
        }
    }

    logOut() {

        let unsetIt = localStorage.removeItem("token");

        if(unsetIt == undefined || unsetIt) {

            console.log(this.isAuthenticatedUser())
            return true

        } else {

            return false

        }

    }

    isAuthenticatedUser() {   

        let token = localStorage.getItem("token")

        if(token == null) {
            return {
                bool: false
            }
        } else {
            if(Vue.$jwt.decode(token)) {
                return {
                    bool: true,
                    sub: Vue.$jwt.decode(token).sub,
                    token
                }
            } else {
                return {
                    bool: false
                }
            }
        }
    }
}

export default new Auth();
