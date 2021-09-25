import Wrapper from './Wrapper'
import Heading from './forms/Heading'

const Confirm = ({ dialog, setDialog }) => {
	return (
		!dialog
			? null
			: (<div className={dialog ? 'block' : 'hidden'}>
				<div
					className="fixed z-0 inset-0 bg-black opacity-30"
					onClick={() => setDialog(null)}
				></div>
				<div className='fixed inset-0 flex items-center justify-center'>
					<Wrapper>
						<Heading title={dialog.type === 'report' ? 'Report' : 'Block'} />
						{dialog.type === 'block' && <p className='mb-4'>Blocked users will not appear in any of your search results.</p>}
						<p className='mb-4'>Are you sure you want to {dialog.type} user {dialog.user}?</p>
						<div className='flex flex-row justify-between'>
							<button
								className='rounded bg-green-500 hover:bg-green-600 text-white mr-2 p-4 w-1/2'
								onClick={() => dialog.action()}
							>
								Confirm
							</button>
							<button
								className='rounded bg-green-500 hover:bg-green-600 text-white ml-2 p-4 w-1/2'
								onClick={() => setDialog(null)}
							>
								Cancel
							</button>
						</div>
					</Wrapper>
				</div>
			</div>
			)
	)
}

export default Confirm