import { useState, useEffect } from 'react'
import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers"

const ModalProducto = () => {

    const { producto, handleModal, handlePedido, pedido } = useQuiosco()

    const [cantidad,setCantidad] = useState(1)
    const [edicion,setEdicion] = useState(false)
    
    useEffect(() => {
        //comprobar si el modal actual esta en el pedido
        if(pedido.some(pedidoState => pedidoState.id === producto.id)){
            // si existe
            const productoEdicion = pedido.find(pedidoState => pedidoState.id === producto.id)
            setEdicion(true)
            setCantidad(productoEdicion.cantidad)
        }
    }, [producto,pedido])
    

  return (
    <div
        className="md:flex gap-10"
    >
        <div className="md:w-1/3">
            <Image
                width={300}
                height={400}
                alt={`imagen producto ${producto.imagen}`}
                src={`/img/${producto.imagen}.jpg`}
            />
        </div>
        <div className="md:w-2/3">
            <div className="flex justify-end">
                <button
                    onClick={()=>{
                        handleModal()
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            <h1 className="text-3xl font-bold mt-5">
                {producto.nombre}
            </h1>
            <p className="mt-4 font-black text-5xl text-amber-500">
                {formatearDinero(producto.precio)}
            </p>

            <div className="flex gap-4 mt-5">
                <button
                    type="button"
                    onClick={()=>{
                        if(cantidad <= 0) return
                        setCantidad(cantidad - 1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                </button>

                <p
                    className='text-3xl'
                >
                    {cantidad}
                </p>

                <button
                    type="button"
                    onClick={()=>{
                        if(cantidad >= 5) return
                        setCantidad(cantidad + 1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>

            <button
                type="button"
                className='uppercase  bg-indigo-600 px-5 py-2 mt-5 text-white font-bold rounded hover:bg-indigo-800'
                onClick={()=>handlePedido({...producto,cantidad})}
            >
                {edicion ? ' Guardar Cambios': 'Añadir al pedido'}
            </button>

        </div>

    </div>
  )
}

export default ModalProducto