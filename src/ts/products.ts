interface ISrc {
  mobile: string;
  tablet: string;
  desktop: string;
  thumbnail: string;
}

interface IProduct {
  id: string;
  name: string;
  title: string;
  src: ISrc;
  price: number;
}

let products: IProduct[] = [
  {
    id: crypto.randomUUID(),
    name: "brownie",
    title: "salted caramel brownie",
    src: {
      mobile: "./public/images/image-brownie-mobile.jpg",
      tablet: "./public/images/image-brownie-tablet.jpg",
      desktop: "./public/images/image-brownie-desktop.jpg",
      thumbnail: "./public/images/image-brownie-thumbnail.jpg",
    },
    price: 5.5,
  },
  {
    id: crypto.randomUUID(),
    name: "baklava",
    title: "pistachio baklava",
    src: {
      mobile: "./public/images/image-baklava-mobile.jpg",
      tablet: "./public/images/image-baklava-tablet.jpg",
      desktop: "./public/images/image-baklava-desktop.jpg",
      thumbnail: "./public/images/image-baklava-thumbnail.jpg",
    },
    price: 4.0,
  },
  {
    id: crypto.randomUUID(),
    name: "cake",
    title: "red velvet cake",
    src: {
      mobile: "./public/images/image-cake-mobile.jpg",
      tablet: "./public/images/image-cake-tablet.jpg",
      desktop: "./public/images/image-cake-desktop.jpg",
      thumbnail: "./public/images/image-cake-thumbnail.jpg",
    },
    price: 4.5,
  },
  {
    id: crypto.randomUUID(),
    name: "creme brulee",
    title: "vanilla bean creme brulee",
    src: {
      mobile: "./public/images/image-creme-brulee-mobile.jpg",
      tablet: "./public/images/image-creme-brulee-tablet.jpg",
      desktop: "./public/images/image-creme-brulee-desktop.jpg",
      thumbnail: "./public/images/image-creme-brulee-thumbnail.jpg",
    },
    price: 7.0,
  },
  {
    id: crypto.randomUUID(),
    name: "macaron",
    title: "macaron mix of five",
    src: {
      mobile: "./public/images/image-macaron-mobile.jpg",
      tablet: "./public/images/image-macaron-tablet.jpg",
      desktop: "./public/images/image-macaron-desktop.jpg",
      thumbnail: "./public/images/image-macaron-thumbnail.jpg",
    },
    price: 8.0,
  },
  {
    id: crypto.randomUUID(),
    name: "pie",
    title: "lemon meringue pie",
    src: {
      mobile: "./public/images/image-meringue-mobile.jpg",
      tablet: "./public/images/image-meringue-tablet.jpg",
      desktop: "./public/images/image-meringue-desktop.jpg",
      thumbnail: "./public/images/image-meringue-thumbnail.jpg",
    },
    price: 5.0,
  },
  {
    id: crypto.randomUUID(),
    name: "panna cotta",
    title: "vanilla panna cotta",
    src: {
      mobile: "./public/images/image-panna-cotta-mobile.jpg",
      tablet: "./public/images/image-panna-cotta-tablet.jpg",
      desktop: "./public/images/image-panna-cotta-desktop.jpg",
      thumbnail: "./public/images/image-panna-cotta-thumbnail.jpg",
    },
    price: 6.5,
  },
  {
    id: crypto.randomUUID(),
    name: "tiramisu",
    title: "classic tiramisu",
    src: {
      mobile: "./public/images/image-tiramisu-mobile.jpg",
      tablet: "./public/images/image-tiramisu-tablet.jpg",
      desktop: "./public/images/image-tiramisu-desktop.jpg",
      thumbnail: "./public/images/image-tiramisu-thumbnail.jpg",
    },
    price: 5.5,
  },
  {
    id: crypto.randomUUID(),
    name: "waffle",
    title: "waffle with berries",
    src: {
      mobile: "./public/images/image-waffle-mobile.jpg",
      tablet: "./public/images/image-waffle-tablet.jpg",
      desktop: "./public/images/image-waffle-desktop.jpg",
      thumbnail: "./public/images/image-waffle-thumbnail.jpg",
    },
    price: 6.5,
  },
];

export default products;
