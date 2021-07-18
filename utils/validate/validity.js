/**
 * ! 此文件封装常用的验证规则 返回布尔值判断
 */

//! 验证企业营业执照
const validLicense = (value) => {
	const licenseReg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
	//! 返回验证结果
	return licenseReg.test(value);
}

//! 验证身份证号码
const validIdentityCard = (value) => {
	const numReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	 return numReg.test(value);
} 


//! 验证手机号码
const validPhone = (value) => {
	const phoneReg = /^[1][3,4,5,6,7,8][0-9]{9}$/
	return phoneReg.test(value);
}

//! 验证邮箱
const validEmail = (value) => {
	const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	return emailReg.test(value);
}



export default {
	validLicense,
	validIdentityCard,
	validPhone,
	validEmail
}