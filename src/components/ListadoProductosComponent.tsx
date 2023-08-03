import { useCarrito } from "../context/CarritoContext";
import Producto from "../interfaces/Producto";
import { ProductoContainer } from "./ProductoContainer";

interface Props {
  listadoProductos: Producto[];
}

export const ListadoProductosComponent = ({ listadoProductos }: Props) => {

  const { agregarProducto, reducirCantGemas } = useCarrito();

  const handleSelectProducto = (prod: Producto) => {
    reducirCantGemas(prod.precio);
    agregarProducto(prod);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 0fr)", justifyItems: "center", gap: "1em" }}>
      {
        listadoProductos.map((producto) => <ProductoContainer producto={producto} handleSelectProducto={handleSelectProducto} />)
      }
    </div>
  );
};
