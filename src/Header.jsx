import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export function Header({ setPage }) {
    return (
        <header className="bg-neutral-800 text-white pb-4 mb-10">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold hover:cursor-pointer" onClick={() => setPage('events')}>
                    Evenemondial
                </h1>
                <ShoppingBasketIcon className="text-white cursor-pointer" onClick={() => setPage('checkout')} />
            </div>
        </header>
    );
}
