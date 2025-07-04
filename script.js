// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.innerHTML = nav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }

  // Load menu items if on menu page
  if (document.getElementById('menuContainer')) {
    loadMenuItems();
    enhancePhoneNumbers();
  }
})


const menuItems = [
    {
        name: "Jollof Rice",
        image: "pictures/Full_bowl_jollof.jpeg",
        category: "Rice Dishes",
        sizes: [
          { label: "Cooler", price: 400 },
          { label: "Big Foil Tray", price: 180 },
          { label: "Small Foil Tray", price: 120 },
          { label: "Plate", price: 25 }
        ]
    },
    {
        name: "Fried Rice",
        image: "pictures/fried_rice.jpg",
        category: "Rice Dishes",
        sizes: [
          { label: "Cooler", price: 450 },
          { label: "Big Foil Tray", price: 220 },
          { label: "Small Foil Tray", price: 150 },
          { label: "Plate", price: 30 }
        ]
    },
    {
        name: "Vegetable Soup (5 proteins)",
        image: "pictures/Efo_riro.jpeg",
        category: "Soups",
        sizes: [
          { label: "6.4L", price: 180 },
          { label: "3.5L", price: 120 },
          { label: "2.4L", price: 90 },
          { label: "2.2L", price: 70 }
        ]
    },
    {
        name: "Ayamase Stew",
        price: 250.00,
        category: "Stews",
        image: "pictures/Ayamase.jpeg"
    },
    {
        name: "Ata Agonyin",
        price: 199.99,
        category: "Stews",
        image: "pictures/Ata_agonyin.jpeg"
    },
    {
        name: "Assorted Stew (with 4 proteins)",
        image: "pictures/Assorted_Stew.jpg",
        category: "Stews",
        sizes: [
          { label: "6.4L", price: 200 },
          { label: "3.5L", price: 150 },
          { label: "2.4L", price: 90 },
          { label: "2.2L", price: 75 }
        ]
    },
    {
        name: "Full Bowl of Ofada Rice",
        price: 250.00,
        category: "Rice Dishes",
        image: "pictures/Full_bowl_ofada.jpeg"
    },
    {
        name: "Foil Tray of Chicken",
        price: 180.00,
        category: "Proteins",
        image: "pictures/chicken.jpg"
    },
    {
        name: "Foil Tray of Turkey",
        price: 180.00,
        category: "Proteins",
        image: "pictures/turkey.jpg"
    },
    {
        name: "Foil Tray of Fish",
        price: 200.00,
        category: "Proteins",
        image: "pictures/fish.jpg"
    },
    {
        name: "Beans",
        image: "pictures/Beans.jpeg",
        category: "Legumes",
        sizes: [
          { label: "Foil Tray", price: 200 },
          { label: "Small Tray", price: 150 }
        ]
    },
    {
        name: "Ogbono (with 4 proteins)",
        image: "pictures/ogbono.jpg",
        category: "Soups",
        sizes: [
          { label: "6.4L", price: 170 },
          { label: "3.5L", price: 100 },
          { label: "2.4L", price: 75 },
          { label: "2.2L", price: 60 }
        ]
    },
    {
        name: "Moi Moi",
        image: "pictures/moimoi.jpeg",
        category: "Legumes",
        sizes: [{price: 5, label: "per wrap"}]
    }
];
// Enhanced menu loading with filtering
function loadMenuItems() {
  const menuContainer = document.getElementById('menuContainer');
  menuContainer.innerHTML = '';

  // Define category order
  const categoryOrder = [
    "Rice Dishes",
    "Soups",
    "Stews",
    "Proteins",
    "Legumes"
  ];

  // Get active filter
  const activeFilter = document.querySelector('.filter-btn.active')?.dataset.category || 'all';

  // Filter categories if needed
  const categoriesToShow = activeFilter === 'all' 
    ? [...new Set(menuItems.map(item => item.category))]
    : [activeFilter];

  // Sort categories
  const categories = categoriesToShow
    .sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b));

  categories.forEach(category => {
    const section = document.createElement('section');
    section.className = 'menu-section';
    section.dataset.category = category;
    
    const header = document.createElement('h2');
    header.className = 'category-header';
    header.textContent = category;
    section.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'menu-grid';

    menuItems
      .filter(item => item.category === category)
      .forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        
        // Add popular badge (optional)
        if (index % 4 === 0) {
          menuItem.innerHTML = '<span class="popular-badge">Popular</span>';
        }

        let pricesHTML = '';
        if (item.sizes) {
          pricesHTML = `
            <ul class="size-options">
              ${item.sizes.map(size => 
                `<li>
                  <span>${size.label}</span>
                  <span>$${size.price.toFixed(2)}</span>
                </li>`
              ).join('')}
            </ul>
          `;
        } else if (item.price) {
          pricesHTML = `<p class="price">$${item.price.toFixed(2)}</p>`;
        }

        // Updated menu item HTML without add-to-cart button
        menuItem.innerHTML += `
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <div class="menu-details">
            <h3>${item.name}</h3>
            ${pricesHTML}
          </div>
        `;

        grid.appendChild(menuItem);
      });

    section.appendChild(grid);
    menuContainer.appendChild(section);
  });
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    loadMenuItems();
  });
});

// Phone number enhancement
function enhancePhoneNumbers() {
  document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    // Skip if already enhanced
    if (phoneLink.querySelector('i')) return;
    
    phoneLink.innerHTML = `<i class="fas fa-phone"></i> ${phoneLink.textContent}`;
    phoneLink.classList.add('phone-link');
  });
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('visible', window.scrollY > 300);
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a'); // Select all nav links

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.innerHTML = nav.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close menu when any link is clicked (including Contact)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
    nav.classList.remove('active');
  }
});