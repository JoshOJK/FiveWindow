from flask.cli import AppGroup
from .users import seed_users, undo_users
from .pizzas import seed_pizzas, unseed_pizzas
from .beers import seed_beers, unseed_beers
from .shoppingCart import seed_shopping_carts, undo_shopping_carts

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_shopping_carts()
        unseed_beers()
        unseed_pizzas()
        undo_users()
    seed_users()
    seed_beers()
    seed_pizzas()
    seed_shopping_carts()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_shopping_carts()
    unseed_beers()
    unseed_pizzas()
    undo_users()
    # Add other undo functions here
