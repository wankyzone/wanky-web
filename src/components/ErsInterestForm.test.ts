import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ERS_FORM_CONFIGURATION } from "../lib/product-interest/ers-config";
import ErsInterestForm from "./ErsInterestForm";

describe("ErsInterestForm", () => {
  it("renders configured branch choices, contact fields, required question, and consent", () => {
    const markup = renderToStaticMarkup(
      createElement(ErsInterestForm, { enabled: true }),
    );

    expect(markup).toContain('id="ers-name"');
    expect(markup).toContain('id="ers-email"');
    expect(markup).toContain('id="ers-interest-type"');
    expect(markup).toContain('id="ers-answer-errandDetails"');
    expect(markup).toContain('required=""');
    expect(markup).toContain("Fields marked");
    expect(markup).toContain(ERS_FORM_CONFIGURATION.consentText);
    expect(markup).toContain("This does not sign me up for the Wanky newsletter.");
    expect(markup).toContain('aria-live="polite"');

    for (const branch of Object.values(ERS_FORM_CONFIGURATION.branches)) {
      expect(markup).toContain(branch.label);
    }
  });

  it("uses proper labels and optional indicators for configured optional questions", () => {
    const markup = renderToStaticMarkup(
      createElement(ErsInterestForm, { enabled: true }),
    );

    expect(markup).toContain('<label for="ers-name"');
    expect(markup).toContain('<label for="ers-email"');
    expect(markup).toContain("Where might you need errands?");
    expect(markup).toContain("(optional)");
    expect(markup).toContain("0/500");
  });

  it("does not render an operational form when the server disables it", () => {
    const markup = renderToStaticMarkup(
      createElement(ErsInterestForm, { enabled: false }),
    );

    expect(markup).toContain("The ERS interest form is currently unavailable.");
    expect(markup).not.toContain("<form");
    expect(markup).not.toContain('id="ers-name"');
  });
});
