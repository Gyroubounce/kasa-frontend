import { render, screen } from "@testing-library/react";
import FavorisPage from "@/app/favorites/page";
import { FavoritesContext } from "@/context/FavoritesContext";
import { AuthContext } from "@/context/AuthContext";
import { PropertyBase } from "@/types/property";

const mockUser = {
  id: "123",
  name: "Serge",
  email: "serge@test.com",
  role: "user",
  token: "fake-token",
};

const mockAuthValue = {
  user: mockUser,
  loading: false,
  error: null,
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
  refreshUser: jest.fn(),
};

const mockProperty: PropertyBase = {
  id: "1",
  slug: "super-logement",
  title: "Super logement",
  location: "Paris",
  price_per_night: 120,
  cover: "/img/1.jpg",
  rating_avg: 4.5,
  ratings_count: 12,
  host: {
    id: "host1",
    name: "John Doe",
    picture: "/img/host.jpg",
  },
};

function renderPage({
  user = mockUser,
  properties = [] as PropertyBase[],
} = {}) {
  return render(
    <AuthContext.Provider value={{ ...mockAuthValue, user }}>
      <FavoritesContext.Provider
        value={{
          favorites: properties.map((p) => String(p.id)),
          properties,
          loading: false,
          error: null,
          isFavorite: (id: string) =>
            properties.some((p) => String(p.id) === id),
          toggle: jest.fn(),
          refreshFavorites: jest.fn(),
        }}
      >
        <FavorisPage />
      </FavoritesContext.Provider>
    </AuthContext.Provider>
  );
}

describe("FavorisPage", () => {
  test("affiche un logement favori", () => {
    renderPage({ properties: [mockProperty] });

    expect(
      screen.getByRole("link", { name: /voir le logement : super logement/i })
    ).toBeInTheDocument();
  });

  test("affiche un message si aucun favori", () => {
    renderPage({ properties: [] });

    expect(
      screen.getByText(/vous n’avez encore aucun favori/i)
    ).toBeInTheDocument();
  });
});
