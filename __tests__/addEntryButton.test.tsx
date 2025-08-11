import { render, screen, fireEvent } from "@testing-library/react";
import AddEntryButton from "@/components/addEntryButton";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("testing AddEntryButton", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("renders the button with correct styles", () => {
    render(<AddEntryButton />);
   const button = screen.getByRole("button", { name: "+" });
    expect(button).toBeTruthy();
  });

  it("navigates to /entry when clicked", () => {
    render(<AddEntryButton />);
    fireEvent.click(screen.getByText("+"));
    expect(pushMock).toHaveBeenCalledWith("/entry");
  });
});
