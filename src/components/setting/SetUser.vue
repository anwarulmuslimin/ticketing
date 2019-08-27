<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> Master</el-breadcrumb-item>
                <el-breadcrumb-item>Kelola User</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input placeholder="Filter kata kunci" class="handle-input mr10"></el-input>
            <el-button style="background-color:#242f42;color:white" icon="search" @click="getDataAll()">Pencarian</el-button>
            <el-button style="background-color:#242f42;color:white" icon="plus" @click="openModalCreate()">Tambah</el-button>
        </div>
        <table class="table" width="100%">
            <tr style="background-color:#242f42;height:40px;text-align:center;color:white">
                <td width="25%">Nama</td>
                <td width="15%">Unit</td>
                <td width="25%">Email</td>
                <td width="10%">Aksi</td>
            </tr>
            <tr 
                style="height:40px;width:100%;border-bottom:0.5px solid #242f42;" 
                v-for="Users in formuser" v-bind:key="Users">          
                <td style="padding-left:15px;">{{Users.Name}}</td>            
                <td v-if="Users.DepartemenCode==='01'" style="padding-left:5px;text-align:center">SUPPORT</td>            
                <td v-else-if="Users.DepartemenCode==='02'" style="padding-left:5px;text-align:center">BILLING</td>            
                <td v-else style="padding-left:5px;">SALES</td>            
                <td style="padding-left:5px;">{{Users.Email}}</td>              
                <td style="text-align:center;">
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-info" v-on:click="handler(openModal(),showData(Users))"  title="Edit User ">
                            <i class="glyphicon glyphicon-pencil"></i></button>
                        <button class="btn btn-danger" v-on:click="deleteUser(Users)" title="Hapus User ">
                            <i class="glyphicon glyphicon-remove"></i></button>
                    </div>
                </td>            
            </tr>           

        </table><br/>
        <p>{{message}}</p>
        <div class="pagination">
            <el-pagination 
             @current-change ="handleCurrentChange" 
             layout="prev, pager, next"
             :total="countdata">
            </el-pagination>
        </div>
         
        <div id="wrapper" class="container"> 
            <modal v-if="showModalCreate">
            <h3 slot="header" class="modal-title"> Tambah User</h3>
            <div slot="body">
                <table class="table" width="100%">
                    <tr>
                        <td width="20%">Nama</td><td width="1%">:</td>
                        <td><el-input v-model="form.name" placeholder="Username"></el-input></td>
                    </tr><br/>
                    <tr>
                        <td>Departemen</td><td>:</td>
                        <td>
                            <select class="form-control" v-model="form.departemen_code" style="width:250px">
                                <option value="01">Support</option>
                                <option selected value="02">Billing</option>
                                <option value="03">Sales</option>
                            </select>
                        </td>
                    </tr><br/>
                    <tr>
                        <td>Email</td><td>:</td>
                        <td><el-input v-model="form.email" placeholder="Email"></el-input></td>
                    </tr><br/>
                    <tr>
                        <td>Password</td><td>:</td>
                        <td><el-input v-model="form.password" placeholder="Password"></el-input></td>
                    </tr>
                </table>
            </div>
            <div slot="footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="closeModalCreate()"> Close </button>
            <button type="button" style="background-color:#242f42;color:white" class="btn btn-primary" data-dismiss="modal" @click="handler(submitCreate(),createUser())">
                Submit
            </button>
            </div>
            </modal>
        </div>

        <div id="wrapper" class="container"> 
            <modal v-if="showModal">
            <h3 slot="header" class="modal-title"> Edit User</h3>
            <div slot="body">
                <table class="table" width="100%">
                    <tr>
                        <td width="20%">Nama</td><td width="1%">:</td>
                        <td><el-input style="width:350px" v-model="formupdate.Name" ></el-input></td>
                    </tr><br/>
                    <tr>
                        <td>Departemen</td><td>:</td>
                        <td>
                            <select class="form-control" v-model="formupdate.DepartemenCode" style="width:250px">
                                <option value="01"> Support</option>
                                <option selected value="02"> Billing</option>
                                <option value="03">Sales</option>
                            </select>
                        </td>
                    </tr><br/>
                    <tr>
                        <td>Email</td><td>:</td>
                        <td><el-input style="width:350px" v-model="formupdate.Email"></el-input></td>
                    </tr>
                    <tr>
                        <td colspan="3"><el-input v-model="formupdate.ID"  type="hidden"></el-input></td>
                    </tr>
                </table>
            </div>
            <div slot="footer">
            <button type="button" class="btn btn-outline-info" data-dismiss="modal" @click="closeModal()"> Close </button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="handler(submit(),updateUser())">
                Submit
            </button>
            </div>
            </modal>
        </div>
    </div>
</template>
<script>
import Modal from '../../components/Modal';
import axios from 'axios'
import auth from '../../auth'
    export default {
        data() {
            return {
                form: {
                    name: '',
                    departemen_code: '',
                    email: '',
                    password: ''
                },
                formupdate: {
                    Name: '',
                    DepartemenCode: '',
                    Email: '',
                    ID: ''
                },
                paging: {
                    limit:10,
                    page:1
                },
                formuser: [],
                countdata: 0,
                show_form_create: true,
                message: '',
                showModal: false,
                showModalCreate: false
            }
        },
        mounted () {
            this.getDataAll()
        },
        components: {
           Modal
        },
        methods: {
            handleCurrentChange(val){
                this.paging.page = val;
               axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.getIdtoken()
               axios.post('/api/user/find/all', this.paging)
                .then(response => {
                    this.formuser = response.data.users
                    this.countdata = response.data.count
                })
                .catch(e => {
                    console.log(e)
                }
                )
            },
            getDataAll(){
               axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.getIdtoken()
               axios.post('/api/user/find/all', this.paging)
                .then(response => {
                    this.formuser = response.data.users
                    this.countdata = response.data.count
                })
                .catch(e => {
                    console.log(e)
                }
                )
            },
             deleteUser (Users) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.getIdtoken()
                axios.post('/api/user/delete/' + Users.ID)
                .then(response => {
                    this.getDataAll()
                    this.message = response.data.message
                })
                .catch(e => {
                    console.log(e)
                }
                )
            },
            createUser(){
               axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.getIdtoken()
               axios.post('/api/user/create', this.form)
               .then(response => {
                    this.getDataAll()
                    this.message = response.data.message
                    this.form.name = ''
                    this.form.departemen_code = ''
                    this.form.email = ''
                })
                .catch(e => {
                    console.log(e)
                }
                )
            },
            showData (Users) {

                this.formupdate = Users
                /**var userId = { 'id': Users.ID }
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.getIdtoken()
                axios.post('/api/user/find/byid', userId)
                .then(response => {
                    this.formupdate = response.data.user
                })
                .catch(e => {
                    console.log(e)
                }
                )*/
            },
            updateUser (Users) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.getIdtoken()
                axios.post('/api/user/update', this.formupdate)
                .then(response => {
                    this.getDataAll()
                    this.message = response.data.message
                    this.formupdate.Name = ''
                    this.formupdate.DepartemenCode = ''
                    this.formupdate.Email = ''
                })
                .catch(e => {
                    console.log(e)
                }
                )
            },
            openModal() { 
                this.showModal = true; 
            },
            closeModal() {
                this.showModal = false;
            },
            submit() {
                this.showModal = false;
            },
             openModalCreate() { 
                this.showModalCreate = true; 
            },
            closeModalCreate() {
                this.showModalCreate = false;
            },
            submitCreate() {
                this.showModalCreate = false;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>