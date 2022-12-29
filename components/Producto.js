import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import { formatearDinero } from '../helpers'

const Producto = ({producto}) => {

    const { handleProducto, handleModal } = useQuiosco()

    const {nombre,imagen,precio} = producto

  return (
    <div className="border p-3">
        <Image src={`/img/${imagen}.jpg`} alt={`imagen platillo ${nombre}`} width={400} height={500}/>

        <div className="p-5">
            <h3 className="text-2xl font-bold">
                {nombre}
            </h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
                {formatearDinero(precio)}
            </p>

            <button
                type="button"
                className="bg-indigo-600 p-4 text-white mt-5 w-full uppercase font-bold hover:bg-indigo-800"
                onClick={()=>{
                    handleProducto(producto)
                    handleModal()
                }}
            >
                Agregar
            </button>
        </div>
    </div>
  )
}

export default Producto