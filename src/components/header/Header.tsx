import Container from "./components/Container";
import LogoPart from "./components/LogoPart";
import MenuPart from "./components/MenuPart";
import Preview from "./components/Preview";

const Header = () => {
  return (
    <Container mb="2rem">
      <LogoPart />
      <MenuPart />
      <Preview />
    </Container>
  );
};

export default Header;
