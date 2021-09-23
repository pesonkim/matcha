const Image = ({ image }) => {
	const divStyle = {
		height: '500px',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		overflow: 'hidden',
		backgroundColor: 'rgba(248,247,251,255)',
	}

	const imgStyle = {
		height: 'auto',
		maxHeight: '100%',
		width: 'auto',
		margin: 'auto',
	}

	return (
		<div style={divStyle} >
			<img src={image} style={imgStyle} />
		</div>
	)
}

export default Image