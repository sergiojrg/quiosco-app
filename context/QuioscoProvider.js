import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const router = useRouter()

    const [categorias,setCategorias] = useState([])
    const [categoriaActual,setCategoriaActual] = useState({})
    const [producto,setProducto] = useState({})
    const [modal,setModal] = useState(false)
    const [pedido,setPedido] = useState([])
    const [nombre,setNombre] = useState('')
    const [total,setTotal] = useState(0)

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data.categorias)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        if(categorias.length > 0){
            setCategoriaActual(categorias[0])
        }
    }, [categorias])

    useEffect(()=>{
        const nuevoTotal = pedido.reduce((total,producto) => (producto.precio * producto.cantidad)+total,0)
        setTotal(nuevoTotal)
    },[pedido])
    
    
    const handleClickCategoria = id => {
        const categoriaActualFunc = categorias.filter(category => category.id === id)
        setCategoriaActual(categoriaActualFunc[0])
    }

    const handleProducto = (product) => {
        setProducto(product)
    }

    const handleModal = () => {
        setModal(!modal)
    }

    const handleEditarCantidades= id => {
        setModal(true)
        const productoEditar = pedido.filter(pedidoState => pedidoState.id === id)
        
        setProducto(productoEditar[0])
    }

    const handleEliminarProducto = id => {
        const productoActualizado = pedido.filter(pedidoState => pedidoState.id !== id)
        setPedido(productoActualizado)
    }

    const handlePedido = ({categoriaId,...product}) => {

        if(pedido.some(productoState => productoState.id === product.id)){
            //actualizar la cantidad
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === product.id ? product : pedidoState)
            setPedido(pedidoActualizado)

            toast.success('Guardando correctamente',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
        }else{
            setPedido([
                ...pedido,
                product,
            ])

            toast.success('Agregando pedido',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
        }

        setModal(false)
    }

    const colocarOrden = async (e) => {
        e.preventDefault()

        try {
            await axios.post('/api/ordenes',{pedido,nombre,total,fecha:Date.now().toString()})
            
        } catch (error) {
            console.log(error)
        }finally{
            //resetear app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido realizado')
            setTimeout(()=>{
                router.push('/')
            },3000)
        }
    }



    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleProducto,
                modal,
                handleModal,
                handlePedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext
