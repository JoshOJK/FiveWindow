from app.models import db, Pizza, environment, SCHEMA

# Sample pizza data
pizza_data = [
    {
        'name': 'Caprese',
        'description': 'Classic Margherita pizza with tomato sauce and mozzarella cheese.',
        'price': 10,
        'ingredientList': 'Tomato sauce, mozzarella cheese',

    },
    {
        'name': 'Pepperoni',
        'description': 'Pepperoni pizza with spicy pepperoni slices and cheese.',
        'price': 12,
        'ingredientList': 'Pepperoni, tomato sauce, mozzarella cheese',

    },
       {
        'name': 'Vegetarian',
        'description': 'Vegetarian pizza with assorted vegetables and cheese.',
        'price': 11,
        'ingredientList': 'Bell peppers, mushrooms, onions, olives, tomato sauce, mozzarella cheese',

    },
    {
        'name': 'Fiery Hawaiian',
        'description': 'Hawaiian pizza with ham, pineapple, and cheese.',
        'price': 13,
        'ingredientList': 'Ham, pineapple, tomato sauce, mozzarella cheese',

    },
    {
        'name': 'Five Window Special',
        'description': 'Supreme pizza with pepperoni, sausage, bell peppers, onions, olives, and cheese.',
        'price': 15,
        'ingredientList': 'Pepperoni, sausage, bell peppers, onions, olives, tomato sauce, mozzarella cheese',

    },
    {
        'name': 'BBQ Chicken',
        'description': 'BBQ Chicken pizza with BBQ sauce, chicken, onions, and cheese.',
        'price': 14,
        'ingredientList': 'BBQ sauce, chicken, onions, tomato sauce, mozzarella cheese',

    },
    {
        'name': 'Scooby Special',
        'description': 'A pizza made by scooby himself with all the toppings you"ll ever need.',
        'price': 13,
        'ingredientList': 'Ranch base, cheese, ham, pepperoni, sausage, bacon, chicken, onion, tomato, bell pepper, mushroom, jalapeno, sweet pepper, and olive',

    },
    {
        'name': 'Pesto BLT',
        'description': 'The blt sandwich collides with a craft pizza that makes the pesto blt.',
        'price': 14,
        'ingredientList': 'Pesto base with bacon, spinach, cherry tomato, a ranch drizzle, and topped with cracked pepper and parmesan cheese',

    },
    {
        'name': 'Meat Lovers',
        'description': 'Pizza for meat lovers with pepperoni, sausage, ham, bacon, and cheese.',
        'price': 16,
        'ingredientList': 'Pepperoni, sausage, bacon, tomato sauce, mozzarella cheese',

    },
    {
        'name': 'Chicken Pesto',
        'description': 'Chicken Pesto pizza with pesto sauce, chicken, tomatoes, and cheese.',
        'price': 14,
        'ingredientList': 'Pesto sauce, chicken, tomatoes, mozzarella cheese, and basil',

    },
    {
        'name': 'HoneyBee Mine',
        'description': 'The HoneyBee Mine is a delicious combination of spicy and sweet.',
        'price': 16,
        'ingredientList': 'Marinarra base, with cheese, hot soppressata, cherry tomatos, goat cheese, topped with basil and hot honey.',
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
