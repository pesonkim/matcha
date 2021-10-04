const Image = ({ image }) => {
	const divStyle = {
		height: '300px',
		maxHeight: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		overflow: 'hidden',
		backgroundColor: 'rgba(248,247,251,255)',
	}

	const imgStyle = {
		objectFit: 'contain',
		height: 'auto',
		width: '100%',
		maxHeight: '100%',
		maxWidth: '100%',
		margin: 'auto',
	}

	return (
		<div style={divStyle} >
			<img src={image ? image : 'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png'} alt='avatar' style={imgStyle} />
		</div>
	)
}

export default Image