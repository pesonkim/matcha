const validate = (values) => {
	const errors = {}

	//console.log(values)

	//first name
	if (!values.firstname) {
		errors.firstname = 'First name is required'
	}
	//last name
	if (!values.lastname) {
		errors.lastname = 'Last name is required'
	}
	//username
	if (!values.username) {
		errors.username = 'Username is required'
	} else if (values.username.length < 3 || values.username.length > 20) {
		errors.username = 'Username must have between 3 and 20 characters long'
	}
	//birthdate
	if (values.birthdate) {
		if (Object.values(values.birthdate).includes('')) {
			errors.birthdate = 'Birthdate is required'
		}
	}
	//email
	if (!values.email) {
		errors.email = 'Email is required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}
	//password
	if (!values.password) {
		errors.password = 'Password is required'
	} else if (values.password.length < 6) {
		errors.password = 'Password must be at least 6 characters long'
	} else if (!(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])').test(values.password))) {
		errors.password = 'Password must contain at least one lowercase and uppercase letter, and a number.'
	}

	//new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").test
	//check = date.toLocaleDateString('en-eu').split('/')

	//console.log(errors)
	return errors
}

export default validate