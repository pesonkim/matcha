const Wrapper = (props) => {
	return (
		<div className='max-w-screen-sm mx-auto px-2 '>
			<div className='flex flex-col  justify-center my-4 p-4 bg-white rounded ui-shadow'>
				{props.children}
			</div>
		</div>
	)
}

export default Wrapper