import { useCarrito } from "../context/CarritoContext";
import Producto from "../interfaces/Producto";
import { ProductoContainer } from "./ProductoContainer";

interface Props {
  listadoProductos: Producto[];
}

export const ListadoProductosComponent = ({ listadoProductos }: Props) => {

  const { agregarProducto, productosSeleccionados, reducirCantGemas } = useCarrito();

  const esSeleccionValida = (prod: Producto) => {
    return !productosSeleccionados.includes(prod) && !productosSeleccionados.map((p) => p.categoria).includes(prod.categoria);
  }

  const handleSelectProducto = (prod: Producto) => {
    if (esSeleccionValida(prod)) {
      reducirCantGemas(prod.precio);
      agregarProducto(prod);
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 0fr)", justifyItems: "center", gap: "1em" }}>
      {
        listadoProductos.map((producto) => <ProductoContainer producto={producto} handleSelectProducto={handleSelectProducto} />)
      }
    </div>
  );
};
