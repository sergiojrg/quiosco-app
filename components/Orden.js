import { toast } from 'react-toastify'
import Image from "next/image"
import { formatearDinero } from '../helpers'
import axios from 'axios'

const Orden = ({orden,lista}) => {

    const { id,nombre,total,pedido } = orden

    const completarOrden = async id => {
        try {
            await axios.post(`/api/ordenes/${id}`)
            toast.success('Orden lista')
        } catch (error) {
            toast.error('Hubo un error')
        }
    }

  return (
    <div
        className="border p-10 space-y-5"
    >
        <h3 className="text-2xl font-bold">Orden: {id}</h3>
        <p className="text-lg font-bold">
            Cliente: {nombre}
        </p>

        <div>
            {pedido.map(platillo => (
                <div
                    key={platillo.id}
                    className="py-3 flex border-b last-of-type:border-0 items-center"
                >
                    <div
                        className="w-32"
                    >
                        <Image
                            width={400}
                            height={500}
                            src={`/img/${platillo.imagen}.jpg`}
                            alt={`platillo ${platillo.nombre}`}
                        />
                    </div>
                    <div
                        className="p-5 space-y-2"
                    >
                        <h4
                            className="text-xl font-bold tex-amber-500"
                        >
                            {platillo.nombre}
                        </h4>
                        <p
                            className="font-bold text-lg"
                        >
                            Cantidad: {platillo.cantidad}
                        </p>
                    </div>
                </div>
            ))}
        </div>
        <div
            className="md:flex md:items-center md:justify-between my-10"
        >
            <p className="mt-5 font-black text-4xl text-amber-500">
                Total: {formatearDinero(total)}
            </p>

            {!lista && (
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 py-3 px-10 rounded-lg uppercase font-bold"
                    onClick={()=>completarOrden(id)}
                >
                    Completar Orden
                </button>
            )}
        </div>
    </div>
  )
}

export default Orden