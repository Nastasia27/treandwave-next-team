'use client'
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { openBurger, openCart } from "@/redux/features/openSlice"
import { Popover, PopoverContent, PopoverTrigger, PopoverArrow } from "@/components/ui/popover"

import Search from '../../../public/image/svg/search.svg'
import Heart from '../../../public/image/svg/heart.svg'
import Cart from '../../../public/image/svg/cart.svg'
import Man from '../../../public/image/svg/man.svg'
import Logo from '../../../public/image/svg/logo.svg'
import ArrowDown from '../../../public/image/svg/arrow-down.svg'
import { BurgerMenu } from "."
import ShoppingCart from "./shopping-cart"


export const Header = () => {
  const dispatch = useDispatch()
  const { burgerOpen, cartOpen } = useSelector(state => state.open)
  const cart = useSelector(state => state.cart.cart)

  const counter = cart?.reduce((sum, el) => el.count + sum, 0);

  return (
    <header className="sticky z-40 top-12 bg-[#fdfdfd]">
      <div className="wrap">
        <div className="flex align-center justify-between items-center h-20 gap-x-8 text-header">

          <Link href='/'>
            <Logo />
          </Link>

          <nav className="flex items-center gap-x-6">

            <div
              className="flex items-center gap-x-1 header-link"
              onClick={() => dispatch(openBurger(!false))}
            >
              <span className="">каталог</span>
              <ArrowDown className='header-icon' />
            </div>

            {
              burgerOpen &&
              <BurgerMenu />
            }

            <Link className="header-link text-red-500 hover:text-red-400 hover:border-red-400" href='/sale'>Sale</Link>
            <Link className="header-link" href='/colections'>Колекції</Link>
            <Link className="header-link" href='/about'> Про нас</Link>

          </nav>


          <nav className="flex gap-x-6">

            <Link href='#!' className="header-link transit">
              <Man className='header-icon' />
            </Link>

            <Link href='/search' className="header-link transit">
              <Search className='header-icon' />
            </Link>

            <Link href='/wishlist' className="header-link">
              <Heart className='header-icon' />
            </Link>
            <Popover>
              <PopoverTrigger>
                <div className="header-link">
                  <Cart className='header-icon-cart' />
                  <div className="flex gap-x-1 uppercase">
                    <span>Кошик</span>
                    (<span className="w-4 inline-block text-center">{counter}</span>)
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent align='end' className='bg-[#f7f7f7] w-[440px] px-6 pt-6 pb-14'>
                <PopoverArrow className="fill-[#f7f7f7] z-40 w-14 h-6" />
                <ShoppingCart counter={counter} />
              </PopoverContent>
            </Popover>
          </nav>
        </div>
      </div>
      {/* {
        cartOpen &&
        <ShoppingCart />
      } */}
    </header>
  )
}