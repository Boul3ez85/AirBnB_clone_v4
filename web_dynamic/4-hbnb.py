#!/usr/bin/python3
"""a flask application to filter places by amenities"""
from flask import Flask, render_template
from models import storage
import uuid
app = Flask(__name__)
app.url_map.strict_slashes = False


@app.route('/4-hbnb')
def display_hbnb():
    """Generate page with popdown menu of states/cities"""
    states = storage.all('State')
    amenities = storage.all('Amenity')
    places = storage.all('Place')
    cache_id = uuid.uuid4()
    return render_template('4-hbnb.html',
                           states=states,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)


@app.teardown_appcontext
def teardown_db(*args, **kwargs):
    """Close db storage or file storage"""
    storage.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)