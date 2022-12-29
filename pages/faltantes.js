import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from '../layout/AdminLayout'
import Orden from '../components/Orden'

const Faltantes = () => {

    const fetcher = () => axios('/api/ordenesListas').then(datos=>datos.data)

    const { data, error, isLoading } = useSWR('/api/ordenesListas',fetcher,{refreshInterval:100})

  return (
    <AdminLayout>
        <h1 className="text-4xl font-black">Panel de Administracion</h1>
        <p className="text-2xl my-10">
            Ordenes listas
        </p>

        {data?.map(orden => (
            <Orden
                key={orden.id}
                orden={orden}
                lista={true}
            />
        ))}

    </AdminLayout>
  )
}

export default Faltantes