function Staff(account, fullName, email, passWord, dob, salary, position, dateOfWork,index){
    this.staffAccount = account;
    this.fullName = fullName;
    this.email = email;
    this.password = passWord;
    this.dob = dob;
    this.salary = salary;
    this.position = position;
    this.dow = dateOfWork;
    this.index=index;

    this.sumOfSalary = function(){
if(this.position==="Giám đốc"){return this.salary*3}else if(this.position==="trưởng phòng"){return this.salary*2}else {return this.salary}
    }

    this.gradingStaff = function(){
        if(this.dow>=192){return "xuất sắc"}else if(this.dow>=176){return "giỏi"}else if(this.dow>=160){return "khá"}else{return "trung bình"}
    }
} 