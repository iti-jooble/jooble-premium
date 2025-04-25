import getWindow from "@/utils/getWindow";
import { A4_PAGE_SIZES_IN_PX, TEMPLATES } from "./constants";

interface ITemplate {
	id: number;
	css: string;
	fonts: string;
}

interface IPdfData {
	css: string;
	html: string;
}

interface IPdfCreatorConfig {
	templateId: number;
}

export class PdfDataCreator {
	public constructor({ templateId }: IPdfCreatorConfig) {
		this.templateId = templateId || 1;
		this.templates = TEMPLATES;
	}

	private templateId: number;

	private templates: ITemplate[] = [];

	public createPdfData(): IPdfData {
		const template = this.templates.find((item) => item.id === this.templateId);

		if (!template) {
			throw new Error("Template not found");
		}

		const css = `${template.css}${template.fonts ? template.fonts : ""}`;

		const html = `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
          </head>
          <body style="margin: 0; padding: 0" class="pdf-body">
            ${this.createHtml()}
          </body>
          </html>`;

		return {
			css,
			html,
		};
	}

	private getAbsoluteHeight(element: HTMLDivElement | string): number {
		const window = getWindow();
		const domElement =
			typeof element === "string"
				? document.querySelector<HTMLDivElement>(element)
				: element;

		if (!domElement || !window) {
			throw new Error("Element not found");
		}

		const styles = window.getComputedStyle(domElement);
		const margin =
			parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);

		return Math.ceil(domElement.offsetHeight + margin);
	}

	private calculateCumulativeOffset(element: HTMLDivElement): {
		top: number;
		left: number;
	} {
		let currentElement: HTMLDivElement | null = element;
		let top = 0;
		let left = 0;

		do {
			top += currentElement.offsetTop || 0;
			left += currentElement.offsetLeft || 0;
			currentElement = currentElement.offsetParent as HTMLDivElement;
		} while (currentElement);

		return {
			top,
			left,
		};
	}

	private applyPageStyles(pages: HTMLDivElement[][]): void {
		pages.forEach((page, index, arr) => {
			if (!page.length) {
				return;
			}

			if (index > 0) {
				page[0].style.marginTop = `${A4_PAGE_SIZES_IN_PX.MARGIN}px`;
			}

			if (index < arr.length - 1) {
				const lastOnPage = page.pop();

				if (lastOnPage) {
					lastOnPage.classList.add("page_break");
				}
			}
		});
	}

	private stretchBlocks(tempDiv: HTMLDivElement, pagesCount: number): void {
		const stretchableBlocks = Array.from(
			tempDiv.querySelectorAll<HTMLDivElement>(".stretch"),
		);

		stretchableBlocks.forEach((block) => {
			block.style.height = `${A4_PAGE_SIZES_IN_PX.HEIGHT * pagesCount}px`;
		});
	}

	private applyTemplateStyles(tempDiv: HTMLDivElement): void {
		const template = tempDiv.querySelector<HTMLDivElement>("#template");

		if (!template) {
			throw new Error(
				"Can't create CV template. Element with id #template not found",
			);
		}

		template.style.height = "auto";
	}

	private createHtml(): string {
		const tempDiv = document.querySelector<HTMLDivElement>("#tempDiv");
		const previewInner =
			document.querySelector<HTMLDivElement>("#previewInner");

		if (!tempDiv || !previewInner) {
			throw new Error(
				"Can't create CV template. Element with id #tempDiv not found or html markup is broken",
			);
		}

		tempDiv.innerHTML = previewInner.innerHTML;

		this.applyTemplateStyles(tempDiv);

		const breakColumns = Array.from(
			tempDiv.querySelectorAll<HTMLDivElement>("#breakColumn"),
		);

		breakColumns.forEach((col) => {
			const pages: HTMLDivElement[][] = [[]];
			const restOfPages: HTMLDivElement[] = [];

			const breakBlocks = Array.from(
				col.querySelectorAll<HTMLDivElement>("#breakBlock"),
			);

			breakBlocks.forEach((block) => {
				if (
					this.calculateCumulativeOffset(block).top +
						this.getAbsoluteHeight(block) <
					A4_PAGE_SIZES_IN_PX.HEIGHT - A4_PAGE_SIZES_IN_PX.MARGIN
				) {
					pages[0].push(block);
				} else {
					restOfPages.push(block);
				}
			});

			if (restOfPages.length) {
				pages.push([]);
				let pageNumber = 1;
				let pageHeight = A4_PAGE_SIZES_IN_PX.MARGIN;

				restOfPages.forEach((block) => {
					const blockHeight = this.getAbsoluteHeight(block);

					if (
						pageHeight + blockHeight <
						A4_PAGE_SIZES_IN_PX.HEIGHT - A4_PAGE_SIZES_IN_PX.MARGIN
					) {
						pageHeight += blockHeight;
					} else {
						pageNumber += 1;
						pageHeight = blockHeight;
						pages.push([]);
					}

					pages[pageNumber].push(block);
				});
			}

			this.applyPageStyles(pages);

			this.stretchBlocks(tempDiv, pages.length);
		});

		const result = tempDiv.innerHTML;

		tempDiv.innerHTML = "";

		return result;
	}
}
