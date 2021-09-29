import Wrapper from './Wrapper'
import Heading from './forms/Heading'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MatchModal = ({ modal, setModal }) => {
	const { likes } = useSelector(state => state.match)

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
				<div className='fixed inset-0 flex items-center justify-center slideDown' id='modalContainer'>
					{modal.type === 'unlike' &&
						<Wrapper>
							<Heading title='Unlike' />
							{likes.find(like => like.receiver === modal.user.id) && likes.find(like => like.receiver === modal.user.id).is_match === 1
								? <>
									<p className='mb-4'>Are you sure you want to unlike {modal.user.firstname}?</p>
									<p className='mb-4'>This will also remove them from your matches.</p>
								</>
								: <p className='mb-4'>Are you sure you want to unlike {modal.user.firstname}?</p>
							}
							<div className='flex flex-row justify-between'>
								<button
									className='rounded bg-green-500 hover:bg-green-600 text-white mr-2 p-4 w-1/2'
									onClick={() => modal.action({ type: 'remove', likeid: modal.likeid })}
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
					}
					{modal.type === 'match' &&
						<Wrapper>
							<Heading title='You got a match!' />
							<p className='mb-4 text-center'>You can now chat with {modal.user.firstname}!</p>
							<div className='flex flex-row justify-between'>
								<Link to='/join' className=' w-1/2'>
									<button
										className='rounded bg-green-500 hover:bg-green-600 text-white mr-4 p-4 w-full h-full'
										onClick={() => setModal(null)}
									>
										View matches
									</button>
								</Link>
								<button
									className='rounded bg-green-500 hover:bg-green-600 text-white ml-4 p-4 w-1/2'
									onClick={() => setModal(null)}
								>
									Continue browsing
								</button>
							</div>
						</Wrapper>
					}
				</div>
			</div>)
	)
}

export default MatchModal
