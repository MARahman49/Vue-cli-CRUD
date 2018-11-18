<template>
   <div class="page">
     <b-container class="bv-example-row">
      <b-row>
          <b-col>
            <div class="form">
          <b-card no-body style="max-width: 20rem;">
              <h4 slot="header">Please register</h4>
              <b-card-body>
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group id="exampleInputGroup2"
                      label="Name:"
                      label-for="exampleInput2">
                      <b-form-input id="exampleInput2"
                          type="text"
                          v-model="form.name"
                          placeholder="Enter Your Name">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group id="exampleInputGroup1"
                      label="Email address:"
                      label-for="exampleInput1"
                      description="We'll never share your email with anyone else.">
                      <b-form-input id="exampleInput1"
                          type="email"
                          v-model="form.email"
                          placeholder="Enter email">
                      </b-form-input>
                    </b-form-group>
                    <div class="btns">
                      <b-button type="reset" variant="danger" v-show="signin">Reset</b-button>
                      <b-button variant="success" type="submit" v-show="signin">Sign up</b-button>
                      <b-button variant="info" v-show="update" @click="updateUser">Update User</b-button>
                    </div>
                </b-form>
              </b-card-body>
          </b-card>
        </div>
          </b-col>
          <b-col>
            <div style="max-width: 28rem;">
          <b-card >
              <h4 slot="header">Registered User List</h4>
               <b-list-group v-for="(item , index) in users" :key="item.name" flush>
                <b-list-group-item >
                  
                  <h6>{{index+1}} : {{item.id}} </h6>
                  {{item.name}} - {{item.email}}
                  <div class="userBtns">
                    <b-button variant="info" @click="onupdate(item)">Update</b-button>
                    <b-button variant="danger" @click="onRemove(item)">Delete</b-button>
                  </div>
                  </b-list-group-item>
              </b-list-group>
          </b-card>
        </div>
          </b-col>
      </b-row>
  </b-container>
      <notifications group="foo" />
   </div>
</template>
<script>
import { _ } from 'vue-underscore'

export default {
  data () {
    return {
      form: {
        email: '',
        name: ''
      },
      users: [],
      show: true,
      signin: true,
      update: false
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      if (this.form.email === '' && this.form.name === '') {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Credential Required',
          text: 'Both Email and Name Required'
        })
      } else if (this.form.email === '') {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Email Required',
          text: 'Email Required for Registration'
        })
      } else if (this.form.name === '') {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Name Required',
          text: 'Name Required for Registration'
        })
      } else {
        let id = '9' + Math.random().toString().substr(2, 16)
        let user = {
          name: this.form.name,
          email: this.form.email,
          id: id
        }
        this.users.push(user)
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'Data Completed',
          text: 'User Added SuccessFull'
        })
        this.form.email = ''
        this.form.name = ''
      }
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.email = ''
      this.form.name = ''
    },
    onRemove (el) {
      let userList = this.users
      this.users = _.filter(userList, function (item) {
        return item.id !== el.id
      })
    },
    onupdate (el) {
      this.form.name = el.name
      this.form.email = el.email
      this.id = el.id
      this.signin = false
      this.update = true
    },
    updateUser () {
      let that = this
      let userList = that.users
      let id = that.id
      that.users = _.forEach(userList, function (item) {
        if(item.id === id){
          item.name = that.form.name
          item.email = that.form.email
          item.id = id
          that.signin = true
          that.update = false
          that.form.email = ''
          that.form.name = ''
          that.id = ''
        }else {
          return item
        }
      })
    }
  }
}
</script>

<style>
.page{
  widows: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.form{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.btns{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.userBtns{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
