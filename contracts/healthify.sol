// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
contract healthify{
    address public owner;//owner
    uint test_value;//testing
    struct account{//account for doctor and patient
        string name;
        uint contact;
        string id;
        string password;
        address adrr;
    }
    struct DoctorLog{ //details logged by doctor
        string id;
        uint age;
        uint weight;
        uint height;
        string bp;
        string heartrate;
        uint temp;
        string date;
        string prescription;
        string report;
    }
    account[] public patient_register;//registered patients
    mapping (string=>bool) public is_patient_registered;//username of registered patients
    mapping (string=>bool) public is_doctor_registered;//username of registered doctors
    account[] public doctor_register;//registered doctors
    mapping (string=>account) public registered_id;//maps usernames with accounts
    mapping (string=>DoctorLog[]) public doc_log;//userid=>logs made by doctor
    mapping (string=>uint) public numberOfRecords;//number of records of a particular patient with id in key
    constructor(){
        owner=msg.sender;
    }
    function patientSignUp(string memory _name,uint _contact,string memory _id,string memory _password) public{
        require(is_patient_registered[_id]==false);
        is_patient_registered[_id]=true;
        account memory new_patient=account(_name,_contact,_id,_password,msg.sender);
        patient_register.push(new_patient);
        registered_id[_id]=new_patient;
    }
    function patientSignIn(string memory _id,string memory _password) public view returns(bool){
        require(is_patient_registered[_id]==true);
        account memory current_account=registered_id[_id];
        require(keccak256(abi.encodePacked(_id)) == keccak256(abi.encodePacked(current_account.id)));
        require(keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(current_account.password)));
        // require(keccak256(abi.encodePacked(msg.sender)) == keccak256(abi.encodePacked(current_account.adrr)));
        return true;
    }
    function doctorSignUp(string memory _name,uint _contact,string memory _id,string memory _password) public{
        require(is_doctor_registered[_id]==false);
        is_doctor_registered[_id]=true;
        account memory new_doctor=account(_name,_contact,_id,_password,msg.sender);
        doctor_register.push(new_doctor);
        registered_id[_id]=new_doctor;
    }
    function viewDoctors(string memory _id) public view returns(account memory){//returns doctor's details
        require(is_doctor_registered[_id]==true);
        return registered_id[_id];
    }
    function viewPatients(string memory _id) public view returns(account memory){//returns patient's details
        require(is_patient_registered[_id]==true);
        return registered_id[_id];
    }
    function doctorSignIn(string memory _id,string memory _password) public view returns(bool){
        require(is_doctor_registered[_id]==true);
        account memory current_account=registered_id[_id];
        require(keccak256(abi.encodePacked(_id)) == keccak256(abi.encodePacked(current_account.id)));
        require(keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(current_account.password)));
        // require(keccak256(abi.encodePacked(msg.sender)) == keccak256(abi.encodePacked(current_account.adrr)));
        return true;
    }
    function doctorSubmitDetails(string memory _id,uint _age,uint  _weight,uint  _height,string memory _bp,string memory _heartrate,uint _temp,string memory _date,string memory _prescription,string memory _report) public {
        DoctorLog memory new_doctorlog=DoctorLog(_id,_age,_weight,_height,_bp,_heartrate,_temp,_date,_prescription,_report);
        doc_log[_id].push(new_doctorlog);//is map me jo _id ke aage array of logs hai usme push karo
       uint n=numberOfRecords[_id];
        numberOfRecords[_id]=n+1;
    }
    function doctorViewDetails(string memory _id) public view returns(DoctorLog[] memory)//for doctor to check patient's details history
    {
        require(is_patient_registered[_id]==true);
        return doc_log[_id];
    }
    function setTest(uint _val) public {//testing
        test_value=_val;
    }
    function test() public view returns(uint)//testing
    {
        return test_value+1000;
    }
}