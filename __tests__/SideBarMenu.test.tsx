import { render, screen } from "@testing-library/react";
import SideBarMenu from "@/components/SideBarMenu";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("SideBarMenu", () => {
  it("render SideBarMenu", () => {
    render(<SideBarMenu />);

    expect(screen.getByText("Profile")).toBeTruthy();
    expect(screen.getByText("Entries")).toBeTruthy();
    expect(screen.getByText("Media")).toBeTruthy();

    const imgProfile = screen.getByAltText("Profile Icon");
    expect(imgProfile).toBeTruthy();
    expect(imgProfile.getAttribute("src")).toBe("/icons/profileIcon.png");

    const imgEntries = screen.getByAltText("Entries Icon");
    expect(imgEntries).toBeTruthy();
    expect(imgEntries.getAttribute("src")).toBe("/icons/entryIcon.png");

    const imgMedia = screen.getByAltText("Media Icon");
    expect(imgMedia).toBeTruthy();
    expect(imgMedia.getAttribute("src")).toBe("/icons/mediaIcon.png");
  });
});
