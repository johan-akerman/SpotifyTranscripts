from . import db

class Podcast(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(50))
    transcript = db.Column((db.String))