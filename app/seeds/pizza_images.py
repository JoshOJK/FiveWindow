from app.models import db, PizzaImage, environment, SCHEMA

pizzaImg_data = [
    {
        "pizza_id": 1,
        "pizzaImg": 'https://www.allrecipes.com/thmb/fFW1o307WSqFFYQ3-QXYVpnFj6E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/48727-Mikes-homemade-pizza-DDMFS-beauty-4x3-BG-2974-a7a9842c14e34ca699f3b7d7143256cf.jpg'
    },
    {
        "pizza_id": 2,
        "pizzaImg": 'https://media-cdn.tripadvisor.com/media/photo-s/06/aa/af/f9/park-street-pizza.jpg'
    },
    {
        "pizza_id": 3,
        "pizzaImg": 'https://www.killingthyme.net/wp-content/uploads/2020/09/veggie-deluxe-pizza-4.jpg'
    },
    {
        "pizza_id": 4,
        "pizzaImg": 'https://www.thedailymeal.com/img/gallery/hawaiian-pizza-has-literally-nothing-to-do-with-hawaii/l-intro-1675927427.jpg'
    },
    {
        "pizza_id": 5,
        "pizzaImg": 'https://www.supremepizzasf.com/wp-content/uploads/2013/08/classic.jpg'
    },
    {
        "pizza_id": 6,
        "pizzaImg": 'https://www.southernliving.com/thmb/-Wn5pBs5DIz2RE5cuVKne_IF2hE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/BBQ-Chicken-Pizza_Audit7102_Beauty_1_3x2-e8195f3f45c74f189742d6eb4d7b2116.jpg'
    },
    {
        "pizza_id": 7,
        "pizzaImg": 'https://media-cdn.tripadvisor.com/media/photo-m/1280/1e/0c/36/95/super-supreme-lover-s.jpg'
    },
    {
        "pizza_id": 8,
        "pizzaImg": 'https://lifeloveandgoodfood.com/wp-content/uploads/2023/07/BLT-PIzza-19-1200x1200-1.jpg'
    },
    {
        "pizza_id": 9,
        "pizzaImg": 'https://www.vincenzosplate.com/wp-content/uploads/2021/08/610x350-Photo-5_863-How-to-Make-MEATLOVERS-PIZZA-Like-an-Italian-V1.jpg'
    },
    {
        "pizza_id": 10,
        "pizzaImg": 'https://realfood.tesco.com/media/images/RFO-1400x919-Chicken--pesto-pizza-1cadd212-7d94-445f-830e-96984cbec7aa-0-1400x919.jpg'
    },
    {
        "pizza_id": 11,
        "pizzaImg": 'https://www.vindulge.com/wp-content/uploads/2023/01/Hot-Honey-Pizza.jpg'
    },
    # {
    #     "pizza_id": 12,
    #     "pizzaImg": ''
    # },
    # {
    #     "pizza_id": 13,
    #     "pizzaImg": ''
    # },
    # {
    #     "pizza_id": 14,
    #     "pizzaImg": ''
    # },
    # {
    #     "pizza_id": 15,
    #     "pizzaImg": ''
    # },
    # {
    #     "pizza_id": 16,
    #     "pizzaImg": ''
    # },
    # {
    #     "pizza_id": 17,
    #     "pizzaImg": ''
    # },
    # {
    #     "pizza_id": 18,
    #     "pizzaImg": ''
    # },
    # {
    #     "pizza_id": 19,
    #     "pizzaImg": ''
    # },
    # {
    #     "pizza_id": 20,
    #     "pizzaImg": ''
    # }
]

def seed_pizzaImgs():
    for pizza_image in pizzaImg_data:
        pizzaImg = PizzaImage(**pizza_image)
        db.session.add(pizzaImg)
    db.session.commit()

def unseed_pizzaImgs():
    pizzaImages = PizzaImage.query.all()
    for pizzaImage in pizzaImages:
        db.session.delete(pizzaImage)
    db.session.commit()

if __name__ == "__main__":
    seed_pizzaImgs()

    unseed_pizzaImgs()
