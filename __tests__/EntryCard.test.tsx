import { render, screen } from "@testing-library/react";
import EntryCard from "../components/EntryCard";
import { entryType } from "../utils/types";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("EntryCard Component", () => {
  const mockEntry: entryType = {
    title: "My First Entry",
    content: "This is the content of my entry.",
    createdAt: new Date("2025-01-01T10:00:00Z").toISOString(),
    updatedAt: new Date("2025-01-05T10:00:00Z").toISOString(),
  };


  it("renders entry data correctly",()=>{
    render(<EntryCard entry={mockEntry}/>);

    expect(screen.getByText("My First Entry")).toBeTruthy();
    expect(screen.getByText("This is the content of my entry.")).toBeTruthy();
    expect(screen.getByText("Created at: 1/1/2025")).toBeTruthy();
    expect(screen.getByText("Updated at: 1/5/2025")).toBeTruthy();

    const img=screen.getByAltText("coveriamgeForentry");
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe("/defaultImageForEntry.png");

  });



});
