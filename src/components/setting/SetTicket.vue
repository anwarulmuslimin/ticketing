<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> Home</el-breadcrumb-item>
                <el-breadcrumb-item>Tiket</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input placeholder="Filter kata kunci" class="handle-input mr10"></el-input>
            <el-button style="background-color:#242f42;color:white" icon="search" @click="getDataTicketAll()">Pencarian</el-button>
            <el-button style="background-color:#242f42;color:white" icon="plus" @click="openModal()">Tambah</el-button>
        </div>
        <table class="table" width="100%">
            <tr style="background-color:#242f42;height:40px;text-align:center;color:white">
                <td width="25%">Judul</td>
                <td width="10%">Layanan</td>
                <td width="10%">Prioritas</td>
                <td width="15%">Status</td>
                <td width="10%">Aksi</td>
            </tr>
            <tr style="height:40px;font-size:12px;width:100%;border-bottom:0.5px solid #242f42" v-for="Tickets in tickets" v-bind:key="Tickets">                     
                <td style="padding-left:5px;">{{Tickets.Title}}</td>            
                <td style="padding-left:5px;text-align:center;">{{Tickets.ServiceCode}}</td> 

                <td v-if="Tickets.Priority===1" style="padding-left:5px;text-align:center;">
                     <span class="badge"  style="background-color:silver"> rendah </span>
                </td> 
                <td v-else-if="Tickets.Priority===2" style="padding-left:5px;text-align:center;">
                    <span  class="badge"  style="background-color:orange"> sedang </span>
                </td> 
                <td v-else style="padding-left:5px;text-align:center;">
                     <span  class="badge"  style="background-color:red"> tinggi </span>
                </td>

                <td v-if="Tickets.Status==='0'" style="padding-left:5px;text-align:center;">
                     <span class="badge" style="background-color:red"> open </span>
                </td> 
                <td v-else-if="Tickets.Status==='1'" style="padding-left:5px;text-align:center;">
                    <span  class="badge"  style="background-color:green"> read </span>
                </td> 
                <td v-else style="padding-left:5px;text-align:center;">
                     <span  class="badge"> close </span>
                </td> 

                <td style="text-align:center;">
                    <button type="button" class="btn btn-info btn-sm" 
                     @click="handler(openModaldetailTicket(),showData(Tickets),showDaftarReply(Tickets))"
                     title="Detail Tiket ">
                      <i class="glyphicon glyphicon-th-list"></i></button>
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
            <modal v-if="showModal"> 
            <h3 slot="header" class="modal-title">
                Buat Tiket
            </h3>
            
            <div slot="body">
                <div class="form-box">
                    <el-form ref="form">
                        <el-form-item label="Judul ">
                            <el-input style="width:380px" v-model="form.ticket_title" ></el-input>
                        </el-form-item>
                        <el-form-item label="Status">
                            <el-select placeholder="Status"  v-model="form.ticket_priority" style="width:250px">
                                <el-option key="1" label="1" value="1"></el-option>
                                <el-option key="2" label="2" value="2"></el-option>
                                <el-option key="3" label="3" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Isi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <el-input type="textarea" style="width:380px" v-model="form.ticket_content"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <div slot="footer">
            <button type="button" class="btn btn-danger" @click="closeModal()"> Close </button>
            <button type="button" class="btn btn-primary" style="background-color:#242f42;color:white" data-dismiss="modal" @click="submitAndClose()">
                Submit
            </button>
            </div>
            </modal>
        </div>

        <div id="wrapper" class="container"> 
            <modal v-if="showModalDetailTicket"> 
                <h4 slot="header" class="modal-title">
                    <button type="button" class="close" data-dismiss="modal" @click="closeModaldetailTicket()">&times;</button>
                    {{detailticket.Title}}
                    <p style="font-size:10px">{{detailticket.Date}} &nbsp;/&nbsp; {{detailticket.Email}}</p>
                    <div class="form-box">
                        <p style="font-weight:bold">{{detailticket.Content}}</p>
                    </div>
                </h4>
            
                <div slot="body">
                    <textarea v-model="rereply.ticket_reply_content" style="height:100px;width:100%"></textarea>
                    <button type="button" class="btn btn-primary" @click="balasticket()">Balas</button>
                </div>
                <div slot="footer" style="height:300px;overflow:scroll;">
                    <table width="100%" class="table table-bordered" v-for="Reply in replys" :key="Reply">
                        <tr v-if="Reply.Email===detailticket.Email" style="font-size:10px;background-color:green;color:#fff">
                            <td align="left" style="padding-left:10px"><b>  by: {{Reply.Name}} </b> </td>
                            <td slign="right" style="padding-right:10px"> {{Reply.Date}} </td>
                        </tr>
                        <tr v-else  style="font-size:10px;background-color:silver;">
                            <td align="left" style="padding-left:10px"><b>  by: {{Reply.Name}} </b> </td>
                            <td slign="right" style="padding-right:10px"> {{Reply.Date}} </td>
                        </tr>
                        <tr style="text-align:left;">
                            <td colspan="2" style="padding-left:10px">
                                {{Reply.Content}}
                            </td>
                        </tr>
                    </table><br/>
                </div>
            </modal>
        </div>
    </div>
