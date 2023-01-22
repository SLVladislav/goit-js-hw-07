import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryContainer = document.querySelector(".gallery");
const galleryItemsContainer = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryItemsContainer);
galleryContainer.addEventListener("click", onGalleryContainer);

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

function onGalleryContainer(e) {
  e.preventDefault();

  const isItemImage = e.target.classList.contains("gallery__image");
  if (!isItemImage) {
    return;
  }
  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}" width="1280" height="auto"/>`,
    {
      onShow: (instance) => {
        galleryContainer.addEventListener("keydown", inCloseImage);
      },

      onClose: (instance) => {
        galleryContainer.removeEventListener("keydown", inCloseImage);
      },
    }
  );
  instance.show();

  galleryContainer.addEventListener("keydown", inCloseImage);

  function inCloseImage(event) {
    console.log(event.code);
    if (event.code === "Escape") {
      instance.close();
    }
  }
}
