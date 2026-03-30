import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Carousel from "../Carousel";

const pictures = ["/img/1.jpg", "/img/2.jpg", "/img/3.jpg"];

describe("Carousel", () => {
  test("affiche la première image au chargement", () => {
    render(<Carousel pictures={pictures} />);
    expect(screen.getByAltText("Image 1")).toBeInTheDocument();
  });

  test("passe à l’image suivante avec le bouton next", async () => {
    const user = userEvent.setup();
    render(<Carousel pictures={pictures} />);

    const nextButtons = screen.getAllByRole("button", { name: "Image suivante" });
    await user.click(nextButtons[0]);

    expect(screen.getByAltText("Image 2")).toBeInTheDocument();
  });

  test("revient à l’image précédente avec le bouton prev", async () => {
    const user = userEvent.setup();
    render(<Carousel pictures={pictures} />);

    const prevButtons = screen.getAllByRole("button", { name: "Image précédente" });
    await user.click(prevButtons[0]);

    expect(screen.getByAltText("Image 3")).toBeInTheDocument(); // boucle
  });

  test("clic miniature → change l’image affichée", async () => {
    const user = userEvent.setup();
    render(<Carousel pictures={pictures} />);

    const miniatures = screen.getAllByAltText("Miniature 2");
    await user.click(miniatures[0]);

    expect(screen.getByAltText("Image 2")).toBeInTheDocument();
  });

  test("affiche la pagination correcte", () => {
    render(<Carousel pictures={pictures} />);
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  test("affiche un placeholder si aucune image", () => {
    render(<Carousel pictures={[]} />);
    expect(screen.getByTestId("placeholder")).toBeInTheDocument();
  });
});

