import Producto from "./Producto";

export default interface CarritoContextType {
    productosSeleccionados: Producto[];
    agregarProducto: (producto: Producto) => void;
    eliminarProducto: (id: number) => void;
    cantGemas: number;
    reducirCantGemas: (cantAReducir: number) => void;
    incrementarCantGemas: (cantAIncrementar: number) => void;
    resetearCarrito: () => void;
}