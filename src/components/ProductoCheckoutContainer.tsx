import Producto from "../interfaces/Producto";
import { Colors } from "../utils/Colors";

interface Props {
    producto: Producto;
    handleEliminarProducto: (prod: Producto) => void;
}
export const ProductoCheckoutContainer = ({ producto, handleEliminarProducto }: Props) => {

    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "0.4em 2em", backgroundColor: Colors.BACKGROUND_GRAY, color: "white" }}>
            <div style={{ backgroundColor: "gray", borderRadius: 20 }}>
                <img src={producto.imagen} />
            </div>
            <div>
                {producto.nombre}
            </div>
            <button
                onClick={() => handleEliminarProducto(producto)}
            >
                X
            </button>
        </div>
    )
}