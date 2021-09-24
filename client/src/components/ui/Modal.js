import Wrapper from './Wrapper'
import Heading from './forms/Heading'

const Modal = () => {
	return (
		<>
			<div className="fixed z-0 inset-0 bg-black opacity-30"></div>
			<div className='fixed inset-0 flex items-center justify-center'>
				<Wrapper>
					<Heading title='Block' />
					<p className='mb-4'>Are you sure you want to block user?</p>
					<div className='flex flex-row justify-between'>
						<button
							className='rounded bg-green-500 hover:bg-green-600 text-white mr-2 p-4 w-1/2'
						>
							Confirm
						</button>
						<button
							className='rounded bg-green-500 hover:bg-green-600 text-white ml-2 p-4 w-1/2'
						>
							Cancel
						</button>
					</div>
				</Wrapper>
			</div>
		</>
	)
}

export default Modal
