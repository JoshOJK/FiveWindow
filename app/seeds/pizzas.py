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
        'pizzaImg': 'pepperoni.jpg'
    },
       {
        'name': 'Vegetarian',
        'description': 'Vegetarian pizza with assorted vegetables and cheese.',
        'price': 11,
        'ingredientList': 'Bell peppers, mushrooms, onions, olives, tomato sauce, mozzarella cheese',
        'pizzaImg': 'vegetarian.jpg'
    },
    {
        'name': 'Fiery Hawaiian',
        'description': 'Hawaiian pizza with ham, pineapple, and cheese.',
        'price': 13,
        'ingredientList': 'Ham, pineapple, tomato sauce, mozzarella cheese',
        'pizzaImg': 'hawaiian.jpg'
    },
    {
        'name': 'Five Window Special',
        'description': 'Supreme pizza with pepperoni, sausage, bell peppers, onions, olives, and cheese.',
        'price': 15,
        'ingredientList': 'Pepperoni, sausage, bell peppers, onions, olives, tomato sauce, mozzarella cheese',
        'pizzaImg': 'supreme.jpg'
    },
    {
        'name': 'BBQ Chicken',
        'description': 'BBQ Chicken pizza with BBQ sauce, chicken, onions, and cheese.',
        'price': 14,
        'ingredientList': 'BBQ sauce, chicken, onions, tomato sauce, mozzarella cheese',
        'pizzaImg': 'bbq_chicken.jpg'
    },
    {
        'name': 'Scooby Special',
        'description': 'A pizza made by scooby himself with all the toppings you"ll ever need.',
        'price': 13,
        'ingredientList': 'Ranch base, cheese, ham, pepperoni, sausage, bacon, chicken, onion, tomato, bell pepper, mushroom, jalapeno, sweet pepper, and olive',
        'pizzaImg': 'mushroom_lovers.jpg'
    },
    {
        'name': 'Pesto BLT',
        'description': 'The blt sandwich collides with a craft pizza that makes the pesto blt.',
        'price': 14,
        'ingredientList': 'Pesto base with bacon, spinach, cherry tomato, a ranch drizzle, and topped with cracked pepper and parmesan cheese',
        'pizzaImg': 'buffalo_chicken.jpg'
    },
    {
        'name': 'Meat Lovers',
        'description': 'Pizza for meat lovers with pepperoni, sausage, ham, bacon, and cheese.',
        'price': 16,
        'ingredientList': 'Pepperoni, sausage, bacon, tomato sauce, mozzarella cheese',
        'pizzaImg': 'meat_lovers.jpg'
    },
    {
        'name': 'Chicken Pesto',
        'description': 'Chicken Pesto pizza with pesto sauce, chicken, tomatoes, and cheese.',
        'price': 14,
        'ingredientList': 'Pesto sauce, chicken, tomatoes, mozzarella cheese, and basil',
        'pizzaImg': 'pesto_chicken.jpg'
    },
    {
        'name': 'HoneyBee Mine',
        'description': 'The HoneyBee Mine is a delicious combination of spicy and sweet.',
        'price': 16,
        'ingredientList': 'Marinarra base, with cheese, hot soppressata, cherry tomatos, goat cheese, topped with basil and hot honey.',
        'pizzaImg': 'https://res.cloudinary.com/dhruiovd0/image/upload/v1678152994/ZbKwuazZYQTcjxVWPnH-NLTGC4IOB81uEP_9DF9UFCE_if4gtl.webp'
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
