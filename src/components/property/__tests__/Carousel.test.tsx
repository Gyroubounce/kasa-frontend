import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Carousel from "../Carousel";

// Utilitaire pour mocker un TouchEvent compatible TypeScript sans any
function createTouchEvent(type: string, clientX: number) {
  const touch = {
    identifier: 1,
    clientX,
    clientY: 0,
    force: 0,
    pageX: clientX,
    pageY: 0,
    radiusX: 0,
    radiusY: 0,
    rotationAngle: 0,
  } as unknown as Touch;

  return new TouchEvent(type, {
    touches: [touch],
    changedTouches: [touch],
  });
}

const pictures = ["/img/1.jpg", "/img/2.jpg", "/img/3.jpg"];

describe("Carousel", () => {
  // -------------------------------------------------------
  // RENDU INITIAL
  // -------------------------------------------------------
  test("affiche la première image au chargement", () => {
    render(<Carousel pictures={pictures} />);
    expect(screen.getByAltText("Image 1 sur 3")).toBeInTheDocument();
  });

  // -------------------------------------------------------
  // FLÈCHES (DESKTOP)
  // -------------------------------------------------------
  test("passe à l’image suivante avec le bouton next", async () => {
    const user = userEvent.setup();
    render(<Carousel pictures={pictures} />);

    const nextButtons = screen.getAllByRole("button", { name: "Image suivante" });
    await user.click(nextButtons[0]);

    expect(screen.getByAltText("Image 2 sur 3")).toBeInTheDocument();
  });

  test("revient à l’image précédente avec le bouton prev (boucle)", async () => {
    const user = userEvent.setup();
    render(<Carousel pictures={pictures} />);

    const prevButtons = screen.getAllByRole("button", { name: "Image précédente" });
    await user.click(prevButtons[0]);

    expect(screen.getByAltText("Image 3 sur 3")).toBeInTheDocument();
  });

  test("n’affiche pas les flèches si une seule image", () => {
    render(<Carousel pictures={["/img/1.jpg"]} />);

    expect(screen.queryByRole("button", { name: "Image suivante" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Image précédente" })).not.toBeInTheDocument();
  });

  // -------------------------------------------------------
  // MINIATURES
  // -------------------------------------------------------
  test("clic miniature → change l’image affichée", async () => {
    const user = userEvent.setup();
    render(<Carousel pictures={pictures} />);

    const miniature = screen.getAllByAltText("Miniature 2")[0];
    await user.click(miniature);

    expect(screen.getByAltText("Image 2 sur 3")).toBeInTheDocument();
  });

  test("miniatures ont un aria-label correct", () => {
    render(<Carousel pictures={pictures} />);

    const buttons = screen.getAllByRole("button", { name: "Afficher l’image 1" });
    expect(buttons.length).toBeGreaterThan(0);
  });

  // -------------------------------------------------------
  // CLAVIER (A11Y)
  // -------------------------------------------------------
  test("navigation clavier → flèche droite", async () => {
    const user = userEvent.setup();
    render(<Carousel pictures={pictures} />);

    const region = screen.getByRole("region", { name: "Carousel d’images" });
    region.focus();

    await user.keyboard("{ArrowRight}");

    expect(screen.getByAltText("Image 2 sur 3")).toBeInTheDocument();
  });

  test("navigation clavier → flèche gauche (boucle)", async () => {
    const user = userEvent.setup();
    render(<Carousel pictures={pictures} />);

    const region = screen.getByRole("region", { name: "Carousel d’images" });
    region.focus();

    await user.keyboard("{ArrowLeft}");

    expect(screen.getByAltText("Image 3 sur 3")).toBeInTheDocument();
  });

  test("le carousel possède un aria-label correct", () => {
    render(<Carousel pictures={pictures} />);
    expect(screen.getByRole("region", { name: "Carousel d’images" })).toBeInTheDocument();
  });

 
  // -------------------------------------------------------
  // PAGINATION
  // -------------------------------------------------------
  test("affiche la pagination correcte", () => {
    render(<Carousel pictures={pictures} />);
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  // -------------------------------------------------------
  // FALLBACK
  // -------------------------------------------------------
  test("affiche un placeholder si aucune image", () => {
    render(<Carousel pictures={[]} />);
    expect(screen.getByTestId("placeholder")).toBeInTheDocument();
  });
});
