import { createContext, useContext, useState } from "react";
import Producto from "../interfaces/Producto";
import CarritoContextType from "../interfaces/CarritoContextType";

const CarritoContext = createContext<CarritoContextType>({
    productosSeleccionados: [],
    agregarProducto: () => { },
    eliminarProducto: () => { },
    cantGemas: 0,
    reducirCantGemas: () => { },
    incrementarCantGemas: () => { }
});

export function CarritoProvider({ children }: { children: React.ReactNode }) {
    const [productosSeleccionados, setProductosSeleccionados] = useState<Producto[]>([]);
    const [cantGemas, setCantGemas] = useState<number>(3);

    const agregarProducto = (producto: Producto) => {
        setProductosSeleccionados((prevProductos) => [...prevProductos, producto]);
    };

    const eliminarProducto = (id: number) => {
        setProductosSeleccionados((prevProductos) =>
            prevProductos.filter((producto) => producto.id !== id)
        );
    };

    const reducirCantGemas = (cantAReducir: number) => {
        if (cantGemas >= cantAReducir) {
            setCantGemas(cantGemas - cantAReducir);
        }
    }

    const incrementarCantGemas = (cantAIncrementar: number) => {
        setCantGemas(cantGemas + cantAIncrementar);
    }


    return (
        <CarritoContext.Provider
            value={{ productosSeleccionados, agregarProducto, eliminarProducto, cantGemas, reducirCantGemas, incrementarCantGemas }}
        >
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    return useContext(CarritoContext);
}
