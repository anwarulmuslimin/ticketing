<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> Master</el-breadcrumb-item>
                <el-breadcrumb-item>Kelola Layanan</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input placeholder="Filter kata kunci" class="handle-input mr10"></el-input>
            <el-button style="background-color:#242f42;color:white" icon="search" @click="handler(show_form_create= true, show_form_update= true, getDataAll())">Pencarian</el-button>
            <el-button style="background-color:#242f42;color:white" icon="plus" @click="openModalCreate()">Tambah</el-button>
        </div>
        <table v-show="!show_form_create" >
             <tr>
                <td><el-input v-model="form.code" placeholder="Kode Layanan"></el-input></td>
                <td><el-input v-model="form.name" placeholder="Email"></el-input></td>
                <td><el-button type="success" icon="check" v-on:click="createLayanan()"> Save</el-button></td>
            </tr>
        </table>
        <table v-show="!show_form_update" >
             <tr>
                <td><el-input v-model="formupdate.Code"></el-input></td>
                <td><el-input v-model="formupdate.Name"></el-input></td>
                <td><el-input v-model="formupdate.ID"  type="hidden"></el-input></td>
                <td><el-button type="warning" icon="check" v-on:click="handler(show_form_update= true, updateLayanan())"> update</el-button></td>
            </tr>
        </table>
        <table class="table" width="100%">
            <tr style="background-color:#242f42;height:40px;text-align:center;color:white">
                <td width="25%">Kode Layanan</td>
                <td width="15%">Nama Layanan</td>
                <td width="10%">Aksi</td>
            </tr>
            <tr style="height:40px;width:100%;border-bottom:0.5px solid #242f42;" v-for="Services in services" v-bind:key="Services">          
                <td style="padding-left:5px;">{{Services.Code}}</td>            
                <td style="padding-left:5px;">{{Services.Name}}</td>              
                <td style="text-align:center;">
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-info" @click="handler(openModal(),showData(Services))"  title="Edit Layanan ">
                            <i class="glyphicon glyphicon-pencil"></i>
                        </button>
                        <button class="btn btn-danger" v-on:click="deleteLayanan(Services)" title="Hapus Layanan ">
                            <i class="glyphicon glyphicon-remove"></i>
                        </button>
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
            <modal v-if="showModalUpdate"> 
            <h3 slot="header" class="modal-title">
                Update Layanan
            </h3>
            <div slot="body">
                <div class="form-box">
                    <el-form ref="form">
                        <el-form-item label="Kode ">
                            <el-input v-model="formupdate.Code" style="width:320px"></el-input>
                        </el-form-item>
                        <el-form-item label="Nama ">
                            <el-input v-model="formupdate.Name" style="width:320px"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="formupdate.ID"  type="hidden"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <div slot="footer">
            <button class="btn btn-danger" @click="closeModal()"> Close </button>
            <button style="background-color:#242f42;color:white" class="btn" data-dismiss="modal" @click="heandler(updateLayanan(),closeModal())">
                Update
            </button>
            <p>{{message}}</p>
            </div>
            </modal>
        </div>
        <div id="wrapper" class="container"> 
            <modal v-if="showModalCreate"> 
            <h3 slot="header" class="modal-title">
                Create Layanan
            </h3>
            <div slot="body">
                <div class="form-box">
                    <el-form ref="form">
                        <el-form-item label="Kode ">
                            <el-input v-model="form.code" style="width:320px"></el-input>
                        </el-form-item>
                        <el-form-item label="Nama ">
                            <el-input v-model="form.name" style="width:320px"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <div slot="footer">
            <button class="btn btn-danger" @click="closeModalCreate()"> Close </button>
            <button style="background-color:#242f42;color:white" class="btn" data-dismiss="modal" @click="heandler(createLayanan(),closeModalCreate())">
                Simpan
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
                    code: '',
                    name: ''
                },
                formupdate: {
                    Name: '',
                    Code: '',
                    ID: ''
                },
                paging: {
                    limit:10,
                    page:1
                },
                services: [],
                countdata: '',
                show_form_create: true,
                show_form_update: true,
                message: '',
                showModalUpdate: false,
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
            getDataAll(){
               axios.baseURL = process.env.BASE_URL
               axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.getIdtoken()
               axios.post('/api/service/find/all', this.paging)
                .then(response => {
                    this.services = response.data.services
                    this.countdata = response.data.count
                })
                .catch(e => {
                    console.log(e)
                }
                )
            },
             deleteLayanan (Services) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.getIdtoken()
                axios.post('/api/service/delete/' + Services.ID)
                .then(response => {
                    this.getDataAll()
                    this.message = response.data.message
                })
                .catch(e => {
                    console.log(e)
                }
                )
            },
            createLayanan(){
               axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.getIdtoken()
               axios.post('/api/service/create', this.form)
               .then(response => {
                    this.getDataAll()
                    this.message = response.data.message
                    this.form.name = ''
                    this.form.code = ''
                })
                .catch(e => {
                    console.log(e)
                }
                )
            },
            showData (Services) {
                this.formupdate = Services
            },
            updateLayanan (Services) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.getIdtoken()
                axios.post('/api/service/update', this.formupdate)
                .then(response => {
                    this.getDataAll()
                    this.message = response.data.message
                })
                .catch(e => {
                    console.log(e)
                }
                )
            },
            openModal() { 
                this.showModalUpdate = true; 
            },
            openModalCreate() {
                this.showModalCreate = true;
            },
            closeModal() {
                this.showModalUpdate = false;
            },
            closeModalCreate() {
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