<template>
    <div class="login-wrap">
        <div class="ms-title">LOGIN</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="email">
                    <el-input v-model="ruleForm.email" placeholder="Email"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">Sign In</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:red;">{{pesan}}</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data: function(){
            return {
                ruleForm: {
                    email: '',
                    password: ''
                },
                rules: {
                    email: [
                        { required: true, message: 'Email not empty', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Password not empty', trigger: 'blur' }
                    ]
                },
                status: '',
                pesan: '',
                token_id: ''
            }
        },
        methods: {
            submitForm(formName) {
                axios.post('http://103.30.244.34:11679/api/user/login', this.ruleForm, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.status = response.data.status
                    this.pesan = response.data.message
                    this.token_id = response.data.token_id
                    if(response.data.token_id != ""){
                        const self = this;
                        self.$refs[formName].validate((valid) => {
                            localStorage.setItem('ms_username',self.ruleForm.email);
                             localStorage.setItem('id_token', response.data.token_id)
                            self.$router.push('/readme');
                        });
                    }
                })
                .catch(e => {
                    console.log(e)
                }
                )
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -200px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:400px;
        height:235px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>