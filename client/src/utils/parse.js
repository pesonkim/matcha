const oToDb = (values) => {
	if (!values) {
		return null
	} else if (values.length === 1) {
		return values[0].substr(0, 1)
	} else if (values.length === 2) {
		if (!values.find(o => o === 'male')) {
			return 'fo'
		} else if (!values.find(o => o === 'female')) {
			return 'mo'
		} else {
			return 'fm'
		}
	} else if (values.length === 3) {
		return 'fmo'
	}
}

const oFromDb = (str) => {
	let orientation = []

	if (!str) {
		return null
	}

	if (str.split('').length) {
		if (str.split('').includes('f')) {
			orientation.push('female')
		}
		if (str.split('').includes('m')) {
			orientation.push('male')
		}
		if (str.split('').includes('o')) {
			orientation.push('other')
		}
	}

	return orientation
}

const parseTags = (tags) => {
	return tags ? tags.split('#').splice(1).map(i => '#' + i) : []
}


export default { oToDb, oFromDb, parseTags }