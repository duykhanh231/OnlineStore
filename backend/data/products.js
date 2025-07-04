const products = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly. High-quality AAC audio offers immersive listening experience. Built-in microphone allows you to take calls while working.',
    brand: 'Apple',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
    reviews: [
      {
        name: 'Jane Doe',
        rating: 5,
        comment: 'Amazing sound quality and seamless pairing with my iPhone. Highly recommend!',
      },
      {
        name: 'Robert Smith',
        rating: 4,
        comment: 'Great product, but the fit is a little loose for my ears. Battery life is excellent.',
      },
    ],
    rating: 4.5,
    numReviews: 2,
  },
  {
    name: 'iPhone 13 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life.',
    brand: 'Apple',
    category: 'Electronics',
    price: 599.99,
    countInStock: 7,
    reviews: [
      {
        name: 'Emily Johnson',
        rating: 5,
        comment: 'The camera is absolutely stunning, especially in low light. The ProMotion display is buttery smooth.',
      },
    ],
    rating: 5,
    numReviews: 1,
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design.',
    brand: 'Cannon',
    category: 'Electronics',
    price: 929.99,
    countInStock: 5,
    reviews: [
      {
        name: 'Michael Brown',
        rating: 4,
        comment: 'A fantastic camera for enthusiasts. Great image quality and autofocus performance.',
      },
      {
        name: 'Sarah Davis',
        rating: 5,
        comment: 'My go-to camera for both photography and videography. The flip screen is a huge plus!',
      },
    ],
    rating: 4.5,
    numReviews: 2,
  },
  {
    name: 'Sony Playstation 5',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Electronics',
    price: 399.99,
    countInStock: 11,
    reviews: [],
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience.',
    brand: 'Logitech',
    category: 'Electronics',
    price: 49.99,
    countInStock: 7,
    reviews: [
      {
        name: 'Chris Wilson',
        rating: 5,
        comment: 'Comfortable, responsive, and the RGB lighting is a nice touch. Great value for the price.',
      },
    ],
    rating: 5,
    numReviews: 1,
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space.',
    brand: 'Amazon',
    category: 'Electronics',
    price: 29.99,
    countInStock: 0,
    reviews: [],
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Samsung 4K Smart TV',
    image: '/images/samsung-tv.jpg',
    description:
      'Experience your favorite movies and shows on a vibrant, stunning 4K UHD screen, using the Universal Guide to surf smoothly and select content.',
    brand: 'Samsung',
    category: 'Electronics',
    price: 749.99,
    countInStock: 8,
    reviews: [
      {
        name: 'David Martinez',
        rating: 5,
        comment: 'Incredible picture quality. The smart features are fast and easy to use.',
      },
    ],
    rating: 5,
    numReviews: 1,
  },
  {
    name: 'Dell XPS 15 Laptop',
    image: '/images/dell-xps.jpg',
    description:
      'The XPS 15 is the perfect balance of power and portability with a stunning display, 11th Gen Intel Core processors and NVIDIA GeForce RTX graphics.',
    brand: 'Dell',
    category: 'Electronics',
    price: 1899.99,
    countInStock: 4,
    reviews: [],
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Bose QuietComfort 45 Headphones',
    image: '/images/bose-qc45.jpg',
    description:
      'The perfect balance of quiet, comfort, and sound. Bose QuietComfort 45 headphones feature world-class noise cancelling and a proprietary acoustic structure.',
    brand: 'Bose',
    category: 'Electronics',
    price: 329.00,
    countInStock: 15,
    reviews: [
       {
        name: 'Jessica Garcia',
        rating: 5,
        comment: 'The noise cancellation is mind-blowing. Perfect for travel and noisy environments.',
      },
    ],
    rating: 5,
    numReviews: 1,
  },
  {
    name: 'GoPro HERO10 Black',
    image: '/images/gopro.jpg',
    description:
      'All-out speed and ultimate ease, now in the most powerful GoPro ever. Powered by the revolutionary GP2 processor, HERO10 Black shoots 5.3K video.',
    brand: 'GoPro',
    category: 'Electronics',
    price: 449.99,
    countInStock: 9,
    reviews: [],
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Nintendo Switch - OLED Model',
    image: '/images/switch-oled.jpg',
    description:
      'Meet the newest member of the Nintendo Switch family! The new system features a vibrant 7-inch OLED screen, a wide adjustable stand, and 64 GB of internal storage.',
    brand: 'Nintendo',
    category: 'Electronics',
    price: 349.99,
    countInStock: 12,
    reviews: [
      {
        name: 'James Rodriguez',
        rating: 5,
        comment: 'The OLED screen is a huge upgrade. Colors are so much more vibrant!',
      },
    ],
    rating: 5,
    numReviews: 1,
  },
  {
    name: 'Anker PowerCore 10000',
    image: '/images/anker-powerbank.jpg',
    description:
      'One of the smallest and lightest 10,000mAh portable chargers. Provides almost three-and-a-half iPhone 8 charges or two-and-a-half Galaxy S8 charges.',
    brand: 'Anker',
    category: 'Electronics',
    price: 25.99,
    countInStock: 30,
    reviews: [],
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Razer BlackWidow V3 Keyboard',
    image: '/images/razer-keyboard.jpg',
    description:
      'The name that started it all returns to reassert its dominance. Feel the difference with the Razer BlackWidow V3—backed by a legacy as the first and most iconic mechanical gaming keyboard.',
    brand: 'Razer',
    category: 'Electronics',
    price: 139.99,
    countInStock: 11,
    reviews: [],
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'WD 2TB Elements Portable HDD',
    image: '/images/wd-hdd.jpg',
    description:
      'WD Elements portable hard drives with USB 3.0 offer reliable, high-capacity storage to go, fast data transfer rates and universal connectivity with USB 2.0 and USB 3.0 devices.',
    brand: 'Western Digital',
    category: 'Electronics',
    price: 59.99,
    countInStock: 25,
    reviews: [],
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Apple Watch Series 7',
    image: '/images/apple-watch.jpg',
    description:
      'The largest, most advanced Always-on Retina display yet makes everything you do with your Apple Watch Series 7 bigger and better.',
    brand: 'Apple',
    category: 'Electronics',
    price: 399.00,
    countInStock: 18,
    reviews: [],
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Sonos One (Gen 2) Speaker',
    image: '/images/sonos-one.jpg',
    description:
      'The powerful smart speaker with voice control built-in. Get rich, room-filling sound with Sonos One, and control it with your voice, the Sonos app, Apple AirPlay 2, and more.',
    brand: 'Sonos',
    category: 'Electronics',
    price: 219.00,
    countInStock: 14,
    reviews: [],
    rating: 0,
    numReviews: 0,
  },
];

export default products;