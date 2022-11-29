$(document).ready(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });
});

var mode = "normal";

var staffList = [];
function createStaff() {
  var account = document.getElementById("account-value").value;
  var fullName = document.getElementById("name-value").value;
  var email = document.getElementById("email-value").value;
  var passWord = document.getElementById("password-value").value;
  var dob = document.getElementById("dob-value").value;
  var salary = +document.getElementById("salary-value").value;
  var position = document.getElementById("position-value").value;
  var dateOfWork = +document.getElementById("dow-value").value;

  if (!validatingFunc()) return;

  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].staffAccount === account) {
      document.getElementById("accountError").innerHTML="Tài khoản đã tồn tại. Vui lòng lựa chọn tài khoản khác";
      return;
    }
    if (staffList[i].email === email) {
      document.getElementById("emailError").innerHTML="Email đã tồn tại. Vui lòng lựa chọn email khác";
      return;
    }
  }

  var staff = new Staff(
    account,
    fullName,
    email,
    passWord,
    dob,
    salary,
    position,
    dateOfWork,
    staffList.length
  );

  staffList.push(staff);

  printOutStaffInfo();
  return 1;
}

function showOverlay() {
  document.getElementById("overlay").classList.replace("hide", "show");
  document.getElementById("overlay-dialog").style.top = "3%";
}

document.getElementById("overlay-toggle").onclick = function (){
  clearFormValue();
  clearValidation();
  document.getElementById("default-selection").selected = true;
  document.getElementById("overlay").classList.replace("show", "hide");
  document.getElementById("overlay-dialog").style.top = "-3%";
  document.getElementById("add-btn").style.display="inline";
  document.getElementById("remove-btn").style.display="none";
  document.getElementById("update-btn").style.display="none";
  document.getElementById("account-value").disabled=false

}; 

function hideOverlay() {
  clearFormValue();
  clearValidation();
  document.getElementById("default-selection").selected = true;
  document.getElementById("overlay").classList.replace("show", "hide");
  document.getElementById("overlay-dialog").style.top = "-3%";
  document.getElementById("add-btn").style.display="inline";
  document.getElementById("remove-btn").style.display="none";
  document.getElementById("update-btn").style.display="none";
  document.getElementById("account-value").disabled=false;

};

document.getElementById("add-btn").onclick = function () {
  if (createStaff() === 1) {
    document.getElementById("overlay").classList.replace("show", "hide");
    document.getElementById("account-value").value = "";
    document.getElementById("name-value").value = "";
    document.getElementById("email-value").value = "";
    document.getElementById("password-value").value = "";
    document.getElementById("dob-value").value = "";
    document.getElementById("salary-value").value = "";
    document.getElementById("position-value").value = "Chọn chức vụ";
    document.getElementById("dow-value").value = "";
  }
};

function printOutStaffInfo() {
  var staffData = "";
  for (var i = 0; i < staffList.length; i++) {
    staffData += `<tr>
    <td>${staffList[i].staffAccount}</td>
    <td>${staffList[i].fullName}</td>
    <td>${staffList[i].email}</td>
    <td>${staffList[i].dow}</td>
    <td>${staffList[i].position}</td>
    <td>${staffList[i].sumOfSalary()}</td>
    <td>${staffList[i].gradingStaff()}</td>
    <td><button class="btn-config" onclick="toConfigMode('${i}')"><i class="fa-solid fa-pen-to-square"></i></button></td>
    </tr>`;
  }
  document.getElementById("staffTable").innerHTML = staffData;
}

function printOutSearchResult(result) {
  var staffData = "";
  for (var i = 0; i < result.length; i++) {
    staffData += `<tr>
    <td>${result[i].staffAccount}</td>
    <td>${result[i].fullName}</td>
    <td>${result[i].email}</td>
    <td>${result[i].dow}</td>
    <td>${result[i].position}</td>
    <td>${result[i].sumOfSalary()}</td>
    <td>${result[i].gradingStaff()}</td>
    <td><button class="btn-config" onclick="toConfigMode('${i}')"><i class="fa-solid fa-pen-to-square"></i></button></td>
    </tr>`;
  }
  document.getElementById("staffTable").innerHTML = staffData;
}
// --------------------VALIDATION----------------------------

function duplicateValidation(targetedID,configuredVal){

  for (var i = 0; i < staffList.length; i++) {staffList[i].targetVal=configuredVal.targetVal;
    if (staffList[i].targetVal== targetedID) {document.getElementById(configuredVal.errorCode).innerHTML=configuredVal.errorMessage;
      return false;
    }    
}return true;}

