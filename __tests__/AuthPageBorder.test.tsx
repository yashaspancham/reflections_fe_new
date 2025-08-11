import { render, screen } from "@testing-library/react";
import AuthPagelayout from "../components/AuthPageBorder";

jest.mock("next/image", () => ({
    __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("testing AuthPageLayout children", () => {
  it("render AuthPageLayout", () => {
    render(
      <AuthPagelayout>
        <div>hello</div>
      </AuthPagelayout>
    );
    expect(screen.getByText("hello")).toBeTruthy();
  });

  it("renders the image with the correct alt text", () => {
    render(
      <AuthPagelayout>
        <div>hello</div>
      </AuthPagelayout>
    );
    const img=screen.getByAltText("Image for authPage");
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe("/AuthPagesImg.png");
  });
});