</template>
<script>
import Modal from '../../components/Modal';
import auth from '../../auth'
import axios from 'axios'
    export default {
        data() {
            return {
                form: {
                    ticket_title: '',
                    ticket_priority: '',
                    ticket_content: ''
                },
                paging: {
                    departemen_code: '01',
                    limit:10,
                    page:1
                },
                detailticket: {
                    ServiceCode: '',
                    Name: '',
                    Title: '',
                    Content: '',
                    Date: '',
                    DepartemenCode: '',
                    Email: ''
                },
                replys: {
                    Name: '',
                    TicketID: '',
                    Content: '',
                    Date: '',
                    Email: ''
                },
                rereply: {
                    ticket_reply_name: 'admin',
                    ticket_reply_ticket_id: '',
                    ticket_reply_content: '',
                    ticket_reply_email: '',
                    ticket_reply_from: 'ADMIN'
                },
                tickets: [],
                countdata: 0,
                showModalDetailTicket: false,
                message: '',
                showModal: false
            }
        },
        mounted () {
            this.getDataTicketAll()
        },
        components: {
            Modal
        },
        methods: {
            handleCurrentChange(val){
                this.paging.page = val;
                var username = 'clientticket';
                var password = '51n64p0r3';
                var credentials = btoa(username + ':' + password);
                var basicAuth = 'Basic ' + credentials;
                axios.defaults.headers.common['Authorization'] = 'Basic ' + credentials  
                axios.post('/api/ticket/find/bydepartemen', this.paging)
                .then(response => {
                    this.tickets = response.data.tickets
                    this.countdata = response.data.count
                })
                .catch(e => {
                    console.log(e)
                }
                )
            },
            getDataTicketAll(){
                var username = 'clientticket';
                var password = '51n64p0r3';
                var credentials = btoa(username + ':' + password);
                var basicAuth = 'Basic ' + credentials;
                axios.defaults.headers.common['Authorization'] = 'Basic ' + credentials               
                axios.post('/api/ticket/find/bydepartemen', this.paging)
                .then(response => {
                    this.tickets = response.data.tickets
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
            showData (Tickets) {
                this.detailticket = Tickets
                this.rereply.ticket_reply_ticket_id= Tickets.ID
                this.rereply.ticket_reply_email= localStorage.getItem('ms_username')
                var str =Tickets.Content
                this.detailticket.Content= str.replace('\n|\r','<br/>')
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
            showDaftarReply(Tickets){      
                var ticketId = { 'ticket_id': Tickets.ID }
                var username = 'clientticket';
                var password = '51n64p0r3';
                var credentials = btoa(username + ':' + password);
                var basicAuth = 'Basic ' + credentials;
                axios.defaults.headers.common['Authorization'] = 'Basic ' + credentials 
                axios.post('/api/reply/find/byticketid', ticketId)
                .then(response => {
                    this.replys = response.data.replys
                })
                .catch(e => {
                    console.log(e)
                }
                )
            },
            balasticket(){ 
                var Tickets = this.detailticket     
                var username = 'clientticket';
                var password = '51n64p0r3';
                var credentials = btoa(username + ':' + password);
                var basicAuth = 'Basic ' + credentials;
                axios.defaults.headers.common['Authorization'] = 'Basic ' + credentials 
                axios.post('/api/reply/create', this.rereply)
                .then(response => {
                    this.rereply.ticket_reply_content = ''
                    this.replys.unshift(response.data.reply)
                    this.getDataTicketAll()
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
            submitAndClose() {
                this.showModal = false;
            },
            openModaldetailTicket() {
                this.showModalDetailTicket = true;
            },
            closeModaldetailTicket() {
                this.showModalDetailTicket = false;
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
