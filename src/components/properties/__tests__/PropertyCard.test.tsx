import { render, screen, fireEvent } from "@testing-library/react";
import PropertyCard from "@/components/properties/PropertyCard";
import { FavoritesContext } from "@/context/FavoritesContext";
import { AuthContext } from "@/context/AuthContext";
import { PropertyBase } from "@/types/property";
import { AuthUser } from "@/types/auth";
import React from "react";

const mockUser: AuthUser = {
  id: "123",
  name: "Serge",
  email: "serge@test.com",
  role: "user",

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

function renderWithProviders(
  ui: React.ReactElement,
  {
    favorites = [] as string[],
    toggle = jest.fn(),
    user = mockUser,
  }: {
    favorites?: string[];
    toggle?: jest.Mock;
    user?: AuthUser;
  } = {}
) {
  return render(
    <AuthContext.Provider value={{ user, loading: false, error: null, login: jest.fn(), register: jest.fn(), logout: jest.fn(), refreshUser: jest.fn() }}>
      <FavoritesContext.Provider
        value={{
          favorites,
          properties: [],
          loading: false,
          error: null,
          isFavorite: (id: string) => favorites.includes(id),
          toggle,
          refreshFavorites: jest.fn(),
        }}
      >
        {ui}
      </FavoritesContext.Provider>
    </AuthContext.Provider>
  );
}

describe("PropertyCard – favoris", () => {
  test("le cœur devient rouge quand le logement est ajouté", () => {
    const toggle = jest.fn();

    renderWithProviders(<PropertyCard property={mockProperty} />, {
      favorites: [],
      toggle,
    });

    const button = screen.getByRole("button", { name: /ajouter aux favoris/i });

    expect(button.className).toContain("bg-gray-light");

    fireEvent.click(button);

    expect(toggle).toHaveBeenCalledWith("1");
  });

  test("le cœur est rouge si le logement est déjà en favoris", () => {
    renderWithProviders(<PropertyCard property={mockProperty} />, {
      favorites: ["1"],
    });

    const button = screen.getByRole("button", { name: /retirer des favoris/i });

    expect(button.className).toContain("bg-main-red");
  });
});
