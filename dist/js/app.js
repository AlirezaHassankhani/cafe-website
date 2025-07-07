import products from "./products.js";
const $ = document;
let container = $.getElementById("container");
function getDisableBtnTemplate() {
    return `
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    fill="none"
                    viewBox="0 0 21 20"
                  >
                    <g fill="#C73B0F" clip-path="url(#a)">
                      <path
                        d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"
                      />
                      <path
                        d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"
                      />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M.333 0h20v20h-20z" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p class="font-redhatSemibold">Add to Cart</p>
    `;
}
function getEnableBtnTemplate() {
    return `
                <button class="border-2 border-rose-50 rounded-full size-5 flex justify-center items-center cursor-pointer" id="decrease">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="2"
                      fill="none"
                      viewBox="0 0 10 2"
                    >
                      <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
                    </svg>
                  </button>

                  <p class="text-sm font-redhatSemibold text-rose-50" id="counter">1</p>

                  <button class="border-2 border-rose-50 rounded-full size-5 flex justify-center items-center cursor-pointer" id="increase">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="none"
                      viewBox="0 0 10 10"
                    >
                      <path
                        fill="#fff"
                        d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                      />
                    </svg>
                  </button>
        `;
}
products.forEach((product) => {
    container?.insertAdjacentHTML("beforeend", `
        <div>
              <div>
                <div>
                    <img
                        src=${product.src.desktop}
                        alt=${product.name}
                        class="rounded-md object-cover w-full h-full border-red"
                    />
                </div>

                <div class="relative z-10 flex -mt-6 h-12 w-44 mx-auto rounded-4xl cursor-pointer" id="add-btn-wrapper" data-is-selected="false">
                   ${getDisableBtnTemplate()}
                </div>
              </div>

              <div class="my-4 space-y-1">
                <p class="font-redhat text-rose-300 text-sm">${product.name}</p>
                <p class="font-redhatSemibold">${product.title}</p>
                <p class="font-redhatSemibold text-red">$${product.price}</p>
              </div>
            </div>
    `);
});
function disableAllBtn() {
    const btnWrapper = $.querySelector('[data-is-selected="true"]');
    if (btnWrapper) {
        btnWrapper.dataset.isSelected = "false";
        btnWrapper.textContent = "";
        btnWrapper.insertAdjacentHTML("beforeend", getDisableBtnTemplate());
        const imgWrapper = btnWrapper.previousElementSibling;
        imgWrapper?.querySelector("img")?.classList.remove("border-2");
    }
}
container?.addEventListener("click", function (e) {
    const target = e.target;
    if (target instanceof Element) {
        const btnWrapper = target.closest("#add-btn-wrapper");
        if (btnWrapper) {
            disableAllBtn();
            btnWrapper.dataset.isSelected = "true";
            btnWrapper.textContent = "";
            btnWrapper.insertAdjacentHTML("beforeend", getEnableBtnTemplate());
            const imgWrapper = btnWrapper.previousElementSibling;
            imgWrapper?.querySelector("img")?.classList.add("border-2");
        }
    }
});
