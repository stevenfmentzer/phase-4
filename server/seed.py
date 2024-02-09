from random import randint, choice as rc
from faker import Faker

from app import app
from models import db, Planet, Scientist, Mission

fake = Faker()

def create_user(): 
    pass