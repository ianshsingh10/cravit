const underBellyData = {
  name: "Under Belly",
  cuisine: "Multi-Cuisine, Fast Food, Shakes",
  rating: 4.2,
  image: "https://scontent.fnag6-2.fna.fbcdn.net/v/t1.6435-9/50628524_536152440240563_8304246690458632192_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=0DthcslLjdgQ7kNvwFI_gdl&_nc_oc=AdkHZO4OPXY2enmcsSQzu8Yc-GJhtumxJig_LctnYXx3hKNxiQtzdo6vI1yOMDf94sQ&_nc_zt=23&_nc_ht=scontent.fnag6-2.fna&_nc_gid=VoO1qI_mpVwYRgOCcN7c_w&oh=00_AfWQCKC1X7i3hhI2Q8F73gXlWN0Ee7mcpm6Ifa6bVkri0A&oe=68C1BE9E",
  menu: {
    "South Indian": [
        { id: 101, name: "Masala Dosa", price: 130, inStock:true, image: "https://placehold.co/800x600/fecaca/991b1b?text=Dosa" },
        { id: 102, name: "Ghee Masala Dosa", price: 150, image: "https://placehold.co/800x600/fecaca/991b1b?text=Dosa" },
        { id: 103, name: "Butter Dosa", price: 130, image: "https://placehold.co/800x600/fef08a/854d0e?text=Dosa" },
        { id: 104, name: "Ghee Dosa", price: 150, image: "https://placehold.co/800x600/fef08a/854d0e?text=Dosa" },
        { id: 105, name: "Paneer Butter Masala Dosa", price: 170, image: "https://placehold.co/800x600/fecaca/991b1b?text=Paneer+Dosa" },
        { id: 106, name: "Paneer Ghee Masala Dosa", price: 190, image: "https://placehold.co/800x600/fecaca/991b1b?text=Paneer+Dosa" },
        { id: 107, name: "Cheese Masala Dosa", price: 150, image: "https://placehold.co/800x600/fde68a/854d0e?text=Cheese+Dosa" },
        { id: 108, name: "Onion Masala Dosa", price: 130, image: "https://placehold.co/800x600/fecaca/991b1b?text=Onion+Dosa" },
        { id: 109, name: "Onion Cheese Masala Dosa", price: 150, image: "https://placehold.co/800x600/fde68a/854d0e?text=Cheese+Dosa" },
    ],"South Indian1": [
        { id: 101, name: "Masala Dosa", price: 130, inStock:true, image: "https://placehold.co/800x600/fecaca/991b1b?text=Dosa" },
        { id: 102, name: "Ghee Masala Dosa", price: 150, image: "https://placehold.co/800x600/fecaca/991b1b?text=Dosa" },
        { id: 103, name: "Butter Dosa", price: 130, image: "https://placehold.co/800x600/fef08a/854d0e?text=Dosa" },
        { id: 104, name: "Ghee Dosa", price: 150, image: "https://placehold.co/800x600/fef08a/854d0e?text=Dosa" },
        { id: 105, name: "Paneer Butter Masala Dosa", price: 170, image: "https://placehold.co/800x600/fecaca/991b1b?text=Paneer+Dosa" },
        { id: 106, name: "Paneer Ghee Masala Dosa", price: 190, image: "https://placehold.co/800x600/fecaca/991b1b?text=Paneer+Dosa" },
        { id: 107, name: "Cheese Masala Dosa", price: 150, image: "https://placehold.co/800x600/fde68a/854d0e?text=Cheese+Dosa" },
        { id: 108, name: "Onion Masala Dosa", price: 130, image: "https://placehold.co/800x600/fecaca/991b1b?text=Onion+Dosa" },
        { id: 109, name: "Onion Cheese Masala Dosa", price: 150, image: "https://placehold.co/800x600/fde68a/854d0e?text=Cheese+Dosa" },
    ],"South Indian2": [
        { id: 101, name: "Masala Dosa", price: 130, inStock:true, image: "https://placehold.co/800x600/fecaca/991b1b?text=Dosa" },
        { id: 102, name: "Ghee Masala Dosa", price: 150, image: "https://placehold.co/800x600/fecaca/991b1b?text=Dosa" },
        { id: 103, name: "Butter Dosa", price: 130, image: "https://placehold.co/800x600/fef08a/854d0e?text=Dosa" },
        { id: 104, name: "Ghee Dosa", price: 150, image: "https://placehold.co/800x600/fef08a/854d0e?text=Dosa" },
        { id: 105, name: "Paneer Butter Masala Dosa", price: 170, image: "https://placehold.co/800x600/fecaca/991b1b?text=Paneer+Dosa" },
        { id: 106, name: "Paneer Ghee Masala Dosa", price: 190, image: "https://placehold.co/800x600/fecaca/991b1b?text=Paneer+Dosa" },
        { id: 107, name: "Cheese Masala Dosa", price: 150, image: "https://placehold.co/800x600/fde68a/854d0e?text=Cheese+Dosa" },
        { id: 108, name: "Onion Masala Dosa", price: 130, image: "https://placehold.co/800x600/fecaca/991b1b?text=Onion+Dosa" },
        { id: 109, name: "Onion Cheese Masala Dosa", price: 150, image: "https://placehold.co/800x600/fde68a/854d0e?text=Cheese+Dosa" },
    ],
    "Indian Gravy": [
        { id: 201, name: "Paneer Butter Masala", price: 170, image: "https://placehold.co/800x600/fb923c/9a3412?text=Paneer" },
        { id: 202, name: "Kadai Paneer", price: 170, image: "https://placehold.co/800x600/fb923c/9a3412?text=Paneer" },
        { id: 203, name: "Paneer Korma", price: 170, image: "https://placehold.co/800x600/fb923c/9a3412?text=Paneer" },
        { id: 204, name: "Dal Tadka", price: 130, image: "https://placehold.co/800x600/facc15/b45309?text=Dal" },
        { id: 205, name: "Dal Makhani", price: 130, image: "https://placehold.co/800x600/facc15/b45309?text=Dal" },
        { id: 206, name: "Chana Masala", price: 130, image: "https://placehold.co/800x600/fde68a/854d0e?text=Chana" },
        { id: 207, name: "Pindi Chana", price: 130, image: "https://placehold.co/800x600/fde68a/854d0e?text=Chana" },
        { id: 208, name: "Punjabi Chicken Masala", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken" },
        { id: 209, name: "Chicken Curry", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken" },
        { id: 210, name: "Chicken Korma", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken" },
        { id: 211, name: "Butter Chicken Masala", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken" },
        { id: 212, name: "Dum Murg Musallam", price: 190, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken" },
    ],
    "Tandoor": [
        { id: 301, name: "Paneer Tikka (6pc)", price: 170, image: "https://placehold.co/800x600/fb923c/9a3412?text=Tikka" },
        { id: 302, name: "Tandoori Roti", price: 15, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Roti" },
        { id: 303, name: "Butter Tandoori Roti", price: 20, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Roti" },
        { id: 304, name: "Tandoori Parantha", price: 25, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Parantha" },
        { id: 305, name: "Butter Tandoori Parantha", price: 30, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Parantha" },
        { id: 306, name: "Plain Naan", price: 30, image: "https://placehold.co/800x600/fef9c3/854d0e?text=Naan" },
        { id: 307, name: "Butter Naan", price: 40, image: "https://placehold.co/800x600/fef9c3/854d0e?text=Naan" },
        { id: 308, name: "Garlic Naan", price: 50, image: "https://placehold.co/800x600/fef9c3/854d0e?text=Naan" },
    ],
    "Sandwich & Burger": [
        { id: 401, name: "Double Cheese Sandwich", price: 170, image: "https://placehold.co/800x600/fde68a/854d0e?text=Sandwich" },
        { id: 402, name: "Sweet Corn Sandwich", price: 150, image: "https://placehold.co/800x600/fde68a/854d0e?text=Sandwich" },
        { id: 403, name: "Veg Grilled Sandwich", price: 150, image: "https://placehold.co/800x600/fde68a/854d0e?text=Sandwich" },
        { id: 404, name: "Paneer Grilled Sandwich", price: 170, image: "https://placehold.co/800x600/fde68a/854d0e?text=Sandwich" },
        { id: 405, name: "Chicken Sandwich", price: 160, image: "https://placehold.co/800x600/fde68a/854d0e?text=Sandwich" },
        { id: 406, name: "Cheese Chicken Loaded Sandwich", price: 180, image: "https://placehold.co/800x600/fde68a/854d0e?text=Sandwich" },
        { id: 407, name: "Veg Burger", price: 100, image: "https://placehold.co/800x600/fde68a/854d0e?text=Burger" },
        { id: 408, name: "Cheese Veg Burger", price: 120, image: "https://placehold.co/800x600/fde68a/854d0e?text=Burger" },
        { id: 409, name: "Paneer Burger", price: 160, image: "https://placehold.co/800x600/fde68a/854d0e?text=Burger" },
        { id: 410, name: "Chicken Burger", price: 160, image: "https://placehold.co/800x600/fde68a/854d0e?text=Burger" },
        { id: 411, name: "Cheese Chicken Burger", price: 180, image: "https://placehold.co/800x600/fde68a/854d0e?text=Burger" },
        { id: 412, name: "Veg Wrap", price: 140, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Wrap" },
        { id: 413, name: "Paneer Wrap", price: 160, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Wrap" },
        { id: 414, name: "Chicken Wrap", price: 160, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Wrap" },
    ],
    "Snacks": [
        { id: 501, name: "Classic French Fries", price: 110, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Fries" },
        { id: 502, name: "Garlic French Fries", price: 130, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Fries" },
        { id: 503, name: "Peri Peri French Fries", price: 130, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Fries" },
        { id: 504, name: "Mexican French Fries", price: 130, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Fries" },
        { id: 505, name: "Honey Chilli Potato", price: 150, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Chilli+Potato" },
        { id: 506, name: "Chicken Nuggets", price: 160, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Nuggets" },
        { id: 507, name: "Chicken Lollipop", price: 180, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Lollipop" },
        { id: 508, name: "Chicken Seekh Kebab", price: 180, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Kebab" },
        { id: 509, name: "Tandoori Chicken (Half)", price: 180, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Tandoori" },
        { id: 510, name: "Tandoori Chicken (Full)", price: 320, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Tandoori" },
        { id: 511, name: "Tandoori Chicken Malai", price: 180, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Tandoori" },
        { id: 512, name: "Chicken Crispy", price: 180, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Chicken" },
        { id: 513, name: "Chicken 65", price: 180, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Chicken+65" },
        { id: 514, name: "Plain Omelette", price: 100, image: "https://placehold.co/800x600/fef08a/854d0e?text=Omelette" },
        { id: 515, name: "Masala Omelette", price: 120, image: "https://placehold.co/800x600/fef08a/854d0e?text=Omelette" },
        { id: 516, name: "Chicken Omelette", price: 140, image: "https://placehold.co/800x600/fef08a/854d0e?text=Omelette" },
        { id: 517, name: "Veg Momos", price: 110, image: "https://placehold.co/800x600/d1d5db/1f2937?text=Momos" },
        { id: 518, name: "Chicken Momos", price: 130, image: "https://placehold.co/800x600/d1d5db/1f2937?text=Momos" },
        { id: 519, name: "Veg Mixed Nachos", price: 150, image: "https://placehold.co/800x600/facc15/b45309?text=Nachos" },
        { id: 520, name: "Chicken Nachos", price: 180, image: "https://placehold.co/800x600/facc15/b45309?text=Nachos" },
    ],
    "Pasta": [
        { id: 601, name: "Penne Alfredo Pasta Small", price: 110, image: "https://placehold.co/800x600/fef08a/854d0e?text=Pasta" },
        { id: 602, name: "Penne Alfredo Pasta Large", price: 150, image: "https://placehold.co/800x600/fef08a/854d0e?text=Pasta" },
        { id: 603, name: "Arrabbiata Pasta Small", price: 110, image: "https://placehold.co/800x600/fecaca/991b1b?text=Pasta" },
        { id: 604, name: "Arrabbiata Pasta Large", price: 150, image: "https://placehold.co/800x600/fecaca/991b1b?text=Pasta" },
        { id: 605, name: "Mix Sauce Pasta Small", price: 130, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Pasta" },
        { id: 606, name: "Mix Sauce Pasta Large", price: 170, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Pasta" },
        { id: 607, name: "Basil Sauce Pasta Small", price: 130, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Pasta" },
        { id: 608, name: "Basil Sauce Pasta Large", price: 170, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Pasta" },
        { id: 609, name: "Penne Alfredo Chicken Small", price: 140, image: "https://placehold.co/800x600/fef08a/854d0e?text=Pasta" },
        { id: 610, name: "Penne Alfredo Chicken Large", price: 180, image: "https://placehold.co/800x600/fef08a/854d0e?text=Pasta" },
        { id: 611, name: "Arrabbiata Chicken Small", price: 140, image: "https://placehold.co/800x600/fecaca/991b1b?text=Pasta" },
        { id: 612, name: "Arrabbiata Chicken Large", price: 180, image: "https://placehold.co/800x600/fecaca/991b1b?text=Pasta" },
        { id: 613, name: "Mix Sauce Chicken Small", price: 160, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Pasta" },
        { id: 614, name: "Mix Sauce Chicken Large", price: 200, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Pasta" },
        { id: 615, name: "Basil Sauce Chicken Small", price: 160, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Pasta" },
        { id: 616, name: "Basil Sauce Chicken Large", price: 200, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Pasta" },
    ],
    "Chinese": [
        { id: 701, name: "Veg Noodles", price: 130, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Noodles" },
        { id: 702, name: "Veg Hakka Noodles", price: 130, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Noodles" },
        { id: 703, name: "Veg Fried Rice", price: 130, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Rice" },
        { id: 704, name: "Veg Schezwan Fried Rice", price: 140, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Rice" },
        { id: 705, name: "Egg Noodles", price: 140, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Noodles" },
        { id: 706, name: "Egg Fried Rice", price: 140, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Rice" },
        { id: 707, name: "Chicken Noodles", price: 150, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Noodles" },
        { id: 708, name: "Chicken Fried Rice", price: 150, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Rice" },
        { id: 709, name: "Chicken Schezwan Fried Rice", price: 160, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Rice" },
        { id: 710, name: "Singapore Fried Rice", price: 160, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Rice" },
        { id: 711, name: "Chicken Singapore Fried Rice", price: 170, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Rice" },
        { id: 712, name: "Special Chicken Noodles", price: 180, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Noodles" },
    ],
    "Pizza & Garlic Bread": [
        { id: 801, name: "Sweet Corn Pizza", price: 220, image: "https://placehold.co/800x600/facc15/b45309?text=Pizza" },
        { id: 802, name: "US Special Pizza", price: 220, image: "https://placehold.co/800x600/facc15/b45309?text=Pizza" },
        { id: 803, name: "Paneer Tikka Pizza", price: 230, image: "https://placehold.co/800x600/f87171/991b1b?text=Pizza" },
        { id: 804, name: "Veg Supreme Pizza", price: 230, image: "https://placehold.co/800x600/4ade80/166534?text=Pizza" },
        { id: 805, name: "Classic Margherita Pizza", price: 220, image: "https://placehold.co/800x600/ef4444/991b1b?text=Pizza" },
        { id: 806, name: "Cheese Garlic Bread", price: 135, image: "https://placehold.co/800x600/fde68a/854d0e?text=Garlic+Bread" },
        { id: 807, name: "US Special Non-Veg Pizza", price: 245, image: "https://placehold.co/800x600/facc15/b45309?text=Pizza" },
        { id: 808, name: "Chicken Tikka Pizza", price: 245, image: "https://placehold.co/800x600/f87171/991b1b?text=Pizza" },
        { id: 809, name: "Jalapeno Chicken Pizza", price: 245, image: "https://placehold.co/800x600/4ade80/166534?text=Pizza" },
    ],
    "Beverages": [
        { id: 901, name: "Butterscotch Milkshake Small", price: 60, image: "https://placehold.co/800x600/fde68a/854d0e?text=Shake" },
        { id: 902, name: "Vanilla Milkshake Small", price: 60, image: "https://placehold.co/800x600/fef9c3/854d0e?text=Shake" },
        { id: 903, name: "Chocolate Milkshake Small", price: 60, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Shake" },
        { id: 904, name: "Oreo Milkshake Small", price: 75, image: "https://placehold.co/800x600/d1d5db/1f2937?text=Shake" },
        { id: 905, name: "KitKat Milkshake Small", price: 75, image: "https://placehold.co/800x600/ef4444/991b1b?text=Shake" },
        { id: 906, name: "Butterscotch Milkshake Large", price: 105, image: "https://placehold.co/800x600/fde68a/854d0e?text=Shake" },
        { id: 907, name: "Vanilla Milkshake Large", price: 105, image: "https://placehold.co/800x600/fef9c3/854d0e?text=Shake" },
        { id: 908, name: "Chocolate Milkshake Large", price: 105, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Shake" },
        { id: 909, name: "Oreo Milkshake Large", price: 120, image: "https://placehold.co/800x600/d1d5db/1f2937?text=Shake" },
        { id: 910, name: "KitKat Milkshake Large", price: 120, image: "https://placehold.co/800x600/ef4444/991b1b?text=Shake" },
        { id: 911, name: "Cold Coffee", price: 95, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Coffee" },
        { id: 912, name: "Orange Juice", price: 75, image: "https://placehold.co/800x600/fb923c/9a3412?text=Juice" },
        { id: 913, name: "Sweet Lime Juice", price: 75, image: "https://placehold.co/800x600/a3e635/4d7c0f?text=Juice" },
        { id: 914, name: "Pineapple Juice", price: 75, image: "https://placehold.co/800x600/facc15/b45309?text=Juice" },
        { id: 915, name: "Mango Juice", price: 75, image: "https://placehold.co/800x600/f59e0b/b45309?text=Juice" },
        { id: 916, name: "Sweet Lime Ice Tea Large", price: 70, image: "https://placehold.co/800x600/a3e635/4d7c0f?text=Ice+Tea" },
        { id: 917, name: "Ginger Mint Cooler Large", price: 70, image: "https://placehold.co/800x600/4ade80/166534?text=Cooler" },
        { id: 918, name: "Lime Mint Cooler Large", price: 70, image: "https://placehold.co/800x600/4ade80/166534?text=Cooler" },
        { id: 919, name: "Lemon Ice Tea Small", price: 54, image: "https://placehold.co/800x600/fde68a/854d0e?text=Ice+Tea" },
        { id: 920, name: "Ginger Tea", price: 15, image: "https://placehold.co/800x600/fde68a/854d0e?text=Tea" },
        { id: 921, name: "Hot Chocolate", price: 30, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Hot+Choc" },
        { id: 922, name: "Black Coffee", price: 30, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Coffee" },
    ],
    "Soya Chaap": [
        { id: 1001, name: "Tandoori Soya Chaap", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chaap" },
        { id: 1002, name: "Achari Soya Chaap", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chaap" },
        { id: 1003, name: "Malai Soya Chaap", price: 160, image: "https://placehold.co/800x600/fef9c3/854d0e?text=Chaap" },
    ],
    "Bakery & Cakes": [
        { id: 1101, name: "Veg Sub Roll", price: 50, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Sub" },
        { id: 1102, name: "Paneer Sub Roll", price: 60, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Sub" },
        { id: 1103, name: "Chicken Sub Roll", price: 60, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Sub" },
        { id: 1104, name: "Veg Crispy Tikki", price: 50, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Tikki" },
        { id: 1105, name: "Veg Crispy Roll", price: 50, image: "https://placehold.co/800x600/fed7aa/9a3412?text=Roll" },
        { id: 1106, name: "Veg Burger", price: 50, image: "https://placehold.co/800x600/fde68a/854d0e?text=Burger" },
        { id: 1107, name: "Chicken Burger", price: 60, image: "https://placehold.co/800x600/fde68a/854d0e?text=Burger" },
        { id: 1108, name: "Oreo Pastry", price: 50, image: "https://placehold.co/800x600/d1d5db/1f2937?text=Pastry" },
        { id: 1109, name: "Choco Truffle", price: 60, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Pastry" },
        { id: 1110, name: "Choco Brownie", price: 80, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Brownie" },
        { id: 1111, name: "Mousse Brownie", price: 80, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Brownie" },
        { id: 1112, name: "Shahi Tukda", price: 80, image: "https://placehold.co/800x600/fde68a/854d0e?text=Dessert" },
        { id: 1113, name: "Choco Truffle Cake 500gm", price: 500, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Cake" },
        { id: 1114, name: "Choco Cake 500gm", price: 500, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Cake" },
        { id: 1115, name: "Oreo Cake 500gm", price: 500, image: "https://placehold.co/800x600/d1d5db/1f2937?text=Cake" },
        { id: 1116, name: "Fruit Cake 500gm", price: 500, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Cake" },
        { id: 1117, name: "Pineapple Cake 500gm", price: 500, image: "https://placehold.co/800x600/facc15/b45309?text=Cake" },
        { id: 1118, name: "Red Velvet Cake 500gm", price: 500, image: "https://placehold.co/800x600/ef4444/991b1b?text=Cake" },
        { id: 1119, name: "Choco Truffle Cake 1kg", price: 900, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Cake" },
        { id: 1120, name: "Choco Cake 1kg", price: 900, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Cake" },
        { id: 1121, name: "Oreo Cake 1kg", price: 900, image: "https://placehold.co/800x600/d1d5db/1f2937?text=Cake" },
        { id: 1122, name: "Fruit Cake 1kg", price: 900, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Cake" },
        { id: 1123, name: "Pineapple Cake 1kg", price: 900, image: "https://placehold.co/800x600/facc15/b45309?text=Cake" },
        { id: 1124, name: "Red Velvet Cake 1kg", price: 900, image: "https://placehold.co/800x600/ef4444/991b1b?text=Cake" },
        { id: 1125, name: "Butterscotch Cake 1kg", price: 900, image: "https://placehold.co/800x600/fde68a/854d0e?text=Cake" },
    ],
  }
};

const mayuriData1 = {
  name: "Mayuri (AB1)",
  cuisine: "South Indian, North Indian, Snacks",
  rating: 4.5,
  image: "https://placehold.co/1600x900/f87171/ffffff?text=Mayuri",
  menu: {
    "Tea / Coffee": [
      { id: 1, name: "Regular Tea", price: 20, image: "https://placehold.co/800x600/fde68a/854d0e?text=Tea" },
      { id: 2, name: "Masala Tea", price: 25, image: "https://placehold.co/800x600/fde68a/854d0e?text=Masala+Tea" },
      { id: 3, name: "Regular Coffee", price: 25, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Coffee" },
      { id: 4, name: "Lemon Ice Tea", price: 70, image: "https://placehold.co/800x600/a7f3d0/065f46?text=Lemon+Ice+Tea" }
    ],
    "Mocktail": [
      { id: 5, name: "Mint Mojito", price: 100, image: "https://placehold.co/800x600/4ade80/166534?text=Mint+Mojito" },
      { id: 6, name: "Green Apple Soda", price: 100, image: "https://placehold.co/800x600/4ade80/166534?text=Apple+Soda" },
      { id: 7, name: "Blue Berry", price: 120, image: "https://placehold.co/800x600/3b82f6/1e40af?text=Blueberry" },
      { id: 8, name: "Kiwi Punch", price: 120, image: "https://placehold.co/800x600/22c55e/166534?text=Kiwi+Punch" },
      { id: 9, name: "Watermelon Mojito", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Watermelon" },
      { id: 10, name: "Seasonal Fruit Juice", price: 120, image: "https://placehold.co/800x600/fbbf24/92400e?text=Fruit+Juice" },
      { id: 11, name: "Cold Drinks", price: 35, image: "https://placehold.co/800x600/64748b/1e293b?text=Cold+Drink" }
    ],
    "Shake": [
      { id: 12, name: "Cold Coffee (Small)", price: 90, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Cold+Coffee" },
      { id: 13, name: "Cold Coffee (Large)", price: 100, image: "https://placehold.co/800x600/d2b48c/6b4628?text=Cold+Coffee" },
      { id: 14, name: "Oreo Shake (Small)", price: 100, image: "https://placehold.co/800x600/6b7280/374151?text=Oreo+Shake" },
      { id: 15, name: "Oreo Shake (Large)", price: 120, image: "https://placehold.co/800x600/6b7280/374151?text=Oreo+Shake" },
      { id: 16, name: "Strawberry Shake (Small)", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Strawberry+Shake" },
      { id: 17, name: "Strawberry Shake (Large)", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Strawberry+Shake" },
      { id: 18, name: "Black Currant Shake (Small)", price: 100, image: "https://placehold.co/800x600/4338ca/312e81?text=Black+Currant" },
      { id: 19, name: "Black Currant Shake (Large)", price: 120, image: "https://placehold.co/800x600/4338ca/312e81?text=Black+Currant" },
      { id: 20, name: "Watermelon Shake (Small)", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Watermelon+Shake" },
      { id: 21, name: "Watermelon Shake (Large)", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Watermelon+Shake" },
      { id: 22, name: "Mango Shake (Small)", price: 100, image: "https://placehold.co/800x600/fbbf24/92400e?text=Mango+Shake" },
      { id: 23, name: "Mango Shake (Large)", price: 120, image: "https://placehold.co/800x600/fbbf24/92400e?text=Mango+Shake" },
      { id: 24, name: "Oreo Milk Shake", price: 120, image: "https://placehold.co/800x600/6b7280/374151?text=Oreo+Milk+Shake" },
      { id: 25, name: "KitKat Milk Shake", price: 120, image: "https://placehold.co/800x600/ef4444/b91c1c?text=KitKat+Shake" }
    ],
    "Lassi": [
      { id: 26, name: "Sweet Lassi", price: 80, image: "https://placehold.co/800x600/fbbf24/92400e?text=Sweet+Lassi" },
      { id: 27, name: "Mango Lassi", price: 100, image: "https://placehold.co/800x600/fbbf24/92400e?text=Mango+Lassi" }
    ],
    "Momos / Rolls": [
      { id: 28, name: "Veg Steam Momos", price: 90, image: "https://placehold.co/800x600/d1d5db/1f2937?text=Veg+Momos" },
      { id: 29, name: "Veg Fried Momos", price: 100, image: "https://placehold.co/800x600/d1d5db/1f2937?text=Veg+Fried+Momos" },
      { id: 30, name: "Paneer Steam Momos", price: 100, image: "https://placehold.co/800x600/fecaca/991b1b?text=Paneer+Momos" },
      { id: 31, name: "Paneer Fry Momos", price: 120, image: "https://placehold.co/800x600/fecaca/991b1b?text=Paneer+Fry+Momos" },
      { id: 32, name: "Veg Kurkura Momos", price: 120, image: "https://placehold.co/800x600/9ca3af/4b5563?text=Kurkura+Momos" },
      { id: 33, name: "Paneer Tikka Rolls", price: 120, image: "https://placehold.co/800x600/fecaca/991b1b?text=Paneer+Tikka" },
      { id: 34, name: "Veg Kathi Rolls", price: 100, image: "https://placehold.co/800x600/6b7280/374151?text=Kathi+Rolls" },
      { id: 35, name: "Mexican Rolls", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Mexican+Rolls" }
    ],
    "Bread Items": [
      { id: 36, name: "Veg Burger", price: 90, image: "https://placehold.co/800x600/6b7280/374151?text=Veg+Burger" },
      { id: 37, name: "Veg Cheese Burger", price: 100, image: "https://placehold.co/800x600/fef08a/854d0e?text=Cheese+Burger" },
      { id: 38, name: "Paneer Cheese Burger", price: 100, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Paneer+Burger" },
      { id: 39, name: "Loaded Sandwich", price: 80, image: "https://placehold.co/800x600/fde68a/854d0e?text=Sandwich" },
      { id: 40, name: "Veg Hot Dog", price: 80, image: "https://placehold.co/800x600/f87171/991b1b?text=Hot+Dog" },
      { id: 41, name: "Paneer Hot Dog", price: 100, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Paneer+Hot+Dog" },
      { id: 42, name: "Paneer Cheese Hot Dog", price: 120, image: "https://placehold.co/800x600/fde68a/854d0e?text=Cheese+Hot+Dog" }
    ],
    "Pizza": [
      { id: 43, name: "Farm House Pizza", price: 180, image: "https://placehold.co/800x600/fbbf24/92400e?text=Farm+House+Pizza" },
      { id: 44, name: "Tandoori Paneer Pizza", price: 200, image: "https://placehold.co/800x600/f87171/991b1b?text=Tandoori+Paneer" },
      { id: 45, name: "Cheese Corn Pizza", price: 160, image: "https://placehold.co/800x600/fde68a/854d0e?text=Cheese+Corn+Pizza" }
    ],
    "Combos": [
      { id: 46, name: "Chole with Kulcha", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Chole+Kulcha" },
      { id: 47, name: "Paneer with Kulcha", price: 160, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Paneer+Kulcha" },
      { id: 48, name: "Chola with Samosa", price: 50, image: "https://placehold.co/800x600/fde68a/854d0e?text=Chola+Samosa" },
      { id: 49, name: "Chola Bhatura", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Chola+Bhatura" },
      { id: 50, name: "Chola Rice", price: 100, image: "https://placehold.co/800x600/fbbf24/92400e?text=Chola+Rice" },
      { id: 51, name: "Paneer Makhani Rice", price: 120, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Paneer+Makhani" }
    ],
    "Samosa": [
      { id: 52, name: "Sahi Kachori", price: 30, image: "https://placehold.co/800x600/fde68a/854d0e?text=Sahi+Kachori" },
      { id: 53, name: "Aloo Mutter Samosa", price: 25, image: "https://placehold.co/800x600/fbbf24/92400e?text=Aloo+Mutter" },
      { id: 54, name: "Masala Paneer Samosa", price: 40, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Masala+Paneer" },
      { id: 55, name: "Poha", price: 30, image: "https://placehold.co/800x600/f87171/991b1b?text=Poha" }
    ],
    "Chaat": [
      { id: 56, name: "Aloo Tikki", price: 60, image: "https://placehold.co/800x600/fbbf24/92400e?text=Aloo+Tikki" },
      { id: 57, name: "Papdi Chaat", price: 60, image: "https://placehold.co/800x600/fde68a/854d0e?text=Papdi+Chaat" },
      { id: 58, name: "Dahi Puri", price: 70, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Dahi+Puri" }
    ],
    "South Indian": [
      { id: 59, name: "Dosa Plain", price: 90, image: "https://placehold.co/800x600/fde68a/854d0e?text=Dosa+Plain" },
      { id: 60, name: "Masala Dosa", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Masala+Dosa" },
      { id: 61, name: "Jini Dosa", price: 150, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Jini+Dosa" },
      { id: 62, name: "Corn Cheese Dosa", price: 150, image: "https://placehold.co/800x600/fde68a/854d0e?text=Corn+Cheese+Dosa" },
      { id: 63, name: "Paneer Masala Dosa", price: 150, image: "https://placehold.co/800x600/fecaca/991b1b?text=Paneer+Masala+Dosa" },
      { id: 64, name: "Idli Sambar", price: 90, image: "https://placehold.co/800x600/fde68a/854d0e?text=Idli+Sambar" },
      { id: 65, name: "Thatte Idli", price: 100, image: "https://placehold.co/800x600/fde68a/854d0e?text=Thatte+Idli" },
      { id: 66, name: "Thatte Idli with Sambar", price: 120, image: "https://placehold.co/800x600/fde68a/854d0e?text=Thatte+Idli+Sambar" }
    ],
    "Loaded French Fries": [
      { id: 67, name: "Just Fries", price: 80, image: "https://placehold.co/800x600/fde68a/854d0e?text=Fries" },
      { id: 68, name: "China Town Fries", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=China+Town" },
      { id: 69, name: "Punjabi Bhangra Fries", price: 110, image: "https://placehold.co/800x600/fbcfe8/9d266f?text=Punjabi+Bhangra" },
      { id: 70, name: "Say Cheese Fries", price: 110, image: "https://placehold.co/800x600/fde68a/854d0e?text=Say+Cheese" },
      { id: 71, name: "Tangy Tango Fries", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Tangy+Tango" }
    ],
    "Sweets": [
      { id: 72, name: "Gulab Jamun", price: 25, image: "https://placehold.co/800x600/fde68a/854d0e?text=Gulab+Jamun" }
    ],
    "MRP Items": [
      { id: 73, name: "Ice-Cream", price: "MRP", image: "https://placehold.co/800x600/fef3c7/b45309?text=Ice+Cream" },
      { id: 74, name: "Water Bottle", price: "MRP", image: "https://placehold.co/800x600/3b82f6/1e40af?text=Water" }
    ]
  }
};

const mayuriData2 = {
  name: "Mayuri Café",
  cuisine: "Cafe, Momos, International Cuisine, Fast Food",
  rating: null,
  image: "https://placehold.co/1600x900/f87171/ffffff?text=Mayuri Cafe",
  menu: {
    "Momos": [
      { id: 1, name: "Veg Momo", image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Momo" },
      { id: 2, name: "Veg Fried Momo", image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Fried+Momo" },
      { id: 3, name: "Veg Kurkure Momo", image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Kurkure+Momo" },
      { id: 4, name: "Paneer Momo", image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Momo" },
      { id: 5, name: "Paneer Fried Momo", image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Fried+Momo" }
    ],
    "International Cuisine": [
      { id: 6, name: "Veg Noodles", image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Noodles" },
      { id: 7, name: "Veg Hakka Noodles", image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Hakka+Noodles" },
      { id: 8, name: "Schezwan Noodles", image: "https://placehold.co/800x600/f87171/991b1b?text=Schezwan+Noodles" },
      { id: 9, name: "Chilli Paneer", image: "https://placehold.co/800x600/f87171/991b1b?text=Chilli+Paneer" },
      { id: 10, name: "Arrabbiata Pasta (Red)", image: "https://placehold.co/800x600/f87171/991b1b?text=Arrabbiata+Pasta+Red" },
      { id: 11, name: "Alfredo Pasta (White)", image: "https://placehold.co/800x600/f87171/991b1b?text=Alfredo+Pasta+White" },
      { id: 12, name: "Farmhouse Pizza", image: "https://placehold.co/800x600/f87171/991b1b?text=Farmhouse+Pizza" },
      { id: 13, name: "Tandoori Paneer Pizza", image: "https://placehold.co/800x600/f87171/991b1b?text=Tandoori+Paneer+Pizza" },
      { id: 14, name: "Cheese Corn Tomato Pizza", image: "https://placehold.co/800x600/f87171/991b1b?text=Cheese+Corn+Tomato+Pizza" },
      { id: 15, name: "Quesadilla", image: "https://placehold.co/800x600/f87171/991b1b?text=Quesadilla" },
      { id: 16, name: "Aglio e Olio Pasta", image: "https://placehold.co/800x600/f87171/991b1b?text=Aglio+e+Olio+Pasta" }
    ],
    "Roll / Wrap": [
      { id: 17, name: "Soya Protein Roll", image: "https://placehold.co/800x600/f87171/991b1b?text=Soya+Protein+Roll" },
      { id: 18, name: "Mexican Roll", image: "https://placehold.co/800x600/f87171/991b1b?text=Mexican+Roll" },
      { id: 19, name: "Paneer Makhani Roll", image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Makhani+Roll" }
    ],
    "Sandwich": [
      { id: 20, name: "Veg Loaded", image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Loaded" },
      { id: 21, name: "Corn Paneer Tikka", image: "https://placehold.co/800x600/f87171/991b1b?text=Corn+Paneer+Tikka" },
      { id: 22, name: "Veg Club Sandwich", image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Club+Sandwich" }
    ],
    "Burger / Hotdog": [
      { id: 23, name: "Veg Classic Burger", image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Classic+Burger" },
      { id: 24, name: "Barbeque Paneer Burger", image: "https://placehold.co/800x600/f87171/991b1b?text=Barbeque+Paneer+Burger" },
      { id: 25, name: "Hotdog", image: "https://placehold.co/800x600/f87171/991b1b?text=Hotdog" },
      { id: 26, name: "Paneer Cheese Hotdog", image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Cheese+Hotdog" },
      { id: 27, name: "UFO Burger", image: "https://placehold.co/800x600/f87171/991b1b?text=UFO+Burger" }
    ]
  }
};

const absDakshinData = {
  name: "AB's Dakshin",
  cuisine: "South Indian, North Indian, Chinese, Snacks",
  rating: null,
  image: "https://placehold.co/1600x900/f87171/ffffff?text=AB's Dakshin",
  menu: {
    "Idly Varieties": [
      { id: 1, name: "Idly", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Idly" },
      { id: 2, name: "Mini Idly", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Mini+Idly" },
      { id: 3, name: "Paneer Spring Roll", price: 90, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Spring+Roll" },
      { id: 4, name: "Ghee Idly", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Ghee+Idly" },
      { id: 5, name: "Tandoori Idly", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Tandoori+Idly" },
      { id: 6, name: "Fried Idly", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Fried+Idly" },
      { id: 7, name: "Masala Fried Idly", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Masala+Fried+Idly" }
    ],
    "Chinese": [
      { id: 8, name: "French Fries", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=French+Fries" },
      { id: 9, name: "Chilli Paneer", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Chilli+Paneer" },
      { id: 10, name: "Chilli Chicken", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chilli+Chicken" },
      { id: 11, name: "Paneer Manchurian", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Manchurian" },
      { id: 12, name: "Chicken Manchurian", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Manchurian" }
    ],
    "Dosa": [
      { id: 13, name: "Kal Dosa", price: 90, image: "https://placehold.co/800x600/f87171/991b1b?text=Kal+Dosa" },
      { id: 14, name: "Chicken Curry Dosa", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Curry+Dosa" },
      { id: 15, name: "Egg Dosa", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Dosa" }
    ],
    "Bhel": [
      { id: 16, name: "Peanut Masala Bhel", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Peanut+Masala+Bhel" },
      { id: 17, name: "Masala Bhel", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Masala+Bhel" }
    ],
    "Kulcha": [
      { id: 18, name: "Paneer Kulcha", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Kulcha" },
      { id: 19, name: "Masala Kulcha", price: 90, image: "https://placehold.co/800x600/f87171/991b1b?text=Masala+Kulcha" },
      { id: 20, name: "Veggie Kulcha", price: 90, image: "https://placehold.co/800x600/f87171/991b1b?text=Veggie+Kulcha" }
    ],
    "Daal Bafla": [
      { id: 21, name: "Daal Bafla", price: 240, image: "https://placehold.co/800x600/f87171/991b1b?text=Daal+Bafla" }
    ],
    "Dosa Varieties": [
      { id: 22, name: "Masala Roast", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Masala+Roast" },
      { id: 23, name: "Onion Roast", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Onion+Roast" },
      { id: 24, name: "Ghee Roast", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Ghee+Roast" },
      { id: 25, name: "Mysore Roast", price: 140, image: "https://placehold.co/800x600/f87171/991b1b?text=Mysore+Roast" },
      { id: 26, name: "Paneer Roast", price: 140, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Roast" },
      { id: 27, name: "Egg Roast", price: 140, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Roast" },
      { id: 28, name: "Chicken Roast", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Roast" }
    ],
    "Spring Roll": [
      { id: 29, name: "Veg. Spring Roll", price: 80, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Spring+Roll" },
      { id: 30, name: "Paneer Spring Roll", price: 90, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Spring+Roll" },
      { id: 31, name: "Chicken Spring Roll", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Spring+Roll" }
    ],
    "Uthappam": [
      { id: 32, name: "Ghee Uthappam", price: 90, image: "https://placehold.co/800x600/f87171/991b1b?text=Ghee+Uthappam" },
      { id: 33, name: "Onion Uthappam", price: 90, image: "https://placehold.co/800x600/f87171/991b1b?text=Onion+Uthappam" },
      { id: 34, name: "Veg Uthappam", price: 90, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Uthappam" }
    ],
    "Roti": [
      { id: 35, name: "Plain Tandoori Roti", price: 40, image: "https://placehold.co/800x600/f87171/991b1b?text=Plain+Tandoori+Roti" },
      { id: 36, name: "Butter Tandoori Roti", price: 50, image: "https://placehold.co/800x600/f87171/991b1b?text=Butter+Tandoori+Roti" },
      { id: 37, name: "Plain Kulcha", price: 50, image: "https://placehold.co/800x600/f87171/991b1b?text=Plain+Kulcha" },
      { id: 38, name: "Butter Kulcha", price: 60, image: "https://placehold.co/800x600/f87171/991b1b?text=Butter+Kulcha" },
      { id: 39, name: "Plain Naan", price: 50, image: "https://placehold.co/800x600/f87171/991b1b?text=Plain+Naan" },
      { id: 40, name: "Butter Naan", price: 55, image: "https://placehold.co/800x600/f87171/991b1b?text=Butter+Naan" }
    ],
    "Drinks": [
      { id: 41, name: "Plain Tea", price: 25, image: "https://placehold.co/800x600/f87171/991b1b?text=Plain+Tea" },
      { id: 42, name: "Masala Tea", price: 25, image: "https://placehold.co/800x600/f87171/991b1b?text=Masala+Tea" },
      { id: 43, name: "Ginger Tea", price: 25, image: "https://placehold.co/800x600/f87171/991b1b?text=Ginger+Tea" },
      { id: 44, name: "Teardom Tea", price: 25, image: "https://placehold.co/800x600/f87171/991b1b?text=Teardom+Tea" },
      { id: 45, name: "Coffee", price: 25, image: "https://placehold.co/800x600/f87171/991b1b?text=Coffee" },
      { id: 46, name: "Kesar Milk", price: 35, image: "https://placehold.co/800x600/f87171/991b1b?text=Kesar+Milk" },
      { id: 47, name: "Mysor Pak", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Mysor+Pak" }
    ],
    "Parotta": [
      { id: 48, name: "Plain Parotta (2 pcs)", price: 80, image: "https://placehold.co/800x600/f87171/991b1b?text=Plain+Parotta" },
      { id: 49, name: "Veg. Kothu Parotta", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Kothu+Parotta" },
      { id: 50, name: "Paneer Stuffed Parotta", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Stuffed+Parotta" },
      { id: 51, name: "Aloo Stuffed Parotta", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Aloo+Stuffed+Parotta" },
      { id: 52, name: "Egg Kothu Parotta", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Kothu+Parotta" },
      { id: 53, name: "Chicken Kothu Parotta", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Kothu+Parotta" },
      { id: 54, name: "Chicken Stuffed Parotta", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Stuffed+Parotta" }
    ],
    "Chicken": [
      { id: 55, name: "Tandoori Chicken (1/4)", price: 140, image: "https://placehold.co/800x600/f87171/991b1b?text=Tandoori+Chicken+1/4" },
      { id: 56, name: "Tandoori Chicken (1/2)", price: 270, image: "https://placehold.co/800x600/f87171/991b1b?text=Tandoori+Chicken+1/2" },
      { id: 57, name: "Tandoori Chicken Full", price: 510, image: "https://placehold.co/800x600/f87171/991b1b?text=Tandoori+Chicken+Full" },
      { id: 58, name: "Dragon Chicken", price: 210, image: "https://placehold.co/800x600/f87171/991b1b?text=Dragon+Chicken" },
      { id: 59, name: "Chicken 65", price: 210, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+65" },
      { id: 60, name: "Chicken Manchurian", price: 210, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Manchurian" },
      { id: 61, name: "Butter Chicken Masala", price: 200, image: "https://placehold.co/800x600/f87171/991b1b?text=Butter+Chicken+Masala" },
      { id: 62, name: "Kadai Chicken", price: 200, image: "https://placehold.co/800x600/f87171/991b1b?text=Kadai+Chicken" },
      { id: 63, name: "Chicken Chettinad", price: 200, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Chettinad" },
      { id: 64, name: "Pepper Chicken", price: 210, image: "https://placehold.co/800x600/f87171/991b1b?text=Pepper+Chicken" },
      { id: 65, name: "Chicken Tikka Masala", price: 210, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Tikka+Masala" },
      { id: 66, name: "Tawa Chicken", price: 230, image: "https://placehold.co/800x600/f87171/991b1b?text=Tawa+Chicken" },
      { id: 67, name: "Chicken Tikka", price: 230, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Tikka" },
      { id: 68, name: "Chicken Chintamani", price: 200, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Chintamani" },
      { id: 69, name: "Chicken Paliyalpam", price: 200, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Paliyalpam" },
      { id: 70, name: "Boiled Chicken (250 gm)", price: 200, image: "https://placehold.co/800x600/f87171/991b1b?text=Boiled+Chicken" },
      { id: 71, name: "Plain Omelet", price: 50, image: "https://placehold.co/800x600/f87171/991b1b?text=Plain+Omelet" }
    ],
    "Tikka": [
      { id: 72, name: "Paneer Tikka", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Tikka" },
      { id: 73, name: "Paneer Malai Tikka", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Malai+Tikka" },
      { id: 74, name: "Paneer Hriyali Tikka", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Hriyali+Tikka" },
      { id: 75, name: "Spicy Paneer Tikka", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Spicy+Paneer+Tikka" },
      { id: 76, name: "Veg. Malai Tikka", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Malai+Tikka" },
      { id: 77, name: "Soya Malai Tikka", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Soya+Malai+Tikka" },
      { id: 78, name: "Gobi Manchurian", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Gobi+Manchurian" },
      { id: 79, name: "Chicken Malai Tikka", price: 210, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Malai+Tikka" },
      { id: 80, name: "Chicken Hriyali Tikka", price: 210, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Hriyali+Tikka" },
      { id: 81, name: "Chicken Tikka", price: 210, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Tikka" }
    ],
    "Samosa Chaat": [
      { id: 82, name: "Plain Samosa", price: 20, image: "https://placehold.co/800x600/f87171/991b1b?text=Plain+Samosa" },
      { id: 83, name: "Samosa Chaat", price: 60, image: "https://placehold.co/800x600/f87171/991b1b?text=Samosa+Chaat" },
      { id: 84, name: "Papdi Chaat", price: 60, image: "https://placehold.co/800x600/f87171/991b1b?text=Papdi+Chaat" },
      { id: 85, name: "Fruit Chaat", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Fruit+Chaat" },
      { id: 86, name: "Bread Pakoda", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Bread+Pakoda" },
      { id: 87, name: "Mirchi Pakoda", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Mirchi+Pakoda" }
    ],
    "Biriyani": [
      { id: 88, name: "Veg. Biryani", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Biryani" },
      { id: 89, name: "Mushroom Biryani", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Mushroom+Biryani" },
      { id: 90, name: "Egg Biryani", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Biryani" },
      { id: 91, name: "Egg Chicken Biryani", price: 200, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Chicken+Biryani" },
      { id: 92, name: "Chicken Biryani", price: 210, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Biryani" }
    ],
    "Lassi": [
      { id: 93, name: "Curd Lassi", price: 80, image: "https://placehold.co/800x600/f87171/991b1b?text=Curd+Lassi" },
      { id: 94, name: "Banana Lassi", price: 90, image: "https://placehold.co/800x600/f87171/991b1b?text=Banana+Lassi" },
      { id: 95, name: "Watermelon Lassi", price: 80, image: "https://placehold.co/800x600/f87171/991b1b?text=Watermelon+Lassi" }
    ],
    "Juice": [
      { id: 96, name: "Lemon Juice", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Lemon+Juice" },
      { id: 97, name: "Mosambi Juice", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Mosambi+Juice" },
      { id: 98, name: "Orange Juice", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Orange+Juice" },
      { id: 99, name: "Apple Juice", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Apple+Juice" },
      { id: 100, name: "Mango Juice", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Mango+Juice" },
      { id: 101, name: "Papaya Juice", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Papaya+Juice" },
      { id: 102, name: "Pineapple Juice", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Pineapple+Juice" },
      { id: 103, name: "Watermelon Juice", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Watermelon+Juice" },
      { id: 104, name: "Butter Fruit Juice", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Butter+Fruit+Juice" },
      { id: 105, name: "Mixed Fruit Juice", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Mixed+Fruit+Juice" },
      { id: 106, name: "Fig Juice", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Fig+Juice" },
      { id: 107, name: "Musk Melon Juice", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Musk+Melon+Juice" },
      { id: 108, name: "Pomegranate Juice", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Pomegranate+Juice" },
      { id: 109, name: "Guava Juice", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Guava+Juice" }
    ],
    "Shake": [
      { id: 110, name: "Banana Shake", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Banana+Shake" },
      { id: 111, name: "Vanilla Shake", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Vanilla+Shake" },
      { id: 112, name: "Chocolate Shake", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Chocolate+Shake" },
      { id: 113, name: "Blue Berry Shake", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Blue+Berry+Shake" },
      { id: 114, name: "Strawberry Shake", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Strawberry+Shake" },
      { id: 115, name: "Kit Kat Shake", price: 140, image: "https://placehold.co/800x600/f87171/991b1b?text=Kit+Kat+Shake" },
      { id: 116, name: "Litchi Shake", price: 140, image: "https://placehold.co/800x600/f87171/991b1b?text=Litchi+Shake" },
      { id: 117, name: "Butter Fruit Shake", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Butter+Fruit+Shake" },
      { id: 118, name: "Carrot Shake", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Carrot+Shake" },
      { id: 119, name: "Apple Shake", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Apple+Shake" },
      { id: 120, name: "Butter Scotch Shake", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Butter+Scotch+Shake" },
      { id: 121, name: "Rose Shake", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Rose+Shake" }
    ],
    "Paneer": [
      { id: 122, name: "Butter Paneer", price: 200, image: "https://placehold.co/800x600/f87171/991b1b?text=Butter+Paneer" },
      { id: 123, name: "Palak Paneer", price: 200, image: "https://placehold.co/800x600/f87171/991b1b?text=Palak+Paneer" },
      { id: 124, name: "Paneer Tikka Masala", price: 200, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Tikka+Masala" },
      { id: 125, name: "Kadai Paneer", price: 200, image: "https://placehold.co/800x600/f87171/991b1b?text=Kadai+Paneer" },
      { id: 126, name: "Shahi Paneer", price: 200, image: "https://placehold.co/800x600/f87171/991b1b?text=Shahi+Paneer" },
      { id: 127, name: "Paneer Bhurji", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Bhurji" },
      { id: 128, name: "Paneer 65", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+65" }
    ],
    "Pasta": [
      { id: 129, name: "Cheese Pasta", price: 140, image: "https://placehold.co/800x600/f87171/991b1b?text=Cheese+Pasta" },
      { id: 130, name: "Pasta in White Sauce", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Pasta+in+White+Sauce" },
      { id: 131, name: "Pink Sauce Pasta", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Pink+Sauce+Pasta" },
      { id: 132, name: "Red Sauce Pasta", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Red+Sauce+Pasta" },
      { id: 133, name: "Chicken Pink Sauce Pasta", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Pink+Sauce+Pasta" },
      { id: 134, name: "Chicken Red Sauce Pasta", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Red+Sauce+Pasta" },
      { id: 135, name: "Chicken White Sauce Pasta", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+White+Sauce+Pasta" },
      { id: 136, name: "Chicken Sauce Cheese Pasta", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Sauce+Cheese+Pasta" }
    ],
    "Rice": [
      { id: 137, name: "Sambar Rice", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Sambar+Rice" },
      { id: 138, name: "Veg. Fried Rice", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Fried+Rice" },
      { id: 139, name: "Egg Fried Rice", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Fried+Rice" },
      { id: 140, name: "Chicken Fried Rice", price: 170, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Fried+Rice" },
      { id: 141, name: "Egg Schezwan Fried Rice", price: 140, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Schezwan+Fried+Rice" },
      { id: 142, name: "Chicken Schezwan Fried Rice", price: 170, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Schezwan+Fried+Rice" }
    ],
    "Noodles": [
      { id: 143, name: "Veg. Fried Noodles", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Fried+Noodles" },
      { id: 144, name: "Veg. Schezwan Noodles", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Schezwan+Noodles" },
      { id: 145, name: "Egg Noodles", price: 135, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Noodles" },
      { id: 146, name: "Egg Schezwan Fried Noodles", price: 140, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Schezwan+Fried+Noodles" },
      { id: 147, name: "Chicken Fried Noodles", price: 170, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Fried+Noodles" },
      { id: 148, name: "Chicken Schezwan Fried Noodles", price: 170, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Schezwan+Fried+Noodles" }
    ],
    "Maincourse": [
      { id: 149, name: "Veg. Punjabi Masala", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Punjabi+Masala" },
      { id: 150, name: "Green Peas Masala", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Green+Peas+Masala" },
      { id: 151, name: "Aloo Gobi Masala", price: 165, image: "https://placehold.co/800x600/f87171/991b1b?text=Aloo+Gobi+Masala" },
      { id: 152, name: "Gobi 65", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Gobi+65" }
    ],
    "Bakery": [
      { id: 153, name: "Honey Bun", price: 50, image: "https://placehold.co/800x600/f87171/991b1b?text=Honey+Bun" },
      { id: 154, name: "Veg. Burgur", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Burgur" },
      { id: 155, name: "Chicken Burger", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Burger" },
      { id: 156, name: "Veg. Hot Dog", price: 50, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Hot+Dog" },
      { id: 157, name: "Paneer Hot Dog", price: 80, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Hot+Dog" },
      { id: 158, name: "Chicken Hot Dog", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Hot+Dog" },
      { id: 159, name: "Egg Hot Dog", price: 80, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Hot+Dog" },
      { id: 160, name: "American Chop Suey", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=American+Chop+Suey" },
      { id: 161, name: "Black Forest Pastry", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Black+Forest+Pastry" },
      { id: 162, name: "White Forest Pastry", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=White+Forest+Pastry" },
      { id: 163, name: "Veg. Sandwich", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Sandwich" },
      { id: 164, name: "Brownie Cake", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Brownie+Cake" },
      { id: 165, name: "Cheese Cake", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Cheese+Cake" },
      { id: 166, name: "Apple Cake", price: 60, image: "https://placehold.co/800x600/f87171/991b1b?text=Apple+Cake" },
      { id: 167, name: "Banana Cake", price: 60, image: "https://placehold.co/800x600/f87171/991b1b?text=Banana+Cake" },
      { id: 168, name: "Chocolate Lava Cake", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Chocolate+Lava+Cake" },
      { id: 169, name: "Choco Lava Cookies", price: 40, image: "https://placehold.co/800x600/f87171/991b1b?text=Choco+Lava+Cookies" },
      { id: 170, name: "Butter Scotch Cookies", price: 40, image: "https://placehold.co/800x600/f87171/991b1b?text=Butter+Scotch+Cookies" },
      { id: 171, name: "Pine Apple Cookies", price: 40, image: "https://placehold.co/800x600/f87171/991b1b?text=Pine+Apple+Cookies" },
      { id: 172, name: "Paneer Puff", price: 50, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Puff" },
      { id: 173, name: "Veg. Puff", price: 50, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Puff" },
      { id: 174, name: "Cream Bun", price: 50, image: "https://placehold.co/800x600/f87171/991b1b?text=Cream+Bun" },
      { id: 175, name: "Butter Chocolate Bun", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Butter+Chocolate+Bun" },
      { id: 176, name: "Muffin", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Muffin" },
      { id: 177, name: "Choco Moelleux", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Choco+Moelleux" },
      { id: 178, name: "Birthday Cake", price: 350, image: "https://placehold.co/800x600/f87171/991b1b?text=Birthday+Cake" }
    ]
  }
};

const bistroData = {
  name: "Bistro",
  cuisine: "Cafe, Beverages, Fast Food, Pizza, Pasta, Chinese",
  rating: null,
  image: "https://placehold.co/1600x900/f87171/ffffff?text=Bistro",
  menu: {
    "Hot Coffee": [
      { id: 1, name: "Espresso", price: 55, image: "https://placehold.co/800x600/f87171/991b1b?text=Espresso" },
      { id: 2, name: "Americano", price: 65, image: "https://placehold.co/800x600/f87171/991b1b?text=Americano" },
      { id: 3, name: "Cappuccino", price: 75, image: "https://placehold.co/800x600/f87171/991b1b?text=Cappuccino" },
      { id: 4, name: "Café Latte", price: 80, image: "https://placehold.co/800x600/f87171/991b1b?text=Café+Latte" },
      { id: 5, name: "Café Mocha", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Café+Mocha" },
      { id: 6, name: "Hot Chocolate", price: 95, image: "https://placehold.co/800x600/f87171/991b1b?text=Hot+Chocolate" },
      { id: 7, name: "Affogato", price: 85, image: "https://placehold.co/800x600/f87171/991b1b?text=Affogato" }
    ],
    "Cold Coffee": [
      { id: 8, name: "Veet Latte", price: 85, image: "https://placehold.co/800x600/f87171/991b1b?text=Veet+Latte" },
      { id: 9, name: "Irish Vanilla Latte", price: 125, image: "https://placehold.co/800x600/f87171/991b1b?text=Irish+Vanilla+Latte" },
      { id: 10, name: "Iced Mocha", price: 125, image: "https://placehold.co/800x600/f87171/991b1b?text=Iced+Mocha" },
      { id: 11, name: "Iced Americano", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Iced+Americano" },
      { id: 12, name: "Classic Cold Coffee", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Classic+Cold+Coffee" },
      { id: 13, name: "Cold Coffee With Ice Cream", price: 190, image: "https://placehold.co/800x600/f87171/991b1b?text=Cold+Coffee+With+Ice+Cream" }
    ],
    "Mocktails": [
      { id: 14, name: "Fresh Lime (Water/Soda)", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Fresh+Lime" },
      { id: 15, name: "Mint Mojito", price: 80, image: "https://placehold.co/800x600/f87171/991b1b?text=Mint+Mojito" },
      { id: 16, name: "Peach Lemonade", price: 95, image: "https://placehold.co/800x600/f87171/991b1b?text=Peach+Lemonade" },
      { id: 17, name: "Masala Lemon Soda", price: 95, image: "https://placehold.co/800x600/f87171/991b1b?text=Masala+Lemon+Soda" },
      { id: 18, name: "Orange Basil Soda", price: 100, image: "https://placehold.co/800x600/f87171/991b1b?text=Orange+Basil+Soda" },
      { id: 19, name: "Pink Lemonade", price: 105, image: "https://placehold.co/800x600/f87171/991b1b?text=Pink+Lemonade" }
    ],
    "Shakes & Frappes": [
      { id: 20, name: "Caramel Frappe", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Caramel+Frappe" },
      { id: 21, name: "KitKat Frappe", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=KitKat+Frappe" },
      { id: 22, name: "Oreo Shake", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Oreo+Shake" },
      { id: 23, name: "KitKat Shake", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=KitKat+Shake" },
      { id: 24, name: "Mango Shake", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Mango+Shake" },
      { id: 25, name: "Strawberry Shake", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Strawberry+Shake" },
      { id: 26, name: "Pineapple Shake", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Pineapple+Shake" }
    ],
    "Sandwiches / Burgers": [
      { id: 27, name: "Grilled Veg Sandwich", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Grilled+Veg+Sandwich" },
      { id: 28, name: "Paneer Sandwich", price: 140, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Sandwich" },
      { id: 29, name: "Paneer Schezwan Cheese Sandwich", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Schezwan+Cheese+Sandwich" },
      { id: 30, name: "Classic Veg Burger", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Classic+Veg+Burger" },
      { id: 31, name: "Classic Veg Burger with Cheese", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Classic+Veg+Burger+with+Cheese" },
      { id: 32, name: "Classic Chicken Burger", price: 170, image: "https://placehold.co/800x600/f87171/991b1b?text=Classic+Chicken+Burger" },
      { id: 33, name: "Classic Chicken Burger with Cheese", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Classic+Chicken+Burger+with+Cheese" }
    ],
    "Breads": [
      { id: 34, name: "Masala Bread", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Masala+Bread" },
      { id: 35, name: "Cheese Garlic Bread", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Cheese+Garlic+Bread" },
      { id: 36, name: "Paneer Stuffed Garlic Bread", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Stuffed+Garlic+Bread" },
      { id: 37, name: "Paneer Tandoori Stuffed Garlic Bread", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Tandoori+Stuffed+Garlic+Bread" },
      { id: 38, name: "Chicken Makhani Stuffed Garlic Bread", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Makhani+Stuffed+Garlic+Bread" }
    ],
    "Sides": [
      { id: 39, name: "Classic French Fries", price: 105, image: "https://placehold.co/800x600/f87171/991b1b?text=Classic+French+Fries" },
      { id: 40, name: "Peri Peri French Fries", price: 119, image: "https://placehold.co/800x600/f87171/991b1b?text=Peri+Peri+French+Fries" },
      { id: 41, name: "Potato Wedges", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Potato+Wedges" },
      { id: 42, name: "Loaded Potato Wedges", price: 149, image: "https://placehold.co/800x600/f87171/991b1b?text=Loaded+Potato+Wedges" },
      { id: 43, name: "Classic Baked Beans Toast (150 gm)", price: 190, image: "https://placehold.co/800x600/f87171/991b1b?text=Classic+Baked+Beans+Toast" },
      { id: 44, name: "Jalapeno Cheese Poppers (150 gm)", price: 190, image: "https://placehold.co/800x600/f87171/991b1b?text=Jalapeno+Cheese+Poppers" }
    ],
    "Pizza (7\")": [
      { id: 45, name: "Margherita", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Margherita" },
      { id: 46, name: "Onion Tomato", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Onion+Tomato" },
      { id: 47, name: "Corn & Cheese Pizza", price: 145, image: "https://placehold.co/800x600/f87171/991b1b?text=Corn+%26+Cheese+Pizza" },
      { id: 48, name: "Jalapeno Cheese Pizza", price: 145, image: "https://placehold.co/800x600/f87171/991b1b?text=Jalapeno+Cheese+Pizza" },
      { id: 49, name: "Paneer Tandoori Pizza", price: 165, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Tandoori+Pizza" },
      { id: 50, name: "Chicken Makhni Pizza", price: 175, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Makhni+Pizza" },
      { id: 51, name: "Chicken Sausage Pizza", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Sausage+Pizza" },
      { id: 52, name: "Veg Crispy Paneer Pizza", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Crispy+Paneer+Pizza" },
      { id: 53, name: "Chicken Loaded Pizza", price: 205, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Loaded+Pizza" }
    ],
    "Banio": [
      { id: 54, name: "Veg Banio", price: 80, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Banio" },
      { id: 55, name: "Egg Banio", price: 90, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Banio" },
      { id: 56, name: "Egg Cheese Banio", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Cheese+Banio" }
    ],
    "Wraps and Roll": [
      { id: 57, name: "Veg Potato Frankie", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Potato+Frankie" },
      { id: 58, name: "Makhni Mac N Cheese Frankie", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Makhni+Mac+N+Cheese+Frankie" },
      { id: 59, name: "Aloo Schezwan Frankie", price: 125, image: "https://placehold.co/800x600/f87171/991b1b?text=Aloo+Schezwan+Frankie" },
      { id: 60, name: "Paneer Schezwan Frankie", price: 135, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Schezwan+Frankie" },
      { id: 61, name: "Paneer Makhani Frankie", price: 135, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Makhani+Frankie" },
      { id: 62, name: "Chicken Tandoori Frankie", price: 165, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Tandoori+Frankie" },
      { id: 63, name: "Chicken Makhani Wrap", price: 165, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Makhani+Wrap" },
      { id: 64, name: "Peri Peri Chicken Wrap", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Peri+Peri+Chicken+Wrap" },
      { id: 65, name: "Chicken Seekh Wrap", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Seekh+Wrap" },
      { id: 66, name: "Egg Frankie", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Frankie" },
      { id: 67, name: "Egg Cheese Frankie", price: 140, image: "https://placehold.co/800x600/f87171/991b1b?text=Egg+Cheese+Frankie" },
      { id: 68, name: "Chicken Schezwan Frankie", price: 165, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Schezwan+Frankie" }
    ],
    "Pasta": [
      { id: 69, name: "Chipotle Mac N Cheese", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Chipotle+Mac+N+Cheese" },
      { id: 70, name: "Chipotle Mac N Cheese with Chicken", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Chipotle+Mac+N+Cheese+Chicken" },
      { id: 71, name: "Makhni Mac N Cheese", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Makhni+Mac+N+Cheese" },
      { id: 72, name: "Makhni Mac N Cheese with Chicken", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Makhni+Mac+N+Cheese+Chicken" },
      { id: 73, name: "Tandoori Mac N Cheese", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Tandoori+Mac+N+Cheese" },
      { id: 74, name: "Tandoori Mac N Cheese with Chicken", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Tandoori+Mac+N+Cheese+Chicken" },
      { id: 75, name: "Alfredo Penne/Spaghetti", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Alfredo+Penne+Spaghetti" },
      { id: 76, name: "Alfredo Penne/Spaghetti with Chicken", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Alfredo+Penne+Spaghetti+Chicken" },
      { id: 77, name: "Arrabiata Penne/Spaghetti", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Arrabiata+Penne+Spaghetti" },
      { id: 78, name: "Arrabiata Penne/Spaghetti with Chicken", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Arrabiata+Penne+Spaghetti+Chicken" }
    ],
    "Chinese": [
      { id: 79, name: "Veg Momo", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Momo" },
      { id: 80, name: "Paneer Momo", price: 140, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Momo" },
      { id: 81, name: "Chicken Momo", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Momo" }
    ],
    "Noodles & Rice": [
      { id: 82, name: "Veg Noodle (Half)", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Noodle+Half" },
      { id: 83, name: "Veg Noodle (Full)", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Noodle+Full" },
      { id: 84, name: "Hakka Noodle (Half)", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Hakka+Noodle+Half" },
      { id: 85, name: "Hakka Noodle (Full)", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Hakka+Noodle+Full" },
      { id: 86, name: "Chilly Garlic Noodle (Half)", price: 125, image: "https://placehold.co/800x600/f87171/991b1b?text=Chilly+Garlic+Noodle+Half" },
      { id: 87, name: "Chilly Garlic Noodle (Full)", price: 170, image: "https://placehold.co/800x600/f87171/991b1b?text=Chilly+Garlic+Noodle+Full" },
      { id: 88, name: "Schezwan Noodle (Half)", price: 125, image: "https://placehold.co/800x600/f87171/991b1b?text=Schezwan+Noodle+Half" },
      { id: 89, name: "Schezwan Noodle (Full)", price: 170, image: "https://placehold.co/800x600/f87171/991b1b?text=Schezwan+Noodle+Full" },
      { id: 90, name: "Veg Fried Rice", price: 110, image: "https://placehold.co/800x600/f87171/991b1b?text=Veg+Fried+Rice" },
      { id: 91, name: "Paneer Fried Rice", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Paneer+Fried+Rice" },
      { id: 92, name: "Crispy Corn", price: 130, image: "https://placehold.co/800x600/f87171/991b1b?text=Crispy+Corn" },
      { id: 93, name: "Honey Chilli Potato", price: 140, image: "https://placehold.co/800x600/f87171/991b1b?text=Honey+Chilli+Potato" },
      { id: 94, name: "Chicken Fried Rice", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+Fried+Rice" },
      { id: 95, name: "Chilli Paneer Mushroom", price: 160, image: "https://placehold.co/800x600/f87171/991b1b?text=Chilli+Paneer+Mushroom" },
      { id: 96, name: "Chilli Chicken", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Chilli+Chicken" },
      { id: 97, name: "Chicken 65", price: 180, image: "https://placehold.co/800x600/f87171/991b1b?text=Chicken+65" }
    ],
    "Dessert": [
      { id: 98, name: "Choco Lava Cake", price: 80, image: "https://placehold.co/800x600/f87171/991b1b?text=Choco+Lava+Cake" },
      { id: 99, name: "Blueberry Muffin", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Blueberry+Muffin" },
      { id: 100, name: "Choco Chip Muffin", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Choco+Chip+Muffin" },
      { id: 101, name: "Pudding", price: 70, image: "https://placehold.co/800x600/f87171/991b1b?text=Pudding" },
      { id: 102, name: "Newyork Cheese Cake (Slice)", price: 170, image: "https://placehold.co/800x600/f87171/991b1b?text=Newyork+Cheese+Cake" },
      { id: 103, name: "Waffle Maple Chocolate Syrup", price: 120, image: "https://placehold.co/800x600/f87171/991b1b?text=Waffle+Maple+Chocolate+Syrup" },
      { id: 104, name: "Brownie with Ice Cream", price: 150, image: "https://placehold.co/800x600/f87171/991b1b?text=Brownie+with+Ice+Cream" }
    ]
  }
};

const allRestaurants = {
    "underbelly": underBellyData,
    "mayuri-ab1": mayuriData1,
    "mayuri-ab2": mayuriData2,
    "ab-dakshin": absDakshinData,
    "bistro": bistroData,
};

export async function getRestaurantData(slug) {
  return allRestaurants[slug] || null;
}