function emptyDetect(targetedID, configuredVal) {
  if (targetedID.length <= 0) {
    document.getElementById(configuredVal.errorCode).innerHTML =
      "Không được để trống";
    return false;
  } else {
    document.getElementById(configuredVal.errorCode).innerHTML = "";
    return true;
  }
}

function lengthValidation(targetedID, configuredVal) {
  if (configuredVal.min == undefined) {
    configuredVal.min = 0;
  }
  if (
    targetedID.length < configuredVal.min ||
    targetedID.length > configuredVal.max
  ) {
    document.getElementById(configuredVal.errorCode).innerHTML =
      "Nhập vào giá trị có độ dài từ " +
      configuredVal.min +
      " đến " +
      configuredVal.max +
      " ký tự.";
    return false;
  } else {
    document.getElementById(configuredVal.errorCode).innerHTML = "";
    return true;
  }
}

function regEx(targetedID, configuredVal) {
  if (configuredVal.regEx.test(targetedID) === false) {
    document.getElementById(configuredVal.errorCode).innerHTML =
      configuredVal.errorMessage;
    return false;
  } else {
    document.getElementById(configuredVal.errorCode).innerHTML = "";
    return true;
  }
}

function salaryCheck(targetedID, configuredVal) {
  if (
    targetedID * 1 < configuredVal.min ||
    targetedID * 1 > configuredVal.max
  ) {
    document.getElementById(configuredVal.errorCode).innerHTML =
      "Tiền lương phải lớn hơn 1,000,000 VNĐ và nhỏ hơn 20,000,000 VNĐ";
    return false;
  } else {
    document.getElementById(configuredVal.errorCode).innerHTML = "";
    return true;
  }
}

function positionCheck(configuredVal) {
  if (document.getElementById("default-selection").selected === true) {
    document.getElementById(configuredVal.errorCode).innerHTML =
      "Không được để trống";
    return false;
  } else {
    document.getElementById(configuredVal.errorCode).innerHTML = "";
    return true;
  }
}

function dowCheck(targetedID, configuredVal) {
  if (targetedID < 80 || targetedID > 200) {
    document.getElementById(configuredVal.errorCode).innerHTML =
      "Số giờ công phải từ 80 đến 200 giờ";
    return false;
  } else {
    document.getElementById(configuredVal.errorCode).innerHTML = "";
    return true;
  }
}

function validatingFunc() {
  var account = document.getElementById("account-value").value;
  var fullName = document.getElementById("name-value").value;
  var email = document.getElementById("email-value").value;
  var password = document.getElementById("password-value").value;
  var dob = document.getElementById("dob-value").value;
  var salary = document.getElementById("salary-value").value;
  var dow = document.getElementById("dow-value").value;
  var isValid;
  var accountValidation =
    emptyDetect(account, { errorCode: "accountError" }) &&
    lengthValidation(account, {
      errorCode: "accountError",
      min: 4,
      max: 6,
    }) &&
    regEx(account, {
      errorCode: "accountError",
      regEx: /^[0-9]{4,6}$/g,
      errorMessage: "Tài khoản không được nhập vào giá trị chữ",
    })
    // &&duplicateValidation(account,{errorCode:"accountError", targetVal:"staffAccount", errorMessage:"Tài khoản đã tồn tại, vui lòng chọn tài khoản khác"});

  var fullNameValidation =
    emptyDetect(fullName, { errorCode: "fullNameError" }) &&
    regEx(fullName, {
      errorCode: "fullNameError",
      regEx:
        /^[A-zaAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ ]+$/g,
      errorMessage: "Tên không được có giá trị số hoặc ký tự đặc biệt",
    });

  var emailValidation =
    emptyDetect(email, { errorCode: "emailError" }) &&
    regEx(email, {
      errorCode: "emailError",
      regEx:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      errorMessage: "Email không đúng định dạng",
    })
    // &&duplicateValidation(email,{errorCode:"emailError", targetVal:"email", errorMessage:"Email đã tồn tại, vui lòng lựa chọn email khác"})
    ;

  var passValidation =
    emptyDetect(password, { errorCode: "passwordError" }) &&
    lengthValidation(password, {
      errorCode: "passwordError",
      min: 6,
      max: 10,
    }) &&
    regEx(password, {
      errorCode: "passwordError",
      regEx:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
      errorMessage:
        "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt",
    });

  var dobValidation =
    emptyDetect(dob, { errorCode: "dobError" }) &&
    regEx(dob, {
      errorCode: "dobError",
      regEx: /^((0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/][0-9]{4})$/g,
      errorMessage: "Ngày làm việc không đúng định dạng mm/dd/yyyy",
    });

  var salaryValidation =
    emptyDetect(salary, { errorCode: "salaryError" }) &&
    salaryCheck(salary, {
      errorCode: "salaryError",
      min: 1000000,
      max: 20000000,
    });

  var positionValidation = positionCheck({ errorCode: "positionError" });

  var dowValidation =
    emptyDetect(dow, { errorCode: "dowError" }) &&
    dowCheck(dow, { errorCode: "dowError" });

  isValid =
    accountValidation &&
    fullNameValidation &&
    emailValidation &&
    passValidation &&
    dobValidation &&
    salaryValidation &&
    positionValidation &&
    dowValidation;
  return isValid;
}

