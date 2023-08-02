import { useCarrito } from "../context/CarritoContext";
import Producto from "../interfaces/Producto";
import { Colors } from "../utils/Colors";

interface Props {
    producto: Producto;
    handleSelectProducto: (prod: Producto) => void;
}
export const ProductoContainer = ({ producto, handleSelectProducto }: Props) => {

    const { cantGemas, productosSeleccionados, reducirCantGemas } = useCarrito();


    const generarTextoPrecio = () => {
        const precio = producto.precio;
        const precioFormateado = precio === 1 ? `${precio} Gema` : `${precio} Gemas`;
        return (
            <div style={{
                display: "flex",
                backgroundColor: Colors.GREEN,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                padding: "0 0.7em",
                margin: "1em 0"
            }}>
                {precioFormateado}
            </div>
        )
    }

    const esSeleccionable = () => {
        return (!productosSeleccionados.includes(producto) || !productosSeleccionados.map((p) => p.categoria).includes(producto.categoria)) && cantGemas >= producto.precio;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: Colors.BACKGROUND_GRAY, margin: "1em 0 0 0", padding: "0 1em", width: "18em", borderRadius: 10 }}>
            <div style={{ display: "flex", alignSelf: "flex-end" }}>
                {generarTextoPrecio()}
            </div>
            <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
                <img src={producto.imagen} height="100" width="100" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", width: "100%", margin: "1em 0", padding: "0 5%" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "6em", overflow: "hidden" }}>
                    <span style={{ alignSelf: "flex-start", paddingBottom: "0.4em", fontWeight: "bold" }}>{producto.nombre}</span>
                    <p style={{ alignSelf: "flex-start", color: Colors.GRAY_TEXT }}>{producto.descripcion}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", width: "100%", marginTop: "1em" }}>
                    <span style={{ alignSelf: "flex-start", color: Colors.GRAY_TEXT }}>{`Categoria: ${producto.categoria}`}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifySelf: "flex-end", width: "100%" }}>
                    <button
                        style={{
                            display: "flex",
                            backgroundColor: esSeleccionable() ? Colors.PURPLE : "gray",
                            borderRadius: 15,
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            padding: "0.4em",
                            margin: "1em 0"
                        }}
                        onClick={() => esSeleccionable() && handleSelectProducto(producto)}
                        disabled={!esSeleccionable()}
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </div >)
}