import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

/**
 * The topmost header of the page, containing the logo and shopping cart
 *
 * @returns The header component
 */
export function Header({setPage}) {
    return (
        <header className="bg-neutral-800 text-white pb-2 mb-10">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold hover:cursor-pointer" onClick={() => setPage('events')}>Evenemondial</h1>
            <ShoppingBasketIcon className="text-white position-right pt-2" onClick={() => setPage('cart')}/>
          </div>
        </header>
    )
}