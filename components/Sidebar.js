import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import Categoria from './Categoria'

const Sidebar = () => {

  const { categorias } = useQuiosco()

  return (
    <>
        <Image className='mx-auto pt-5' width={100} height={100} src="/img/logo.svg" alt="image logo"/>

        <nav className="mt-10">
          {categorias.map(category =>(
            <Categoria
              key={category.id}
              categoria={category}
            />
          ))}
        </nav>

    </>
  )
}

export default Sidebar