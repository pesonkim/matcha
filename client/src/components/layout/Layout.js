import Header from './Header'
import Footer from './Footer'

const Layout = (props) => (
	<div className='flex flex-col justify-between min-h-screen w-full max-w-screen-lg mx-auto'>
		<Header />
		<main className='mt-20 mb-4 mx-auto'>
			{props.children}
		</main>
		<Footer />
	</div>
)

export default Layout