<template>
    <div class="parent">
        <!-- sidebar (first child)-->
        <div class="sidebar">
            <el-menu class="ulwidth">
                <h4>德基机械</h4>
                <el-menu-item @click="getCompanyList">公司名单
                    <!--<span @click="getCompanyList">公司名单</span>
                            <template #title>
                            <i class="el-icon-location"></i>
                            </template>-->
                    <!--<el-menu-item-group>
                            <template #title>分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-sub-menu index="1-4">
                            <template #title>选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-sub-menu>-->
                </el-menu-item>
                <el-menu-item @click="getEquitment">设备</el-menu-item>
                <el-menu-item @click="toggleSearchUser">管理员名单</el-menu-item>
                <el-menu-item @click="toggleCreateCompany"> 创建公司账户</el-menu-item>
                <el-menu-item @click="toggleCreateEquip">创建新设备</el-menu-item>
                <el-menu-item @click="toggleModifyAdmin">更新管理员账号</el-menu-item>
                <!--<el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <template #title>导航二</template>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <i class="el-icon-document"></i>
                            <template #title>导航三</template>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <template #title>导航四</template>
                        </el-menu-item>
                        <el-sub-menu index="5">
                            <template #title>
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                            </template>
                            <el-menu-item-group>
                            <template #title>分组一</template>
                            <el-menu-item index="5-1">选项1</el-menu-item>
                            <el-menu-item index="5-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                            <el-menu-item index="5-3">选项3</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>-->
            </el-menu>

        </div> <!--sidebar-->

        <!-- top menu and content -->
        <div class="secondChild">
            <div class="topMenu">
                <el-menu class="topbarcontent" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <!-- <el-menu-item index="1">处理中心</el-menu-item> -->
                    <!-- <el-sub-menu index="2">
                        <template #title>我的工作台</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                        <el-sub-menu index="2-4">
                            <template #title>选项4</template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu> -->
                    <!-- <el-menu-item index="3">消息中心</el-menu-item>
                    <el-menu-item index="4">订单管理</el-menu-item> -->
                    <div class="top-nav-right">
                        <el-menu-item index="5" @click="logout">登出</el-menu-item>
                    </div>
                </el-menu>
            </div>

            <!-- content -->
            <div class="content_parent">
                <div>
                    <div>
                        <div v-if="showInputBox" class="content_child">
                            <div class="adminForm">
                                <input type="text" id="cp_idd" v-model="cp_idd" placeholder="输入公司" required />
                                <button @click="getAdmin">确定</button>
                            </div>
                            
                            <!-- show admin list -->
                            <div v-if="showAdminList" class="content_sub_child">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>户口名字</th>
                                            <th>实证名字</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ adminlist.username }}</td>
                                            <td>{{ adminlist.realname }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                    </div>

                    <div v-if="showCompanyList" class="content_child">
                        <el-table :data="companylist" class="tab">
                            <el-table-column prop="cp_id" label="公司ID"></el-table-column>
                            <el-table-column prop="cp_name" label="公司名"></el-table-column>
                        </el-table>
                    </div>

                    <div v-if="showEquipmentList" class="content_child">
                        <el-table :data="equiplist" class="tab">
                            <el-table-column prop="equp_name" label="设施名字"></el-table-column>
                            <el-table-column prop="equp_id" label="设施ID"></el-table-column>
                            <el-table-column prop="cp_id" label="公司ID"></el-table-column>
                        </el-table>
                    </div>

                    <!-- <div v-if="showAdminList" class="content_child">
                        <table>
                            <thead>
                                <tr>
                                    <th>户口名字</th>
                                    <th>实证名字</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ adminlist.username }}</td>
                                    <td>{{ adminlist.realname }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> -->

                    <!--display create company form-->
                    <div v-if="showCreateCompany" class="content_child">
                        <label class="formLabel">公司账户</label>
                        <el-form ref="myForm" :model="formComData" :rules="com_rules" label-width="100px">
                            <el-form-item label="用户名 :" prop="cCkeyuser">
                                <el-input v-model="formComData.cCkeyuser"></el-input>
                            </el-form-item>
                            <el-form-item label="密码 :" prop="cCpassword">
                                <el-input type="password" v-model="formComData.cCpassword"></el-input>
                            </el-form-item>
                            <el-form-item label="公司ID ：" prop="cCcpid">
                                <el-input v-model="formComData.cCcpid"></el-input>
                            </el-form-item>
                            <el-form-item label="公司名字 :" prop="cCcpname">
                                <el-input v-model="formComData.cCcpname"></el-input>
                            </el-form-item>
                            <el-form-item label="用户电邮 :" prop="cCuser_mail">
                                <el-input type="email" v-model="formComData.cCuser_mail"></el-input>
                            </el-form-item>
                            <el-form-item label="实证名字 :" prop="cCrealname">
                                <el-input v-model="formComData.cCrealname"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitCreateCompanyForm">确认</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                    <!--display create equipment form-->
                    <div v-if="showCreateEquip" class="content_child">
                        <label class="formLabel">设备</label>
                        <el-form ref="myForm" :model="formEquipData" :rules="equip_rules" label-width="110px">
                            <el-form-item label="设备ID ：" prop="cEequp_id">
                                <el-input v-model="formEquipData.cEequp_id"></el-input>
                            </el-form-item>
                            <el-form-item label="公司ID ：" prop="cEcpid">
                                <el-input v-model="formEquipData.cEcpid"></el-input>
                            </el-form-item>
                            <el-form-item label="设备类型 ：" prop="cEequp_type">
                                <el-select v-model="formEquipData.cEequp_type" placeholder="请选择">
                                    <el-option label="0" value="0"></el-option>
                                    <el-option label="1" value="1"></el-option>
                                    <el-option label="2" value="2"></el-option>
                                    <el-option label="3" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="设备名字 ：" prop="cEequp_name">
                                <el-input v-model="formEquipData.cEequp_name"></el-input>
                            </el-form-item>
                            <el-form-item label="主设备 ：" prop="cEparent">
                                <el-input type="email" v-model="formEquipData.cEparent"></el-input>
                            </el-form-item>
                            <el-form-item label="主设备类型 ：" prop="cEop_type">
                                <el-select v-model="formEquipData.cEop_type" placeholder="请选择">
                                    <el-option label="0" value="0"></el-option>
                                    <el-option label="1" value="1"></el-option>
                                    <el-option label="2" value="2"></el-option>
                                    <el-option label="3" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据名称 ：" prop="cEvaluesname">
                                <el-input v-model="formEquipData.cEvaluesname"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitCreateEquipForm">确认</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                    <!--display modifyursadminbycpid form-->
                    <div v-if="showModifyAdmin" class="content_child">
                        <label class="formLabel">管理员账号</label>
                        <el-form ref="myForm" :model="formModifyAdmin" :rules="ModifyAdmin_rules" label-width="100px">
                            <el-form-item label="公司ID ：" prop="macp_id">
                                <el-input v-model="formModifyAdmin.macp_id"></el-input>
                            </el-form-item>
                            <el-form-item label="用户名字 ：" prop="mausername">
                                <el-input v-model="formModifyAdmin.mausername"></el-input>
                            </el-form-item>
                            <el-form-item label="密码 ：" prop="mapassword">
                                <el-input type="password" v-model="formModifyAdmin.mapassword"></el-input>
                            </el-form-item>
                            <el-form-item label="公司名字 ：" prop="macp_name">
                                <el-input v-model="formModifyAdmin.macp_name"></el-input>
                            </el-form-item>
                            <el-form-item label="用户电邮 ：" prop="mauser_mail">
                                <el-input type="email" v-model="formModifyAdmin.mauser_mail"></el-input>
                            </el-form-item>
                            <el-form-item label="实证名字 ：" prop="marealname">
                                <el-input v-model="formModifyAdmin.marealname"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitModifyAdminForm">确认</el-button>
                            </el-form-item>
                        </el-form>
                    </div>


                </div> <!--child content-->
            </div> <!--parent content-->
        </div>
        <!-- <div>
            <Popup v-if="popupTriggers.buttonTrigger">
                <h2>Ok</h2>
            </Popup>
        </div> -->
    </div>
</template>
  
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import {ref} from 'vue';
// import Popup from './components/Popup.vue';

export default {
    // setup (){
    //     const popupTriggers = ref({
    //         buttonTrigger: false,
    //     });
    //     const togglePopup = (trigger) => {
    //         popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    //     }
    //     return {
    //         Popup,
    //         popupTriggers
    //     }
    // },
    data() {
        return {
            companylist: [], // Initialize the compList data property
            equiplist: [],
            adminlist: [],
            showInputBox: false,
            showCreateCompany: false,
            showCreateEquip: false,
            cp_idd: '',
            showCompanyList: false,
            showEquipmentList: false,
            showAdminList: false,
            showModifyAdmin: false,
            formComData: {
                cCkeyuser: '',
                cCpassword: '',
                cCcpid: '',
                cCcpname: '',
                cCuser_mail: '',
                cCrealname: '',
            },
            //form validation
            com_rules: {
                cCkeyuser: [
                    { required: true, message: '请输入用户名' }
                ],
                cCpassword: [
                    { required: true, message: '请输入密码' }
                ],
                cCcpid: [
                    { required: true, message: '请输入公司ID' }
                ],
                cCcpname: [
                    { required: true, message: '请输入公司名字' }
                ],
                cCuser_mail: [
                    { required: true, message: '请输入用户电邮' }
                ],
                cCrealname: [
                    { required: true, message: '请输入用户实证名字' }
                ],
            },
            formEquipData: {
                cEequp_id: '',
                cEcpid: '',
                cEequp_type: '',
                cEequp_name: '',
                cEparent: '',
                cEop_type: '',
                cEvaluesname: '',
            },
            equip_rules: {
                cEequp_id: [
                    { required: true, message: '请输入设备ID' }
                ],
                cEcpid: [
                    { required: true, message: '请输入公司ID' }
                ],
                cEequp_type: [
                    { required: true, message: '请输入设备类型' }
                ],
                cEequp_name: [
                    { required: true, message: '请输入设备名字' }
                ],
                cEparent: [
                    { required: true, message: '请输入主设备' }
                ],
                cEop_type: [
                    { required: true, message: '请输入用主设备类型' }
                ],
                cEvaluesname: [
                    { required: true, message: '请输入数据名称' }
                ],
            },
            formModifyAdmin: {
                macp_id: '',
                mausername: '',
                mapassword: '',
                macp_name: '',
                mauser_mail: '',
                marealname: '',
            },
            ModifyAdmin_rules: {
                macp_id: [
                    { required: true, message: '请输入公司ID' }
                ],
                mausername: [
                    { required: true, message: '请输入用户名字' }
                ],
                mapassword: [
                    { required: true, message: '请输入密码' }
                ],
                macp_name: [
                    { required: true, message: '请输入公司名字' }
                ],
                mauser_mail: [
                    { required: true, message: '请输入用户电邮' }
                ],
                marealname: [
                    { required: true, message: '请输入用户实证名字' }
                ],
            }
        };
    },
    computed: {
        ...mapGetters(['CompanyID', 'Username', 'Password', 'Token']),
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
        logout() {
            // Add logout logic here
            this.$router.push('Login');
        },
        async getCompanyList() {
            // Clear other data
            this.showEquipmentList = false;
            this.showAdminList = false;
            this.showInputBox = false;
            this.showCreateCompany = false;
            this.showCreateEquip = false;
            this.showModifyAdmin = false;
            try {
                const token = this.Token;
                // Make the HTTP request to the API
                console.log(this.Token);
                const response = await axios.get(
                    'http://222.222.119.72:15518/dg/companylist', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
                );
                // Check if the response status is OK (200)
                if (response.status === 200) {
                    // Assuming the response body contains a JSON object with a 'token' field
                    this.companylist = response.data;
                    console.log(this.companylist);
                    this.showCompanyList = true;
                    this.displayContent = true;
                } else {
                    console.error('Failed to retrieve token');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        },
        async getEquitment() {
            // Clear other data
            this.showCompanyList = false;
            this.showAdminList = false;
            this.showInputBox = false;
            this.showCreateCompany = false;
            this.showCreateEquip = false;
            this.showModifyAdmin = false;
            try {
                const token = this.Token;
                // Make the HTTP request to the API
                console.log(this.Token);
                const response = await axios.get(
                    'http://222.222.119.72:15518/dg/getequipall', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
                );
                // Check if the response status is OK (200)
                if (response.status === 200) {
                    // Assuming the response body contains a JSON object with a 'token' field
                    this.equiplist = response.data;
                    console.log(this.equiplist);
                    this.showEquipmentList = true;
                } else {
                    console.error('Failed to retrieve token');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        },
        async getAdmin() {
            // Clear other data
            this.showCompanyList = false;
            this.showEquipmentList = false;
            this.showCreateCompany = false;
            this.showCreateEquip = false;
            this.showModifyAdmin = false;
            this.showInputBox = true;
            try {
                const token = this.Token;
                // Make the HTTP request to the API
                console.log(this.Token);
                const response = await axios.get(
                    'http://222.222.119.72:15518/dg/getusradminbycpid', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    params: {
                        cp_id: this.cp_idd,
                    }
                }
                );
                // Check if the response status is OK (200)
                if (response.status === 200) {
                    // Assuming the response body contains a JSON object with a 'token' field
                    this.adminlist = response.data;
                    console.log(this.adminlist);
                    this.showAdminList = true;
                } else {
                    console.error('Failed to retrieve token');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        },
        toggleSearchUser() {
            this.showCompanyList = false;
            this.showEquipmentList = false;
            this.showAdminList = false;
            this.showCreateCompany = false;
            this.showCreateEquip = false;
            this.showModifyAdmin = false;
            this.showInputBox = true;
        },
        toggleCreateCompany() {
            this.showCompanyList = false;
            this.showEquipmentList = false;
            this.showAdminList = false;
            this.showInputBox = false;
            this.showCreateEquip = false;
            this.showModifyAdmin = false;
            this.showCreateCompany = true;
        },
        async submitCreateCompanyForm() {
            console.log(this.formComData.cCkeyuser);
            console.log(this.formComData.cCpassword);
            console.log(this.formComData.cCcpid);
            console.log(this.formComData.cCcpname);
            console.log(this.formComData.cCuser_mail);
            console.log(this.formComData.cCrealname);
 
            try {
                const token = this.Token;
                console.log(this.Token);
                const response = await axios.post(
                    'http://222.222.119.72:15518/dg/createCompany', this.formComData, {
                    params: {
                        keyuser: this.formComData.cCkeyuser,
                        password: this.formComData.cCpassword,
                        cpid: this.formComData.cCcpid,
                        cpname: this.formComData.cCcpname,
                        user_mail: this.formComData.cCuser_mail,
                        realname: this.formComData.cCrealname,
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                },
                );
                // Check if the response status is OK (200)
                if (response.status === 200) {
                    // Assuming the response body contains a JSON object with a 'token' field
                    console.log('Company created');

                    // display smtg that indicates success



                } else {
                    console.error('Failed to create company');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }

        },
        toggleCreateEquip() {
            this.showCompanyList = false;
            this.showEquipmentList = false;
            this.showAdminList = false;
            this.showInputBox = false;
            this.showCreateCompany = false;
            this.showModifyAdmin = false;
            this.showCreateEquip = true;
        },
        async submitCreateEquipForm() {
            console.log(this.formEquipData.cEequp_id);
            console.log(this.formEquipData.cEcpid);
            console.log(this.formEquipData.cEequp_type);
            console.log(this.formEquipData.cEequp_name);
            console.log(this.formEquipData.cEparent);
            console.log(this.formEquipData.cEop_type);
            console.log(this.formEquipData.cEvaluesname);

            try {
                const token = this.Token;
                console.log(this.Token);
                const response = await axios.post(
                    'http://222.222.119.72:15518/dg/createEquip', this.formEquipData, {
                    params: {
                        equp_id: this.formEquipData.cEequp_id,
                        cpid: this.formEquipData.cEcpid,
                        equp_type: this.formEquipData.cEequp_type,
                        equp_name: this.formEquipData.cEequp_name,
                        parent: this.formEquipData.cEparent,
                        op_type: this.formEquipData.cEop_type,
                        valuesname: this.formEquipData.cEvaluesname,
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                },
                );
                // Check if the response status is OK (200)
                if (response.status === 200) {
                    // Assuming the response body contains a JSON object with a 'token' field
                    console.log('Equipment created');
                } else {
                    console.error('Failed to create equipment');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        },
        toggleModifyAdmin() {
            this.showCompanyList = false;
            this.showEquipmentList = false;
            this.showAdminList = false;
            this.showInputBox = false;
            this.showCreateCompany = false;
            this.showCreateEquip = false;
            this.showModifyAdmin = true;
        },
        async submitModifyAdminForm() {
            console.log(this.formModifyAdmin.macp_id);
            console.log(this.formModifyAdmin.mausername);
            console.log(this.formModifyAdmin.mapassword);
            console.log(this.formModifyAdmin.macp_name);
            console.log(this.formModifyAdmin.mauser_mail);
            console.log(this.formModifyAdmin.marealname);

            try {
                const token = this.Token;
                console.log(this.Token);
                const response = await axios.post(
                    'http://222.222.119.72:15518/dg/modifyusradminbycpid', this.formModifyAdmin, {
                    params: {
                        cp_id: this.formModifyAdmin.macp_id,
                        username: this.formModifyAdmin.mausername,
                        password: this.formModifyAdmin.mapassword,
                        cp_name: this.formModifyAdmin.macp_name,
                        usr_mail: this.formModifyAdmin.mauser_mail,
                        realname: this.formModifyAdmin.marealname,

                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                },
                );
                // Check if the response status is OK (200)
                if (response.status === 200) {
                    // Assuming the response body contains a JSON object with a 'token' field
                    console.log('Admin modified successfully');
                } else {
                    console.error('Failed to modify admin');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        },


    },


}

</script>

<style scoped>
    @import '../css/mainpage.css';
</style>




