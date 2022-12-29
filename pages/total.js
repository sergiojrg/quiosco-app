import { useEffect, useCallback } from 'react'
import Layout from '../layout/Layout'
import useQuiosco from '../hooks/useQuiosco'
import { formatearDinero } from '../helpers'

const Total = () => {

    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco()

    const comprobarPedido = useCallback( () => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3
    },[pedido,nombre])

    useEffect(()=>{
        comprobarPedido()
    },[pedido,comprobarPedido])


  return (
    <div>
        <Layout pagina="total">
        <h1 
            className="text-4xl font-black"
        >
            Total y confirmar pedido
        </h1>
        <p
            className="text-2xl my-10"
        >
            Confirma tu pedido
        </p>

        <form
            onSubmit={colocarOrden}
        >
            <div className>
                <label htmlFor='nombre' className='block uppercase text-slate-800 font-bold text-xl'>Nombre</label>
                <input
                    id="nombre"
                    type="text"
                    className='bg-gray-200 w-full md:w-1/3 p-2 rounded-md mt-3'
                    value={nombre}
                    onChange={(e)=> setNombre(e.target.value)}
                />
            </div>

            <div
                className='mt-10'
            >
                <p className="text-2xl">Total a pagar <span className="font-bold">{formatearDinero(total)}</span></p>
            </div>
            <div 
                className='mt-5'
            >
                <input
                    type="submit"
                    className={`text-center ${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white`}
                    value="Confirma Pedido"
                    disabled={comprobarPedido}
                />
            </div>
        </form>

    </Layout>
    </div>
  )
}

export default Total