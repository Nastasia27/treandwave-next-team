import Link from "next/link"

export const BurgerMenu = ({handleClick}) => {
  return (
    <div className=" w-[586px] h-screen box-border pt-5">
      <div className="wrap">
        <div className="font-semibold uppercase text-base inline-flex flex-col gap-y-4 mt-12">
          <Link href='/catalog' className="header-link" onClick={handleClick}>Усі</Link>
          <hr></hr>
          <Link href='/sale' className="header-link"onClick={handleClick}>Sale</Link>
          <Link href='/collections' className="header-link"onClick={handleClick}>Колекції</Link>
          <hr></hr>
          <Link href='/about' className="header-link text-gray-700" onClick={handleClick}>Про нас</Link>
          <Link href='/about/contacts' className="header-link text-gray-700" onClick={handleClick}>Контакти</Link>
          <Link href='/wishlist' className="header-link text-gray-700" onClick={handleClick}>Ваш вішліст</Link>
        </div>
      </div>
    </div>
  )
}