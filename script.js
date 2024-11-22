// script.js

const flowerContainer = document.getElementById('flower-container');

// Array of flower data
const flowers = Array.from({ length: 30 }, (_, i) => ({
  name: `Flower ${i + 1}`, // You can customize the flower names
  description: `This is a beautiful Flower ${i + 1} perfect for any occasion.`,
  images: [
    `images/red${i + 1}-1.jpg`, // Ensure these files exist
    `images/download${i + 1}-2.jpg`,
    `images/rose${i + 1}-3.jpg`
  ]
}));

// Generate cards
flowers.forEach(flower => {
  const card = document.createElement('div');
  card.className = "bg-white shadow-md rounded-lg overflow-hidden";

  // Swipeable Images
  const imagesHtml = flower.images
    .map(image => `<img src="${image}" alt="${flower.name}" class="w-full swipe-item flex-shrink-0">`)
    .join('');
  const swipeContainer = `
    <div class="relative group">
      <div class="flex overflow-x-hidden swipe-container transition-transform duration-300" style="width: ${flower.images.length * 100}%;">
        ${imagesHtml}
      </div>
      <button class="absolute left-2 top-1/2 -translate-y-1/2 bg-pink-500 text-white px-3 py-2 rounded-full prev hidden group-hover:block">←</button>
      <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500 text-white px-3 py-2 rounded-full next hidden group-hover:block">→</button>
    </div>
  `;

  // Card Content
  card.innerHTML = `
    ${swipeContainer}
    <div class="p-4">
      <h2 class="text-xl font-bold">${flower.name}</h2>
      <p class="text-gray-700 mt-2">${flower.description}</p>
      <button class="mt-4 bg-green-500 text-white px-4 py-2 rounded-md w-full order-btn"
        data-flower="${encodeURIComponent(flower.name)}">Order Now</button>
    </div>
  `;

  flowerContainer.appendChild(card);
});

// Swipe functionality
document.querySelectorAll('.group').forEach((group) => {
  const swipeContainer = group.querySelector('.swipe-container');
  const swipeItems = swipeContainer.querySelectorAll('.swipe-item');
  const prevButton = group.querySelector('.prev');
  const nextButton = group.querySelector('.next');
  let currentIndex = 0;

  const totalImages = swipeItems.length;

  const updateSwipe = () => {
    swipeContainer.style.transform = `translateX(-${currentIndex * (100 / totalImages)}%)`;
  };

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateSwipe();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSwipe();
  });

  // Optional: Swipe with touch events
  let startX = 0;
  let isSwiping = false;

  swipeContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  swipeContainer.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    if (diffX > 50) {
      // Swipe Right
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateSwipe();
      isSwiping = false;
    } else if (diffX < -50) {
      // Swipe Left
      currentIndex = (currentIndex + 1) % totalImages;
      updateSwipe();
      isSwiping = false;
    }
  });

  swipeContainer.addEventListener('touchend', () => {
    isSwiping = false;
  });

  updateSwipe();
});

// WhatsApp "Order Now" Button
document.querySelectorAll('.order-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const flowerName = button.getAttribute('data-flower');
    const whatsappNumber = '1234567890'; // Replace with your WhatsApp number
    const message = `Hello, I want to order the ${flowerName}.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  });
});
