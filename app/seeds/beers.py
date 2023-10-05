from app.models import db, Beer, environment, SCHEMA


# Sample beer data
beer_data = [
    {
        'name': 'IPA',
        'description': 'India Pale Ale with a strong hop flavor.',
        'abv': 6,
    },
    {
        'name': 'Stout',
        'description': 'Dark, rich beer with roasted malt or roasted barley.',
        'abv': 5,
    },
    {
        'name': 'Pale Ale',
        'description': 'Hoppy and often malty with a balanced bitterness.',
        'abv': 4,
    },
    {
        'name': 'Pilsner',
        'description': 'Crisp, refreshing, and often golden-colored lager.',
        'abv': 5,
    },
    {
        'name': 'Wheat Beer',
        'description': 'Made with a significant proportion of wheat.',
        'abv': 4,

    },
    {
        'name': 'Amber Ale',
        'description': 'Amber to red-brown color and a distinctive toasty, malty flavor.',
        'abv': 5,

    },
    {
        'name': 'Porter',
        'description': 'Dark beer with a roasted flavor, often similar to stout.',
        'abv': 6,

    },
    {
        'name': 'Saison',
        'description': 'Highly carbonated, fruity, spicy, and often bottle conditioned.',
        'abv': 5,

    },
    {
        'name': 'Belgian Tripel',
        'description': 'Strong ale with a golden color and complex, fruity flavor.',
        'abv': 9,

    },
    {
        'name': 'Hefeweizen',
        'description': 'Unfiltered wheat beer with notable yeast character.',
        'abv': 5,

    },
    {
        'name': 'Barleywine',
        'description': 'Strong ale known for its intense malt sweetness and high alcohol content.',
        'abv': 10,

    },
    {
        'name': 'Sour Ale',
        'description': 'Beer with an intentionally acidic, tart, or sour taste.',
        'abv': 5,

    },
    {
        'name': 'Kölsch',
        'description': 'Crisp, clean, and bright beer originating from Cologne, Germany.',
        'abv': 4,

    },
    {
        'name': 'Gose',
        'description': 'Sour, salty, German wheat beer.',
        'abv': 4,

    },
    {
        'name': 'Doppelbock',
        'description': 'Strong lager with a rich and malty flavor.',
        'abv': 8,

    }
]

# Seeder function
def seed_beers():
    for beer_item in beer_data:
        beer = Beer(**beer_item)
        db.session.add(beer)
    db.session.commit()

# Unseeder function
def unseed_beers():
    beers = Beer.query.all()
    for beer in beers:
        db.session.delete(beer)
    db.session.commit()

# Run the seeder function
if __name__ == "__main__":
    seed_beers()

    # Unseed the data after testing
    unseed_beers()
