const API_URL = 'http://103.30.244.34:11679/api/'
const VERIFIKASI_URL = API_URL + 'user/code/validate'
const SIGNUP_URL = API_URL + 'signup'
import axios from 'axios'
export default {

  validate (context, creds, redirect) {
    axios.post(VERIFIKASI_URL, creds, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      if (response.data.status === '00') {
        localStorage.setItem('id_token', response.data.token_id)
        localStorage.setItem('user_type', response.data.user_type)
        if (redirect) {
          context.$router.replace(redirect)
        }
      }
    })
    .catch(e => {
      context.error = e.statusText
    }
    )
  },

  signup (context, creds, redirect) {
    axios.post(SIGNUP_URL, creds)
    .then(response => {
      localStorage.setItem('id_token', response.data.id_token)
      if (redirect) {
        context.$router.replace(redirect)
      }
    })
    .catch(e => {
      context.error = e.statusText
    }
    )
  },

  logout (context) {
    localStorage.removeItem('id_token')
    context.$router.replace('/home')
  },

  isAuthenticated () {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      return true
    }
    return false
  },

  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  },

  getIdtoken () {
    return localStorage.getItem('id_token')
  },

  isAdmin () {
    var adm = localStorage.getItem('user_type')
    var jwt = localStorage.getItem('id_token')
    if (adm === '777' && jwt) {
      return true
    }
    return false
  },
  isKasir () {
    var ksr = localStorage.getItem('user_type')
    var jwt = localStorage.getItem('id_token')
    if (ksr === '775' && jwt) {
      return true
    }
    return false
  }

}