function clearValidation() {
  document.getElementById("accountError").innerHTML = "";
  document.getElementById("fullNameError").innerHTML = "";
  document.getElementById("emailError").innerHTML = "";
  document.getElementById("passwordError").innerHTML = "";
  document.getElementById("dobError").innerHTML = "";
  document.getElementById("salaryError").innerHTML = "";
  document.getElementById("positionError").innerHTML = "";
  document.getElementById("dowError").innerHTML = "";
}

function clearFormValue() {
  document.getElementById("account-value").value = "";
  document.getElementById("name-value").value = "";
  document.getElementById("email-value").value = "";
  document.getElementById("password-value").value = "";
  document.getElementById("dob-value").value = "";
  document.getElementById("salary-value").value = "";
  document.getElementById("position-value").value = "";
  document.getElementById("dow-value").value = "";
}

function findByAccount(account){
  for (var i =0; i<staffList.length;i++){
    if(staffList[i].staffAccount===account){
      return i
    }
  }
  alert("Lỗi id, Liên hệ với nhà phát triển để được hướng dẫn khắc phục sự cố")
} 

function toConfigMode(index){
  showOverlay();
  document.getElementById("add-btn").style.display="none";
  document.getElementById("remove-btn").style.display="inline";
  document.getElementById("update-btn").style.display="inline";
  document.getElementById("account-value").value = staffList[index].staffAccount;
  document.getElementById("name-value").value = staffList[index].fullName;
  document.getElementById("email-value").value = staffList[index].email;
  document.getElementById("password-value").value = staffList[index].password;
  document.getElementById("dob-value").value = staffList[index].dob;
  document.getElementById("salary-value").value = staffList[index].salary;
  document.getElementById("position-value").value = staffList[index].position;
  document.getElementById("dow-value").value = staffList[index].dow;
  document.getElementById("account-value").disabled=true;
  staffList[index]
}

function updateInfo(){
  var account= document.getElementById("account-value").value;
  var index = findByAccount(account);
  var fullName = document.getElementById("name-value").value;
  var email = document.getElementById("email-value").value;
  var passWord = document.getElementById("password-value").value;
  var dob = document.getElementById("dob-value").value;
  var salary = document.getElementById("salary-value").value;
  var dateOfWork = document.getElementById("dow-value").value;
  var position = document.getElementById("position-value").value;
  if (!validatingFunc()) return;

  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].email === email&&i!==index) {
      document.getElementById("emailError").innerHTML="Email đã tồn tại. Vui lòng lựa chọn email khác";
      return;
    }
  }
  staffList[index].staffAccount = account;
  staffList[index].fullName = fullName;
  staffList[index].email = email;
  staffList[index].password = passWord;
  staffList[index].dob = dob;
  staffList[index].salary = salary;
  staffList[index].position = position;
  staffList[index].dow = dateOfWork;
  staffList[index].index=index;
  printOutStaffInfo()
  hideOverlay()
}

function removeStaff(){
  account=document.getElementById("account-value").value;
  var i = findByAccount(account);
  staffList.splice(i,1);
  printOutStaffInfo();
  clearFormValue();
  hideOverlay();
  return
}

function searchStaffByGrade(){
  var searchValue= document.getElementById("employee-type-input").value;
  var result =[];
  for (var i =0; i<staffList.length;i++){
    if(staffList[i].gradingStaff()==searchValue){
      result.push(staffList[i])
    }
  }
  printOutSearchResult(result);
  document.getElementById("search-btn").style.backgroundColor="black";
  document.getElementById("search-btn").style.color="white";
  mode = "searching"
}
function searchBtn(){
if(mode=="normal"){searchStaffByGrade()}else{printOutStaffInfo(); mode="normal"; document.getElementById("search-btn").style.backgroundColor="#e9ecef";
document.getElementById("search-btn").style.color="black"}}
