from app.models import db, Pizza, environment, SCHEMA

# Sample pizza data
pizza_data = [
    {
        'name': 'Caprese',
        'description': 'Classic Margherita pizza with tomato sauce and mozzarella cheese.',
        'price': 10,
        'ingredientList': 'Tomato sauce, mozzarella cheese',
        'pizzaImg': 'https://www.allrecipes.com/thmb/fFW1o307WSqFFYQ3-QXYVpnFj6E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/48727-Mikes-homemade-pizza-DDMFS-beauty-4x3-BG-2974-a7a9842c14e34ca699f3b7d7143256cf.jpg'
    },
    {
        'name': 'Pepperoni',
        'description': 'Pepperoni pizza with spicy pepperoni slices and cheese.',
        'price': 12,
        'ingredientList': 'Pepperoni, tomato sauce, mozzarella cheese',
        'pizzaImg': 'https://media-cdn.tripadvisor.com/media/photo-s/06/aa/af/f9/park-street-pizza.jpg'
    },
       {
        'name': 'Vegetarian',
        'description': 'Vegetarian pizza with assorted vegetables and cheese.',
        'price': 11,
        'ingredientList': 'Bell peppers, mushrooms, onions, olives, tomato sauce, mozzarella cheese',
        'pizzaImg': 'https://www.killingthyme.net/wp-content/uploads/2020/09/veggie-deluxe-pizza-4.jpg'
    },
    {
        'name': 'Fiery Hawaiian',
        'description': 'Hawaiian pizza with ham, pineapple, and cheese.',
        'price': 13,
        'ingredientList': 'Ham, pineapple, tomato sauce, mozzarella cheese',
        'pizzaImg': 'https://www.thedailymeal.com/img/gallery/hawaiian-pizza-has-literally-nothing-to-do-with-hawaii/l-intro-1675927427.jpg'
    },
    {
        'name': 'Five Window Special',
        'description': 'Supreme pizza with pepperoni, sausage, bell peppers, onions, olives, and cheese.',
        'price': 15,
        'ingredientList': 'Pepperoni, sausage, bell peppers, onions, olives, tomato sauce, mozzarella cheese',
        'pizzaImg': 'https://www.supremepizzasf.com/wp-content/uploads/2013/08/classic.jpg'
    },
    {
        'name': 'BBQ Chicken',
        'description': 'BBQ Chicken pizza with BBQ sauce, chicken, onions, and cheese.',
        'price': 14,
        'ingredientList': 'BBQ sauce, chicken, onions, tomato sauce, mozzarella cheese',
        'pizzaImg': 'https://www.southernliving.com/thmb/-Wn5pBs5DIz2RE5cuVKne_IF2hE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/BBQ-Chicken-Pizza_Audit7102_Beauty_1_3x2-e8195f3f45c74f189742d6eb4d7b2116.jpg'
    },
    {
        'name': 'Scooby Special',
        'description': 'A pizza made by scooby himself with all the toppings you"ll ever need.',
        'price': 13,
        'ingredientList': 'Ranch base, cheese, ham, pepperoni, sausage, bacon, chicken, onion, tomato, bell pepper, mushroom, jalapeno, sweet pepper, and olive',
        'pizzaImg': 'https://media-cdn.tripadvisor.com/media/photo-m/1280/1e/0c/36/95/super-supreme-lover-s.jpg'
    },
    {
        'name': 'Pesto BLT',
        'description': 'The blt sandwich collides with a craft pizza that makes the pesto blt.',
        'price': 14,
        'ingredientList': 'Pesto base with bacon, spinach, cherry tomato, a ranch drizzle, and topped with cracked pepper and parmesan cheese',
        'pizzaImg': 'https://lifeloveandgoodfood.com/wp-content/uploads/2023/07/BLT-PIzza-19-1200x1200-1.jpg'
    },
    {
        'name': 'Meat Lovers',
        'description': 'Pizza for meat lovers with pepperoni, sausage, ham, bacon, and cheese.',
        'price': 16,
        'ingredientList': 'Pepperoni, sausage, bacon, tomato sauce, mozzarella cheese',
        'pizzaImg': 'https://www.vincenzosplate.com/wp-content/uploads/2021/08/610x350-Photo-5_863-How-to-Make-MEATLOVERS-PIZZA-Like-an-Italian-V1.jpg'
    },
    {
        'name': 'Chicken Pesto',
        'description': 'Chicken Pesto pizza with pesto sauce, chicken, tomatoes, and cheese.',
        'price': 14,
        'ingredientList': 'Pesto sauce, chicken, tomatoes, mozzarella cheese, and basil',
        'pizzaImg': 'https://realfood.tesco.com/media/images/RFO-1400x919-Chicken--pesto-pizza-1cadd212-7d94-445f-830e-96984cbec7aa-0-1400x919.jpg'
    },
    {
        'name': 'HoneyBee Mine',
        'description': 'The HoneyBee Mine is a delicious combination of spicy and sweet.',
        'price': 16,
        'ingredientList': 'Marinarra base, with cheese, hot soppressata, cherry tomatos, goat cheese, topped with basil and hot honey.',
        'pizzaImg': 'https://www.vindulge.com/wp-content/uploads/2023/01/Hot-Honey-Pizza.jpg'
    }
]


# Seeder function
def seed_pizzas():
    for pizza_item in pizza_data:
        pizza = Pizza(**pizza_item)
        db.session.add(pizza)
        db.session.commit()

    # Unseeder function
def unseed_pizzas():
    pizzas = Pizza.query.all()
    for pizza in pizzas:
        db.session.delete(pizza)
    db.session.commit()

# Run the seeder function
if __name__ == "__main__":
    seed_pizzas()

    unseed_pizzas()
