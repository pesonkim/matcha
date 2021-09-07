import { Link } from 'react-router-dom';

const Header = () => (
    <header className="h-16 w-full flex justify-center fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <section className="w-full max-w-screen-md flex justify-between items-center mx-4">
            <Link to='/'>
                <p className="text-3xl">matcha</p>
            </Link>
        </section>
        <section className="flex items-center">
            <Link to='/signup'>
                <p className="text-2xl mx-2 hover:opacity-50">signup</p>
            </Link>
            <Link to='/login'>
                <p className="text-2xl mx-2 hover:opacity-50">login</p>
            </Link>
        </section>
    </header>
)

export default Header