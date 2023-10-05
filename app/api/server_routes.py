from flask_socketio import SocketIO, emit
from flask import Flask, render_template, Blueprint, jsonify
from app.models import User
from app import socketio

user_message_routes = Blueprint('messages', __name__)



@socketio.on('chat')
def handle_chat(data):
    print('Received message: ' + data)
    emit('Chat', data, broadcast=True)


@user_message_routes.route("/")
def index():
    return render_template()
