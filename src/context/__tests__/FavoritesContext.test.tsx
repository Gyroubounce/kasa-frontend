import { renderHook, act } from "@testing-library/react";
import { FavoritesProvider, useFavoritesContext } from "@/context/FavoritesContext";
import { AuthContext } from "@/context/AuthContext";
import { apiFetch } from "@/lib/utils/fetcher";
import { ReactNode } from "react";
import { PropertyBase } from "@/types/property";

jest.mock("@/lib/utils/fetcher", () => ({
  apiFetch: jest.fn(),
}));

// Typage strict du mock
const mockedApiFetch = apiFetch as jest.MockedFunction<typeof apiFetch>;

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

// Mock PropertyBase strict
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

function wrapper({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={mockAuthValue}>
      <FavoritesProvider>{children}</FavoritesProvider>
    </AuthContext.Provider>
  );
}

describe("FavoritesContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("isFavorite retourne true si l'id est dans favorites", async () => {
    mockedApiFetch.mockResolvedValueOnce([mockProperty]);

    const { result } = renderHook(() => useFavoritesContext(), { wrapper });

    await act(async () => {});

    expect(result.current.isFavorite("1")).toBe(true);
  });

  test("toggle ajoute un favori", async () => {
    mockedApiFetch
      .mockResolvedValueOnce([])               // initial fetch
      .mockResolvedValueOnce({})               // POST
      .mockResolvedValueOnce([mockProperty]);  // refresh

    const { result } = renderHook(() => useFavoritesContext(), { wrapper });

    await act(async () => {});

    await act(async () => {
      await result.current.toggle("1");
    });

    expect(result.current.favorites).toContain("1");
  });

  test("toggle retire un favori", async () => {
    mockedApiFetch
      .mockResolvedValueOnce([mockProperty])  // initial fetch
      .mockResolvedValueOnce({})              // DELETE
      .mockResolvedValueOnce([]);             // refresh

    const { result } = renderHook(() => useFavoritesContext(), { wrapper });

    await act(async () => {});

    await act(async () => {
      await result.current.toggle("1");
    });

    expect(result.current.favorites).not.toContain("1");
  });
});
