import styled from "styled-components";
import { useCarrito } from "../context/CarritoContext";
import { Colors } from "../utils/Colors";

interface Props {
  cantProductos: number;
  handleShowCarrito: () => void;
}

export const HeaderComponent = ({ cantProductos, handleShowCarrito }: Props) => {
  const { cantGemas } = useCarrito();

  return (
    <MainContainer>
      <PageTitle>🧙‍♂️ Potion Shop</PageTitle>
      <GemasContainer>
        <img src="./gem.png" />
        <span>{`${cantGemas} Gemas`}</span>
      </GemasContainer>
      <CarritoButton onClick={handleShowCarrito}>
        {`Ver Carrito (${cantProductos})`}
      </CarritoButton>
    </MainContainer>
  );
};

const MainContainer = styled('div')({
  display: "flex",
  position: "sticky",
  top: 0,
  zIndex: 10,
  padding: "1rem 2rem",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: Colors.BACKGROUND_GRAY,
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
});

const PageTitle = styled('h1')({
  fontSize: "1.5rem",
  lineHeight: "2rem",
  fontWeight: "700",
  color: "#FFFFFF"
});

const GemasContainer = styled('div')({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center"
});

const CarritoButton = styled('button')({
  color: "#FFFFFF",
  ":hover": {
    textDecoration: "underline"
  }
});