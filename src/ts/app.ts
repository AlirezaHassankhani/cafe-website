import Cart from "./cart.js";
import Counter from "./counter.js";

import products from "./products.js";

const $ = document;

let productsWrapper = $.querySelector(".products-wrapper");
let cartWrapper = $.querySelector(".cart-wrapper");
let cartCount = $.getElementById("cart-count");
let overlay = $.querySelector(".overlay");

let cartConfirmeWrapper = $.querySelector("#cart-confirme-wrapper");
let cartTotalPrice = $.querySelector("#cart-total-price");
let cartNewBtn = $.querySelector("#cart-new-btn");

let cart = new Cart();
let counter = new Counter(1);

document.addEventListener("DOMContentLoaded", function () {
  setCartValue();
});

function getDisableBtnTemplate() {
  return `
                <div class="flex gap-2 w-full h-full items-center px-7" id="disable-btn">
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
                </div>
    `;
}

function getEnableBtnTemplate() {
  return `
                <button class="border-2 border-rose-50 rounded-full size-5 flex justify-center items-center cursor-pointer" id="decrease-btn">
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

                  <p class="text-sm font-redhatSemibold text-rose-50" id="counter">${counter.getCount()}</p>

                  <button class="border-2 border-rose-50 rounded-full size-5 flex justify-center items-center cursor-pointer" id="increase-btn">
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
  const { id, name, price, src, title } = product;

  productsWrapper?.insertAdjacentHTML(
    "beforeend",
    `
        <div data-id=${id}>
              <div>
                <div>
                    <img
                        src=${src.desktop}
                        alt=${name}
                        class="rounded-md object-cover w-full h-full border-red"
                    />
                </div>

                <div class="relative z-10 flex -mt-6 h-12 w-44 mx-auto rounded-4xl" data-is-selected="false">
                   ${getDisableBtnTemplate()}
                </div>
              </div>

              <div class="my-4 space-y-1">
                <p class="font-redhat text-rose-300 text-sm">${name}</p>
                <p class="font-redhatSemibold">${title}</p>
                <p class="font-redhatSemibold text-red">$${price}</p>
              </div>
            </div>
    `
  );
});

function disableAllBtn() {
  const btnWrapper: HTMLDivElement = $.querySelector(
    '[data-is-selected="true"]'
  ) as HTMLDivElement;

  if (btnWrapper) {
    btnWrapper.dataset.isSelected = "false";
    btnWrapper.innerHTML = getDisableBtnTemplate();

    btnWrapper.parentElement
      ?.querySelector("img")
      ?.classList.remove("border-2");
  }
}

function overlayClose() {
  overlay?.classList.add(...["invisible", "opacity-0"]);

  let opanElement = $.querySelector("[data-open='true']") as HTMLElement;
  if (opanElement) {
    opanElement.dataset.open = "false";
    opanElement.classList.add(...["invisible", "opacity-0"]);
  }
}

function overlayOpen() {
  overlay?.classList.remove(...["invisible", "opacity-0"]);
}

function confirmeBoxPopup() {
  overlayOpen();

  let confirmeBox = $.querySelector("#confirme-box") as HTMLElement;
  if (confirmeBox) {
    confirmeBox.dataset.open = "true";
    confirmeBox.classList.remove(...["invisible", "opacity-0"]);
  }

  if (cartConfirmeWrapper) cartConfirmeWrapper.textContent = "";
  if (cartTotalPrice)
    cartTotalPrice.textContent = "$" + String(cart.calcTotalPrice());
  cart.getCart().forEach((item) => {
    const { count, name, price, src, title } = item;

    cartConfirmeWrapper?.insertAdjacentHTML(
      "beforeend",
      `
    <li>
              <div
                class="flex justify-between items-center border-b border-rose-100 pb-5"
              >
                <div class="flex items-center gap-4">
                  <div>
                    <img
                      src=${src}
                      alt=""
                      class="size-12 object-cover rounded-md"
                    />
                  </div>

                  <div class="space-y-1.5">
                    <p class="font-redhatSemibold text-rose-900">${name}</p>

                    <div class="flex gap-4">
                      <p class="text-red font-redhatSemibold text-sm">
                        ${count}<span class="text-[11px]">&#10006;</span>
                      </p>

                      <p class="text-sm">
                        <span class="text-rose-400 font-redhat">@ $${price} </span
                        >&nbsp;
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <span class="text-rose-500 font-redhatSemibold text-sm"
                    >$${price * count}</span
                  >
                </div>
              </div>
            </li>
    `
    );
  });

  cart.setCart([]);
  setCartValue();
}

overlay?.addEventListener("click", overlayClose);

document.addEventListener("click", function (e) {
  const target = e.target;

  if (target instanceof Element) {
    const btnWrapper = target.closest("[data-is-selected]") as HTMLDivElement;
    const product = target.closest("[data-id]") as HTMLDivElement;
    const disableBtn = target.closest("#disable-btn") as HTMLDivElement;

    const increaseBtn = target.closest("#increase-btn") as HTMLDivElement;
    const decreaseBtn = target.closest("#decrease-btn") as HTMLDivElement;

    const deleteProductBtn = target.closest("#delete-product");

    if (btnWrapper) {
      if (disableBtn) {
        disableAllBtn();
        cart.addProductToCart(product.dataset.id || "");
        counter.setCount(cart.getProductCount(product.dataset.id || "") || 0);

        btnWrapper.dataset.isSelected = "true";
        btnWrapper.parentElement
          ?.querySelector("img")
          ?.classList.add("border-2");
      } else if (increaseBtn) {
        cart.addProductToCart(product.dataset.id || "");
        counter.increase();
      } else if (decreaseBtn) {
        cart.deleteProduct(product.dataset.id || "");
        counter.decrease();
      }

      setCartValue();
      btnWrapper.innerHTML = getEnableBtnTemplate();
    } else if (deleteProductBtn) {
      let item = deleteProductBtn.closest("[data-id]") as HTMLElement;
      cart.deleteFormCart(item.dataset.id || "");
      setCartValue();
      disableAllBtn();
    } else {
      disableAllBtn();
    }
  }
});

function setCartValue() {
  if(cartCount instanceof HTMLSpanElement) {
    cartCount.textContent = String(cart.totalProduct());
  }

  if (cartWrapper) {
    cartWrapper.innerHTML = '<ul class="space-y-4"></ul>';
  }

  if (cart.totalProduct()) {
    cart.getCart().forEach((product) => {
      const { title, price, count, id } = product;

      cartWrapper?.querySelector("ul")?.insertAdjacentHTML(
        "beforeend",
        `
            <li data-id=${id}>
                  <div
                    class="flex justify-between items-center border-b border-rose-100 pb-5"
                  >
                    <div class="space-y-1.5">
                      <p class="font-redhatSemibold text-rose-900">
                        ${title}
                      </p>

                      <div class="flex gap-4">
                        <p class="text-red font-redhatSemibold">
                          ${count}<span class="text-[11px]">&#10006;</span>
                        </p>

                        <p class="text-sm">
                          <span class="text-rose-400 font-redhat">@ $${price} </span
                          >&nbsp;<span class="text-rose-500 font-redhatSemibold"
                            >$${price * count}</span
                          >
                        </p>
                      </div>
                    </div>

                    <div
                      class="rounded-full border-2 border-[#CAAFA7] size-6 flex justify-center items-center cursor-pointer group transition-all hover:border-black"
                      id="delete-product"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        fill="none"
                        viewBox="0 0 10 10"
                      >
                        <path
                          class="fill-[#CAAFA7] transition-all group-hover:fill-black"
                          d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                        />
                      </svg>
                    </div>
                  </div>
                </li>`
      );
    });

    cartWrapper?.insertAdjacentHTML(
      "beforeend",
      `
        <div class="flex justify-between items-center">
                <p class="text-rose-900 text-sm font-redhat">Order Total</p>

                <p class="text-rose-900 font-redhatBold text-2xl">$${cart.calcTotalPrice()}</p>
              </div>

              <div
                class="bg-rose-50 flex justify-center items-center rounded-md py-4"
              >
                <div class="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    fill="none"
                    viewBox="0 0 21 20"
                  >
                    <path
                      fill="#1EA575"
                      d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"
                    />
                    <path
                      fill="#1EA575"
                      d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"
                    />
                  </svg>

                  <p class="text-rose-900 font-redhat">
                    This is a
                    <span class="text-rose-900 font-redhatSemibold"
                      >carbon-neutral</span
                    >
                    delivery
                  </p>
                </div>
              </div>

              <button
                class="bg-red py-4 text-white font-redhat cursor-pointer rounded-4xl"
                id="confirme-btn"
              >
                Confirm Order
              </button>`
    );
  } else {
    cartWrapper?.insertAdjacentHTML(
      "beforeend",
      `
        <div class="flex flex-col gap-6 justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="none" viewBox="0 0 128 128"><path fill="#260F08" d="M8.436 110.406c0 1.061 4.636 2.079 12.887 2.829 8.252.75 19.444 1.171 31.113 1.171 11.67 0 22.861-.421 31.113-1.171 8.251-.75 12.887-1.768 12.887-2.829 0-1.061-4.636-2.078-12.887-2.828-8.252-.75-19.443-1.172-31.113-1.172-11.67 0-22.861.422-31.113 1.172-8.251.75-12.887 1.767-12.887 2.828Z" opacity=".15"/><path fill="#87635A" d="m119.983 24.22-47.147 5.76 4.32 35.36 44.773-5.467a2.377 2.377 0 0 0 2.017-1.734c.083-.304.104-.62.063-.933l-4.026-32.986Z"/><path fill="#AD8A85" d="m74.561 44.142 47.147-5.754 1.435 11.778-47.142 5.758-1.44-11.782Z"/><path fill="#CAAFA7" d="M85.636 36.78a2.4 2.4 0 0 0-2.667-2.054 2.375 2.375 0 0 0-2.053 2.667l.293 2.347a3.574 3.574 0 0 1-7.066.88l-1.307-10.667 14.48-16.88c19.253-.693 34.133 3.6 35.013 10.8l1.28 10.533a1.172 1.172 0 0 1-1.333 1.307 4.696 4.696 0 0 1-3.787-4.08 2.378 2.378 0 1 0-4.72.587l.294 2.346a2.389 2.389 0 0 1-.484 1.755 2.387 2.387 0 0 1-1.583.899 2.383 2.383 0 0 1-1.755-.484 2.378 2.378 0 0 1-.898-1.583 2.371 2.371 0 0 0-1.716-2.008 2.374 2.374 0 0 0-2.511.817 2.374 2.374 0 0 0-.493 1.751l.293 2.373a4.753 4.753 0 0 1-7.652 4.317 4.755 4.755 0 0 1-1.788-3.17l-.427-3.547a2.346 2.346 0 0 0-2.666-2.053 2.4 2.4 0 0 0-2.08 2.667l.16 1.173a2.378 2.378 0 1 1-4.72.587l-.107-1.28Z"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".974" d="m81.076 28.966 34.187-4.16"/><path fill="#87635A" d="M7.45 51.793c-.96 8.48 16.746 17.44 39.466 19.947 22.72 2.506 42.08-2.16 43.04-10.667l-3.947 35.493c-.96 8.48-20.24 13.334-43.04 10.667S2.463 95.74 3.423 87.18l4.026-35.387Z"/><path fill="#AD8A85" d="M5.823 65.953c-.96 8.453 16.746 17.44 39.573 20.027 22.827 2.586 42.053-2.187 43.013-10.667L87.076 87.1c-.96 8.48-20.24 13.333-43.04 10.666C21.236 95.1 3.53 86.22 4.49 77.74l1.334-11.787Z"/><path fill="#CAAFA7" d="M60.836 42.78a119.963 119.963 0 0 0-10.347-1.627c-24-2.667-44.453 1.893-45.333 10.373l-2.133 18.88a3.556 3.556 0 1 0 7.066.8 3.574 3.574 0 1 1 7.094.8l-.8 7.094a5.93 5.93 0 1 0 11.786 1.333 3.556 3.556 0 0 1 7.067.8l-.267 2.347a3.573 3.573 0 0 0 7.094.826l.133-1.2a5.932 5.932 0 1 1 11.787 1.36l-.4 3.52a3.573 3.573 0 0 0 7.093.827l.933-8.267a1.174 1.174 0 0 1 1.307-.906 1.146 1.146 0 0 1 1.04 1.306 5.947 5.947 0 0 0 11.813 1.334l.534-4.72a3.556 3.556 0 0 1 7.066.8 3.573 3.573 0 0 0 7.094.826l1.786-15.546a2.373 2.373 0 0 0-2.08-2.667L44.143 55.74l16.693-12.96Z"/><path fill="#87635A" d="m59.156 57.66 1.68-14.88-16.827 13.173 15.147 1.707Z"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".974" d="M9.796 52.06c-.667 5.866 16.24 12.586 37.733 15.04 14.774 1.68 27.867.906 34.854-1.654"/></svg>
            <p class="font-redhatSemibold text-rose-400">Your added items will appear here</p>
        </div>
    `
    );
  }
}

cartWrapper?.addEventListener("click", function (e) {
  let target = e.target;

  if (target instanceof Element) {
    let confirmeBtn = target.closest("#confirme-btn");

    if (confirmeBtn) {
      confirmeBoxPopup();
    }
  }
});

cartNewBtn?.addEventListener("click", () => {
  overlayClose();
});
