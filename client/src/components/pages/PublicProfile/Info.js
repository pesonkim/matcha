const Info = ({ room }) => {
	const fieldStyle = {
		height: '60px',
		borderBottomWidth: '1px',
		borderColor: '#dae4e9',
	}

	return (
		<>
			<div className="w-full flex items-center p-4" style={fieldStyle}>
				<p>Name age fame distance</p>
			</div>
			<div className="w-full flex items-center p-4" style={fieldStyle}>
				<p>Bio</p>
			</div>
			<div className="w-full flex items-center p-4" style={fieldStyle}>
				<p>Orientation</p>
			</div>
			<div className="w-full flex items-center p-4" style={fieldStyle}>
				<p>Tags</p>
			</div>
			<div className="w-full flex items-center p-4" style={fieldStyle}>
				<p>Online status</p>
			</div>
		</>
	)
}

export default Info