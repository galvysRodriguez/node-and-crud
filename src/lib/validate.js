const validatename = name => { return name.length > 2}
const validatelastname = lastname => {return lastname.length > 2}
const validatepassword = password =>{return password.length > 8}
const validateidentify = identify => {return identify.length <= 9 && identify.length > 7}
const validatephone = phone => { return phone.length == 11}
const validaemail = email =>{ return email.includes("@")}

module.exports = {validaemail, validateidentify, validatelastname, validatephone, validatename, validatepassword}