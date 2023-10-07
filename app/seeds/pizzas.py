from app.models import db, Pizza, environment, SCHEMA


# Sample pizza data
pizza_data = [
    {
        'name': 'Margherita',
        'description': 'Classic Margherita pizza with tomato sauce and mozzarella cheese.',
        'price': 10,
        'ingredientList': 'Tomato sauce, mozzarella cheese',
        'pizzaImg': 'margherita.jpg'
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
        'name': 'Hawaiian',
        'description': 'Hawaiian pizza with ham, pineapple, and cheese.',
        'price': 13,
        'ingredientList': 'Ham, pineapple, tomato sauce, mozzarella cheese',
        'pizzaImg': 'hawaiian.jpg'
    },
    {
        'name': 'Supreme',
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
        'name': 'Mushroom Lovers',
        'description': 'Pizza for mushroom lovers with assorted mushrooms and cheese.',
        'price': 13,
        'ingredientList': 'Assorted mushrooms, tomato sauce, mozzarella cheese',
        'pizzaImg': 'mushroom_lovers.jpg'
    },
    {
        'name': 'Buffalo Chicken',
        'description': 'Spicy Buffalo Chicken pizza with buffalo sauce, chicken, onions, and cheese.',
        'price': 14,
        'ingredientList': 'Buffalo sauce, chicken, onions, tomato sauce, mozzarella cheese',
        'pizzaImg': 'buffalo_chicken.jpg'
    },
    {
        'name': 'Meat Lovers',
        'description': 'Pizza for meat lovers with pepperoni, sausage, ham, bacon, and cheese.',
        'price': 16,
        'ingredientList': 'Pepperoni, sausage, ham, bacon, tomato sauce, mozzarella cheese',
        'pizzaImg': 'meat_lovers.jpg'
    },
    {
        'name': 'Pesto Chicken',
        'description': 'Pesto Chicken pizza with pesto sauce, chicken, tomatoes, and cheese.',
        'price': 14,
        'ingredientList': 'Pesto sauce, chicken, tomatoes, mozzarella cheese',
        'pizzaImg': 'pesto_chicken.jpg'
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
