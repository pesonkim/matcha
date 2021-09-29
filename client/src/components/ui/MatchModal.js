import Wrapper from './Wrapper'
import Heading from './forms/Heading'
import { useEffect } from 'react'

const MatchModal = ({ modal, setModal }) => {
	const handler = (event) => {
		if (event.target.id === 'modalContainer') {
			setModal(null)
		}
	}

	useEffect(() => {
		if (modal && setModal) {
			window.addEventListener('click', handler)
			return () => {
				window.removeEventListener('click', handler)
			}
		}
	}, [modal])

	return (
		!modal
			? null
			: (<div className={modal ? 'block' : 'hidden'}>
				<div className="fixed z-0 inset-0 bg-black opacity-30"></div>
				<div className='fixed inset-0 flex items-center justify-center' id='modalContainer'>
					<Wrapper>
						<Heading title='Unlike' />
						<p className='mb-4'>Are you sure you want to unlike {modal.user}?</p>
						<div className='flex flex-row justify-between'>
							<button
								className='rounded bg-green-500 hover:bg-green-600 text-white mr-2 p-4 w-1/2'
								onClick={() => modal.handleLike({ type: 'remove', likeid: modal.likeid })}
							>
								Confirm
							</button>
							<button
								className='rounded bg-green-500 hover:bg-green-600 text-white ml-2 p-4 w-1/2'
								onClick={() => setModal(null)}
							>
								Cancel
							</button>
						</div>
					</Wrapper>
				</div>
			</div>)
	)
}

export default MatchModal
