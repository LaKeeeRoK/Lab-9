from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///phonebook.db'
db = SQLAlchemy(app)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f'Contact(id={self.id}, name={self.name}, phone={self.phone})'

@app.route('/')
def index():
    with app.app_context(): 
        contacts = Contact.query.all()
    return render_template('index.html', contacts=contacts)

if __name__ == '__main__':
    with app.app_context():  
        db.create_all()
    app.run(debug=True)
