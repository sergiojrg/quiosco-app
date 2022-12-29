import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import { useRouter } from 'next/router'

const Categoria = ({categoria}) => {
    const { nombre,icono,id} = categoria

    const { categoriaActual, handleClickCategoria } = useQuiosco()

    const router = useRouter()

  return (
    <div className={`flex items-center gap-4 w-full border p-5 hover:bg-amber-500 ${categoriaActual?.id === id && 'bg-amber-500'}`}>
        <Image
            alt="imagen icono"
            width={70}
            height={70}
            src={`/img/icono_${icono}.svg`}
            className="mb-4"
        />
        <button
            type="button"
            className='mb-5 text-xl font-bold hover:cursor-pointer'
            onClick={()=>{
                handleClickCategoria(id)
                router.push('/')
            }}
        >
            {nombre}
        </button>
    </div>
  )
}

export default Categoria